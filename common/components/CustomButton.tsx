"use client";
type props = {
  title: any;
  icon?: any;
  buttonConClass?: string;
  buttonClass?: string;
  onChange?: (e: any) => void;
  type?: any;
  loading?: boolean;
  name?: string;
  toolTip? :string;
  dataAction?:string;
};

const ButtonElement = ({
  title,
  icon,
  buttonConClass,
  buttonClass,
  onChange,
  type,
  loading,
  name,
  toolTip,
  dataAction
}: props) => {
  return (
    <div className={buttonConClass || ""}>
      <button
        name={name}
        className={buttonClass || ""}
        type={type || "button"}
        onClick={(e) => {
          // e.stopPropagation();
          onChange && onChange(e);
        }}
        disabled={loading}
        style={{ cursor: loading ? "not-allowed" : "pointer" }}
        title={toolTip ? toolTip : title }
        aria-label={toolTip ? toolTip : title }
        data-action={dataAction}
      >
        {icon}
        {title}
      </button>
    </div>
  );
};

export default ButtonElement;
