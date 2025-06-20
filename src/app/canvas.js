"use client";

import { useState } from 'react';
import { useRef } from 'react';

export default function Canvas(note) {
    let canvasRef = useRef(null);

    const [color, setColor] = useState([0, 255, 0]);
    const canvasWidth = 800;
    const canvasHeight = 400;

    return (
        <div ref={canvasRef}></div>
    )

}