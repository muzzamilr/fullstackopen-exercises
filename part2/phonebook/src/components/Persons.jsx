export const Persons = ({ persons, filteredPersons, showAll }) => {
  return (
    <>
      {showAll
        ? persons.map((obj) => (
            <p key={obj.id}>{obj.name + " " + obj.number} </p>
          ))
        : filteredPersons.map((obj) => (
            <p key={obj.id}>{obj.name + " " + obj.number} </p>
          ))}
    </>
  );
};
