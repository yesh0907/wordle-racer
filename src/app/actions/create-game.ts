'use server'

import db from "@/db/config";
import { GameConverter, IGame } from "@/db/utils";
import { WORD_SIZE } from "@/game/constants";
import { doc, setDoc } from "firebase/firestore";
import { redirect } from "next/navigation";
import { genGameId, genPlayerId } from "./utils";

async function getWord() {
    try {
        const res = await fetch(
            `https://random-word-api.herokuapp.com/word?length=${WORD_SIZE}`,
            {
                mode: "cors",
            }
        );
        if (res.ok) {
            const data: string[] = await res.json();
            const word = (data[0] ?? "").toUpperCase();
            return word;
        }
    } catch (e) {
        console.error(`fetch word: ${e}`);
    }
    return "";
}

export async function createGame() {
    const gameId = genGameId();
    const playerId = genPlayerId();

    const ref = doc(db, "games", gameId).withConverter(GameConverter);
    const gameData: IGame = {
        word: await getWord(),
        progress: {
            [playerId]: 0,
        },
        playerIds: [
            {[playerId]: { claimed: false }}
        ]
    };
    await setDoc(ref, gameData);

    redirect(`/invite/${gameId}`);
}