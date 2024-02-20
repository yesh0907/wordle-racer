'use client';

import { GameContext } from "@/game/state";
import { useContext, useEffect } from "react";
import { cleanUpGame } from "../actions/clean-up-game";

interface GameOverProps {
    didWin: boolean;
}

export default function GameOver({ didWin }: GameOverProps) {
    const { word, gameId } = useContext(GameContext);

    useEffect(() => {
        cleanUpGame(gameId);
    }, [gameId]);

    return (
        <div className="z-10 h-30 p-3 bg-slate-500 text-white text-3xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            Game Over {didWin ? '- You Win!' : `- word: ${word}`}
        </div>
    );
}