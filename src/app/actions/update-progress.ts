'use server'

import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { doc, setDoc } from "firebase/firestore";

export async function updateProgress(gameId: string, playerId: string, newVal: number) {
    const ref = doc(db, "games", gameId).withConverter(GameConverter);
    await setDoc(ref, { progress: { [playerId]: newVal }}, { merge: true });
}