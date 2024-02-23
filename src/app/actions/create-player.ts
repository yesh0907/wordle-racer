"use server";

import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { doc, setDoc } from "firebase/firestore";
import { getGameData } from "./get-game-data";
import { genPlayerId } from "./utils";

// Used only when player joins the game
export async function createPlayerForExistingGame(gameId: string) {
  const gameData = await getGameData(gameId);
  if (!gameData || gameData.playerIds.length === 0) return null;

  const ref = doc(db, "games", gameId).withConverter(GameConverter);
  const { playerIds, progress } = gameData;
  const playerId = genPlayerId();
  playerIds.push({ [playerId]: { claimed: true } });
  progress[playerId] = 0;
  await setDoc(ref, { playerIds, progress, active: true }, { merge: true });
  return playerId;
}
