/* eslint-disable @typescript-eslint/ban-ts-comment */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Card from '../../components/cards/card';
import { LetterGlitch } from '@defi-token/ui';
import { canvasElementMocked } from '../__mocks__';

describe('Card', () => {
  canvasElementMocked();
  it('Should be able to render the Card component with title and content', () => {
    render(
      <Card title="Title">
        <div>Content</div>
      </Card>
    );

    expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByTestId('card')).toBeInTheDocument();
  });

  it('Should be able to render the Card component without title', () => {
    render(<Card>Content</Card>);
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('Should show the LetterGlitch component when isLoading is true', () => {
    render(
      <Card title="Title" isLoading={true}>
        <div>Content</div>
      </Card>
    );
    expect(screen.getByTestId('letter-glitch')).toBeInTheDocument();
  });

  it('Should not show the LetterGlitch component when isLoading is false', () => {
    render(
      <Card title="Title" isLoading={false}>
        <div>Content</div>
      </Card>
    );
    expect(screen.queryByTestId('letter-glitch')).not.toBeInTheDocument();
  });

  it('Should be able to render the Card component with custom class', () => {
    render(
      <Card title="Title" className="my-class">
        <div>Content</div>
      </Card>
    );
    expect(screen.getByTestId('card')).toHaveClass('my-class');
  });

  describe('LetterGlitch', () => {
    it('renders the LetterGlitch component', () => {
      render(
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
        />
      );
      expect(screen.getByTestId('letter-glitch')).toBeInTheDocument();
    });
  });
});
