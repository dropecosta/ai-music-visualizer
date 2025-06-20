"use client";

import { useState } from 'react';
import Canvas from './canvas';

export default function Notes() {
  const [detectedNote, setDetectedNote] = useState('C');

  const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div>
      <p>Detected note: {detectedNote}</p>
      <Canvas />
    </div>
  );
}
