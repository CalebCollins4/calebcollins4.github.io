import React, { useEffect, useRef } from 'react';

/**
 * EmbeddingField — a 2D latent-space visualization that doubles as a
 * cursor-reactive k-NN classifier demo. Replaces the generic particle
 * flashlight with something that actually reads as machine learning.
 *
 * Scattered points are clustered into four classes (cyan / amber / violet
 * / mint). The cursor is a query point: its K=7 nearest neighbors light
 * up and connect back to it, and the cursor itself adopts the majority
 * class color — exactly what k-NN classification looks like.
 */
const EmbeddingField = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Palette extends the hero component's cyan/amber so both
    // backgrounds feel like they share an idiom.
    const CLASSES = [
      { color: [100, 200, 255] }, // cyan
      { color: [255, 170, 80] },  // amber
      { color: [180, 140, 255] }, // violet
      { color: [120, 220, 180] }, // mint
    ];

    const NUM_POINTS = 260;
    const K = 7;
    const FLASHLIGHT_RADIUS = 320;
    const AMBIENT_INTENSITY = 0.08;

    let points = [];
    const mouse = { x: -10000, y: -10000, active: false };
    // Lerped follower so fast mouse moves don't jitter the k-NN edges.
    const cursor = { x: -10000, y: -10000 };

    const seedPoints = (w, h) => {
      points = [];
      // Four class centroids in a loose quadrant layout. Cluster radius
      // is generous enough that the disks approach the middle of the
      // viewport, giving the cursor neighbors to find wherever it roams.
      const centroids = [
        { x: w * 0.22, y: h * 0.30 },
        { x: w * 0.78, y: h * 0.28 },
        { x: w * 0.18, y: h * 0.72 },
        { x: w * 0.82, y: h * 0.74 },
      ];
      const clusterR = Math.min(w, h) * 0.30;
      const perClass = Math.floor(NUM_POINTS / CLASSES.length);

      CLASSES.forEach((_, cls) => {
        const { x: cx, y: cy } = centroids[cls];
        for (let i = 0; i < perClass; i++) {
          // sqrt(uniform) gives uniform area density within the cluster
          // disk — reads as a clean scatter cluster with a hard outer
          // edge, no stragglers that look like misplaced points.
          const r = clusterR * Math.sqrt(Math.random());
          const theta = Math.random() * Math.PI * 2;
          points.push({
            x: cx + Math.cos(theta) * r,
            y: cy + Math.sin(theta) * r,
            cls,
            phase: Math.random() * Math.PI * 2,
            size: 1.1 + Math.random() * 1.1,
          });
        }
      });
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedPoints(w, h);
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
        mouse.active = true;
      }
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -10000;
      mouse.y = -10000;
    };

    const render = (now) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      cursor.x += (mouse.x - cursor.x) * 0.22;
      cursor.y += (mouse.y - cursor.y) * 0.22;

      // Compute k-NN each frame. With ~260 points, a full sort is ~2000
      // comparisons — well under budget, and simpler than a heap.
      let nearestK = [];
      if (mouse.active) {
        const ranked = points.map((p) => {
          const dx = p.x - cursor.x;
          const dy = p.y - cursor.y;
          return { p, d2: dx * dx + dy * dy };
        });
        ranked.sort((a, b) => a.d2 - b.d2);
        nearestK = ranked.slice(0, K);
      }
      const nearestKSet = new Set(nearestK.map((n) => n.p));

      // Majority vote → predicted class for the cursor position.
      let majorityClass = -1;
      if (nearestK.length > 0) {
        const votes = new Array(CLASSES.length).fill(0);
        nearestK.forEach((n) => votes[n.p.cls]++);
        let best = 0;
        for (let i = 1; i < votes.length; i++) {
          if (votes[i] > votes[best]) best = i;
        }
        majorityClass = best;
      }

      // Draw points. Intensity has three tiers: ambient (dim), within
      // flashlight radius (scales with distance), k-NN member (max).
      points.forEach((p) => {
        const dx = p.x - cursor.x;
        const dy = p.y - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let intensity;
        if (nearestKSet.has(p)) {
          intensity = 1.0;
        } else if (mouse.active && dist < FLASHLIGHT_RADIUS) {
          intensity =
            Math.pow(1 - dist / FLASHLIGHT_RADIUS, 1.3) * 0.75 + 0.1;
        } else {
          intensity = AMBIENT_INTENSITY;
        }

        if (!prefersReducedMotion) {
          const pulse = 0.5 + 0.5 * Math.sin(now * 0.0008 + p.phase);
          intensity *= 0.85 + pulse * 0.15;
        }

        const [r, g, b] = CLASSES[p.cls].color;

        // Halo for well-lit points
        if (intensity > 0.35) {
          const haloR = p.size + intensity * 6;
          const grad = ctx.createRadialGradient(
            p.x,
            p.y,
            p.size * 0.5,
            p.x,
            p.y,
            haloR
          );
          grad.addColorStop(0, `rgba(${r},${g},${b},${intensity * 0.4})`);
          grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloR, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, intensity)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (mouse.active && nearestK.length > 0) {
        // k-NN edges: cursor → each neighbor, brightness falls off by rank.
        nearestK.forEach((n, i) => {
          const rankStrength = 1 - (i / K) * 0.55;
          const [r, g, b] = CLASSES[n.p.cls].color;

          ctx.strokeStyle = `rgba(${r},${g},${b},${rankStrength * 0.55})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(cursor.x, cursor.y);
          ctx.lineTo(n.p.x, n.p.y);
          ctx.stroke();

          // Ring marker around each selected neighbor.
          ctx.strokeStyle = `rgba(${r},${g},${b},${rankStrength * 0.75})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.p.x, n.p.y, n.p.size + 3.5, 0, Math.PI * 2);
          ctx.stroke();
        });

        // Cursor query marker — crosshair + dashed query-radius ring +
        // center dot, all tinted with the predicted class color.
        const [cr, cg, cb] =
          majorityClass >= 0 ? CLASSES[majorityClass].color : [200, 200, 200];

        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.22)`;
        ctx.setLineDash([4, 4]);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, FLASHLIGHT_RADIUS, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        ctx.strokeStyle = `rgba(${cr},${cg},${cb},0.85)`;
        ctx.lineWidth = 1;
        const sz = 11;
        ctx.beginPath();
        ctx.moveTo(cursor.x - sz, cursor.y);
        ctx.lineTo(cursor.x - 3, cursor.y);
        ctx.moveTo(cursor.x + 3, cursor.y);
        ctx.lineTo(cursor.x + sz, cursor.y);
        ctx.moveTo(cursor.x, cursor.y - sz);
        ctx.lineTo(cursor.x, cursor.y - 3);
        ctx.moveTo(cursor.x, cursor.y + 3);
        ctx.lineTo(cursor.x, cursor.y + sz);
        ctx.stroke();

        ctx.fillStyle = `rgba(${cr},${cg},${cb},0.95)`;
        ctx.beginPath();
        ctx.arc(cursor.x, cursor.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', resize);
    resize();
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%', display: 'block' }}
    />
  );
};

export default EmbeddingField;
