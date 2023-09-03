import React from 'react'
import { render, screen, within } from '@testing-library/react'
import { CommitPage } from '@/features/commit-view/CommitPage'
import { useAppSearchParams } from '@/features/shared/useAppSearchParams'
import { useQuery } from 'react-query'
import { vi } from 'vitest'

vi.mock('@/features/shared/useAppSearchParams')
vi.mock('react-query')

describe('CommitPage', () => {
  const testTimestamp = '2022-01-01T00:00:00Z'

  const sampleData = {
    author: { avatar_url: 'avatarUrl' },
    commit: {
      author: {
        name: 'Author Name',
        date: testTimestamp
      },
      message: 'Commit Message'
    },
    stats: {
      additions: 5,
      deletions: 3
    },
    files: [
      {
        filename: 'test.js',
        changes: 8,
        additions: 5,
        deletions: 3,
        status: 'modified'
      }
    ]
  }

  beforeEach(() => {
    vi.mocked(useAppSearchParams).mockReturnValue({
      searchParams: new URLSearchParams(),
      owner: 'testOwner',
      repo: 'testRepo',
      commit: 'testCommit'
    })

    vi.mocked(useQuery).mockReturnValue({
      data: sampleData,
      isError: false
    } as unknown as ReturnType<typeof useQuery>)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('should display commit details when available', () => {
    render(<CommitPage />)

    expect(screen.getByText('Commit Details')).toBeVisible()

    const commitMessage = screen.getByTestId('commit-message')

    expect(within(commitMessage).getByText('Author Name')).toBeVisible()
    expect(within(commitMessage).getByText('Commit Message')).toBeVisible()
    expect(within(commitMessage).getByRole('img')).toHaveAttribute(
      'aria-label',
      'Author Name'
    )

    expect(
      screen.getByText(new Date(testTimestamp).toLocaleString())
    ).toBeVisible()

    const commitChanges = screen.getByTestId('commit-changes')

    expect(within(commitChanges).getByText('Additions:')).toBeVisible()
    expect(within(commitChanges).getByText('5').closest('span')).toHaveStyle(
      'color: green'
    )
    expect(within(commitChanges).getByText('Deletions:')).toBeVisible()
    expect(within(commitChanges).getByText('3').closest('span')).toHaveStyle(
      'color: red'
    )

    const changedFiles = screen.getByTestId('changed-files')

    expect(within(changedFiles).getByText('Changed Files: 1')).toBeVisible()
    expect(within(changedFiles).getByText('test.js')).toBeVisible()
    expect(within(changedFiles).getByText('5').closest('td')).toHaveStyle(
      'color: green'
    )
    expect(within(changedFiles).getByText('3').closest('td')).toHaveStyle(
      'color: red'
    )
  })

  it('should display the back link', () => {
    render(<CommitPage />)

    const link = screen.getByText('← Back to Commits List')

    expect(link.getAttribute('href')).toEqual('/?owner=testOwner&repo=testRepo')
  })

  it('should display an error when isError is true', () => {
    vi.mocked(useQuery).mockReturnValue({
      data: null,
      isError: true
    } as unknown as ReturnType<typeof useQuery>)

    render(<CommitPage />)

    expect(
      screen.getByText('An error occurred while fetching data.')
    ).toBeVisible()
  })
})
