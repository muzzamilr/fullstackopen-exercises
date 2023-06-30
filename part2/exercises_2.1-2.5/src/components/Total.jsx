export const Total = (props) => {
  const { parts } = props;
  const total = parts.reduce((a, b) => a + b.exercises, 0);
  return <h3>total of {total} exercises</h3>;
};
