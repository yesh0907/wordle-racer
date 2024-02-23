'use server'

import db from "@/db/config";
import { setDoc, doc } from "firebase/firestore";

export async function cleanUpGame(gameId: string) {
    // deactivate game
    const ref = doc(db, "games", gameId);
    await setDoc(ref, { active: false }, { merge: true });
}