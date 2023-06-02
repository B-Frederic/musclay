import PropTypes from 'prop-types';
import styles from './Tags.module.css';

function Tags({ tags }) {
  return (
    <ul className={styles.tags}>
      {tags.map(({ id, name }) => <li key={id}>{name}</li>)}
    </ul>
  );
}

Tags.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default Tags;
