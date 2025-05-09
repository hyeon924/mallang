'use client'

import DashboardLayout from '@/app/dashboardLayout'
import WordIcon from '@/components/icon/wordIcon'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Word {
    word: string
    pos: string
    meaning: string
    difficulty: string
    exampleSentence: string
    translatedSentence: string
    videoId: string
    subtitleId: number
    createdAt: string
}

export default function WordLearningPage() {
    const searchParams = useSearchParams()
    const selectedId = searchParams.get('id')
    const selectedTitle = searchParams.get('title') || '제목 없음'

    const [words, setWords] = useState<Word[]>([])
    const [index, setIndex] = useState(0)
    const wordItem = words.length
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_MOCK_URL}/api/v1/wordbooks/{wordbookId}/words`)
                const data = await response.json()
                console.log(data)
                setWords(data.data)
                setIsLoading(false)
            } catch (error) {
                console.error('단어 데이터를 가져오는데 실패했습니다:', error)
                setIsLoading(false)
            }
        }

        if (selectedId) {
            fetchWords()
        }
    }, [selectedId])

    const handlePrev = () => {
        if (index > 0) setIndex(index - 1)
    }

    const handleNext = () => {
        if (index < wordItem - 1) setIndex(index + 1)
    }

    function highlightWord(sentence: string, word: string) {
        const regex = new RegExp(`(${word})`, 'gi') // 대소문자 구분 없이
        const parts = sentence.split(regex)

        return parts.map((part, index) =>
            part.toLowerCase() === word.toLowerCase() ? (
                <strong key={index} className="text-[var(--color-point)] font-bold">
                    {part}
                </strong>
            ) : (
                <span key={index}>{part}</span>
            ),
        )
    }

    const speak = (text: string) => {
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.lang = 'en-US' // 영어 발음
        speechSynthesis.speak(utterance)
    }

    if (isLoading) {
        return (
            <DashboardLayout title="Word Learning" icon={<WordIcon />}>
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl">로딩 중...</p>
                </div>
            </DashboardLayout>
        )
    }

    if (words.length === 0) {
        return (
            <DashboardLayout title="Word Learning" icon={<WordIcon />}>
                <div className="flex items-center justify-center h-full">
                    <p className="text-2xl">단어가 없습니다.</p>
                </div>
            </DashboardLayout>
        )
    }

    const current = words[index]

    return (
        <DashboardLayout
            title="Word Learning"
            icon={<WordIcon />}
            className="bg-image p-20 flex flex-col gap-4 items-center"
        >
            <h1 className="text-5xl font-bold text-[var(--color-black)]">{selectedTitle} 단어장 학습</h1>

            <div className="bg-[var(--color-main)] text-[var(--color-point)] px-4 py-2 rounded-sm">
                {index + 1} / {wordItem}
            </div>

            <div className="flex flex-col items-center justify-center bg-[var(--color-white)] w-180 h-full gap-8 p-12">
                <div className="text-yellow-400 text-xl">
                    {Array.from({
                        length: current.difficulty === 'EASY' ? 1 : current.difficulty === 'MEDIUM' ? 2 : 3,
                    }).map((_, i) => (
                        <span key={i}>⭐</span>
                    ))}
                </div>

                <p className="text-5xl font-bold text-center">{current.word}</p>

                <button className="flex items-center gap-2 justify-center" onClick={() => speak(current.word)}>
                    <Image src="/assets/volume.svg" alt="volume" width={24} height={24} />
                    <span className="text-lg">{current.meaning}</span>
                </button>

                <p className="text-lg text-center">
                    [{current.pos}] {current.meaning}
                </p>

                <div>
                    <p className="text-md text-center">{highlightWord(current.exampleSentence, current.word)}</p>
                    <p className="text-md text-center">{current.translatedSentence}</p>
                </div>

                <div className="flex gap-2 w-full">
                    <button
                        onClick={handlePrev}
                        className="flex-1 flex items-center justify-center bg-[var(--color-sub-2)] border-[var(--color-main)] border-2 rounded-sm disabled:opacity-50"
                        disabled={index === 0}
                    >
                        <Image src="/assets/left.svg" alt="left" width={40} height={40} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="flex-1 flex items-center justify-center bg-[var(--color-sub-2)] border-[var(--color-main)] border-2 rounded-sm disabled:opacity-50"
                        disabled={index === wordItem - 1}
                    >
                        <Image src="/assets/right.svg" alt="right" width={40} height={40} />
                    </button>
                </div>
            </div>
        </DashboardLayout>
    )
}
