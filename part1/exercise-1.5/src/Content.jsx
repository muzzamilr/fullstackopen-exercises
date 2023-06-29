const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercise}
    </p>
  );
};

export const Content = (props) => {
  const { parts } = props;
  return (
    <div>
      {parts.map((part, i) => (
        <Part name={part.name} key={i} exercise={part.exercises} />
      ))}
    </div>
  );
};
