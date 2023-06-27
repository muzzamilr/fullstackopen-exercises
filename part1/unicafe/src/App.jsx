import { useState } from "react";
import { Statistics } from "./Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [avg, setAvg] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    setGood((good) => good + 1);
    setTotal((total) => total + 1);
    if (total) {
      setAvg((good - bad) / total);
      setPositive((good * 100) / total);
    }
  };

  const handleNeutral = () => {
    setNeutral((neutral) => neutral + 1);
    setTotal((total) => total + 1);
    if (total) {
      setAvg((good - bad) / total);
      setPositive((good * 100) / total);
    }
  };

  const handleBad = () => {
    setBad((bad) => bad + 1);
    setTotal((total) => total + 1);
    if (total) {
      setAvg((good - bad) / total);
      setPositive((good * 100) / total);
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
      <h2>statistics</h2>
      {good || bad || neutral ? (
        <Statistics
          total={total}
          avg={avg}
          good={good}
          bad={bad}
          neutral={neutral}
          positive={positive}
        />
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

export default App;
