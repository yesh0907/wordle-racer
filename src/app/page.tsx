import Game from "./client/game";
import GameQueryClient from "./client/query-client";

export default function Home() {
  return (
    <div className="m-0 p-0">
      <main className="absolute w-full h-full top-0 left-0">
        <div className="h-full pt-10">
          <div className="flex justify-center text-4xl font-bold text-center h-[40px]">
            Wordle Racer
          </div>
          <GameQueryClient>
            <Game />
          </GameQueryClient>
        </div>
      </main>
    </div>
  );
}
