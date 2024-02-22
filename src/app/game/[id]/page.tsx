import Game from "../client/game";
import { getGameData } from "@/app/actions/get-game-data";
import { redirect } from "next/navigation";

/*
todo:
- join room functionality (getWord, generate playerID and set progress for player in db)
- sub to progress from firebase and update state according to progress (check when opp wins)
- refine game over screen based on Yael's design
*/

export default async function GamePage({
  params,
  searchParams,
}: {
  params: { id: string },
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const gameId = params.id;
  const gameData = await getGameData(gameId);

  // game does not exist
  if (!gameData) redirect('/');
  const {word, playerIds} = gameData;

  const playerId = searchParams['id'];

  // playerId is undefined or string[]
  if (!playerId || Array.isArray(playerId)) redirect('/');
  // check if playerId exists
  if (playerIds.filter((obj) => obj[playerId]).length !== 1) redirect('/');

  return (
    <main className="absolute w-full h-full top-0 left-0">
      <div className="h-full pt-2">
        <div className="flex justify-center text-4xl font-bold text-center h-[40px]">
          Wordle Racer
        </div>
        <Game gameId={gameId} word={word} playerId={playerId} />
      </div>
    </main>
  );
}
