import type { ReactNode } from 'react'

type DetailTemplateProps = {
  backLink: ReactNode
  content: ReactNode
}

export function DetailTemplate({ backLink, content }: DetailTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8 sm:px-6">
        <div className="mb-6">{backLink}</div>
        <main>{content}</main>
      </div>
    </div>
  )
}
