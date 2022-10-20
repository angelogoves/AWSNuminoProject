import React from "react";
import { RiFileExcel2Fill } from "react-icons/ri";

function Header({ setIsAdding, setIsDrop }) {
  return (
    <header>
      <h1 align="centre">Student Details</h1>
      <div className="container">
        <div className="btn-text-left">
          <button className="accent-button" onClick={() => setIsAdding(true)}>
            Add Student
          </button>
          <button
            className="muted-button"
            style={{ marginLeft: "1060px" }}
            onClick={() => setIsDrop(true)}
          >
            Drop File <RiFileExcel2Fill />
          </button>
          <br />
          <br />
        </div>
      </div>
    </header>
  );
}

export default Header;
