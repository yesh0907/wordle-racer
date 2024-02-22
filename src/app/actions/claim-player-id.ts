"use server";

import { doc, setDoc } from "firebase/firestore";
import { getGameData } from "./get-game-data";
import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { genPlayerId } from "./utils";

export async function claimPlayerId(gameId: string, isJoining?: boolean) {
  const gameData = await getGameData(gameId);
  if (!gameData || gameData.playerIds.length === 0) return null;

  const ref = doc(db, "games", gameId).withConverter(GameConverter);
  const { playerIds } = gameData;
  let playerId: string | null = null;
  if (isJoining) {
    playerId = genPlayerId();
    playerIds.push({ [playerId]: { claimed: false }});
  } else {
    for (let i = 0; i < playerIds.length; i++) {
      playerId = Object.keys(playerIds[i])[0];
      if (!playerIds[i][playerId].claimed) {
        playerIds[i][playerId].claimed = true;
        break;
      }
    }
  }
  setDoc(ref, { ...gameData, playerIds }, { merge: true });
  return playerId;
}
