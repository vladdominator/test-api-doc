import React, { useEffect, useRef } from "react";

interface IInput {
  filter: string;
  setFilter(filter: string): void;
}
const Input: React.FC<IInput> = React.memo(({ setFilter, filter }) => {
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (filter) input.current?.focus();
  }, [filter]);

  return (
    <input
      type="number"
      className="filter__photos"
      placeholder="Id albom"
      ref={input}
      value={filter}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setFilter(e.target.value)
      }
    />
  );
});

export { Input };
