import { useEffect } from 'react';

import css from './Modal.module.css';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImgURL }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };
  const handleBackdropClick = e => {
    console.log(e.target);

    if (e.target === e.currentTarget) {
      console.log(e.currentTarget);
      console.log(e.target);
      onClose();
    }
  };

  return createPortal(
    <div className={css.Overlay} onClick={handleBackdropClick}>
      <div className={css.Modal}>
        <img src={largeImgURL} alt="Pixabay" loading="lazy" />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  largeImgURL: PropTypes.string,
  onclose: PropTypes.func,
};
