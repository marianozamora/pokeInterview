import type { ReactNode } from 'react'

type ListTemplateProps = {
  header: ReactNode
  content: ReactNode
  pagination: ReactNode
}

export function ListTemplate({ header, content, pagination }: ListTemplateProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">{header}</div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {content}
        {pagination}
      </main>
    </div>
  )
}
