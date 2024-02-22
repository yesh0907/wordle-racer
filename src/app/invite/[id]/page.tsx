import { claimPlayerId } from "@/app/actions/claim-player-id";
import { redirect } from "next/navigation";

export default async function InvitePage({ params }: { params: { id: string } }) {
    const gameId = params.id;
    const playerId = await claimPlayerId(gameId);
    if (!playerId) redirect('/');

    // subscribe to db's state about game's status
    const startGame = () => {
        redirect(`/game/${gameId}?id=${playerId}`);
    }

    const gameIdUI = gameId.split("").map((token, idx) => {
        return (
            <div key={idx} className={`w-14 inline-flex justify-center items-center text-3xl\
            leading-none font-bold align-middle box-border bg-neutral-200 text-black`}>
                {token}
            </div>
        )
    });

    return (
        <main className="flex flex-col w-screen h-screen">
            <div className="w-full h-1/6 pt-4 flex flex-col gap-3">
                <div className="flex w-full">
                    <div className="flex-1 text-center text-white text-3xl font-bold">
                        Wordle Racer
                    </div>
                </div>
                <div className="w-full h-px bg-slate-300" />
            </div>
            <div className="flex flex-col mx-auto items-center flex-1 p-2 gap-14">
                <div className="flex flex-col gap-3">
                    <div className="text-center text-white text-2xl font-bold">
                        Invite a Friend
                    </div>
                    <div className="flex text-center text-white text-base font-light">
                        Once your friend enters the personalized code, your game will begin
                    </div>
                </div>
                <div className="flex gap-4 w-3/4 justify-center h-14">
                    {gameIdUI}
                </div>
                {/* <div className="flex flex-col gap-3">
                    <div className="text-center text-white text-lg">
                        Share via:
                    </div>
                    <div className="bg-neutral-200 rounded-full px-3 py-1">
                        <div className="text-center text-black text-lg">
                            Copy Link
                        </div>
                    </div>
                </div> */}
            </div>
        </main>
    );
}