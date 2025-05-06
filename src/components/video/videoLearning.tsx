'use client'

import { useState } from 'react'
import VideoTab from './videoTab'
import VideoScript from './videoScript'
import WordModal from './wordModal'
import Image from 'next/image'

interface VideoData {
    id: string
    title: string
    description: string
    thumbnail?: string
}

interface Props {
    video: VideoData
    onBack: () => void
}

function VideoLearning({ video, onBack }: Props) {
    const [fontSize, setFontSize] = useState(16)
    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <div className="flex flex-col gap-4 h-full">
            <button onClick={onBack} className="text-[var(--color-main)] font-semibold w-full text-right">
                &larr; 목록으로
            </button>

            <div className="flex flex-col gap-2 flex-1 overflow-hidden">
                {/* 비디오 + 트랜스크립트 */}
                <div className="flex flex-row gap-4 w-full h-full">
                    <div className="w-full bg-gray-300 rounded-sm">상세보기: 영상 {video.id}</div>
                    <VideoScript />
                </div>

                {/* 제목 + 부가기능 */}
                <div className="flex justify-between items-center w-full h-20">
                    <h3 className="flex-1">{video.title}</h3>
                    <div className="flex items-center gap-2">
                        <button onClick={() => setFontSize((prev) => Math.max(12, prev - 4))}>
                            <Image src="/assets/minus.svg" alt="video" width={24} height={24} />
                        </button>

                        <Image src="/assets/font-size.svg" alt="video" width={24} height={24} />
                        <span className="text-sm font-bold">{fontSize}px</span>
                        <button onClick={() => setFontSize((prev) => Math.min(40, prev + 4))}>
                            <Image src="/assets/plus.svg" alt="video" width={24} height={24} />
                        </button>
                    </div>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[var(--color-main)] text-white px-4 py-2 rounded-md ml-4"
                    >
                        추가
                    </button>
                </div>

                {/* 하단 탭 메뉴 */}
                <VideoTab fontSize={fontSize} />
            </div>

            {/* 모달 */}
            {isModalOpen && (
                <WordModal
                    title="이 영상을 단어장에 추가할까요?"
                    description={`"${video.title}"`}
                    onCancel={() => setIsModalOpen(false)}
                    onConfirm={() => {
                        // 추가 로직 위치
                        setIsModalOpen(false)
                    }}
                    confirmText="추가하기"
                    cancelText="닫기"
                />
            )}
        </div>
    )
}

export default VideoLearning
