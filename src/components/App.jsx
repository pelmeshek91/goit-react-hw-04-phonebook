import { Component } from 'react';
import { Form } from './Form/Form';
import { Section } from './Section/Section';
import { PhoneList } from './PhoneList/PhoneList';
import { Filter } from './Filter/Filter';
import { nanoid } from 'nanoid';

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
    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }
  }

  addContact = newContact => {
    const newContactEntity = {
      id: nanoid(),
      ...newContact,
    };
    this.state.contacts.find(
      contact =>
        contact.name.toLowerCase() === newContactEntity.name.toLowerCase()
    )
      ? alert(`${newContactEntity.name} is already in contacts!`)
      : this.setState(state => ({
          contacts: [...state.contacts, newContactEntity],
        }));
  };

  handleFilterContactsByName = e => {
    const { value } = e.target;
    this.setState(() => ({ filter: value }));
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  render() {
    const contactsByName = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <>
        <Section title="Phonebook">
          <Form addContact={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter
            filter={this.state.filter}
            onChange={this.handleFilterContactsByName}
          />
          <PhoneList contacts={contactsByName} onDelete={this.deleteContact} />
        </Section>
      </>
    );
  }
}
