import React, { ChangeEventHandler } from "react";

export interface TextInputProps {
  placeHolder: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name?: string;
  id?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  placeHolder,
  onChange,
  ...props
}) => {
  return (
    <div>
      <input
        {...props}
        type="text"
        name="price"
        id="price"
        onChange={onChange}
        className="block w-full rounded-md border-gray-300 pl-7 pr-12 m-2 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        placeholder={placeHolder}
      />
    </div>
  );
};
