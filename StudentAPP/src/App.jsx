import { useState, useEffect } from 'react';
import './App.css';
import Login from "./Login";

function App() {

  const API_URL = "http://localhost:8082/students";

  // GET TOKEN
  const token = localStorage.getItem("token");

  // IF NOT LOGGED IN
  if (!token) {
    return <Login />;
  }

  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [course, setCourse] = useState('');
  const [marks, setMarks] = useState('');
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);

  // FETCH STUDENTS
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {

    try {

      const response = await fetch(API_URL, {

        method: 'GET',

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      if (!response.ok) {
        throw new Error("Failed to fetch students");
      }

      const data = await response.json();

      setStudents(data);

    } catch (err) {

      console.log(err);

    }

  };

  // ADD OR UPDATE
  const handleAddOrUpdate = async () => {

    if (!name.trim() || !course.trim() || !marks.trim()) {

      setError('All fields are required.');
      return;

    }

    const studentData = {
      name,
      course,
      marks
    };

    try {

      // UPDATE
      if (editId !== null) {

        await fetch(`${API_URL}/${editId}`, {

          method: 'PUT',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(studentData)

        });

      }

      // ADD
      else {

        await fetch(API_URL, {

          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify(studentData)

        });

      }

      fetchStudents();

      setName('');
      setCourse('');
      setMarks('');
      setEditId(null);
      setError('');

    } catch (err) {

      console.log(err);

    }

  };

  // DELETE
  const handleDelete = async (id) => {

    try {

      await fetch(`${API_URL}/${id}`, {

        method: 'DELETE',

        headers: {
          Authorization: `Bearer ${token}`
        }

      });

      fetchStudents();

    } catch (err) {

      console.log(err);

    }

  };

  // EDIT
  const handleEdit = (student) => {

    setName(student.name);
    setCourse(student.course);
    setMarks(student.marks);
    setEditId(student.id);

  };

  // LOGOUT
  const handleLogout = () => {

    localStorage.removeItem("token");

    window.location.reload();

  };

  return (

    <div className="container main-content">

      <div style={{ textAlign: "right", marginBottom: "10px" }}>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>

      </div>

      <div className="row justify-content-center mb-4">

        <div className="col-lg-7">

          <div className="form-card">

            <div className="form-card-header">

              <h4>Student Management</h4>

              <p>
                {editId
                  ? 'Update student details'
                  : 'Add student details below'}
              </p>

            </div>

            <div className="form-card-body">

              <div className="mb-3">

                <label className="form-label">
                  Student Name
                </label>

                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setError('');
                  }}
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Course
                </label>

                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter course"
                  value={course}
                  onChange={(e) => {
                    setCourse(e.target.value);
                    setError('');
                  }}
                />

              </div>

              <div className="mb-3">

                <label className="form-label">
                  Marks
                </label>

                <input
                  type="number"
                  className="form-control custom-input"
                  placeholder="Enter marks"
                  value={marks}
                  onChange={(e) => {
                    setMarks(e.target.value);
                    setError('');
                  }}
                />

              </div>

              {error && (

                <p className="error-msg">
                  ⚠ {error}
                </p>

              )}

              <button
                className="btn-add"
                onClick={handleAddOrUpdate}
              >
                {editId ? 'Update Student' : '+ Add Student'}
              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="table-card">

        <div className="table-card-header">

          <h5>Student Records</h5>

          <span className="student-count">
            {students.length} students
          </span>

        </div>

        {students.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              📋
            </div>

            <h5>No Students Yet</h5>

            <p>Add students using the form above</p>

          </div>

        ) : (

          <div className="table-responsive">

            <table className="table custom-table">

              <thead>

                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Marks</th>
                  <th>Action</th>
                </tr>

              </thead>

              <tbody>

                {students.map((s, i) => (

                  <tr key={s.id}>

                    <td>{i + 1}</td>

                    <td>{s.name}</td>

                    <td>{s.course}</td>

                    <td>{s.marks}</td>

                    <td>

                      <button
                        className="btn-edit"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn-delete"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>

  );

}

export default App;