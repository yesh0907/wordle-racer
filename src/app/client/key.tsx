'use client';

interface KeyProps {
    letter: string;
    onClick: (letter: string) => void;
}

export default function Key({ letter, onClick }: KeyProps) {
    return (
        <button
            type="button"
            className="w-12 h-12 flex-shrink-[2] bg-gray-700 hover:bg-gray-500 text-lg font-bold rounded-md text-center"
            onClick={() => onClick(letter)}
        >
            {letter}
        </button>
    );
};