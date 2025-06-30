"use client";

import { useState, useEffect, useRef } from 'react';

export default function Canvas({ note }) {
    const canvasRef = useRef(null);
    const p5InstanceRef = useRef(null);
    const noteRef = useRef(note);
    const colorRef = useRef([0, 255, 0]);

    const [color, setColor] = useState([0, 255, 0]);
    const canvasWidth = 800;
    const canvasHeight = 400;

    // Update refs when props change
    useEffect(() => {
        noteRef.current = note;
        colorRef.current = color;
    }, [note, color]);

    // Initialize p5 only once
    useEffect(() => {
        const mapNote = (note) => {
            const spacing = canvasWidth / 13;
            const notePositions = {
                'C': 0 * spacing,
                'C#': 1 * spacing,
                'D': 2 * spacing,
                'D#': 3 * spacing,
                'E': 4 * spacing,
                'F': 5 * spacing,
                'F#': 6 * spacing,
                'G': 7 * spacing,
                'G#': 8 * spacing,
                'A': 9 * spacing,
                'A#': 10 * spacing,
                'B': 11 * spacing
            };
            return notePositions[note] || 0;
        };

        const sketch = (p) => {
            p.setup = () => {
                p.createCanvas(canvasWidth, canvasHeight);
                p.clear();
            };

            p.draw = () => {
                p.clear();
                const currentNote = noteRef.current;
                const currentColor = colorRef.current;
                
                if (currentNote) {
                    const xPos = mapNote(currentNote);
                    p.fill(currentColor);
                    p.ellipse(xPos + canvasWidth / 2, 100, 100, 100);
                }
            };
        };

        const loadP5AndCreateCanvas = async () => {
            try {
                const P5 = (await import('p5')).default;
                if (canvasRef.current && !p5InstanceRef.current) {
                    p5InstanceRef.current = new P5(sketch, canvasRef.current);
                }
            } catch (error) {
                console.error('Error loading p5:', error);
            }
        };

        loadP5AndCreateCanvas();

        // Cleanup function
        return () => {
            if (p5InstanceRef.current) {
                p5InstanceRef.current.remove();
                p5InstanceRef.current = null;
            }
        };
    }, []); // Empty dependency array - only run once

    return (
        <div ref={canvasRef}></div>
    );
}