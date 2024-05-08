import React from "react";
export interface RadioProps {
  name: string;
  label?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected?: boolean;
}
const Radio: React.FC<RadioProps> = ({ name, label, id, onChange, selected }) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        type="radio"
        className="focus:ring-action-primary h-5 w-5 text-action-primary border-primary"
        onChange={onChange}
        required
        checked={selected}
      />
      {label && (
        <label
          htmlFor={id}
          className="ml-2 block text-paragraph-small text-black dark:text-white"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Radio;
