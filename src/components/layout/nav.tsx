'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import DashboardIcon from '../icon/dashboardIcon'
import QuestionIcon from '../icon/grammarIcon'
import AbcIcon from '../icon/wordIcon'
import VideoIcon from '../icon/videoIcon'
import BookmarkIcon from '../icon/bookmarkIcon'

function Nav() {
    const pathname = usePathname()

    return (
        <nav className="flex flex-col h-screen bg-[var(--color-sub-2)] text-[var(--color-main)] w-[120px] p-4">
            {/* 상단 영역 */}
            <div className="flex flex-col gap-6">
                {/* 로고 */}
                <Image src="/logo/icon-logo.svg" alt="logo" width={48} height={48} className="mx-auto" priority />

                {/* 메뉴 아이템 */}
                <div className="flex flex-col items-center gap-1">
                    <NavItem
                        icon={<DashboardIcon />}
                        label="Dashboard"
                        href="/dashboard"
                        active={pathname.startsWith('/dashboard')}
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <NavItem
                        icon={<BookmarkIcon />}
                        label="Bookmark"
                        href="/bookmark"
                        active={pathname.startsWith('/bookmark')}
                    />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <NavItem icon={<VideoIcon />} label="Video" href="/video" active={pathname.startsWith('/video')} />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <NavItem icon={<AbcIcon />} label="Word" href="/word" active={pathname.startsWith('/word')} />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <NavItem
                        icon={<QuestionIcon />}
                        label="Grammar"
                        href="/grammar"
                        active={pathname.startsWith('/grammar')}
                    />
                </div>
            </div>

            {/* 하단 구독 버튼 */}
            <div className="mt-auto pt-4 border-t border-[var(--color-main)] border-opacity-20">
                <Link
                    href="/membership"
                    className="flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all cursor-pointer hover:bg-[var(--color-main)] hover:bg-opacity-10"
                >
                    <div className="min-w-[24px] text-[var(--color-point)]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C8.69 6 6 8.69 6 12C6 15.31 8.69 18 12 18C15.31 18 18 15.31 18 12C18 8.69 15.31 6 12 6ZM12 16C9.79 16 8 14.21 8 12C8 9.79 9.79 8 12 8C14.21 8 16 9.79 16 12C16 14.21 14.21 16 12 16Z"
                                fill="currentColor"
                            />
                        </svg>
                    </div>
                    <span className="text-xs text-center text-[var(--color-point)]">Premium</span>
                </Link>
            </div>
        </nav>
    )
}

// 서브 컴포넌트: 메뉴 아이템
function NavItem({
    icon,
    label,
    href,
    active = false,
}: {
    icon: React.ReactElement<{ className?: string }>
    label: string
    href: string
    active?: boolean
}) {
    const iconClass = `${active ? 'text-[var(--color-point)]' : 'text-[var(--color-main)] opacity-60'}`

    return (
        <Link
            href={href}
            className={`flex flex-col items-center gap-1 px-1 py-2 rounded-lg transition-all cursor-pointer
                ${
                    active
                        ? 'text-[var(--color-point)] font-bold'
                        : 'text-[var(--color-main)] opacity-60 hover:opacity-100'
                }
            `}
        >
            <div className="min-w-[24px]">{React.cloneElement(icon, { className: iconClass })}</div>
            <span className="text-xs text-center">{label}</span>
        </Link>
    )
}

export default Nav
