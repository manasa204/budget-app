// frontend/src/components/PieChart.js
import React, { useEffect, useRef } from 'react';

const DEFAULT_COLORS = ['#3b82f6', '#fb7185', '#60a5fa', '#a78bfa', '#fbbf24'];

function draw(canvas, data = []) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const dpr = window.devicePixelRatio || 1;
  const size = canvas.width;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0,0,size,size);
  const total = data.reduce((s, x) => s + (x.value || 0), 0);
  if (total === 0) {
    ctx.fillStyle = '#0b1220';
    ctx.fillRect(0,0,size,size);
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('No data', size/2, size/2 + 4);
    return;
  }

  let start = -Math.PI / 2;
  const cx = size/2, cy = size/2, r = (size/2) - 8;

  data.forEach((slice, idx) => {
    const angle = (slice.value / total) * (Math.PI * 2);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.fillStyle = DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    ctx.arc(cx, cy, r, start, start + angle);
    ctx.closePath();
    ctx.fill();
    start += angle;
  });

  // doughnut center
  ctx.beginPath();
  ctx.fillStyle = '#0b1220';
  ctx.arc(cx, cy, r*0.55, 0, Math.PI*2);
  ctx.fill();

  // legend
  ctx.font = '12px sans-serif';
  ctx.textAlign = 'left';
  let ly = 10;
  data.forEach((slice, idx) => {
    const color = DEFAULT_COLORS[idx % DEFAULT_COLORS.length];
    ctx.fillStyle = color;
    ctx.fillRect(size - 110, ly + 6, 12, 12);
    ctx.fillStyle = '#cbd5e1';
    const pct = total ? ((slice.value / total) * 100).toFixed(0) + '%' : '0%';
    ctx.fillText(`${slice.label} (${pct})`, size - 92, ly + 16);
    ly += 20;
  });
}

export default function PieChart({ data = [], size = 200 }) {
  const ref = useRef();
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    draw(canvas, data);
  }, [data, size]);

  return (
    <div className="card" style={{display:'inline-block'}}>
      <canvas ref={ref} />
    </div>
  );
}
