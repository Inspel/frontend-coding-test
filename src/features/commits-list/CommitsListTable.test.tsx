import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { CommitsListTable } from '@/features/commits-list/CommitsListTable'
import { useAppSearchParams } from '@/features/shared/useAppSearchParams'
import { useNavigate } from 'react-router'
import { useGithubCommits } from '@/features/commits-list/hooks/useGithubCommits'
import { vi } from 'vitest'

vi.mock('@/features/shared/useAppSearchParams')
vi.mock('react-router')
vi.mock('@/features/commits-list/hooks/useGithubCommits')
vi.mock('@/features/commits-list/hooks/useInfiniteScroll')

describe('CommitsListTable', () => {
  const navigateMock = vi.fn()
  const timestamp1 = '2018-04-03T09:33:38Z'
  const timestamp2 = '2019-05-03T09:33:38Z'

  const sampleData = {
    pages: [
      {
        sha: 'sha1',
        commit: {
          message: 'message1',
          author: {
            name: 'author1',
            date: timestamp1
          }
        }
      },
      {
        sha: 'sha2',
        commit: {
          message: 'message2',
          author: {
            name: 'author2',
            date: timestamp2
          }
        }
      }
    ]
  }

  beforeEach(() => {
    vi.mocked(useAppSearchParams).mockReturnValue({
      searchParams: new URLSearchParams(),
      owner: null,
      repo: null,
      commit: null
    })

    vi.mocked(useNavigate).mockReturnValue(navigateMock)
    vi.mocked(useGithubCommits).mockReturnValue({
      data: { pages: [] },
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
      data: { pages: [] },
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
      data: { pages: [] },
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
    expect(
      screen.getByText(new Date(timestamp1).toLocaleString())
    ).toBeVisible()
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
