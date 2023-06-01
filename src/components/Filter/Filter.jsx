import s from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = ({ filter, filterContacts }) => {
  return (
    <div className={s.filterWrap}>
      <label>
        <p className={s.filterTitle}>Find contact by name</p>
        <input type="text" value={filter} onChange={filterContacts} />
      </label>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  filterContacts: PropTypes.func.isRequired,
};
