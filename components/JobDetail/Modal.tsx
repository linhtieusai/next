import { useEffect } from "react";

const Modal = ({ children, onClose, showCloseButton, zIndex=5  }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClick = (event) => {
      if (event.target === event.currentTarget) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClick);
    };
  }, [onClose]);

  return (
    <div className={`fixed flex inset-0 z-${zIndex} flex items-center justify-center bg-black bg-opacity-50`}>
      <div className="relative p-6 bg-white rounded-lg shadow-lg">
      {showCloseButton && (
          <button
            onClick={onClose}
            className="absolute text-gray-500 top-2 right-2 hover:text-gray-600 focus:outline-none"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-6 h-6">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
