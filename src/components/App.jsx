import React, { useState } from 'react';
import { GlobalStyle } from 'components/Globalstyle.js';
import { Layout } from './Layout.js';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions.jsx';
import { Statistics } from 'components/Statistics/Statistics.jsx';
import { Section } from 'components/Section/Section.jsx';
import { NotificationMessage } from './NotificationMessage/NotificationMessage.jsx';

export const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = name => {
    switch (name) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;
      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;
      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;
      default:
        break;
    }
  };

  const countTotalFeedback = () => {
    return good + neutral + bad;
  };

  const countPositivePersentage = () => {
    const total = countTotalFeedback();
    const positivePersentage = Math.round((good / total) * 100);
    return positivePersentage ? positivePersentage : 0;
  };

  return (
    <Layout>
      <GlobalStyle />
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() === 0 ? (
          <NotificationMessage message="There is no feedback" />
        ) : (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            total={countTotalFeedback()}
            positivePersentage={countPositivePersentage()}
          />
        )}
      </Section>
    </Layout>
  );
};
