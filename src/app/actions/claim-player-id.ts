"use server";

import { doc, setDoc } from "firebase/firestore";
import { getGameData } from "./get-game-data";
import db from "@/db/config";
import { GameConverter } from "@/db/utils";

export async function claimPlayerId(gameId: string) {
  const gameData = await getGameData(gameId);
  if (!gameData || gameData.playerIds.length === 0) return null;

  const ref = doc(db, "games", gameId).withConverter(GameConverter);
  const { playerIds } = gameData;
  for (let i = 0; i < playerIds.length; i++) {
    const playerId = Object.keys(playerIds[i])[0];
    if (!playerIds[i][playerId].claimed) {
      playerIds[i][playerId].claimed = true;
      await setDoc(ref, { playerIds }, { merge: true });
      return playerId;
    }
  }
  return null;
}
