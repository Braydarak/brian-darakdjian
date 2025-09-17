import React from "react";

interface TranslateLogoProps {
    width?: string;
    color?: string;
}

const TranslateLogo: React.FC<TranslateLogoProps> = ({ width = "5rem", color = 'white' }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="icon icon-tabler icons-tabler-outline icon-tabler-language-katakana transition-colors duration-300 hover:stroke-white cursor-pointer"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 5h6.586a1 1 0 0 1 .707 1.707l-1.293 1.293" />
      <path d="M8 8c0 1.5 .5 3 -2 5" />
      <path d="M12 20l4 -9l4 9" />
      <path d="M19.1 18h-6.2" />
    </svg>
  );
};

export default TranslateLogo;
