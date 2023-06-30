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
      {parts.map((part) => (
        <Part name={part.name} key={part.id} exercise={part.exercises} />
      ))}
    </div>
  );
};
