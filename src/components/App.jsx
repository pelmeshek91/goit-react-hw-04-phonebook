import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { PhoneBook } from './Phonebook/PhoneBook';
import { nanoid } from 'nanoid';

import s from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState(
    () =>
      JSON.parse(localStorage.getItem('contacts')) || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = newContact => {
    contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts!`)
      : setContacts(prevContacts => [
          ...prevContacts,
          { ...newContact, id: nanoid() },
        ]);
  };

  const handleChangeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  const filterContactsList = () => {
    const contactsList = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    return contactsList;
  };

  const removeContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };

  const contactsList = filterContactsList();
  return (
    <div className={s.phoneBook}>
      <h1 className={s.title}>Phonebook</h1>
      <Form addContact={addContact} />
      <h2 className={s.title}>Contacts</h2>
      <Filter filterContacts={handleChangeFilter} filter={filter} />
      <PhoneBook contactsList={contactsList} deleteContact={removeContact} />
    </div>
  );
};
