'use client';

interface KeyProps {
    letter: string;
    isLast: boolean;
    onClick: (letter: string) => void;
}

export default function Key({ letter, isLast, onClick }: KeyProps) {
    return (
        <button
            type="button"
            className={`text-[1.25em] font-bold mr-${isLast ? 0 : 2}
            my-0 ml-0 p-0 flex-1 h-[58px] rounded cursor-pointer select-none
            bg-gray-700 flex justify-center items-center uppercase`}
            onClick={() => onClick(letter)}
        >
            {letter}
        </button>
    );
};