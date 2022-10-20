import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Axios from "axios";
import Header from "./Header";
import List from "./List";
import Add from "./Add";
import Edit from "./Edit";
import Drop from "./Drop";

function Dashboard() {
  const [studentlist, setStudentlist] = useState([]);
  useEffect(() => {
    Axios.get("http://65.2.152.190:3306/api/get").then((response) => {
      setStudentlist(response.data);
      console.log(response.data);
    });
  }, []);

  const [selecedtstudent, setSelectedStudent] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDrop, setIsDrop] = useState(false);

  const handleEdit = (rollno) => {
    const [student] = studentlist.filter(
      (student) => student.rollno === rollno
    );
    setSelectedStudent(student);
    setIsEditing(true);
  };

  const handleDelete = (rollno) => {
    Axios.delete(`http://65.2.152.190:3306/api/delete/${rollno}`);
    Swal.fire({
      icon: "warning",
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      showCancelButton: true,
      confirmButtonText: "Delete it!",
      confirmButtonColor: "#ec1e4b",
      cancelButtonText: "Cancel!",
      cancelButtonColor: "#9d9597",
    }).then((result) => {
      if (result.value) {
        const [student] = studentlist.filter(
          (student) => student.rollno === rollno
        );
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: `${student.firstname} ${student.lastname}'s data has been deleted.`,
          showConfirmButton: false,
          timer: 1500,
        }).then((result) => {
          window.location.reload();
        });
      }
    });
  };

  return (
    <div className="container">
      {/* List */}
      {!isAdding && !isEditing && !isDrop && (
        <>
          <Header setIsAdding={setIsAdding} setIsDrop={setIsDrop} />
          <br />
          <br />
          <br />
          <List
            studentlist={studentlist}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {/* Add */}
      {isAdding && <Add studentlist={studentlist} setIsAdding={setIsAdding} />}
      {/* Edit */}
      {isEditing && (
        <Edit
          studentlist={studentlist}
          selecedtstudent={selecedtstudent}
          setIsEditing={setIsEditing}
        />
      )}
      {/* Drop */}
      {isDrop && <Drop setIsDrop={setIsDrop} />}
    </div>
  );
}

export default Dashboard;
