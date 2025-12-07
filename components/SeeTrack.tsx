import React from "react";

const deals = [
    {
        name: 'Dr. Rowell',
        color: 'bg-red-600',
        urgent: true,
        startDate: '2025-05-01',
        endDate: '2025-06-19',
        tag: 'MTG-APR',
        milestones: ['2025-05-05', '2025-05-12', '2025-06-01']
    },
    {
        name: 'Romina Sale',
        color: 'bg-yellow-400',
        urgent: false,
        startDate: '2025-05-03',
        endDate: '2025-06-21',
        tag: 'P&S',
        milestones: ['2025-05-06', '2025-05-10', '2025-06-10']
    },
    {
        name: 'Romina Buy',
        color: 'bg-lime-400',
        urgent: false,
        startDate: '2025-05-05',
        endDate: '2025-06-23',
        tag: 'INSPCT',
        milestones: ['2025-05-07', '2025-05-14', '2025-06-18']
    },
    {
        name: 'Bob',
        color: 'bg-purple-600',
        urgent: true,
        startDate: '2025-05-07',
        endDate: '2025-06-25',
        tag: 'OFFR-ACPT',
        milestones: ['2025-05-09', '2025-05-16', '2025-06-20']
    },
];

// moved inside component
const timelineStart = new Date("2025-05-01");
const timelineEnd = new Date("2025-06-26");
const totalTimelineDuration = timelineEnd.getTime() - timelineStart.getTime();

const generateWeekDates = () => {
    const weeks = [];
    let current = new Date(timelineStart);
    while (current <= timelineEnd) {
        weeks.push(new Date(current));
        current.setDate(current.getDate() + 7);
    }
    return weeks;
};

const weekLabels = generateWeekDates();

const SeeTrack = () => {
    const today = new Date();
    return (
        <div className="p-4 relative bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-gray-100 to-gray-400">
            <div className="relative h-[400px]">
                {/* Calendar Illusion - Week Grid */}
                {weekLabels.map((date, idx) => {
                    const left = ((date.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100;
                    return (
                        <div
                            key={idx}
                            className="absolute top-0 bottom-0 border-l border-gray-400/20 hover:border-gray-600/50 transition-all"
                            style={{ left: `${left}%` }}
                        >
                            <div className="absolute bottom-[-20px] text-xs text-gray-500">
                                {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </div>
                        </div>
                    );
                })}

                {/* Today Vertical Break Line */}
                <div
                    className="absolute top-0 bottom-0 w-[3px] bg-black z-40"
                    style={{ left: `${((today.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100}%` }}
                />

                {/* Deal Bars */}
                {deals.map((deal, i) => {
                    const start = new Date(deal.startDate);
                    const end = new Date(deal.endDate);

                    const startPercent = ((start.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100;
                    const endPercent = ((end.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100;
                    const todayPercent = ((today.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100;

                    const leftWidth = Math.max(todayPercent - startPercent, 0);
                    const rightWidth = Math.max(endPercent - todayPercent, 0);

                    const totalWeeks = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7));
                    const currentWeek = Math.floor((today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)) + 1;

                    return (
                        <div key={deal.name} className="absolute" style={{ top: `${i * 60}px`, width: '100%' }}>
                            {/* Left Segment - Past */}
                            {leftWidth > 0 && (
                                <div
                                    className={`absolute h-12 ${deal.color} shadow-md px-4 text-white font-bold flex items-center justify-end`}
                                    style={{
                                        left: `${startPercent}%`,
                                        width: `${leftWidth}%`,
                                        borderTopLeftRadius: '0.75rem',
                                        borderBottomLeftRadius: '0.75rem'
                                    }}
                                >
                                    <span className="z-10 relative">{deal.name}</span>
                                </div>
                            )}
                            {/* Right Segment - Future */}
                            {rightWidth > 0 && (
                                <div
                                    className={`absolute h-12 ${deal.color} shadow-md px-4 text-white font-bold flex items-center justify-between pr-2 pl-4 group`}
                                    style={{
                                        left: `${todayPercent}%`,
                                        width: `${rightWidth}%`,
                                        borderTopRightRadius: '0.75rem',
                                        borderBottomRightRadius: '0.75rem'
                                    }}
                                >
                                    <span className="text-xs font-medium text-white/80 group-hover:opacity-0 transition-opacity duration-200">{deal.tag}</span>
                                    <span className="absolute right-2 text-[10px] text-white bg-black/50 px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-all">
                                        Week {currentWeek} of {totalWeeks}
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}

                {/* Today Avatar/Label */}
                <div
                    className="absolute z-50 flex flex-col items-center"
                    style={{
                        left: `${((today.getTime() - timelineStart.getTime()) / totalTimelineDuration) * 100}%`,
                        transform: 'translateX(-50%)',
                        top: '360px'
                    }}
                >
                    <div className="bg-black text-white px-4 py-2 rounded-xl shadow-xl text-sm font-bold">
                        {`${today.getMonth() + 1}/${today.getDate()}`}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default SeeTrack;
