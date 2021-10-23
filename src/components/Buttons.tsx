import React from "react";
interface IButtons {
  setCurrentPage(page: number): void;
  page: number;
}
const Buttons: React.FC<IButtons> = ({ page, setCurrentPage }) => {
  return (
    <div className="buttons__container">
      <button onClick={() => setCurrentPage(--page)}>prev</button>
      <p className="page__number">{page}</p>
      <button onClick={() => setCurrentPage(++page)}>next</button>
    </div>
  );
};

export { Buttons };
