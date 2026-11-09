import { useEffect, useRef } from 'react';
import { useReducedMotionPref } from '../hooks/useReducedMotionPref';

interface PetalParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  flipPhase: number;
  flipSpeed: number;
  swayOffset: number;
  swaySpeed: number;
  opacity: number;
  layer: 0 | 1 | 2; // 0: fondo, 1: medio, 2: primer plano
  kind: 'petal' | 'firefly';
}

interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
}

interface FloatingPetalsCanvasProps {
  intensity?: 'subtle' | 'celebration';
}

export function FloatingPetalsCanvas({ intensity = 'subtle' }: FloatingPetalsCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const reducedMotion = useReducedMotionPref();

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const setCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    setCanvasSize();

    const isMobile = width < 768;
    const basePetals = isMobile ? 10 : 18;
    const baseFireflies = isMobile ? 14 : 26;
    const mult = intensity === 'celebration' ? 1.4 : 1;
    const petalCount = Math.round(basePetals * mult);
    const totalCount = Math.round((basePetals + baseFireflies) * mult);

    const particles: PetalParticle[] = Array.from({ length: totalCount }, (_, i) => {
      const isFirefly = i >= petalCount;
      const layer = (i % 3) as 0 | 1 | 2;
      const layerScale = layer === 0 ? 0.72 : layer === 1 ? 1 : 1.32;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: isFirefly
          ? (1.8 + Math.random() * 2.6) * layerScale
          : (6.5 + Math.random() * 6.5) * layerScale,
        speedY: isFirefly
          ? (-0.16 - Math.random() * 0.28) * layerScale
          : (0.26 + Math.random() * 0.45) * layerScale,
        speedX: (Math.random() - 0.5) * 0.28,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.014,
        flipPhase: Math.random() * Math.PI * 2,
        flipSpeed: 0.015 + Math.random() * 0.018,
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: 0.007 + Math.random() * 0.009,
        opacity: isFirefly
          ? 0.25 + Math.random() * 0.45
          : layer === 2
            ? 0.45 + Math.random() * 0.3
            : 0.26 + Math.random() * 0.28,
        layer,
        kind: isFirefly ? 'firefly' : 'petal',
      };
    });

    // Destellos dorados al mover el cursor o tocar la pantalla
    const sparkles: SparkleParticle[] = [];
    let lastPointerTime = 0;

    const spawnSparkles = (clientX: number, clientY: number) => {
      const now = performance.now();
      if (now - lastPointerTime < 38) return;
      lastPointerTime = now;
      if (sparkles.length > 36) return;

      for (let i = 0; i < 2; i++) {
        sparkles.push({
          x: clientX + (Math.random() - 0.5) * 14,
          y: clientY + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 0.7,
          vy: -0.45 - Math.random() * 0.65,
          size: 1.6 + Math.random() * 2.2,
          alpha: 0.78,
          decay: 0.014 + Math.random() * 0.01,
        });
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      spawnSparkles(e.clientX, e.clientY);
    };

    // Brisa suave reactiva al scroll
    let lastScrollY = window.scrollY;
    let scrollWind = 0;
    const onScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY;
      lastScrollY = currentY;
      scrollWind = Math.max(-2.2, Math.min(2.2, delta * 0.04));
    };

    let tick = 0;
    const render = () => {
      if (document.hidden) {
        animationId = requestAnimationFrame(render);
        return;
      }

      tick += 1;
      scrollWind *= 0.92;
      ctx.clearRect(0, 0, width, height);

      // Partículas ambientales (pétalos con giro 3D simulado y luciérnagas doradas)
      for (const p of particles) {
        const windFactor = p.layer === 2 ? 0.55 : p.layer === 1 ? 0.35 : 0.18;
        p.y += p.speedY - scrollWind * windFactor;
        p.x += p.speedX + Math.sin(tick * p.swaySpeed + p.swayOffset) * 0.42;
        p.rotation += p.rotationSpeed;
        p.flipPhase += p.flipSpeed;

        if (p.y > height + 28) {
          p.y = -24;
          p.x = Math.random() * width;
        } else if (p.y < -28) {
          p.y = height + 24;
          p.x = Math.random() * width;
        }

        if (p.x > width + 28) p.x = -24;
        if (p.x < -28) p.x = width + 24;

        ctx.save();
        ctx.translate(p.x, p.y);

        if (p.kind === 'firefly') {
          const pulse = 0.6 + 0.4 * Math.sin(tick * 0.035 + p.swayOffset);
          const alpha = p.opacity * pulse;
          const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, p.size * 2.8);
          grad.addColorStop(0, `rgba(255, 248, 200, ${alpha})`);
          grad.addColorStop(0.45, `rgba(244, 197, 66, ${alpha * 0.65})`);
          grad.addColorStop(1, 'rgba(244, 197, 66, 0)');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 2.8, 0, Math.PI * 2);
          ctx.fill();
        } else {
          const flipScaleX = 0.48 + 0.52 * Math.abs(Math.cos(p.flipPhase));
          ctx.rotate(p.rotation);
          ctx.scale(flipScaleX, 1);
          ctx.globalAlpha = p.opacity;

          const petalGrad = ctx.createLinearGradient(0, -p.size, 0, p.size);
          petalGrad.addColorStop(0, '#FFF4C2');
          petalGrad.addColorStop(0.55, '#F4C542');
          petalGrad.addColorStop(1, '#D99A22');

          ctx.fillStyle = petalGrad;
          ctx.strokeStyle = 'rgba(217, 154, 34, 0.7)';
          ctx.lineWidth = 0.65;

          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(
            p.size * 0.68,
            -p.size * 0.42,
            p.size * 0.58,
            p.size * 0.58,
            0,
            p.size
          );
          ctx.bezierCurveTo(
            -p.size * 0.58,
            p.size * 0.58,
            -p.size * 0.68,
            -p.size * 0.42,
            0,
            -p.size
          );
          ctx.fill();
          ctx.stroke();

          // Nervadura central sutil
          ctx.strokeStyle = 'rgba(255, 254, 248, 0.55)';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -p.size * 0.68);
          ctx.lineTo(0, p.size * 0.68);
          ctx.stroke();
        }

        ctx.restore();
      }

      // Renderizar estela interactiva de polen dorado
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0.02) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(sp.x, sp.y);
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = '#F4C542';
        ctx.beginPath();
        ctx.arc(0, 0, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);
    window.addEventListener('resize', setCanvasSize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [intensity, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
