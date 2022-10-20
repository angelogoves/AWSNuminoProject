import React, { useState } from "react";
import Swal from "sweetalert2";
import Axios from "axios";

function Edit({ studentlist, selecedtstudent, setIsEditing }) {
  const [rollno] = useState(selecedtstudent.rollno);
  const [firstname, setFirstname] = useState(selecedtstudent.firstname);
  const [lastname, setLastname] = useState(selecedtstudent.lastname);
  const [department, setDepartment] = useState(selecedtstudent.department);
  const [academicyear, setAcademicyear] = useState(
    selecedtstudent.academicyear
  );
  const [dob, setDob] = useState(selecedtstudent.dob.slice(0, 10));
  const [email, setEmail] = useState(selecedtstudent.email);
  const [phoneno, setPhoneno] = useState(selecedtstudent.phoneno);

  const updateReview = (rollno) => {
    Axios.put("http://65.2.152.190:3306/api/update", {
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

  const handleEdit = (e) => {
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
    setIsEditing(false);

    Swal.fire({
      icon: "success",
      title: "Updated!",
      text: `${firstname} ${lastname}'s data has been updated.`,
      showConfirmButton: false,
      timer: 1000,
    }).then((result) => {
      window.location.reload();
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleEdit}>
        <h1>Edit Student</h1>
        <hr />
        <label id="roll">Roll No.: {rollno}</label>
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
            value="Update"
            onClick={updateReview(rollno)}
          />
          <input
            style={{ marginLeft: "12px" }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
}
export default Edit;
