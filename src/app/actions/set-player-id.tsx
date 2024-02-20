import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function setPlayerId(gameId: string, playerNb: number, playerId: string): Promise<boolean> {
    const gameRef = doc(db, 'games', gameId).withConverter(GameConverter);
    const gameSnap = await getDoc(gameRef);
    if (gameSnap.exists()) {
        const game = gameSnap.data();
        if (playerNb === 1) {
            if (!game.player1) {
                await setDoc(gameRef, { player1: { id: playerId, progress: 0 } }, { merge: true });
                return true;
            }
        } else if (playerNb === 2) {
            if (!game.player2) {
                await setDoc(gameRef, { player2: { id: playerId, progress: 0 } }, { merge: true });
                return true;
            }
        }
    }
    return false;
}