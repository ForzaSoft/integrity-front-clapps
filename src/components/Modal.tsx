import clsx from 'clsx';
import { FC, ReactNode, RefObject, useCallback, useImperativeHandle, useState } from 'react';
import styles from './Modal.module.css';

export interface ModalRef {
  open: () => void;
  close: () => void;
}

interface ModalProps {
  ref: RefObject<ModalRef | null>;
  className?: string;
  title: ReactNode;
  children: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const Modal: FC<ModalProps> = ({ ref, className, title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  useImperativeHandle(ref, () => ({ open, close }), [open, close]);

  return (
    <dialog className={styles.container} open={isOpen}>
      <div className={styles.backdrop}>
        <div className={clsx(styles.modal, className)}>
          <div className={styles.title}>{title}</div>
          {children}
        </div>
      </div>
    </dialog>
  );
};

export default Modal;
