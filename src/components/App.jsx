import { Component } from 'react';
import { Form } from './Form/Form';
import { Filter } from './Filter/Filter';
import { PhoneBook } from './Phonebook/PhoneBook';
import { nanoid } from 'nanoid';

import s from './App.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    this.setState({
      contacts:
        JSON.parse(localStorage.getItem('contacts')) || this.state.contacts,
    });
  }

  componentDidUpdate(_, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = newContact => {
    this.state.contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    )
      ? alert(`${newContact.name} is already in contacts!`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, { ...newContact, id: nanoid() }],
        }));
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  filterContactsList = () => {
    const contactsList = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
    return contactsList;
  };
  removeContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const contactsList = this.filterContactsList();
    return (
      <div className={s.phoneBook}>
        <h1 className={s.title}>Phonebook</h1>
        <Form addContact={this.addContact} />
        <h2 className={s.title}>Contacts</h2>
        <Filter
          filterContacts={this.handleChangeFilter}
          filter={this.state.filter}
        />
        <PhoneBook
          contactsList={contactsList}
          deleteContact={this.removeContact}
        />
      </div>
    );
  }
}
