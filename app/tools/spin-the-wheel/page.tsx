'use client'

import React, { useState, useRef, useEffect } from 'react'
import { generateContrastingColors, easeInOutQuad, fitText } from './utils'
import { Modal } from './components/Modal'
type AnimationFrameHandle = number
const WHEEL_SIZE = 700;
const CENTER_X = WHEEL_SIZE / 2;
const CENTER_Y = WHEEL_SIZE / 2;
const OUTER_RADIUS = WHEEL_SIZE / 2 - 10;

export default function SpinTheWheel() {
  const [segments, setSegments] = useState<string[]>([
    'Phở', 'Bánh mì', 'Bún chả', 'Gỏi cuốn', 'Bún bò Huế', 'Bánh xèo', 'Cơm tấm', 'Miến lươn',
    'Bánh cuốn', 'Chả cá Lã Vọng', 'Nem rán (Chả giò)', 'Bánh khot', 'Hủ tiếu', 'Bún riêu',
    'Lẩu Thái', 'Mì Quảng', 'Bánh bột lọc', 'Cánh gà chiên nước mắm', 'Sườn xào chua ngọt'
  ]);
  const [eliminateMode, setEliminateMode] = useState(false);
  const [spinDuration, setSpinDuration] = useState(5000);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSegment, setNewSegment] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const spinTimeoutRef = useRef<AnimationFrameHandle | null>(null);
  const spinStartSoundRef = useRef<HTMLAudioElement | null>(null);
  const resultSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only create audio elements if they don't exist
    if (!spinStartSoundRef.current) {
      spinStartSoundRef.current = typeof Audio !== 'undefined' ? new Audio() : null;
      if (spinStartSoundRef.current) {
        spinStartSoundRef.current.src = '/static/assets/sound/spin-the-wheel-start.mp3';
        spinStartSoundRef.current.loop = true;
      }
    }
    
    if (!resultSoundRef.current) {
      resultSoundRef.current = typeof Audio !== 'undefined' ? new Audio() : null;
      if (resultSoundRef.current) {
        resultSoundRef.current.src = '/static/assets/sound/spin-the-wheel-end.mp3';
      }
    }

    drawWheel();

    return () => {
      if (spinStartSoundRef.current) {
        spinStartSoundRef.current.pause();
        spinStartSoundRef.current = null;
      }
      if (resultSoundRef.current) {
        resultSoundRef.current.pause();
        resultSoundRef.current = null;
      }
    }
  }, []);

  useEffect(() => {
    drawWheel();
  }, [segments]);

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, WHEEL_SIZE, WHEEL_SIZE);
    
    const colors = generateContrastingColors(segments.length);
    const arc = 2 * Math.PI / segments.length;

    // Draw segments
    for (let i = 0; i < segments.length; i++) {
      const angle = i * arc;
      ctx.beginPath();
      ctx.arc(CENTER_X, CENTER_Y, OUTER_RADIUS, angle, angle + arc);
      ctx.lineTo(CENTER_X, CENTER_Y);
      ctx.fillStyle = colors[i];
      ctx.fill();
      ctx.stroke();

      // Draw text
      ctx.save();
      ctx.translate(CENTER_X, CENTER_Y);
      ctx.rotate(angle + arc / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = 'white';
      ctx.font = 'bold 18px Arial';
      const text = fitText(ctx, segments[i], OUTER_RADIUS - 20, 18);
      ctx.fillText(text, OUTER_RADIUS - 10, 0);
      ctx.restore();
    }

    // Draw center circle (white background)
    ctx.beginPath();
    ctx.arc(CENTER_X, CENTER_Y, 40, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw "SPIN" text
    ctx.fillStyle = 'black';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SPIN', CENTER_X, CENTER_Y);
  }

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResult(null);
    
    if (spinStartSoundRef.current) {
      spinStartSoundRef.current.play().catch(() => {
        // Silently handle audio play failure
      });
    }

    let startAngle = 0;
    const spinAngleStart = Math.random() * 10 + 10;
    let spinTime = 0;
    const spinTimeTotal = spinDuration;

    const rotateWheel = () => {
      spinTime += 30;
      if (spinTime >= spinTimeTotal) {
        stopRotateWheel();
        return;
      }
      const spinAngle = spinAngleStart - easeInOutQuad(spinTime, 0, spinAngleStart, spinTimeTotal);
      startAngle += spinAngle * Math.PI / 180;
      drawRotatedWheel(startAngle);
      spinTimeoutRef.current = requestAnimationFrame(rotateWheel);
    }

    const stopRotateWheel = () => {
      if (spinStartSoundRef.current) {
        spinStartSoundRef.current.pause();
        spinStartSoundRef.current.currentTime = 0;
      }
      if (spinTimeoutRef.current !== null) {
        cancelAnimationFrame(spinTimeoutRef.current);
      }

      const degrees = startAngle * 180 / Math.PI + 90;
      const arcd = 360 / segments.length;
      const index = Math.floor((360 - degrees % 360) / arcd);
      const result = segments[index];

      setResult(result);
      setIsSpinning(false);
      setIsModalOpen(true);

      if (resultSoundRef.current) {
        resultSoundRef.current.play().catch(() => {
          // Silently handle audio play failure
        });
      }

      if (eliminateMode) {
        setSegments(prev => prev.filter((_, i) => i !== index));
      }
    }

    const drawRotatedWheel = (angle: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.translate(CENTER_X, CENTER_Y);
      ctx.rotate(angle);
      ctx.translate(-CENTER_X, -CENTER_Y);
      drawWheel();
      ctx.restore();
    }

    rotateWheel();
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">Picker Wheel</h1>
          <p className="text-gray-600">Help you to make a random decision</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative">
            <canvas
              ref={canvasRef}
              width={WHEEL_SIZE}
              height={WHEEL_SIZE}
              className="mx-auto cursor-pointer w-full"
              onClick={spinWheel}
            />
          </div>

          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">INPUTS</h2>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                  </button>
                  <button onClick={() => setSegments([])} className="p-2 hover:bg-gray-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/></svg>
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="eliminateMode"
                  checked={eliminateMode}
                  onChange={(e) => setEliminateMode(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <label
                  htmlFor="eliminateMode"
                  className="text-sm font-medium text-gray-700"
                >
                  Eliminate last result after spin
                </label>
              </div>
              <div className="flex space-x-2 mb-4">
                <input
                  type="text"
                  value={newSegment}
                  onChange={(e) => setNewSegment(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && newSegment.trim() !== '') {
                      setSegments([...segments, newSegment.trim()]);
                      setNewSegment('');
                    }
                  }}
                  placeholder="Enter a new item"
                  className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={() => {
                    if (newSegment.trim() !== '') {
                      setSegments([...segments, newSegment.trim()]);
                      setNewSegment('');
                    }
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add
                </button>
              </div>
              <div className="mt-4 space-y-2">
                {segments.map((segment, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded-md">
                    <span>{segment}</span>
                    <button
                      onClick={() => setSegments(segments.filter((_, i) => i !== index))}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
              <h2 className="text-xl font-semibold">Select Duration</h2>
              <div className="grid grid-cols-3 gap-2">
                {[3000, 5000, 7000, 10000, 15000, 20000].map((duration) => (
                  <button
                    key={duration}
                    onClick={() => setSpinDuration(duration)}
                    className={`py-2 px-4 rounded ${
                      spinDuration === duration
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    }`}
                  >
                    {duration / 1000} seconds
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Result</h2>
            <p className="text-4xl font-bold text-blue-600">{result}</p>
          </div>
        </Modal>
      </div>
    </div>
  )
}

