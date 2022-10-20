import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Add({ studentlist, setIsAdding }) {
  const [rollno, setRollno] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [department, setDepartment] = useState("");
  const [academicyear, setAcademicyear] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhoneno] = useState("");

  const submitReview = () => {
    Axios.post("http://65.2.152.190:3306/api/insert", {
      rollno: rollno,
      firstname: firstname,
      lastname: lastname,
      department: department,
      academicyear: academicyear,
      dob: dob,
      email: email,
      phoneno: phoneno,
    }).then(() => {});
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (
      !rollno ||
      !firstname ||
      !lastname ||
      !department ||
      !academicyear ||
      !dob ||
      !email ||
      !phoneno
    ) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }
    setIsAdding(false);

    Swal.fire({
      icon: "success",
      title: "Student Added!",
      text: `${firstname} ${lastname}'s data has been Added.`,
      showConfirmButton: true,
      timer: 2500,
    }).then((result) => {
      window.location.reload();
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Add Student</h1>
        <hr />
        <input
          id="rollno"
          type="text"
          name="rollno"
          value={rollno}
          placeholder="Roll No"
          onChange={(e) => setRollno(e.target.value)}
        />
        <input
          id="firstname"
          type="text"
          //ref={textInput}
          name="firstname"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
        />
        <input
          id="lastname"
          type="text"
          name="lastname"
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
        />
        <select
          name="department"
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        >
          <option value="">Select Department</option>
          <option value="MECH">MECH</option>
          <option value="ECOMP">ECOMP</option>
          <option value="COMP">COMP</option>
          <option value="IT">IT</option>
        </select>
        <select
          name="academicyear"
          id="academicyear"
          value={academicyear}
          onChange={(e) => setAcademicyear(e.target.value)}
        >
          <option value="">Select Academic Year</option>
          <option value="First Year">First Year</option>
          <option value="Second Year">Second Year</option>
          <option value="Third Year">Third Year</option>
          <option value="Fourth Year">Fourth Year</option>
        </select>

        <input
          id="dob"
          //placeholder="Date of Birth (YYYY-MM-DD)"
          type="date"
          name="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          id="phoneno"
          type="tel"
          name="phoneno"
          pattern="[0-9]{10}"
          value={phoneno}
          placeholder="Phone No"
          onChange={(e) => setPhoneno(e.target.value)}
        />

        <div style={{ marginTop: "30px" }}>
          <input
            className="accent-button"
            type="submit"
            value="Add"
            onClick={submitReview}
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
}
export default Add;
