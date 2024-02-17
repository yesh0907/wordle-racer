'use client';

import { useState } from "react";
import Key from "./key";

export default function Keypad() {
    const [letters, setLetters] = useState<string[]>([]);

    const handleKeyClick = (letter: string) => {
        setLetters([...letters, letter]);
    };

    const handleBackspace = () => {
        setLetters(letters.slice(0, -1));
    };

    const handleEnter = () => {
        // Handle submitting the word
    };

    return (
        <div className="w-full flex flex-wrap justify-center flex-shrink min-w-0 gap-2">
            <div className="flex gap-2 flex-shrink min-w-0">
                {'QWERTYUIOP'.split('').map((letter) => (
                    <Key key={letter} letter={letter} onClick={handleKeyClick} />
                ))}
            </div>
            <div className="flex gap-2 flex-shrink min-w-0">
                {'ASDFGHJKL'.split('').map((letter) => (
                    <Key key={letter} letter={letter} onClick={handleKeyClick} />
                ))}
            </div>
            <div className="flex gap-2 flex-shrink min-w-0">
                <button
                    type="button"
                    className="w-1/4 h-12 bg-green-500 hover:bg-green-600 text-white text-md font-bold rounded-md text-center"
                    onClick={handleEnter}
                >
                    Enter
                </button>
                {'ZXCVBNM'.split('').map((letter) => (
                    <Key key={letter} letter={letter} onClick={handleKeyClick} />
                ))}
                <button
                    type="button"
                    className="w-1/4 h-12 bg-gray-700 hover:bg-gray-500 flex items-center justify-center rounded-md"
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