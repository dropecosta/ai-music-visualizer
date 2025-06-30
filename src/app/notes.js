"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import pitchDetection from './utils/pitchDetection';

// Dynamically import Canvas on client only
const Canvas = dynamic(() => import('./canvas'), { ssr: false });

let audioContext;
let stream;
let pitch;

export default function Notes() {
  const [detectedNote, setDetectedNote] = useState('C');

  useEffect(() => {
    const setup = async () => {
      try {
        audioContext = newAudioContext();
        stream = await navigator.mediaDevices.getUserMedia({ 
          audio: true,
          video: false
        });
        startPitch(stream, audioContext);
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };
    setup();
  }, []);

  const startPitch = (stream, audioContext) => {
    // this uses audio context to detect the audio stream from the model
    startAudioContext();
    if(audioContext) {
      pitch = new pitchDetection(
        '/model', 
        audioContext, 
        stream, 
        modelLoaded
      );
    } else {
      console.error('AudioContext not available. Please allow microphone access.');
    }
  };

  const modelLoaded = () => {
    getPitch();
  };

  const getPitch = () => {
    // get the pitch from the html5 audio stream
    pitch.getPitch((err, frequency) => {
      if (err) {
        console.error('Error getting pitch:', err);
        return;
      }
      if (frequency) {
        console.log('Detected frequency:', frequency);
        const midiNote = freqToMidi(frequency);
        const note = scale[midiNote % 12];
        console.log('Detected note:', note);
        // Update the detected note state
        setDetectedNote(note);
      } else {
        setDetectedNote('C'); // Default to C if no frequency detected
      }
      getPitch(); // Call again to keep detecting
    });
  };


  const scale = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  return (
    <div>
      <p>Detected note: {detectedNote}</p>
      <Canvas note={detectedNote} />
    </div>
  );
}

// ---------------------------- HELPER FUNCTIONS ----------------------------
/*  
 name: newAudioContext
input: none
 desc: creates a new AudioContext
*/
function newAudioContext() {
  return new (window.AudioContext ||
    window.webkitAudioContext ||
    window.mozAudioContext ||
    window.oAudioContext ||
    window.msAudioContext)();
}

/*  
 name: startAudioContext
input: none
 desc: provides user to allow for audio input on the web
*/
function startAudioContext() {
  if (audioContext) {
    // if the AudioContext is already created, resume it
    audioContext.resume();
  } else {
    // create and start the AudioContext from browser
    audioContext = newAudioContext();
  }
}

/*  
 name: freqToMidi
input: f (frequency)
 desc: converts frequency input from audio to a MIDI number
*/
function freqToMidi(f) {
  const mathlog2 = Math.log(f / 440) / Math.log(2);
  const m = Math.round(12 * mathlog2) + 69;
  return m;
}
