'use client';

import { GameContext } from "@/game/state";
import { useContext, useEffect } from "react";
import { cleanUpGame } from "../../actions/clean-up-game";
import { useRouter } from "next/navigation";

interface GameOverProps {
    didWin: boolean;
}

export default function GameOver({ didWin }: GameOverProps) {
    const router = useRouter();
    const { word, gameId } = useContext(GameContext);

    useEffect(() => {
        cleanUpGame(gameId);
    }, [gameId]);

    return (
        <div className="w-full max-w-[500px] h-full backdrop-blur-sm z-10 absolute top-0">
            <div className="h-1/2 w-4/5 p-3 bg-zinc-950 text-white text-3xl relative top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
                <div className="flex flex-col w-full h-full gap-4 items-center">
                    <div className="flex self-end text-lg px-2 font-semibold">
                        {/* X */}
                    </div>
                    <div className="flex-1 w-full flex flex-col items-center gap-2 pb-4">
                        <div className={`${didWin ? 'bg-green-600 text-white' : 'bg-neutral-200 text-black'} px-3 py-1 text-xl rounded-md`}>
                            {word}
                        </div>
                        <div className="flex-1 w-full flex flex-col gap-4 justify-center items-center pb-2">
                            <div className={`${didWin ? 'text-green-500' : 'text-white'} text-3xl font-semibold`}>{didWin ? 'You Win!' : 'Game Over'}</div>
                            <div className="text-lg text-center font-light">
                                {didWin ? "Do you want to play again?" : "Ready for a rematch?"}
                            </div>
                            <button onClick={() => router.push('/')} className="rounded-full border border-neutral-200 px-3 py-2 text-lg">
                                New Game
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}