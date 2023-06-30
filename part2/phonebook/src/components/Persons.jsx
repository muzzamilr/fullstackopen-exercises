export const Persons = ({
  persons,
  filteredPersons,
  showAll,
  handleDelete,
}) => {
  return (
    <>
      {showAll
        ? persons.map((obj) => (
            <div key={obj.id}>
              {obj.name + " " + obj.number}
              <button onClick={handleDelete(obj.id, obj.name)}>delete</button>
            </div>
          ))
        : filteredPersons.map((obj) => (
            <div key={obj.id}>
              {obj.name + " " + obj.number}
              <button onClick={handleDelete(obj.id, obj.name)}>delete</button>
            </div>
          ))}
    </>
  );
};
