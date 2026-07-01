import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Pagination } from './Pagination'

describe('Pagination', () => {
  it('renders nothing when totalPages is 1', () => {
    const { container } = render(
      <Pagination page={0} totalPages={1} onPrev={vi.fn()} onNext={vi.fn()} />
    )
    expect(container.firstChild).toBeNull()
  })

  it('shows correct page info', () => {
    render(<Pagination page={2} totalPages={10} onPrev={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByText('Page 3 of 10')).toBeInTheDocument()
  })

  it('calls onPrev when Prev clicked', async () => {
    const onPrev = vi.fn()
    render(<Pagination page={2} totalPages={5} onPrev={onPrev} onNext={vi.fn()} />)
    await userEvent.click(screen.getByLabelText('Previous page'))
    expect(onPrev).toHaveBeenCalledOnce()
  })

  it('calls onNext when Next clicked', async () => {
    const onNext = vi.fn()
    render(<Pagination page={0} totalPages={5} onPrev={vi.fn()} onNext={onNext} />)
    await userEvent.click(screen.getByLabelText('Next page'))
    expect(onNext).toHaveBeenCalledOnce()
  })

  it('disables Prev on first page', () => {
    render(<Pagination page={0} totalPages={5} onPrev={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByLabelText('Previous page')).toBeDisabled()
  })

  it('disables Next on last page', () => {
    render(<Pagination page={4} totalPages={5} onPrev={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByLabelText('Next page')).toBeDisabled()
  })

  it('has accessible nav landmark', () => {
    render(<Pagination page={0} totalPages={5} onPrev={vi.fn()} onNext={vi.fn()} />)
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument()
  })
})
