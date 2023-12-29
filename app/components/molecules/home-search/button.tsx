import clsx from "clsx";

interface ButtonProps {
  selected?: boolean;
  value: string;
  onClick?: () => any;
}
const Button: React.FC<ButtonProps> = ({ selected, value, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-6 py-1 border border-[#CBE9FF] bg-[#F7FBFF] rounded-full text-sm",
        selected && "custom-shadow"
      )}
    >
      {value}
    </button>
  );
};

export default Button;
