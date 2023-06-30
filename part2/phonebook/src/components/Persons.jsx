export const Persons = ({ persons, filteredPersons, showAll }) => {
  return (
    <>
      {showAll
        ? persons.map((obj) => (
            <p key={obj.name}>{obj.name + " " + obj.number} </p>
          ))
        : filteredPersons.map((obj) => (
            <p key={obj.name}>{obj.name + " " + obj.number} </p>
          ))}
    </>
  );
};
