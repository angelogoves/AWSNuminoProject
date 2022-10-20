import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

function List({ studentlist, handleEdit, handleDelete }) {
  /*
    const [studentlist, setStudentlist] = useState([])
    useEffect(()=>{
        Axios.get('http://65.2.152.190:3306/api/get').then((response)=>{
            setStudentlist(response.data)
            console.log(response.data)
        })
    },[]);
/*
    const deleteReview = (rollno) => {
        Axios.delete(`http://65.2.152.190:3001/api/delete`,rollno).then((response) => {
          setStudentlist(response.data)
        });
      };
*/

  return (
    <div className="container">
      <div className="contain-table">
        <table className="striped-table">
          <thead>
            <tr>
              <th>Roll No.</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Department</th>
              <th>Academic Year</th>
              <th>DOB</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th colSpan={2} className="text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {studentlist.map((val) => (
              <tr key={val.rollno}>
                <td>{val.rollno}</td>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.department}</td>
                <td>{val.academicyear}</td>
                <td>{val.dob.slice(0, 10)}</td>
                <td>{val.email}</td>
                <td>{val.phoneno}</td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(val.rollno)}
                    className="button muted-button"
                  >
                    <MdEdit/>
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => {
                      handleDelete(val.rollno);
                    }}
                    className="button muted-button"
                  >
                    <MdDelete/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;
