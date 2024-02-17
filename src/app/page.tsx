import Game from "./client/game";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between gap-8 p-4">
      <div className="flex text-4xl text-bold text-center">
        Wordle Racer
      </div>
      <Game />
    </main>
  );
}
