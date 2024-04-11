import { render, screen } from '@testing-library/react';
import { GHUser, RepoIssue } from 'appTypes/index';
import IssueCard from '../../src/components/IssueCard';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

describe('IssueCard', () => {
  const date = '2024-04-10T09:36:03Z';
  const newIssue: RepoIssue = {
    id: 1,
    assignee: null,
    created_at: date,
    closed_at: null,
    title: 'Test issue',
    number: 234,
    comments: 2,
    html_url: 'url',
  };

  const user: GHUser = {
    id: 23,
    avatar_url: '/avatar-url',
    login: 'Admin',
  };
  const index = 1;

  const renderCard = (issue: RepoIssue) => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Droppable droppableId={`${index}`} key={index}>
          {() => <IssueCard item={issue} index={index} />}
        </Droppable>
      </DragDropContext>
    );

    const linkElement = screen.getByRole('link');
    const titleElement = screen.getByRole('heading');
    const openDateElement = screen.queryByText(/opened at /i);
    const closeDateElement = screen.queryByText(/closed at /i);
    const avatarElement = screen.queryByRole('img');

    return {
      linkElement,
      titleElement,
      openDateElement,
      closeDateElement,
      avatarElement,
    };
  };

  it('Should have correct information for new issue', () => {
    const { linkElement, titleElement, openDateElement } = renderCard(newIssue);

    expect(linkElement).toHaveAttribute('href', newIssue.html_url);
    expect(titleElement).toHaveTextContent(newIssue.title);
    expect(openDateElement).toBeInTheDocument();
  });

  it('Should have correct information for inProggress issue', () => {
    const { avatarElement, openDateElement } = renderCard({
      ...newIssue,
      assignee: user,
    });

    expect(openDateElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', user.avatar_url);
  });

  it('Should have correct information for closed issue', () => {
    const { closeDateElement, avatarElement } = renderCard({
      ...newIssue,
      closed_at: date,
      assignee: user,
    });

    expect(closeDateElement).toBeInTheDocument();
    expect(avatarElement).toHaveAttribute('src', user.avatar_url);
  });
});
