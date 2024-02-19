'use client';

interface KeyProps {
    letter: string;
    isLast: boolean;
    isUsed: boolean;
    onClick: (letter: string) => void;
}

export default function Key({ letter, isLast, isUsed, onClick }: KeyProps) {
    return (
        <button
            type="button"
            className={`text-[1.25em] font-bold mr-${isLast ? 0 : 2}\
            my-0 ml-0 p-0 flex-1 h-[58px] rounded cursor-pointer select-none\
            ${isUsed ? 'bg-gray-800' : 'bg-gray-500'} flex justify-center\
            items-center uppercase`}
            onClick={() => onClick(letter)}
        >
            {letter}
        </button>
    );
};