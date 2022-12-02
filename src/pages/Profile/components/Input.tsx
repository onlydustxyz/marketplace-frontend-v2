import { memo, useEffect, useState } from "react";
import { useFormContext, useFormState, RegisterOptions } from "react-hook-form";

type PropsType = {
  label?: string;
  placeholder?: string;
  name: string;
  options?: RegisterOptions;
};

const Input: React.FC<PropsType> = ({ label, placeholder, name, options = {} }) => {
  const { register } = useFormContext();
  const { errors } = useFormState({ name });
  const error = errors[name];

  // @TODO: This hack is to force rerender in tests (-_.-)
  const [_, makeReactive] = useState<unknown>();
  useEffect(() => {
    makeReactive(errors[name]);
  }, [errors[name]]);

  return (
    <label html-for={name} className="flex flex-col">
      {label}
      <input
        id={name}
        placeholder={placeholder}
        {...register(name, options)}
        className={error ? "border-2 border-rose-600" : ""}
      />
      <span className="text-red-600 text-sm">{error?.message ? error.message.toString() : "\u00A0"}</span>
    </label>
  );
};

export default memo(Input);
