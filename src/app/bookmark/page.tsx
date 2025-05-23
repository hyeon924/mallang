'use client'

import DashboardLayout from '../dashboardLayout'
import BookmarkIcon from '@/components/icon/bookmarkIcon'

type VideoData = {
    id: string
    title: string
    description: string
    thumbnail: string
}

function Bookmark() {
    const videoList: VideoData[] = [
        {
            id: '1',
            title: 'React 기초',
            description: 'React를 배워보자',
            thumbnail: '',
        },
        {
            id: '2',
            title: '노마드 코더 강의',
            description: '코딩 시작하기',
            thumbnail: '',
        },
        {
            id: '3',
            title: '드라마로 배우는 영어',
            description: '재밌게 배우는 영어',
            thumbnail: '',
        },
    ]

    return (
        <DashboardLayout title="Bookmark" icon={<BookmarkIcon />}>
            <div className="flex flex-col gap-6 overflow-y-auto pr-2">
                {videoList.map((video) => (
                    <div key={video.id} className="flex gap-4 bg-[var(--color-white)] rounded-lg p-4">
                        <div className="w-120 h-80 bg-gray-200 rounded-md" />
                        <div className="flex flex-col">
                            <p className="text-lg font-bold">{video.title}</p>
                            <p className="text-lg text-gray-500">조회수 0회</p>
                            <p className="text-sm text-gray-700 mt-2">{video.description}</p>
                        </div>
                    </div>
                ))}

                {videoList.length === 0 && (
                    <div className="text-gray-500 text-center mt-10">북마크된 영상이 없습니다.</div>
                )}
            </div>
        </DashboardLayout>
    )
}

export default Bookmark
