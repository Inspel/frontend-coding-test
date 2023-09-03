import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommitsListTable } from '@/features/commits-list/CommitsListTable'
import { useAppsSearchParams } from '@/features/shared/useAppsSearchParams'
import { useNavigate } from 'react-router'
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'
import { vi } from 'vitest'

vi.mock('@/features/shared/useAppsSearchParams')
vi.mock('react-router')
vi.mock('@/features/commits-list/hooks/useGithubCommits')

describe('CommitsListTable', () => {
  const navigateMock = vi.fn()
  const date1 = '2018-04-03T09:33:38Z'
  const date2 = '2019-05-03T09:33:38Z'

  const sampleData = [
    {
      sha: 'sha1',
      commit: {
        message: 'message1',
        author: {
          name: 'author1',
          date: date1
        }
      }
    },
    {
      sha: 'sha2',
      commit: {
        message: 'message2',
        author: {
          name: 'author2',
          date: date2
        }
      }
    }
  ]

  beforeEach(() => {
    vi.mocked(useAppsSearchParams).mockReturnValue({
      searchParams: new URLSearchParams(),
      owner: null,
      repo: null,
      commit: null
    })

    vi.mocked(useNavigate).mockReturnValue(navigateMock)
    vi.mocked(useGithubCommits).mockReturnValue({
      data: [],
      isLoading: false,
      isError: false,
      error: null
    } as unknown as ReturnType<typeof useGithubCommits>)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display table headers', () => {
    render(<CommitsListTable />)

    expect(screen.getByText('Commit message')).toBeVisible()
    expect(screen.getByText('Author name')).toBeVisible()
    expect(screen.getByText('Commit date')).toBeVisible()
  })

  it('should display loading skeleton when data is loading', () => {
    vi.mocked(useGithubCommits).mockReturnValue({
      data: [],
      isLoading: true,
      isError: false,
      error: null
    } as unknown as ReturnType<typeof useGithubCommits>)

    render(<CommitsListTable />)

    const skeletonRows = screen.getAllByTestId('skeleton-row')
    skeletonRows.forEach((row) => expect(row).toBeVisible())
  })

  it('should display error alert when there is an error', () => {
    vi.mocked(useGithubCommits).mockReturnValue({
      data: [],
      isLoading: false,
      isError: true,
      error: new Error('An error occurred')
    } as unknown as ReturnType<typeof useGithubCommits>)

    render(<CommitsListTable />)

    expect(screen.getByText('An error occurred')).toBeVisible()
  })

  it('should display commits data when available', () => {
    vi.mocked(useGithubCommits).mockReturnValue({
      data: sampleData,
      isLoading: false,
      isError: false,
      error: null
    } as unknown as ReturnType<typeof useGithubCommits>)

    render(<CommitsListTable />)

    expect(screen.getByText('message1')).toBeVisible()
    expect(screen.getByText('author1')).toBeVisible()
    expect(screen.getByText(new Date(date1).toLocaleString())).toBeVisible()
  })

  it('should navigate to commit details when a row is clicked', () => {
    vi.mocked(useGithubCommits).mockReturnValue({
      data: sampleData,
      isLoading: false,
      isError: false,
      error: null
    } as unknown as ReturnType<typeof useGithubCommits>)

    render(<CommitsListTable />)

    fireEvent.click(screen.getByText('message1'))

    expect(navigateMock).toHaveBeenCalled()
  })
})
