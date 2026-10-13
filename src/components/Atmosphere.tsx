"use client";
import { useEffect, useRef } from 'react';

/** Decorative canvas only. No research data or interactive controls are modified. */
export default function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const glow = glowRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let width = 0, height = 0, dpr = 1, frame = 0, animation = 0, last = 0;
    let visible = !document.hidden;
    let pointer = { x: -1000, y: -1000, active: false };
    type Star = { x: number; y: number; r: number; phase: number; speed: number };
    type Ember = { x: number; y: number; size: number; life: number; speed: number; sway: number; phase: number };
    let stars: Star[] = [];
    let embers: Ember[] = [];
    const random = (min: number, max: number) => min + Math.random() * (max - min);
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      context!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(390, Math.max(190, Math.floor(width * height / 4700)));
      stars = Array.from({ length: count }, () => ({ x: random(0, width), y: random(0, height), r: random(.55, 1.8), phase: random(0, 6.28), speed: random(.25, .8) }));
      embers = Array.from({ length: Math.min(22, Math.floor(width / 65)) }, () => makeEmber(true));
      if (reducedMotion.matches) draw(0);
    }
    function makeEmber(initial = false): Ember {
      return { x: random(width * .16, width * .94), y: initial ? random(height * .52, height + 20) : height + random(0, 35), size: random(.7, 2.1), life: random(.18, .55), speed: random(.25, .8), sway: random(5, 23), phase: random(0, 6.28) };
    }
    function draw(time: number) {
      context!.clearRect(0, 0, width, height);
      // Warm, low-opacity nebula/fire haze stays at the bottom and behind the content.
      const haze = context!.createRadialGradient(width * .79, height * 1.08, 0, width * .79, height * 1.08, Math.max(width * .68, 420));
      haze.addColorStop(0, 'rgba(214,90,49,.24)');
      haze.addColorStop(.32, 'rgba(185,65,30,.115)');
      haze.addColorStop(.68, 'rgba(80,60,65,.025)');
      haze.addColorStop(1, 'rgba(0,0,0,0)');
      context!.fillStyle = haze;
      context!.fillRect(0, 0, width, height);
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const twinkle = .58 + .31 * Math.sin(time * s.speed + s.phase);
        context!.beginPath();
        context!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        context!.fillStyle = `rgba(230,226,221,${twinkle})`;
        context!.fill();
        if (pointer.active && finePointer.matches) {
          const dist = Math.hypot(s.x - pointer.x, s.y - pointer.y);
          if (dist < 175) {
            context!.strokeStyle = `rgba(214,90,49,${(1 - dist / 175) * .33})`;
            context!.lineWidth = .8;
            context!.beginPath();
            context!.moveTo(s.x, s.y);
            context!.lineTo(pointer.x, pointer.y);
            context!.stroke();
          }
        }
        // Local constellations; limit to nearby neighbors for performance.
        for (let j = i + 1; j < Math.min(i + 22, stars.length); j++) {
          const other = stars[j];
          const dist = Math.hypot(s.x - other.x, s.y - other.y);
          if (dist < 135) {
            const proximity = pointer.active ? Math.max(0, 1 - Math.hypot((s.x + other.x) / 2 - pointer.x, (s.y + other.y) / 2 - pointer.y) / 230) : 0;
            context!.strokeStyle = `rgba(169,175,190,${.055 + (1 - dist / 135) * .105 + proximity * .18})`;
            context!.lineWidth = .65;
            context!.beginPath();
            context!.moveTo(s.x, s.y);
            context!.lineTo(other.x, other.y);
            context!.stroke();
          }
        }
      }
      // Only a few subtle drifting embers remain. No flames or smoke.
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        const progress = (height - e.y) / height;
        const x = e.x + Math.sin(time * .8 + e.phase) * e.sway;
        const alpha = Math.max(0, Math.min(1, (1 - progress) * e.life)) * .38;
        const radius = e.size * (1 + progress * .45);
        const plume = context!.createRadialGradient(x, e.y, 0, x, e.y, radius * 4);
        plume.addColorStop(0, `rgba(245,133,69,${alpha * .65})`);
        plume.addColorStop(.25, `rgba(214,90,49,${alpha * .15})`);
        plume.addColorStop(1, 'rgba(214,90,49,0)');
        context!.fillStyle = plume;
        context!.fillRect(x - radius * 4, e.y - radius * 4, radius * 8, radius * 8);
        if (!reducedMotion.matches) {
          e.y -= e.speed * 1.15;
          if (e.y < height * .27) embers[i] = makeEmber();
        }
      }
    }
    function tick(t: number) {
      if (!visible || reducedMotion.matches) return;
      // Cap to ~30 fps for low CPU/GPU overhead.
      if (t - last > 32) { last = t; frame++; draw(t / 1000); }
      animation = requestAnimationFrame(tick);
    }
    function move(event: PointerEvent) {
      if (event.pointerType === 'touch') return;
      pointer = { x: event.clientX, y: event.clientY, active: true };
      if (glow && finePointer.matches && !reducedMotion.matches) {
        glow.style.opacity = '1';
        glow.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0) translate(-50%, -50%)`;
      }
      if (reducedMotion.matches) draw(0);
    }
    function leave() { pointer.active = false; if (glow) glow.style.opacity = '0'; }
    function onVisibility() { visible = !document.hidden; cancelAnimationFrame(animation); if (visible && !reducedMotion.matches) animation = requestAnimationFrame(tick); }
    function onMotionChange() { cancelAnimationFrame(animation); if (glow) glow.style.opacity = '0'; resize(); if (!reducedMotion.matches && visible) animation = requestAnimationFrame(tick); }
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerleave', leave);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onMotionChange);
    resize();
    if (!reducedMotion.matches) animation = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animation);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerleave', leave);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onMotionChange);
    };
  }, []);
  return <div className="atmosphere" aria-hidden="true"><canvas ref={canvasRef} className="atmosphere-canvas"/><div className="cursor-ember-glow" ref={glowRef}/></div>;
}
