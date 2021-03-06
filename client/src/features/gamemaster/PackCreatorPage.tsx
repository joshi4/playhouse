import React, { useState } from "react";
import styled from "styled-components";

import { Sidebar } from "features/gamemaster/components/Sidebar";
import { Page, Content } from "features/gamemaster/components/Page";
import { ActPreview } from "features/gamemaster/components/ActPreview";
import { generateUuid } from "utils/stringUtils";

import { Navigation } from "./components/Navigation";

export type Act = {
  id: string;
  instruction: string;
  questionType: string;
  question: string;
  answerType: string;
  answer: string;
};

// fake data generator
const getItems = (count: number) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: generateUuid(),
    questionType: "TEXT",
    instruction: `instruction`,
    question: `question ${k}?`,
    answerType: "TEXT",
    answer: "",
  }));

export const PackCreatorPage = () => {
  const [acts, setActs] = useState<Act[]>(getItems(10));
  const [selectedAct, setSelectedAct] = useState<Act>(acts[0]);

  const onUpdateAct = (act: Act) => {
    setSelectedAct(act);
    setActs(
      acts.map((a) => {
        if (a.id === act.id) return act;
        return a;
      })
    );
  };

  return (
    <Page>
      <Navigation />
      <Sidebar
        acts={acts}
        setActs={setActs}
        selectedAct={selectedAct}
        setSelectedAct={setSelectedAct}
      />
      <Content>
        <ActPreview selectedAct={selectedAct} onUpdateAct={onUpdateAct} />
      </Content>
      <Footer>
        <QuestionTemplate />
        <QuestionTemplate />
        <QuestionTemplate />
      </Footer>
    </Page>
  );
};

const Footer = styled.footer`
  grid-area: footer;
  display: flex;
  padding: ${({ theme }) => theme.spacings(4)};
`;

const QuestionTemplate = styled.div`
  width: 150px;
  background: ${({ theme }) => theme.ui.background};
  height: 100%;
  border-radius: ${({ theme }) => theme.border.wavyRadius};
  margin-right: ${({ theme }) => theme.spacings(4)};
  border: 2px solid ${({ theme }) => theme.ui.backgroundInverse};
`;
