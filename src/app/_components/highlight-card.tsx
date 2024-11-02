import { type ReactNode } from "react"

interface HighlightCardProps {
    title: string
    content: ReactNode
}

export default function HighlightCard({ title, content }: Readonly<HighlightCardProps>) {
    return (
        <div className="flex flex-col sm:gap-2 md:gap-3 lg:gap-4 w-full h-full bg-transparent rounded-xl sm:p-3 md:p-5 lg:p-6 shadow backdrop-blur-sm">
            <div className="sm:text-md md:text-lg lg:text-xl font-medium">
                {title}
            </div>
            <div>
                {content}
            </div>
        </div>
    )
}