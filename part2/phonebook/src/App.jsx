import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowALl] = useState(true);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newName === "" || newNumber === "") return;
    if (persons.filter((obj) => obj.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((per) => [...per, { name: newName, number: newNumber }]);
    console.log(filteredPersons);
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilterChange = (e) => {
    setShowALl(false);
    setFilteredPersons(
      persons.filter((obj) =>
        obj.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );

    if (e.target.value === "") setShowALl(true);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleFilterChange} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {showAll
        ? persons.map((obj) => (
            <p key={obj.name}>{obj.name + " " + obj.number} </p>
          ))
        : filteredPersons.map((obj) => (
            <p key={obj.name}>{obj.name + " " + obj.number} </p>
          ))}
    </div>
  );
};

export default App;
