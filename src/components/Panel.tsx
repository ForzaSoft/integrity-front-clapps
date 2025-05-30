import clsx from 'clsx';
import { FC, ReactNode, RefObject, useCallback, useImperativeHandle, useState } from 'react';
import styles from './Panel.module.css';

export interface PanelRef {
  open: () => void;
  close: () => void;
}

interface PanelProps {
  ref: RefObject<PanelRef | null>;
  className?: string;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  onOpen?: () => void;
  onClose?: () => void;
}

const Panel: FC<PanelProps> = ({ ref, className, header, children, footer }) => {
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
        <div className={clsx(styles.panel, className)}>
          <div className={styles.header}>{header}</div>
          <div className={styles.content}>{children}</div>
          {footer && <div className={styles.footer}>{footer}</div>}
        </div>
      </div>
    </dialog>
  );
};

export default Panel;
