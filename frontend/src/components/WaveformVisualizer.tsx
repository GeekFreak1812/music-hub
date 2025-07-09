
import React, { useEffect, useRef } from 'react';

const WaveformVisualizer = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();

    let animationId: number;
    let time = 0;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      // Create gradient
      const gradient = ctx.createLinearGradient(0, 0, width, 0);
      gradient.addColorStop(0, 'rgba(6, 182, 212, 0.8)');
      gradient.addColorStop(0.5, 'rgba(147, 51, 234, 0.8)');
      gradient.addColorStop(1, 'rgba(6, 182, 212, 0.8)');
      
      ctx.fillStyle = gradient;
      
      // Draw waveform
      const bars = 50;
      const barWidth = width / bars;
      
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.sin((i + time) * 0.3) * 20 + Math.sin((i + time) * 0.1) * 30 + 40;
        const x = i * barWidth;
        const y = (height - barHeight) / 2;
        
        ctx.fillRect(x, y, barWidth - 2, barHeight);
      }
      
      time += 0.1;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-24 rounded-lg opacity-60"
      style={{ background: 'transparent' }}
    />
  );
};

export default WaveformVisualizer;
