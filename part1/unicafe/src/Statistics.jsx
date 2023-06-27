export const Statistics = ({ good, neutral, bad, total, avg, positive }) => {
  return (
    <>
      {good || bad || neutral ? (
        <div>
          <p>good {good}</p>
          <p>neutral {neutral}</p>
          <p>bad {bad}</p>
          <p>all {total}</p>
          <p>average {avg}</p>
          <p>positive {positive}%</p>
        </div>
      ) : (
        <p>No feedback given</p>
      )}
    </>
  );
};
