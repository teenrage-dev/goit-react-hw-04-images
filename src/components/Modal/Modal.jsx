import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImgURL: PropTypes.string.isRequired,
    onclose: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
    // window.addEventListener('click', this.handleBackdropClick);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
    // window.removeEventListener('click', this.handleBackdropClick);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleBackdropClick = e => {
    if (e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImgURL } = this.props;

    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={largeImgURL} alt="" loading="lazy" />
        </div>
      </div>,
      modalRoot
    );
  }
}
