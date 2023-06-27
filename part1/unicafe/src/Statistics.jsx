const StatisticLine = ({ text, value }) => {
  return (
    <p>
      {text} {value}
    </p>
  );
};

export const Statistics = ({ good, neutral, bad, total, avg, positive }) => {
  return (
    <>
      {good || bad || neutral ? (
        <div>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={total} />
          <StatisticLine text="avg" value={avg} />
          <StatisticLine text="positive" value={positive + " %"} />
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};
