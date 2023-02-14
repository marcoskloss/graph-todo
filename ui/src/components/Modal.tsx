import { PropsWithChildren, useState } from 'react';
import ReactModal from 'react-modal';

type Props = PropsWithChildren & {
  isOpen: boolean;
  onRequestClose(): void;
};

export const useModal = (initialState: boolean) => {
  const [state, setState] = useState(initialState);

  const open = () => setState(true);
  const close = () => setState(false);
  const toggle = () => setState((prev) => !prev);

  return {
    isOpen: state,
    open,
    close,
    toggle,
  };
};

export function Modal({ isOpen, onRequestClose, children }: Props) {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
      ariaHideApp={false}
      style={{
        content: {
          paddingTop: 0,
        },
      }}
    >
      <div>
        <header className="fancy-modal-header">
          <button
            onClick={onRequestClose}
            title="Close modal"
            type="button"
            aria-label="Close modal"
          />
        </header>
        {children}
      </div>
    </ReactModal>
  );
}
