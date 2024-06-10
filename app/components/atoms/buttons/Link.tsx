import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps extends HTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  variant?: "blue" | "green";
  className?: string;
  href: string;
}

const Link: FC<ButtonProps> = ({
  children,
  variant = "blue",
  className,
  href,
  ...rest
}) => {
  const baseClasses =
    "inline-flex justify-center items-center gap-2.5 rounded p-2.5  text-white text-2xl font-bold";
  const variantClasses = clsx({
    "bg-[#0073c6]": variant === "blue",
    "bg-green-500": variant === "green",
  });

  const classes = clsx(baseClasses, variantClasses, className);

  return (
    <a href={href} target="_blank" className={classes} {...rest}>
      {children}
    </a>
  );
};

export default Link;
