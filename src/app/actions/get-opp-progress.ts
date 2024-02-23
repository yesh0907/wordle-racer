'use server'

import { getGameData } from "./get-game-data"

export async function getOppProgress(gameId: string, playerId: string) {
    const gameData = await getGameData(gameId);
    if (!gameData) return null;

    const { progress } = gameData;
    try {
        const oppPlayerId = Object.keys(progress).filter((id) => id !== playerId)[0];
        if (oppPlayerId) {
            return progress[oppPlayerId];
        }
    } catch (_) {
        console.error('no opponent');
    }
    return null;
}