import React, { useEffect, useRef } from 'react';

/**
 * Animated neural-network background for the hero page.
 *
 * Renders a 4-layer MLP (10 → 14 → 12 → 10) that continuously cycles a
 * forward pass (cyan pulses) followed by a backward pass (amber gradients),
 * mimicking what you'd see in a classic MNIST-style classification demo.
 */
const NeuralNetworkBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // Architecture: input → h1 → h2 → output.
    const LAYERS = [10, 14, 12, 10];
    const X_RATIOS = [0.14, 0.38, 0.62, 0.86];
    const VERT_SPAN_RATIO = 0.62;
    const MAX_SPACING = 48;
    const MIN_SPACING = 18;

    const COLOR_FWD = [100, 200, 255];
    const COLOR_BWD = [255, 170, 80];
    const COLOR_BASE = [120, 160, 220];

    // Phase timing drives the state machine below. One full cycle runs
    // idle → f0..f2 → predict → pause → b0..b2 → rest → loop.
    const PHASES = [
      { name: 'idle', duration: 320 },
      { name: 'f0', duration: 680, fromL: 0, toL: 1, dir: 'fwd' },
      { name: 'f1', duration: 680, fromL: 1, toL: 2, dir: 'fwd' },
      { name: 'f2', duration: 680, fromL: 2, toL: 3, dir: 'fwd' },
      { name: 'predict', duration: 620 },
      { name: 'pause', duration: 260 },
      { name: 'b0', duration: 580, fromL: 3, toL: 2, dir: 'bwd' },
      { name: 'b1', duration: 580, fromL: 2, toL: 1, dir: 'bwd' },
      { name: 'b2', duration: 580, fromL: 1, toL: 0, dir: 'bwd' },
      { name: 'rest', duration: 520 },
    ];

    let phaseIdx = 0;
    let phaseStart = performance.now();

    const activations = LAYERS.map((n) => new Array(n).fill(0));
    const gradients = LAYERS.map((n) => new Array(n).fill(0));
    let winner = 0;

    // weights[L][i][j] ∈ [0,1]: layer L node i → layer L+1 node j.
    const weights = [];
    for (let L = 0; L < LAYERS.length - 1; L++) {
      const mat = [];
      for (let i = 0; i < LAYERS[L]; i++) {
        const row = [];
        for (let j = 0; j < LAYERS[L + 1]; j++) row.push(Math.random());
        mat.push(row);
      }
      weights.push(mat);
    }

    const sigmoid = (x) => 1 / (1 + Math.exp(-x));

    const sampleInput = () => {
      for (let i = 0; i < LAYERS[0]; i++) {
        activations[0][i] = 0.25 + Math.random() * 0.75;
      }
    };

    const runForward = () => {
      for (let L = 1; L < LAYERS.length; L++) {
        for (let j = 0; j < LAYERS[L]; j++) {
          let sum = 0;
          for (let i = 0; i < LAYERS[L - 1]; i++) {
            sum += activations[L - 1][i] * (weights[L - 1][i][j] - 0.5);
          }
          activations[L][j] = sigmoid(sum * 1.4);
        }
      }
      // Simulate a softmax winner: dominant node, rest dimmer.
      winner = Math.floor(Math.random() * LAYERS[LAYERS.length - 1]);
      const out = activations[activations.length - 1];
      for (let i = 0; i < out.length; i++) {
        out[i] = i === winner
          ? 0.92 + Math.random() * 0.08
          : 0.12 + Math.random() * 0.35;
      }
    };

    const runBackward = () => {
      const lastIdx = LAYERS.length - 1;
      for (let i = 0; i < LAYERS[lastIdx]; i++) {
        gradients[lastIdx][i] = i === winner
          ? 1
          : 0.12 + Math.random() * 0.2;
      }
      for (let L = LAYERS.length - 2; L >= 0; L--) {
        for (let i = 0; i < LAYERS[L]; i++) {
          let sum = 0;
          for (let j = 0; j < LAYERS[L + 1]; j++) {
            sum += gradients[L + 1][j] * weights[L][i][j];
          }
          gradients[L][i] = Math.min(
            1,
            (sum / LAYERS[L + 1]) * 1.8 + Math.random() * 0.08
          );
        }
      }
    };

    sampleInput();
    runForward();
    if (prefersReducedMotion) runBackward();

    let layerNodes = [];
    let viewportW = 0;
    let viewportH = 0;

    const layoutNodes = (w, h) => {
      const cy = h / 2;
      const spanH = h * VERT_SPAN_RATIO;
      return LAYERS.map((count, L) => {
        const x = w * X_RATIOS[L];
        const spacing = Math.max(
          MIN_SPACING,
          Math.min(MAX_SPACING, spanH / Math.max(count - 1, 1))
        );
        const totalH = spacing * (count - 1);
        const top = cy - totalH / 2;
        const nodes = [];
        for (let i = 0; i < count; i++) nodes.push({ x, y: top + i * spacing });
        return nodes;
      });
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      viewportW = window.innerWidth;
      viewportH = window.innerHeight;
      canvas.width = Math.floor(viewportW * dpr);
      canvas.height = Math.floor(viewportH * dpr);
      canvas.style.width = `${viewportW}px`;
      canvas.style.height = `${viewportH}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      layerNodes = layoutNodes(viewportW, viewportH);
    };

    const easeInOut = (t) =>
      t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    // How "lit" a layer should be for forward vs. backward state, per phase.
    // Returns 0..1 — multiplied by per-node activation/gradient magnitude.
    const fwdLayerLevel = (L, name, eT) => {
      if (name === 'idle') return 0;
      if (name === 'f0') return L === 0 ? 1 : L === 1 ? eT : 0;
      if (name === 'f1') return L <= 1 ? 1 : L === 2 ? eT : 0;
      if (name === 'f2') return L <= 2 ? 1 : L === 3 ? eT : 0;
      if (name === 'predict' || name === 'pause') return 1;
      if (name === 'b0') return Math.max(0, 1 - eT * 0.15);
      if (name === 'b1') return Math.max(0, 0.85 - eT * 0.2);
      if (name === 'b2') return Math.max(0, 0.65 - eT * 0.3);
      if (name === 'rest') return Math.max(0, 0.35 * (1 - eT));
      return 0;
    };
    const bwdLayerLevel = (L, name, eT) => {
      if (name === 'b0') return L === 3 ? 1 : L === 2 ? eT : 0;
      if (name === 'b1') return L >= 2 ? 1 : L === 1 ? eT : 0;
      if (name === 'b2') return L >= 1 ? 1 : L === 0 ? eT : 0;
      if (name === 'rest') return Math.max(0, 1 - eT);
      return 0;
    };

    // Reduced-motion path: draw a static, softly-lit snapshot of the network
    // (forward pass resolved, winner highlighted). No animation.
    const drawStatic = () => {
      ctx.clearRect(0, 0, viewportW, viewportH);
      ctx.lineWidth = 0.8;
      for (let L = 0; L < LAYERS.length - 1; L++) {
        const src = layerNodes[L];
        const tgt = layerNodes[L + 1];
        for (let i = 0; i < src.length; i++) {
          for (let j = 0; j < tgt.length; j++) {
            const w = weights[L][i][j];
            ctx.strokeStyle = `rgba(${COLOR_BASE[0]},${COLOR_BASE[1]},${COLOR_BASE[2]},${0.05 + w * 0.12})`;
            ctx.beginPath();
            ctx.moveTo(src[i].x, src[i].y);
            ctx.lineTo(tgt[j].x, tgt[j].y);
            ctx.stroke();
          }
        }
      }
      for (let L = 0; L < LAYERS.length; L++) {
        const nodes = layerNodes[L];
        for (let i = 0; i < nodes.length; i++) {
          const { x, y } = nodes[i];
          const a = activations[L][i];
          const isWinner = L === LAYERS.length - 1 && i === winner;
          const r = 2.6 + a * 2 + (isWinner ? 1.5 : 0);
          ctx.fillStyle = `rgba(${COLOR_FWD[0]},${COLOR_FWD[1]},${COLOR_FWD[2]},${0.3 + a * 0.5})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(255,255,255,${0.15 + a * 0.3})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    };

    const renderFrame = (now) => {
      let elapsed = now - phaseStart;
      // Catch up if tab was backgrounded, fast-forwarding through phases.
      let guard = 32;
      while (elapsed >= PHASES[phaseIdx].duration && guard-- > 0) {
        phaseStart += PHASES[phaseIdx].duration;
        phaseIdx = (phaseIdx + 1) % PHASES.length;
        elapsed = now - phaseStart;
        const entering = PHASES[phaseIdx].name;
        if (entering === 'f0') {
          sampleInput();
          runForward();
        } else if (entering === 'b0') {
          runBackward();
        }
      }
      const phase = PHASES[phaseIdx];
      const t = Math.min(1, elapsed / phase.duration);
      const eT = easeInOut(t);

      ctx.clearRect(0, 0, viewportW, viewportH);

      // Dim baseline edge web — weight-modulated so the graph structure
      // is always subtly visible even during idle.
      ctx.lineWidth = 0.8;
      for (let L = 0; L < LAYERS.length - 1; L++) {
        const src = layerNodes[L];
        const tgt = layerNodes[L + 1];
        for (let i = 0; i < src.length; i++) {
          for (let j = 0; j < tgt.length; j++) {
            const w = weights[L][i][j];
            ctx.strokeStyle = `rgba(${COLOR_BASE[0]},${COLOR_BASE[1]},${COLOR_BASE[2]},${0.03 + w * 0.055})`;
            ctx.beginPath();
            ctx.moveTo(src[i].x, src[i].y);
            ctx.lineTo(tgt[j].x, tgt[j].y);
            ctx.stroke();
          }
        }
      }

      // Active edge pulses — a bright segment travels the edge over the
      // course of the phase. Drawn as wide-faint + narrow-bright for a
      // cheap additive-glow effect (cheaper than shadowBlur per edge).
      if (phase.dir) {
        const [r, g, b] = phase.dir === 'fwd' ? COLOR_FWD : COLOR_BWD;
        const srcL = phase.fromL;
        const tgtL = phase.toL;
        const srcNodes = layerNodes[srcL];
        const tgtNodes = layerNodes[tgtL];
        const weightLayer = Math.min(srcL, tgtL);
        const mags = phase.dir === 'fwd' ? activations[srcL] : gradients[srcL];
        const pulseLen = 0.2;
        ctx.lineCap = 'round';
        for (let i = 0; i < srcNodes.length; i++) {
          const srcMag = mags[i];
          for (let j = 0; j < tgtNodes.length; j++) {
            const w =
              phase.dir === 'fwd'
                ? weights[weightLayer][i][j]
                : weights[weightLayer][j][i];
            const brightness = srcMag * (0.3 + 0.7 * w);
            if (brightness < 0.1) continue;
            const sx = srcNodes[i].x;
            const sy = srcNodes[i].y;
            const tx = tgtNodes[j].x;
            const ty = tgtNodes[j].y;
            const p1 = Math.min(1, eT);
            const p0 = Math.max(0, p1 - pulseLen);
            const ax = sx + (tx - sx) * p0;
            const ay = sy + (ty - sy) * p0;
            const bx = sx + (tx - sx) * p1;
            const by = sy + (ty - sy) * p1;

            ctx.lineWidth = 4;
            ctx.strokeStyle = `rgba(${r},${g},${b},${brightness * 0.22})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();

            ctx.lineWidth = 1.4;
            ctx.strokeStyle = `rgba(${r},${g},${b},${Math.min(1, brightness * 0.95)})`;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.stroke();

            // Leading "signal" dot makes edges feel like data packets
            // rather than static strokes.
            if (brightness > 0.25) {
              ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, brightness * 1.1)})`;
              ctx.beginPath();
              ctx.arc(bx, by, 1.6, 0, Math.PI * 2);
              ctx.fill();
            }
          }
        }
      }

      // Nodes: halo + core + outline. Color blends between forward-cyan
      // and backward-amber based on which signal is stronger right now.
      for (let L = 0; L < LAYERS.length; L++) {
        const nodes = layerNodes[L];
        const fLevel = fwdLayerLevel(L, phase.name, eT);
        const bLevel = bwdLayerLevel(L, phase.name, eT);
        for (let i = 0; i < nodes.length; i++) {
          const { x, y } = nodes[i];
          const fVal = activations[L][i] * fLevel;
          const bVal = gradients[L][i] * bLevel;
          const total = Math.max(fVal, bVal);
          const denom = fVal + bVal + 1e-4;
          const bMix = bVal / denom;
          const cr = Math.round(COLOR_FWD[0] * (1 - bMix) + COLOR_BWD[0] * bMix);
          const cg = Math.round(COLOR_FWD[1] * (1 - bMix) + COLOR_BWD[1] * bMix);
          const cb = Math.round(COLOR_FWD[2] * (1 - bMix) + COLOR_BWD[2] * bMix);

          const isWinner = L === LAYERS.length - 1 && i === winner;
          let winnerBoost = 0;
          if (isWinner && phase.name === 'predict') {
            winnerBoost = 0.55 + 0.45 * Math.sin(eT * Math.PI);
          }

          const coreR = 2.4 + total * 2.4 + winnerBoost * 2;
          const haloR = coreR + 8 + total * 18 + winnerBoost * 14;

          if (total > 0.08 || winnerBoost > 0) {
            const grad = ctx.createRadialGradient(
              x,
              y,
              coreR * 0.2,
              x,
              y,
              haloR
            );
            grad.addColorStop(
              0,
              `rgba(${cr},${cg},${cb},${Math.min(0.85, total * 0.55 + winnerBoost * 0.45)})`
            );
            grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
            ctx.fillStyle = grad;
            ctx.beginPath();
            ctx.arc(x, y, haloR, 0, Math.PI * 2);
            ctx.fill();
          }

          const coreAlpha = Math.min(
            1,
            0.28 + total * 0.6 + winnerBoost * 0.25
          );
          ctx.fillStyle = `rgba(${cr},${cg},${cb},${coreAlpha})`;
          ctx.beginPath();
          ctx.arc(x, y, coreR, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = `rgba(255,255,255,${0.14 + total * 0.32 + winnerBoost * 0.2})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      // Prediction flourish: an expanding ring radiating from the winner
      // at the end of the forward pass — reads as "this is the answer."
      if (phase.name === 'predict') {
        const n = layerNodes[LAYERS.length - 1][winner];
        const ringR = 8 + eT * 38;
        const ringAlpha = (1 - eT) * 0.65;
        ctx.strokeStyle = `rgba(${COLOR_FWD[0]},${COLOR_FWD[1]},${COLOR_FWD[2]},${ringAlpha})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(n.x, n.y, ringR, 0, Math.PI * 2);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(renderFrame);
    };

    window.addEventListener('resize', resize);
    resize();

    if (prefersReducedMotion) {
      drawStatic();
    } else {
      animationFrameId = requestAnimationFrame(renderFrame);
    }

    return () => {
      window.removeEventListener('resize', resize);
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

export default NeuralNetworkBackground;
