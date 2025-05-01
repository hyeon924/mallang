'use client'

import Search from '@/components/layout/search'
import DashboardLayout from '../dashboardLayout'
import WordIcon from '@/components/icon/wordIcon'
import LearningCard from '@/components/layout/learningCard'

function Word() {
    return (
        <DashboardLayout title="Word Learning" icon={<WordIcon />}>
            <div className="w-300 m-auto">
                <Search onSearch={() => {}} placeholder="word search..." />
            </div>
            <div className="flex-1 ">
                <LearningCard
                    title="단어"
                    descriptions={[
                        { text: '내 {title}장에서 톡톡 랜덤 등장!', strong: ['랜덤'] },
                        { text: '반복과 호기심 학습을 한번에!', strong: ['반복', '호기심'] },
                    ]}
                />
            </div>

            <div className="flex flex-col flex-1 gap-2 h-full overflow-hidden">
                {/* 상단 타이틀 */}
                <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">📚 내 단어장</h1>
                    <div className="text-sm text-[var(--color-main)]">부가기능</div>
                </div>

                {/* 카드 리스트 */}
                <div className="flex-1 overflow-y-auto p-2">
                    <div className="flex flex-wrap gap-4">
                        {Array.from({ length: 20 }).map((_, idx) => (
                            <div
                                key={idx}
                                className="flex flex-col justify-between p-4 w-[320px] h-[180px] bg-[var(--color-white)] rounded-lg border border-2 border-[var(--color-main)]"
                            >
                                <div className="flex justify-between">
                                    <div>⭐</div>
                                    <button>
                                        <img src="/assets/close.svg" alt="card delete" />
                                    </button>
                                </div>
                                <p className="text-2xl font-bold text-center">wonder</p>
                                <button className="flex items-center gap-2 justify-center">
                                    <img src="/assets/volume.svg" alt="volume" />
                                    <span>경이, 놀라움</span>
                                </button>
                                <p className="text-sm text-center">1. 경탄할만한 것</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Word
