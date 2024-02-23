'use client'

import { getGameStatus } from "@/app/actions/get-game-status";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GameStatusProps {
    gameId: string;
    playerId: string;
}

export default function GameStatus({ gameId, playerId }: GameStatusProps) {
    const router = useRouter();
    const [active, setActive] = useState(false);

    useEffect(() => {
        const updateGameStatus = async () => {
            const gameStatus = await getGameStatus(gameId);
            if (gameStatus != null) {
                setActive(gameStatus);
            } else {
                console.error(`game ${gameId} does not exist`);
                router.push('/');
            }
        }
        
        const pollingInterval = setInterval(updateGameStatus, 2000);

        return () => {
            clearInterval(pollingInterval);
        }
    }, [gameId, router]);

    useEffect(() => {
        if (active) {
            router.push(`/game/${gameId}?id=${playerId}`);
        }
    }, [active, router, playerId, gameId]);

    return (
        <div className="flex text-center text-white">
            <span className="font-semibold">Status:</span>
            &nbsp;Waiting for player to join game
        </div>
    )
}