import React, { useState } from "react";
import styled from "styled-components";
import { Box, Button, Icon, Modal } from "components";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <HeaderContainer>
      <div className="left">
        <img className="logo" src="/logo/logomark.svg" alt="Playhouse" />
      </div>
      <div className="right">
        <div className="more">
          <Button variant="fab" onClick={() => setIsOpen(true)}>
            <Icon icon="pencil" />
          </Button>
        </div>
        <input className="pack-title" defaultValue="Some Pack Name" />
        <div className="empty" />
      </div>
      <Modal
        open={isOpen}
        title="Pack Settings"
        onRequestClose={() => setIsOpen(false)}
        maxWidth={300}
        closeButton
      >
        <Box mb={3}>
          <h3>Shuffle questions when playing this pack</h3>
          <Button onClick={() => {}} fullWidth>
            Yes
          </Button>
        </Box>
        <Box>
          <h3>Number of questions to go through</h3>
          <Button onClick={() => {}} fullWidth>
            10
          </Button>
        </Box>
      </Modal>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.section`
  display: flex;
  grid-area: header;
  background: ${({ theme }) => theme.ui.background};
  border-bottom: 1px solid ${({ theme }) => theme.ui.backgroundInverse};

  .logo {
    height: 35px;
  }

  .left {
    display: flex;
    align-items: center;
    width: 345px;
    border-right: 1px solid ${({ theme }) => theme.ui.backgroundInverse};
    padding-left: ${({ theme }) => theme.spacings(3)};
  }

  .right {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: auto;
    padding: 0 ${({ theme }) => theme.spacings(3)};
  }

  .pack-title {
    text-align: center;
    border-radius: ${({ theme }) => theme.border.wavyRadius};
    border: none;
    transition: all 0.23s ease;

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
    }
  }
`;

export const Page = styled.section`
  display: grid;
  height: calc((var(--vh, 1vh) * 100));
  background: ${({ theme }) => theme.ui.backgroundGrey};
  grid-template-areas:
    "header  header  header"
    "sidebar content content"
    "sidebar  footer  footer";
  grid-template-columns: 345px 1fr 1fr;
  grid-template-rows: 50px 1fr 150px;
`;

export const Content = styled.section`
  grid-area: content;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacings(5)};
`;