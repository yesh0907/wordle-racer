import db from "@/db/config";
import { GameConverter } from "@/db/utils";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Game from "../client/game";
import { WORD_SIZE } from "@/game/constants";

async function getWord(gameId: string) {
  // check if game ID exists in DB
  try {
    const docRef = doc(db, "games", gameId).withConverter(GameConverter);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // set word
      const { word } = docSnap.data();
      console.log(`got word from db for game ${gameId}: ${word}`);
      return word;
    }
  } catch (e) {
    console.error(`get data from db error - ${e}`);
  }

  // did not get word from db, generate word and store in db 
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
      // add to db
      const ref = doc(db, "games", gameId).withConverter(GameConverter);
      await setDoc(ref, { word });
      console.log(`got word for game ${gameId}: ${word}`);
      return word;
    }
  } catch (e) {
    console.error(`fetch word: ${e}`);
  }
  return "";
}

/*
todo:
- create game page (
    make server action to gen playerId and gameId,
    set word, wordLength, and progress for known playerId in db,
    return playerId and share invite UI
  )
- join room functionality (getWord, generate playerID and set progress for player in db)
- sub to progress from firebase and update state according to progress (check when opp wins)
- refine game over screen based on Yael's design
*/

export default async function GamePage({ params }: { params: { id: string } }) {
  const gameId = params.id;
  const word = await getWord(gameId);
  return (
    <main className="absolute w-full h-full top-0 left-0">
      <div className="h-full pt-2">
        <div className="flex justify-center text-4xl font-bold text-center h-[40px]">
          Wordle Racer
        </div>
        <Game gameId={gameId} word={word} />
      </div>
    </main>
  );
}
