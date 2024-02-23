'use server'

import { getGameData } from "./get-game-data"

export async function getGameStatus(gameId: string) {
    const gameData = await getGameData(gameId);
    if (!gameData) {
        return null;
    }
    return gameData.active;
}