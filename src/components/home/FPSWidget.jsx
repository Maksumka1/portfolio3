import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, ChevronDown } from 'lucide-react';

// FPS/perf data per [game][tier]
const BENCHMARKS = {
  'Cyberpunk 2077': { base: 52, popular: 95, premium: 148, ultimate: 195, unit: 'FPS', preset: '4K Ultra RT' },
  'CS2': { base: 280, popular: 420, premium: 580, ultimate: 720, unit: 'FPS', preset: '1080p High' },
  'GTA V': { base: 160, popular: 220, premium: 295, ultimate: 340, unit: 'FPS', preset: '4K Max' },
  'Fortnite': { base: 200, popular: 310, premium: 440, ultimate: 540, unit: 'FPS', preset: '1440p Epic' },
  'Blender Render': { base: 28, popular: 52, premium: 88, ultimate: 130, unit: 'хв.', preset: 'BMW Scene', invert: true },
  'Adobe Premiere': { base: 18, popular: 38, premium: 65, ultimate: 90, unit: 'FPS', preset: '4K Export' },
};

const GAMES = Object.keys(BENCHMARKS);

const TIER_KEYS = ['base', 'popular', 'premium', 'ultimate'];
const TIER_COLORS = {
  base: '#6b7280',
  popular: '#2D5BFF',
  premium: '#f59e0b',
  ultimate: '#ec4899',
};
const TIER_LABELS = { base: 'БАЗОВА', popular: 'ПОПУЛЯРНА', premium: 'ПРЕМІУМ', ultimate: 'ULTIMATE' };

function NeonLineChart({ values, colors, max, animated }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.04)';
    ctx.lineWidth = 1;
    for (let i = 1; i < 4; i++) {
      ctx.beginPath();
      ctx.moveTo(0, (H / 4) * i);
      ctx.lineTo(W, (H / 4) * i);
      ctx.stroke();
    }

    TIER_KEYS.forEach((key, ki) => {
      const pts = values[key];
      if (!pts) return;
      const color = colors[key];

      // Glow
      ctx.shadowColor = color;
      ctx.shadowBlur = 12;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      pts.forEach((v, i) => {
        const x = (i / (pts.length - 1)) * W;
        const y = H - (v / max) * (H - 10) - 5;
        if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Dots
      pts.forEach((v, i) => {
        const x = (i / (pts.length - 1)) * W;
        const y = H - (v / max) * (H - 10) - 5;
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    });
  }, [values, colors, max, animated]);

  return <canvas ref={canvasRef} width={320} height={90} className="w-full h-auto" />;
}

export default function FPSWidget({ tierKey = 'base' }) {
  const [game, setGame] = useState(GAMES[0]);
  const [open, setOpen] = useState(false);
  const bench = BENCHMARKS[game];

  // Build smooth animated points across 6 steps (simulate over time)
  const buildPoints = useCallback((baseVal, count = 6) => {
    return Array.from({ length: count }, (_, i) => {
      const progress = i / (count - 1);
      const jitter = (Math.sin(i * 2.1 + baseVal) * 0.08 + 1);
      return Math.round(baseVal * progress * jitter);
    });
  }, []);

  const values = {};
  let max = 0;
  TIER_KEYS.forEach(k => {
    const v = bench[k];
    values[k] = buildPoints(v);
    if (v > max) max = v;
  });

  const currentVal = bench[tierKey];

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{ background: 'linear-gradient(145deg, hsl(0 0% 6%), hsl(0 0% 4%))', border: '1px solid rgba(45,91,255,0.2)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Gamepad2 className="w-3.5 h-3.5 text-primary" />
          <span className="tech-mono text-[10px] text-primary tracking-wider">LIVE BENCHMARK</span>
        </div>
        <div className="relative">
          <button
            onClick={() => setOpen(v => !v)}
            className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors py-0.5 px-2 rounded glass-panel"
          >
            {game}
            <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.97 }}
                className="absolute right-0 top-full mt-1 z-50 w-44 rounded-lg overflow-hidden shadow-xl"
                style={{ background: 'hsl(0 0% 8%)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {GAMES.map(g => (
                  <button
                    key={g}
                    onClick={() => { setGame(g); setOpen(false); }}
                    className={`w-full text-left px-3 py-2 text-[10px] transition-colors hover:bg-primary/10 ${g === game ? 'text-primary' : 'text-muted-foreground'}`}
                  >
                    {g}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chart */}
      <div className="px-3 pt-3">
        <NeonLineChart values={values} colors={TIER_COLORS} max={max} animated={game} />
      </div>

      {/* Current value highlight */}
      <div className="px-3 pb-3 flex items-end justify-between mt-1">
        <div>
          <span className="text-[10px] text-muted-foreground">{bench.preset}</span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <motion.span
              key={`${game}-${tierKey}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-xl font-extrabold"
              style={{ color: TIER_COLORS[tierKey] }}
            >
              {currentVal}
            </motion.span>
            <span className="tech-mono text-[10px] text-muted-foreground">{bench.unit}</span>
          </div>
        </div>
        {/* Legend */}
        <div className="flex flex-col gap-0.5 items-end">
          {TIER_KEYS.map(k => (
            <div key={k} className={`flex items-center gap-1 text-[9px] transition-opacity ${k === tierKey ? 'opacity-100' : 'opacity-40'}`}>
              <div className="w-3 h-0.5 rounded-full" style={{ background: TIER_COLORS[k] }} />
              <span style={{ color: TIER_COLORS[k] }}>{TIER_LABELS[k]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}