export default function Home() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth(); //January is 0!
    const yyyy = today.getFullYear();
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    const todaysDateStr = monthNames[mm] + ' ' + dd + ', ' + yyyy;

    return (
        <main className="flex flex-col w-screen h-screen">
            <div className="w-full h-1/6" />
            <div className="flex flex-col mx-auto items-center flex-1 p-2 gap-14">
                <div className="flex flex-col gap-3">
                    <div className="text-center text-white text-3xl font-bold">
                        Wordle Racer
                    </div>
                    <div className="flex text-center text-white text-base font-light">
                        Race against your friends in the Wordle
                    </div>
                </div>
                <div className="flex flex-col items-center gap-3">
                    <div className="text-center text-white text-xl font-semibold">
                        Enter Game Code
                    </div>
                    <form className="flex flex-col gap-4 items-center">
                        <div className="flex gap-4 w-3/4 justify-center h-14">
                            <input
                                type="number"
                                maxLength={1}
                                className={`w-14 inline-flex justify-center items-center text-3xl\
                            text-center leading-none font-bold align-middle box-border\
                            bg-neutral-200 text-black`} />
                            <input
                                type="text"
                                className={`w-14 inline-flex justify-center items-center text-3xl\
                            text-center leading-none font-bold align-middle box-border\
                            bg-neutral-200 text-black`} />
                            <input
                                type="text"
                                className={`w-14 inline-flex justify-center items-center text-3xl\
                            text-center leading-none font-bold align-middle box-border\
                            bg-neutral-200 text-black`} />
                            <input
                                type="text"
                                className={`w-14 inline-flex justify-center items-center text-3xl\
                            text-center leading-none font-bold align-middle box-border\
                            bg-neutral-200 text-black`} />
                        </div>
                        <button 
                            className="rounded-full border border-neutral-200 px-6 py-2"
                            type="submit">
                            Join Game
                        </button>
                    </form>
                </div>
                <div className="flex flex-col gap-6">
                    <div className="bg-neutral-200 rounded-full px-6 py-2">
                        <div className="text-center text-black text-lg font-normal">
                            Start game
                        </div>
                    </div>
                    <div className="rounded-full border border-neutral-200 px-6 py-2">
                        <div className="text-center text-white text-lg font-normal">
                            How to play
                        </div>
                    </div>
                </div>
                <div className="text-center text-white text-base font-bold">
                    {todaysDateStr}
                </div>
            </div>
        </main>
    )
}