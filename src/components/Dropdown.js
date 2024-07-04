import React, { useState } from 'react';
import './Dropdown.scss'; // Import your CSS file for styling

const Dropdown = ({ title, options, onSelect, selectedValue, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    onSelect(option);
    setIsOpen(false); // Close dropdown after selecting an option
  };

  return (
    <div className="dropdown-container">
      <div className="dropdown-title">{title}</div>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedValue ? selectedValue.label : placeholder}
      </button>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.id}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;


