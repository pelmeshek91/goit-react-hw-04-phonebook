import { useState } from 'react';

import { Feedback } from './Feedback';

const INITIAL_FEEDBACK = {
  good: 0,
  neutral: 0,
  bad: 0,
};

export const App = () => {
  const [feedback, setFeedback] = useState(INITIAL_FEEDBACK);
  
  const countFeedback = (e) => {
    
    setFeedback(prevState => ({
      ...prevState,
      [e.target.name]: Number.parseInt(prevState[e.target.name]) + 1,
    }));
  };
  

  const countTotalFeedback = () => {
    
    const { good, neutral, bad } = feedback;
    let total = 0;
    
    total = good + neutral + bad;
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const { good, neutral, bad } = feedback;
    let positive = 0;
    positive = Math.round((good / (good + neutral + bad)) * 100)
      ? Math.round((good / (good + neutral + bad)) * 100)
      : 0;
    return positive;
  };

  const total = countTotalFeedback();
  
  return (
    <>
      <Feedback
        options={{
          good: feedback.good,
          neutral: feedback.neutral,
          bad: feedback.bad,
        }}
        
        countFeedback={countFeedback}
        total={total}
        countPositiveFeedbackPercentage={countPositiveFeedbackPercentage}
      />
    </>
  );
};
