export default function Card() {
    return (
        <div className="flex-1 grid grid-cols-2 gap-4">
            {['새로운', '영화', '드라마', '노래'].map((title, index) => (
                <div
                    key={index}
                    className="bg-[var(--color-white)] rounded-lg p-4 shadow flex flex-col justify-between h-32 border border-gray-200"
                >
                    {/* 날짜 + 제목 */}
                    <p className="font-semibold text-[var(--color-main)] mb-1">
                        <span className="text-[var(--color-black)] text-sm mr-2">2025-04-28</span>
                        {title} 단어장
                    </p>

                    {/* 단어 수 */}
                    <strong className="text-[var(--color-point)] text-xl mb-2">13개 단어</strong>

                    {/* 버튼 영역 */}
                    <div className="flex justify-end gap-2">
                        <button className="bg-[#a287e3] text-white px-3 py-1 rounded text-sm">학습</button>
                        <button className="bg-[#f7a732] text-white px-3 py-1 rounded text-sm">Quiz</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
