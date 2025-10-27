"use client"
import React, { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  muted?: boolean; 
  children: ReactNode;
};

export default function Button({
  variant = "primary",
  muted = false,
  children,
  className,
  ...props
}: ButtonProps) {
  const baseClasses = "btn";


  const clickSound = new Audio("/audio/click.mp3");

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!muted) clickSound.play().catch(() => {});
    if (props.onClick) props.onClick(e);
  };

  return (
    <button {...props} onClick={handleClick} className={clsx(baseClasses ,className)}>

      {children}
    </button>
  );
}
