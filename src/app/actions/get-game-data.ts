'use server'

import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { doc, getDoc } from "firebase/firestore";

export async function getGameData(gameId: string) {
    const ref = doc(db, "games", gameId).withConverter(GameConverter);
    const snapshot = await getDoc(ref);
    if (snapshot.exists()) {
        return snapshot.data();
    }
    return null;
}