const Button = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded bg-primary hover:bg-primaryDark text-white transition-colors duration-200 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
