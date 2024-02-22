"use server";

import { redirect } from "next/navigation";
import { claimPlayerId } from "./claim-player-id";

export async function joinGame(formData: FormData) {
  let gameId = "";
  for (let i = 1; i < 5; i++) {
    gameId += `${formData.get(`val${i}`)}`;
  }
  if (gameId.length > 4) redirect('/');

  const playerId = await claimPlayerId(gameId, true);
  if (playerId) {
    redirect(`/game/${gameId}?id=${playerId}`);
  } else {
    redirect('/');
  }
}
