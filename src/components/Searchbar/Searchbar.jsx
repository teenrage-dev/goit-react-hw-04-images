import css from './Searchbar.module.css';
import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

export class Searchbar extends Component {
  state = {
    value: '',
    // page: 1,
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  handleChange = e => {
    this.setState({ value: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;

    if (value.trim() === '') {
      toast.error('Error: Please enter a search term.');

      this.setState({ value: '' });
      return;
    }
    // console.log(this.props);
    this.props.onSubmit(value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
            value={this.state.value}
          />
        </form>
      </header>
    );
  }
}
