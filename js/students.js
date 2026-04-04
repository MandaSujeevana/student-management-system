// students.js

// Full programme names mapping
const courseNames = {
    "B.Tech CSE": "B.Tech – Computer Science & Engineering",
    "B.Tech AI & ML": "B.Tech – Artificial Intelligence & Machine Learning",
    "B.Tech CSBS": "B.Tech – Computer Science & Business Systems",
    "B.Tech Cyber Security": "B.Tech – Cyber Security",
    "B.Tech Data Analytics": "B.Tech – Data Analytics",
    "B.Tech Software Engg": "B.Tech – Software Engineering",
    "B.Tech ECE": "B.Tech – Electronics & Comm. Engg",
    "B.Tech ECE Embedded": "B.Tech – ECE (Embedded Systems)",
    "B.Tech ECE VLSI": "B.Tech – ECE (VLSI)",
    "B.Tech Mechanical": "B.Tech – Mechanical Engineering",
    "BBA": "BBA",
    "B.Com Finance": "B.Com – Finance",
    "Integrated M.Tech CSE": "Integrated M.Tech CSE",
    "Integrated M.Tech SW Engg": "Integrated M.Tech Software Engg",
    "M.Tech VLSI": "M.Tech – VLSI Design",
    "M.Sc Data Science": "M.Sc – Data Science",
    "M.Sc Physics": "M.Sc – Physics",
    "M.Sc Chemistry": "M.Sc – Chemistry",
    "MBA": "MBA – Master of Business Administration"
};

let students = [];

const tableBody = document.querySelector('#studentsTable tbody');

// 🔹 FETCH DATA FROM BACKEND
function loadStudents() {
    fetch("http://localhost:3000/get-students")
        .then(res => res.json())
        .then(data => {
            students = data;
            displayStudents();
        })
        .catch(err => console.log(err));
}

// 🔹 DISPLAY FUNCTION
function displayStudents(filteredStudents = null) {
    tableBody.innerHTML = '';
    const list = filteredStudents || students;

    list.forEach((student, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone || "-"}</td>
            <td>${courseNames[student.course] || student.course}</td>
            <td>
                <button onclick="deleteStudent('${student.email}')">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// 🔹 DELETE (Backend)
function deleteStudent(email) {
    if (confirm("Are you sure?")) {

        fetch(`http://localhost:3000/delete-student/${email}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            alert(data.message);
            loadStudents(); // refresh table
        })
        .catch(err => console.log(err));
    }
}

// 🔹 SEARCH
document.getElementById('searchInput').addEventListener('input', function () {
    const query = this.value.toLowerCase();

    const filtered = students.filter(student =>
        student.name.toLowerCase().includes(query) ||
        (courseNames[student.course] || "").toLowerCase().includes(query)
    );

    displayStudents(filtered);
});

// 🔹 SORT
function sortTable(by) {
    students.sort((a, b) => {
        let valA = (by === 'course') ? courseNames[a[by]] : a[by].toLowerCase();
        let valB = (by === 'course') ? courseNames[b[by]] : b[by].toLowerCase();
        return valA > valB ? 1 : valA < valB ? -1 : 0;
    });

    displayStudents();
}

// 🔹 LOAD DATA WHEN PAGE OPENS
loadStudents();