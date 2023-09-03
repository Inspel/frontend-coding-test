import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ParamsControl } from '@/features/commits-list/ParamsControl'
import { useAppSearchParams } from '@/features/shared/useAppSearchParams'
import { useNavigate } from 'react-router'
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'
import { vi } from 'vitest'

vi.mock('@/features/shared/useAppSearchParams')
vi.mock('react-router')
vi.mock('@/features/commits-list/hooks/useGithubCommits')

describe('ParamsControl', () => {
  const navigateMock = vi.fn()
  const refetchMock = vi.fn()

  beforeEach(() => {
    vi.mocked(useAppSearchParams).mockReturnValue({
      searchParams: new URLSearchParams(),
      owner: null,
      repo: null,
      commit: null
    })
    vi.mocked(useNavigate).mockReturnValue(navigateMock)
    vi.mocked(useGithubCommits).mockReturnValue({
      refetch: refetchMock,
      isLoading: false,
      isError: false
    } as unknown as ReturnType<typeof useGithubCommits>)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should render form fields', () => {
    render(<ParamsControl />)

    expect(screen.getByLabelText(/owner/i)).toBeVisible()
    expect(screen.getByLabelText(/repo/i)).toBeVisible()
    expect(screen.getByRole('button', { name: /fetch commits/i })).toBeVisible()
  })

  it('should change input values', () => {
    render(<ParamsControl />)

    fireEvent.change(screen.getByLabelText(/owner/i), {
      target: { value: 'newOwner' }
    })

    fireEvent.change(screen.getByLabelText(/repo/i), {
      target: { value: 'newRepo' }
    })

    expect(screen.getByLabelText<HTMLInputElement>(/owner/i).value).toBe(
      'newOwner'
    )
    expect(screen.getByLabelText<HTMLInputElement>(/repo/i).value).toBe(
      'newRepo'
    )
  })

  it('should handle form submit', async () => {
    render(<ParamsControl />)

    fireEvent.change(screen.getByLabelText(/owner/i), {
      target: { value: 'newOwner' }
    })

    fireEvent.change(screen.getByLabelText(/repo/i), {
      target: { value: 'newRepo' }
    })
    fireEvent.click(screen.getByRole('button', { name: /fetch commits/i }))

    await waitFor(() => {
      expect(refetchMock).not.toHaveBeenCalled()
      expect(navigateMock).toHaveBeenCalled()
    })
  })

  it('should refetch if there is an error', async () => {
    vi.mocked(useGithubCommits).mockReturnValue({
      refetch: refetchMock,
      isLoading: false,
      isError: true
    } as unknown as ReturnType<typeof useGithubCommits>)

    render(<ParamsControl />)

    fireEvent.change(screen.getByLabelText(/owner/i), {
      target: { value: 'newOwner' }
    })

    fireEvent.change(screen.getByLabelText(/repo/i), {
      target: { value: 'newRepo' }
    })
    fireEvent.click(screen.getByRole('button', { name: /fetch commits/i }))

    await waitFor(() => {
      expect(refetchMock).toHaveBeenCalled()
      expect(navigateMock).not.toHaveBeenCalled()
    })
  })
})
