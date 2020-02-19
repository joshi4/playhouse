import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { playhouseActions } from 'features/home/playhouseSlice';
import { usePlayhouseChannel } from 'context/PlayhouseChannel';
import { useTrivia } from 'context/TriviaChannel';
import { Button, Input, Card } from 'components';

const Screens = {
  join: 'join',
  name: 'name'
};

export const Home = () => {
  const history = useHistory();
  const { state: playhouseState, broadcast, dispatch } = usePlayhouseChannel();
  const { state: triviaState } = useTrivia();

  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [screen, setScreen] = useState(
    triviaState.gameID ? Screens.name : Screens.join
  );
  const [gameID, setGameID] = useState(triviaState.gameID);
  const [name, setName] = useState(playhouseState.name);

  const onClickHost = () => {
    broadcast('trivia:new');
    dispatch(playhouseActions.updateUser({ isHost: true }));
    setShouldRedirect(true);
  };

  const onClickJoin = () => {
    if (gameID) {
      setScreen(Screens.name);
    }
  };

  const onSubmitName = () => {
    dispatch(playhouseActions.updateUser({ name, isHost: false }));
    setShouldRedirect(true);
  };

  useEffect(() => {
    if (triviaState.gameID && shouldRedirect) {
      history.push(`/trivia/${triviaState.gameID}/lobby`);
    }
  }, [triviaState.gameID, shouldRedirect, history]);

  return (
    <IntroContainer>
      <img src="/logo/logomark.svg" alt="Playhouse" />
      <IntroCard>
        {screen === Screens.name ? (
          <InputContainer>
            <Input
              placeholder="Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
            <Button onClick={onSubmitName}>Start</Button>
          </InputContainer>
        ) : (
          <>
            <InputContainer>
              <Input
                type="tel"
                placeholder="Game ID"
                value={gameID}
                onChange={e => setGameID(e.target.value)}
              />
              <Button onClick={onClickJoin}>Join existing game</Button>
            </InputContainer>
            <HostNewGameText>
              Or <button onClick={onClickHost}>host your own game</button>
            </HostNewGameText>
          </>
        )}
      </IntroCard>
    </IntroContainer>
  );
};

const IntroContainer = styled.section`
  img {
    display: block;
    width: 60px;
    margin: ${({ theme }) => `0 auto ${theme.spacings(2)}`};
  }
  transform: translateY(-70px);
`;

const IntroCard = styled(Card)`
  height: 260px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    margin-bottom: ${({ theme }) => theme.spacings(1)};
  }
  button {
    margin-bottom: ${({ theme }) => theme.spacings(2)};
  }
`;

const HostNewGameText = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;

  button {
    margin-left: ${({ theme }) => theme.spacings(1.2)};
    text-decoration: underline;
  }
`;