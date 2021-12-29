import React from 'react'
import { FaCaretDown, FaCaretUp } from 'react-icons/fa'

const Dropdown = ({ isOpen, setIsOpen }) => {
  return (
    <button
      className="sidebarDefault__toggle btn btn-blue"
      onClick={() => setIsOpen(!isOpen)}
    >
      Select page {isOpen ? <FaCaretUp /> : <FaCaretDown />}
    </button>
  )
}

export default Dropdown
