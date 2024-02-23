"use server";

import { redirect } from "next/navigation";
import { createPlayerForExistingGame } from "./create-player";

export async function joinGame(formData: FormData) {
  let gameId = "";
  for (let i = 1; i < 5; i++) {
    gameId += `${formData.get(`val${i}`)}`;
  }
  if (gameId.length > 4) redirect('/');

  const playerId = await createPlayerForExistingGame(gameId);
  if (playerId) {
    redirect(`/game/${gameId}?id=${playerId}`);
  } else {
    redirect('/');
  }
}
