"use client";
import React, { useEffect, useRef } from "react";
import { useAtom } from "jotai";
import { modalAtom } from "../../store/jotai";

const Dialog: React.FC = () => {
  const [modalState, dispatch] = useAtom(modalAtom);
  console.log(modalState);
  const { isOpen, content } = modalState;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        dispatch({ type: "CLOSE" });
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg max-w-lg w-full"
        ref={dialogRef}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Dialog Title</h2>
          <button
            className="text-gray-600 hover:text-gray-900"
            onClick={() => dispatch({ type: "CLOSE" })}
          >
            &times;
          </button>
        </div>
        <div className="p-4">
          {typeof content === "string" ? (
            <p>{content}</p>
          ) : Array.isArray(content) ? (
            <ul>
              {content.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          ) : content ? (
            <pre>{JSON.stringify(content, null, 2)}</pre>
          ) : null}
        </div>
        <div className="p-4 border-t text-right">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none"
            onClick={() => dispatch({ type: "CLOSE" })}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
