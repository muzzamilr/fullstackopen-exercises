import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import Service from "./PersonsService";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowALl] = useState(true);

  useEffect(() => {
    Service.getAll().then((data) => setPersons(data));
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (newName === "" || newNumber === "") return;

    const toUpdate = persons.filter(
      (obj) => obj.name === newName && obj.number !== newNumber
    );

    const alreadyExists = persons.filter(
      (obj) => obj.name === newName && obj.number === newNumber
    );

    if (alreadyExists.length > 0) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (toUpdate.length > 0) {
      const confirm = window.confirm(
        `${newName} is already added to phonebook, replace the old number with new one?`
      );
      if (confirm) {
        Service.update(toUpdate[0].id, {
          name: newName,
          number: newNumber,
        }).finally(() => Service.getAll().then((data) => setPersons(data)));
      }
      return;
    }

    const data = {
      name: newName,
      number: newNumber,
    };

    setPersons((per) => [...per, data]);
    Service.create(data);
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

  const handleDelete = (id, name) => () => {
    if (window.confirm(`Delete ${name} ?`))
      Service.deleteContact(id).finally(() =>
        Service.getAll().then((data) => setPersons(data))
      );
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
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
