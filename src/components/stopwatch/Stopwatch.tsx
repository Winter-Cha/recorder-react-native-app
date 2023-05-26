import React, { FC, useState, useEffect } from 'react';
import { Button, Time, Laps, Container, Actions } from './index';

let interval = 0;

export const Stopwatch: FC = () => {
  const [seconds, setSeconds] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }, [isRunning]);

  const onNewLap = () => {
    setLaps([...laps, seconds]);
    setSeconds(0);
  };

  return (
    <Container>
      <Time seconds={seconds} size={'large'} />
      <Actions>
        <Button
          backgroundColor={isRunning ? 'red' : 'lightgreen'}
          color={isRunning ? 'white' : 'black'}
          text={isRunning ? 'Stop' : 'Start'}
          onClick={() => setIsRunning(!isRunning)}
        />
        <Button
          backgroundColor={'lightblue'}
          color={'black'}
          text={'New lap'}
          onClick={onNewLap}
        />
      </Actions>
      <Laps laps={laps} />
    </Container>
  );
};