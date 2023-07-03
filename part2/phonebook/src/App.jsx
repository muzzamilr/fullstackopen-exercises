import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";
import Service from "./PersonsService";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [filteredPersons, setFilteredPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [showAll, setShowALl] = useState(true);
  const [notification, setNotification] = useState({
    message: null,
    error: null,
  });

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

    Service.create(data)
      .then(() =>
        setNotification({ message: `Added ${newName}`, error: false })
      )
      .catch((e) =>
        setNotification({
          message: e.response.data.error,
          error: true,
        })
      )
      .finally(() => Service.getAll().then((data) => setPersons(data)));
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
      Service.deleteContact(id)
        .catch((e) =>
          setNotification({
            message: `Information of ${name} is already removed from the server`,
            error: true,
          })
        )
        .finally(() => Service.getAll().then((data) => setPersons(data)));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} error={notification.error} />
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
