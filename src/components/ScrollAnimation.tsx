"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTransform, motion, useSpring } from "framer-motion";

const FRAME_COUNT = 40;

interface ScrollAnimationProps {
  progress: any;
}

export default function ScrollAnimation({ progress }: ScrollAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Smooth out the scroll progress
  const smoothProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    let loadedCount = 0;
    const loadedImages: HTMLImageElement[] = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      const frameIndex = i.toString().padStart(3, '0');
      img.src = `/images/ezgif-frame-${frameIndex}-Picsart-AiImageEnhancer.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT) {
          setImages(loadedImages);
          setIsLoading(false);
        }
      };
      loadedImages[i - 1] = img;
    }
  }, []);

  // Sync index to progress
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);

  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const context = canvas?.getContext("2d");
      if (!canvas || !context || images.length < FRAME_COUNT) return;

      const index = Math.floor(frameIndex.get());
      const image = images[index];
      if (!image) return;

      const { width, height } = canvas;
      context.clearRect(0, 0, width, height);

      // Center and cover
      const scale = Math.max(width / image.width, height / image.height);
      const x = (width - image.width * scale) / 2;
      const y = (height - image.height * scale) / 2;
      context.drawImage(image, x, y, image.width * scale, image.height * scale);
    };

    const unsubscribe = frameIndex.on("change", render);
    
    // Initial render
    if (!isLoading) {
      render();
    }

    // Handle resize
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render();
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [images, isLoading, frameIndex]);

  return (
    <div className="absolute inset-0">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-black">
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full mb-4"
          />
          <p className="text-white/60 font-medium tracking-widest uppercase text-xs">Loading Experience...</p>
        </div>
      )}
      
      <canvas
        ref={canvasRef}
        className="h-full w-full object-cover grayscale brightness-75 transition-all duration-700 hover:grayscale-0"
      />
    </div>
  );
}
