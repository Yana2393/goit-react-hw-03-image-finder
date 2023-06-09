import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../Modal/Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDwn);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDwn);
  }

  handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      this.props.modalClose('');
    }
  };

  handleKeyDwn = e => {
    if (e.key === 'Escape') {
      this.props.modalClose('');
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={ this.handleOverlayClick}>
        <div className={css.modal}>
          <div className={css.modalContent} onClick={this.handleOverlayClick}>
            <img className={css.modalContentImg} src={this.props.largeImage} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  modalClose: PropTypes.func,
  largeImage: PropTypes.string
};

export default Modal;
