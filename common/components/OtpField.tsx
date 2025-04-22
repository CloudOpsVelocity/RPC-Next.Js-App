"use client";

import React, { useRef, ChangeEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";

interface OtpInputProps {
  onChange: (name: string, value: string) => void;
  name: string; // Name for the OTP field (for React Hook Form)
}

const OtpInput: React.FC<OtpInputProps> = ({ onChange, name }) => {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const updateOtpValue = () => {
    const otp = inputsRef.current.map((input) => input?.value || "").join("");
    onChange(name, otp); // Update the form value directly
  };

  const handleChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;

    inputsRef.current[index]!.value = value;
    updateOtpValue();

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div style={styles.otpContainer}>
      {[0, 1, 2, 3].map((_, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          className="otp-input"
          ref={(el) => (inputsRef.current[index] = el)}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          style={styles.otpInput}
        />
      ))}
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  otpContainer: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    marginTop: "40px",
  },
  otpInput: {
    width: "50px",
    height: "50px",
    fontSize: "24px",
    textAlign: "center",
    borderBottom: "2px solid #ccc",
    outline: "none",
    transition: "border 0.3s",
  },
};

export default OtpInput;
