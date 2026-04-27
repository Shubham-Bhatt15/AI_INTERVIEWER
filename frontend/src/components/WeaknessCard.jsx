const getStyle = (score) => {
    if (score < 40) return { bar: 'bg-red-400', badge: 'bg-red-50 text-red-600', label: 'Needs Work', dot: 'bg-red-400' };
    if (score < 65) return { bar: 'bg-yellow-400', badge: 'bg-yellow-50 text-yellow-600', label: 'Improving', dot: 'bg-yellow-400' };
    return { bar: 'bg-teal-500', badge: 'bg-teal-50 text-teal-600', label: 'Strong', dot: 'bg-teal-500' };
};

const WeaknessCard = ({ weaknesses, loading }) => {

    if (loading) {
        return (
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 sm:px-8 sm:py-6">
                    <h2 className="text-lg font-bold text-white flex items-center">
                        <span className="bg-teal-500 w-1.5 h-5 rounded-full mr-3"></span>
                        🎯 Weakness Tracker
                    </h2>
                </div>
                <div className="p-6 sm:p-8 space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="animate-pulse space-y-2">
                            <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                            <div className="h-2 bg-slate-100 rounded w-full"></div>
                            <div className="h-3 bg-slate-100 rounded w-1/2"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!weaknesses || weaknesses.length === 0) {
        return (
            <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 sm:px-8 sm:py-6">
                    <h2 className="text-lg font-bold text-white flex items-center">
                        <span className="bg-teal-500 w-1.5 h-5 rounded-full mr-3"></span>
                        🎯 Weakness Tracker
                    </h2>
                </div>
                <div className="p-6 sm:p-8">
                    <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl py-10 text-center">
                        <p className="text-2xl mb-2">📭</p>
                        <p className="text-slate-500 font-bold text-sm">No data yet.</p>
                        <p className="text-slate-400 text-xs mt-1">Complete an interview to see your weakness report.</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl sm:rounded-[2.5rem] shadow-xl shadow-slate-200 border border-slate-100 overflow-hidden">
            {/* Header */}
            <div className="bg-slate-900 px-6 py-4 sm:px-8 sm:py-6 flex items-center justify-between">
                <h2 className="text-lg font-bold text-white flex items-center">
                    <span className="bg-teal-500 w-1.5 h-5 rounded-full mr-3"></span>
                    🎯 Weakness Tracker
                </h2>
                <span className="text-xs text-slate-400 font-medium">{weaknesses.length} topic{weaknesses.length > 1 ? 's' : ''} tracked</span>
            </div>

            <div className="p-6 sm:p-8 space-y-4">
                {weaknesses.map((item, idx) => {
                    const style = getStyle(item.overallAvg);
                    return (
                        <div key={idx} className="bg-slate-50 rounded-2xl p-4 space-y-3">
                            {/* Top Row */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-slate-800 font-bold text-sm capitalize">{item.role}</span>
                                    <span className="text-slate-400 text-xs ml-2 capitalize">
                                        · {item.level} · {item.questionType}
                                    </span>
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full ${style.badge}`}>
                                    {style.label}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-slate-200 rounded-full h-1.5">
                                <div
                                    className={`h-1.5 rounded-full transition-all duration-700 ${style.bar}`}
                                    style={{ width: `${item.overallAvg}%` }}
                                ></div>
                            </div>

                            {/* Bottom Row */}
                            <div className="flex items-center justify-between text-xs text-slate-400 font-medium">
                                <div className="flex gap-4">
                                    <span>⚙️ Technical <span className="text-slate-700 font-bold">{item.avgTechnical}%</span></span>
                                    <span>🧠 Confidence <span className="text-slate-700 font-bold">{item.avgConfidence}%</span></span>
                                </div>
                                <span className="text-slate-300">{item.totalQuestions} Qs · {item.sessionCount} sessions</span>
                            </div>
                        </div>
                    );
                })}

                {/* Legend */}
                <div className="flex gap-4 pt-2 border-t border-slate-100 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span> &lt;40 Needs Work</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block"></span> 40–65 Improving</span>
                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span> &gt;65 Strong</span>
                </div>
            </div>
        </div>
    );
};

export default WeaknessCard;