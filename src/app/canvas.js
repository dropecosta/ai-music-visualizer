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
            const spacing = canvasWidth / 12; // 12 notes in chromatic scale
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
                    // Position ball from left to right across full canvas width
                    // Add radius offset to keep ball fully visible
                    const ballRadius = 50;
                    const ballX = xPos + ballRadius;
                    p.ellipse(ballX, canvasHeight / 2, ballRadius * 2, ballRadius * 2);
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

    useEffect(() => {
        if (note) {
            if (note === "C" || note === "E" || note === "G" || note === "B") {
                setColor([204, 66, 239]); // Purple for C major chord notes
            } else if (note === "C#" || note === "G#") {
                setColor([0, 255, 255]); // Cyan for sharp notes
            } else if (note === "D" || note === "F" || note === "A") {
                setColor([0, 0, 204]); // Blue for D minor chord notes
            } else if (note === "D#" || note === "F#" || note === "A#") {
                setColor([255, 153, 255]); // Light pink for remaining sharp notes
            } else {
                setColor([0, 255, 0]); // Default green
            }
        }
    }, [note]);

    return (
        <div ref={canvasRef}></div>
    );
}