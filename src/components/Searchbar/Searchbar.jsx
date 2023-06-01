import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'
import { MdSearch } from "react-icons/md";

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.search.trim()) {
      return alert('Enter text');
    }
    this.props.onSubmit(this.state.search);
  };
  render() {
    return (
      <div className={css.searchbarWrap}>
        <header className={css.searchbar}>
          <form className={css.form} onSubmit={this.handleSubmit}>
            <button type="submit" className={css.button}>
              <span className={css.buttonLabel}><MdSearch/></span>
            </button>

            <input
              className={css.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>
        </header>
      </div>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
};

export default Searchbar;
