import { useState, useEffect } from 'react';
import { Form } from './Form/Form';
import { Section } from './Section/Section';
import { PhoneList } from './PhoneList/PhoneList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

export const App =() => {
  
  const [contacts, setContacts] = useState (() => JSON.parse(localStorage.getItem('contacts')) || [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ])
  const [filter, setFilter] = useState('');
  
  useEffect(() => {
       localStorage.setItem('contacts', JSON.stringify(contacts))
  }, [contacts])
  
  const addContact = newContact => {
    const newContactEntity = {
      id: nanoid(),
      ...newContact,
    };
    contacts.find(contact => contact.name.toLowerCase() === newContactEntity.name.toLowerCase())
      ? alert(`${newContactEntity.name} is already in contacts!`)
      : setContacts(state => ([...state, newContactEntity]));
  };

  const handleFilterContactsByName = e => {
    const { value } = e.target;
    setFilter(value);
  };

  const deleteContact = id => {
    setContacts(prevState => (prevState.filter(contact => contact.id !== id)));
  };

  const contactsByName = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
      <>
        <Section title="Phonebook">
          <Form addContact={addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={filter}
            onChange={handleFilterContactsByName}
          />
          <PhoneList contacts={contactsByName} onDelete={deleteContact} />
        </Section>
      </>
    );
  
}
