'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';
import React, { useEffect } from 'react';



interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  
  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
        <button className={css.closeBtn} onClick={() => onClose()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;