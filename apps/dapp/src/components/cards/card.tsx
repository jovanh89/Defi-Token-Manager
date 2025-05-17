import React from 'react';
import cn from 'classnames';
import { LetterGlitch } from '@defi-token/ui';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  isLoading?: boolean;
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  className,
  isLoading,
}) => {
  return (
    <div
      data-testid="card"
      className={cn(
        'flex flex-col relative bg-white text-sm font-medium shadow-card dark:bg-light-dark rounded-lg p-6',
        className
      )}
    >
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
      {children}
      {isLoading && (
        <div className={cn('absolute top-0 left-0 rounded-lg w-full h-full')}>
          <LetterGlitch
            className="rounded-lg opacity-20"
            glitchSpeed={50}
            centerVignette={true}
            outerVignette={false}
            smooth={true}
            glitchColors={['#2b4539', '#61dca3', '#61b3dc']}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
