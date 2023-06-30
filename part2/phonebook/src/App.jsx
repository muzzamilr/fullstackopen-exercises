import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowALl] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((res) => setPersons(res.data));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newName === "" || newNumber === "") return;
    if (persons.filter((obj) => obj.name === newName).length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons((per) => [...per, { name: newName, number: newNumber }]);
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
      <Filter handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        handleNumberChange={handleNumberChange}
        handleNameChange={handleNameChange}
        handleFormSubmit={handleFormSubmit}
      />
      <h2>Numbers</h2>
      <Persons
        showAll={showAll}
        persons={persons}
        filteredPersons={filteredPersons}
      />
    </div>
  );
};

export default App;
