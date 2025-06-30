# Music Visualizer

A real-time music pitch detection and visualization application built with Next.js, p5.js, and TensorFlow.js. This project captures audio input from your microphone, detects the musical note being played or sung, and visualizes it with an animated colored ball that moves across the canvas based on the detected pitch.

## Features

- **Real-time Pitch Detection**: Uses TensorFlow.js and the CREPE model for accurate pitch detection
- **Visual Feedback**: Animated ball that moves horizontally based on detected musical notes (C to B)
- **Dynamic Color Coding**: Different colors for different note groups:
  - Purple: C, E, G, B (major chord notes)
  - Cyan: C#, G# (sharp notes)
  - Blue: D, F, A (minor chord notes)
  - Light Pink: D#, F#, A# (remaining sharp notes)
- **Responsive Design**: Built with Tailwind CSS for a modern UI
- **Browser-based**: No installation required, runs entirely in the browser

## Technologies Used

- **Next.js 15.3.4** - React framework for production
- **React 19** - UI library
- **TensorFlow.js** - Machine learning for pitch detection
- **p5.js** - Creative coding library for canvas visualization
- **Tailwind CSS** - Utility-first CSS framework
- **Web Audio API** - Browser audio input handling

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- A modern web browser with microphone access
- Microphone permission for the application

### Installation

1. Clone the repository:
```bash
git clone https://github.com/dropecosta/ai-music-visualizer
cd music-project
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

5. Allow microphone access when prompted

## Usage

1. **Grant Microphone Permission**: The app will request access to your microphone
2. **Make Sound**: Sing, hum, or play an instrument near your microphone
3. **Watch the Visualization**: The colored ball will move across the canvas based on the detected note:
   - Left side: Lower notes (C, C#, D...)
   - Right side: Higher notes (...A#, B)
4. **Note Display**: The detected note name is displayed above the canvas

## Project Structure

```
music-project/
├── src/
│   └── app/
│       ├── canvas.js          # p5.js visualization component
│       ├── notes.js           # Main audio detection component
│       ├── page.js            # Home page
│       ├── layout.js          # App layout
│       ├── globals.css        # Global styles
│       └── utils/
│           └── pitchDetection.js  # TensorFlow.js pitch detection class
├── public/
│   └── model/                 # CREPE model files
│       ├── model.json
│       └── group*.shard1of1   # Model weights
├── package.json
├── next.config.mjs
├── tailwind.config.js
└── README.md
```

## How It Works

1. **Audio Capture**: The app uses the Web Audio API to capture audio from the user's microphone
2. **Pitch Detection**: The audio stream is processed by TensorFlow.js using the CREPE (Convolutional REpresentation for Pitch Estimation) model
3. **Note Conversion**: Detected frequencies are converted to MIDI note numbers and then to note names
4. **Visualization**: p5.js renders a canvas with a ball that moves horizontally based on the detected note
5. **Color Coding**: The ball changes color based on the musical note group

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **Notes Component**: Handles microphone access, audio processing, and pitch detection
- **Canvas Component**: Manages p5.js visualization with dynamic positioning and coloring
- **PitchDetection Class**: Wrapper around TensorFlow.js CREPE model for pitch detection

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Safari (with microphone permissions)
- Edge

**Note**: Requires a browser that supports the Web Audio API and getUserMedia.

## Troubleshooting

### Common Issues

1. **Microphone not working**: Ensure you've granted microphone permissions and your browser supports Web Audio API
2. **Model loading errors**: Check that the model files are properly placed in the `public/model/` directory
3. **Canvas not displaying**: Verify p5.js is loading correctly and WebGL is supported

### Performance Tips

- Use a quiet environment for better pitch detection accuracy
- Ensure good microphone quality for clearer audio input
- Close other applications using the microphone

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- [CREPE](https://github.com/marl/crepe) - Convolutional REpresentation for Pitch Estimation
- [ml5.js](https://ml5js.org/) - Inspiration for the pitch detection implementation
- [p5.js](https://p5js.org/) - Creative coding framework
- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning in JavaScript
