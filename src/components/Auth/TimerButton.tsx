'use client'
import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';

type TimerButtonProps = {
  firstTimeInterval: number
  everyTimeInterval: number
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => {}
  children: React.ReactNode,
  className?: string
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}

const TimerButton = ({ firstTimeInterval, everyTimeInterval, onClick, children, className, variant }: TimerButtonProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [timer, setTimer] = useState(firstTimeInterval);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isDisabled) {
      interval = setInterval(() => {
        setTimer(prev => {
          if (prev === 1) {
            clearInterval(interval);
            setIsDisabled(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isDisabled]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isDisabled) {
      setIsDisabled(true);
      setTimer(everyTimeInterval);
      onClick(event)
    }
  };

  return (
    <Button onClick={handleClick} disabled={isDisabled} className={className} variant={variant}>
      {children} {isDisabled ? `(${timer})s` : ''} 
    </Button>
  );
};

export default TimerButton;