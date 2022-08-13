import { Component } from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

export class Button extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
  };

  render() {
    const { onClick } = this.props;

    return (
      <button className={css.Button} onClick={onClick}>
        Load more
      </button>
    );
  }
}
