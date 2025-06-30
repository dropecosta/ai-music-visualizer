import Notes from './notes';

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <h1>Music Visualizer</h1>
      <Notes />
    </main>
  );
}
