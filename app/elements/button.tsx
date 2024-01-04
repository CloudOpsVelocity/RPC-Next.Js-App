type props = {
  title: any;
  icon?: any;
  buttonConClass?: string;
  buttonClass?: string;
  onChange: (e: any) => void;
};

const Button = ({
  title,
  icon,
  buttonConClass,
  buttonClass,
  onChange,
}: props) => {
  return (
    <div className={buttonConClass}>
      <button className={buttonClass} onClick={(e) => onChange(e)}>
        {icon}
        {title}
      </button>
    </div>
  );
};

export default Button;
