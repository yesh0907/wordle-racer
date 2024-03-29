'use client';

import { useContext, useRef, useState } from "react";
import Key from "./key";
import { GameContext } from "@/game/state";

export default function Keypad() {
    const { currGuess, grid, updateGrid, WORD_SIZE, GRID_SIZE, checkGuess } = useContext(GameContext);
    const currRow = grid[currGuess];
    const idx = useRef(0);
    const [usedLetters, setUsedLetters] = useState<string[]>([]);

    const handleKeyClick = (letter: string) => {
        if (idx.current === WORD_SIZE || currGuess === GRID_SIZE) return;
        currRow[idx.current].value = letter;
        updateGrid(currGuess, currRow);
        idx.current++;
    };

    const handleBackspace = () => {
        if (idx.current === 0) return;
        idx.current--;
        currRow[idx.current].value = "";
        updateGrid(currGuess, currRow);
    };

    const handleEnter = () => {
        if (idx.current != WORD_SIZE) return;
        const letters = grid[currGuess].map(({ value }) => value);
        const guess = letters.join('');
        if (guess.length === 0) return;
        checkGuess(guess);
        idx.current = 0;
        setUsedLetters((prev) => [...prev, ...letters]);
    };

    return (
        <div className="h-[200px] my-0 mx-[8px] select-none">
            <div className="flex w-full mt-0 mb-2 mx-auto touch-manipulation">
                {'QWERTYUIOP'.split('').map((letter) => (
                    <Key key={letter} isLast={letter === 'P'}
                        letter={letter} onClick={handleKeyClick}
                        isUsed={usedLetters.includes(letter)} />
                ))}
            </div>
            <div className="flex w-full mt-0 mb-2 mx-auto touch-manipulation">
                <div className="flex-[0.5]"></div>
                {'ASDFGHJKL'.split('').map((letter) => (
                    <Key key={letter} isLast={letter === 'L'}
                        letter={letter} onClick={handleKeyClick}
                        isUsed={usedLetters.includes(letter)} />
                ))}
                <div className="flex-[0.5] m-0 p-0 border-0" />
            </div>
            <div className="flex w-full mt-0 mb-2 mx-auto touch-manipulation">
                <button
                    type="button"
                    className="text-[12px] font-bold mr-2 my-0 ml-0 p-0 flex-[1.5]
                    h-[58px] rounded cursor-pointer select-none bg-green-500
                    flex justify-center items-center uppercase"
                    onClick={handleEnter}
                >
                    Enter
                </button>
                {'ZXCVBNM'.split('').map((letter) => (
                    <Key key={letter} isLast={false}
                        letter={letter} onClick={handleKeyClick}
                        isUsed={usedLetters.includes(letter)} />
                ))}
                <button
                    type="button"
                    className="text-[12px] font-bold m-0 p-0 flex-[1.5]
                    h-[58px] rounded cursor-pointer select-none bg-gray-500
                    flex justify-center items-center uppercase"
                    onClick={handleBackspace}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
                    </svg>
                </button>
            </div>
        </div>
    );
};