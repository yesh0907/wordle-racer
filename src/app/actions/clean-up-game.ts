'use server'

import db from "@/db/config";
import { deleteDoc, doc } from "firebase/firestore";

export async function cleanUpGame(gameId: string) {
    // delete word
    const docRef = doc(db, "games", gameId);
    await deleteDoc(docRef);
}