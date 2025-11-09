'use client';

import { useRouter } from 'next/navigation';
import css from './Modal.module.css';
import { useEffect } from 'react';


const Modal = ({ children }: {children: React.ReactNode}) => {
  const router = useRouter();
  
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') router.back();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [router]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) router.back();
  };

  return (
    <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
      <div className={css.modal}>
        {children}
        <button className={css.closeBtn} onClick={() => router.back()}>
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;