import React from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const Switch = ({ theme, toggleTheme }) => {
  return (
    <label className="relative inline-flex items-center cursor-pointer
      w-12 h-6 sm:w-16 sm:h-8"
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={theme === "dark"}
        onChange={toggleTheme}
      />

      {/* track */}
      <div className="w-10 md:w-12 h-6 bg-gray-300 dark:bg-gray-700 rounded-full shadow-inner transition-colors duration-300" />

      {/* knob */}
      <div
        className={`absolute left-0.5 top-0.6
          w-5 h-5 sm:w-5 sm:h-5
          bg-white rounded-full shadow
          transform transition-transform duration-300
          ${theme === "dark" ? "translate-x-5 sm:translate-x-6" : ""}
          flex items-center justify-center`}
      >
        {theme === "dark" ? (
          <FaMoon className="text-yellow-300 text-[10px] sm:text-sm" />
        ) : (
          <FaSun className="text-yellow-500 text-[10px] sm:text-sm" />
        )}
      </div>
    </label>
  );
};

export default Switch;
