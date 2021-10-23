import React from "react";
import { CSSTransition } from "react-transition-group";
import { overflowOff, overflowOn } from "../common/modalOverflow";
import { IPhotos } from "./Photos";

interface IModal {
  isVisible: boolean;
  item: IPhotos | undefined;
  setVisible(modal: boolean): void;
}
const Modal: React.FC<IModal> = ({ isVisible, item, setVisible }) => {
  return (
    <CSSTransition
      in={isVisible}
      timeout={600}
      classNames="modal"
      unmountOnExit
      onEnter={overflowOn}
    >
      <div
        className="modal-dev"
        onClick={() => {
          setVisible(false);
          overflowOff();
        }}
      >
        <div
          className="modal__content"
          onClick={(e: React.MouseEvent) => e.stopPropagation()}
        >
          <button
            className="close__modal_button"
            onClick={() => {
              setVisible(false);
              overflowOff();
            }}
          >
            Close
          </button>
          <img src={item?.url} alt={item?.title} />
        </div>
      </div>
    </CSSTransition>
  );
};

export { Modal };
