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
        "px-6 py-1 border border-[#CBE9FF] bg-[#F9FCFF] rounded-full text-sm",
        selected &&
          "custom-shadow bg-[#AEDDFF] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.10)]"
      )}
    >
      {value}
    </button>
  );
};

export default Button;
