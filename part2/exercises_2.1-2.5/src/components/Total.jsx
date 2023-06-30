export const Total = (props) => {
  const { parts } = props;
  return (
    <h3>
      total of {parts[0].exercises + parts[1].exercises + parts[2].exercises}{" "}
      exercises
    </h3>
  );
};
