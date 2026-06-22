import { useEffect, useRef, useState } from "react";

type Props = { src: string };

export default function BoomerangVideoBg({ src }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const framesRef = useRef<HTMLCanvasElement[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const MAX_W = 960;
    let cancelled = false;
    let lastCapture = 0;

    const capture = () => {
      if (cancelled || !video.videoWidth) return;
      const scale = Math.min(1, MAX_W / video.videoWidth);
      const w = Math.round(video.videoWidth * scale);
      const h = Math.round(video.videoHeight * scale);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      const ctx = c.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, w, h);
        framesRef.current.push(c);
      }
    };

    const onFrame = () => {
      const now = performance.now();
      if (now - lastCapture > 30) {
        capture();
        lastCapture = now;
      }
      if (!video.ended && !cancelled) {
        // @ts-ignore
        if (video.requestVideoFrameCallback) {
          // @ts-ignore
          video.requestVideoFrameCallback(onFrame);
        } else {
          requestAnimationFrame(onFrame);
        }
      }
    };

    const onEnded = () => {
      if (cancelled || framesRef.current.length === 0) return;
      setReady(true);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const first = framesRef.current[0];
      canvas.width = first.width;
      canvas.height = first.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      let i = 0;
      let dir = 1;
      let last = performance.now();
      const FRAME_MS = 1000 / 30;

      const loop = (t: number) => {
        if (cancelled) return;
        if (t - last >= FRAME_MS) {
          last = t;
          const frames = framesRef.current;
          ctx.drawImage(frames[i], 0, 0);
          i += dir;
          if (i >= frames.length - 1) { i = frames.length - 1; dir = -1; }
          else if (i <= 0) { i = 0; dir = 1; }
        }
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    };

    const onPlay = () => {
      // @ts-ignore
      if (video.requestVideoFrameCallback) {
        // @ts-ignore
        video.requestVideoFrameCallback(onFrame);
      } else {
        requestAnimationFrame(onFrame);
      }
    };

    video.addEventListener("play", onPlay);
    video.addEventListener("ended", onEnded);
    video.play().catch(() => {});

    return () => {
      cancelled = true;
      video.removeEventListener("play", onPlay);
      video.removeEventListener("ended", onEnded);
    };
  }, [src]);

  return (
    <div className="absolute inset-0 w-full h-full scale-[1.08] origin-center">
      <video
        ref={videoRef}
        src={src}
        muted
        playsInline
        crossOrigin="anonymous"
        className={`absolute inset-0 w-full h-full object-cover ${ready ? "hidden" : "block"}`}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover ${ready ? "block" : "hidden"}`}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
