import Game from "../client/game";
import { getGameData } from "@/app/actions/get-game-data";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

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
  if (!gameData) {
    console.error(`GamePage error: game ${gameId} - game does not exist`);
    redirect('/?error=GamePage&msg=invalid-gameId');
  }
  const {word, playerIds} = gameData;

  const playerId = searchParams['id'];
  console.log('search params', searchParams);

  // playerId is undefined or string[]
  if (!playerId || Array.isArray(playerId)) {
    if (!playerId) {
      console.error(`GamePage error: game ${gameId} - player ${playerId} was undefined`);
      redirect('/?error=GamePage&msg=playerId-null');
    } else {
      console.error(`GamePage error: game ${gameId} - player ${playerId} was an array`);
      redirect('/?error=GamePage&msg=playerId-isArr')
    }
  }
  // check if playerId exists
  if (playerIds.filter((obj) => obj[playerId] != null).length !== 1) {
    console.error(`GamePage error: game ${gameId} - player ${playerId} is not a player in ${JSON.stringify(playerIds)}`);
    redirect('/?error=GamePage&msg=playerId-invalid');
  }

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
