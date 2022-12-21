import { IconBuildingCommunity, IconKey, TablerIcon } from "@tabler/icons"

import {
    IconNotes,
    IconCalendarStats,
    IconGauge,
    IconPresentationAnalytics,
    IconFileAnalytics,
    IconAdjustments,
    IconLock,
} from "@tabler/icons"

export type NavLinkType = {
    label: string
    link: string
}

export type NavItemType = {
    label: string
    icon: TablerIcon
    initiallyOpened?: boolean
    link?: string
    links?: NavLinkType[]
}

export const navItems: NavItemType[] = [
    { label: "Dashboard", icon: IconGauge, link: '/' },
    { label: "Api Keys", icon: IconKey, link: '/api-keys' },
    { label: "Organizations", icon: IconBuildingCommunity, link:'/organizations' },
    { label: "Settings", icon: IconAdjustments, link:'/settings' },
]