type InputComponentProps = React.InputHTMLAttributes<HTMLInputElement>;

const InputComponent: React.FC<InputComponentProps> = ({
  className = "",
  ...rest
}) => {
  return (
    <input
      {...rest}
      className={`${className}
      h-14 rounded-lg appearance-none
      bg-brand-gray4 border border-brand-black3
      focus:outline-brand-primary w-full p-4
      focus:border-none
      text-white text-base placeholder:text-brand-gray1
      `}
    />
  );
};

export default InputComponent;
