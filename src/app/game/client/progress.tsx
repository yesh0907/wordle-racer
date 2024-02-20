interface ProgressProps {
    ratio: number;
    height: number;
    isPlayer?: boolean;
}

export default function Progress({ ratio, height, isPlayer }: ProgressProps) {
    const progressHeight = `${ratio * 100}%`;

    return (
        <div className="flex flex-col items-center flex-1 w-[30px]" style={{ height }}>
            <div className="h-[40px]">
                {isPlayer ? "You" : "Opp."}
            </div>
            <div
                className="bg-zinc-300 w-[28px] rounded-full flex"
                style={{ height: 'calc(100% - 80px)' }}
            >
                <div
                    className="bg-green-600 w-[28px] rounded-full mt-auto"
                    style={{
                        height: progressHeight,
                    }}
                />
            </div>
        </div>
    )
}