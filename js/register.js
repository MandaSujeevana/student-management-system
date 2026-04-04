// register.js

const form = document.getElementById('registerForm');
const message = document.getElementById('message');

let students = JSON.parse(localStorage.getItem('students')) || [];

// Full programme codes mapping (for consistency)
const courseCodes = {
    "B.Tech – Computer Science & Engineering": "B.Tech CSE",
    "B.Tech – Artificial Intelligence & Machine Learning": "B.Tech AI & ML",
    "B.Tech – Computer Science & Business Systems": "B.Tech CSBS",
    "B.Tech – Cyber Security": "B.Tech Cyber Security",
    "B.Tech – Data Analytics": "B.Tech Data Analytics",
    "B.Tech – Software Engineering": "B.Tech Software Engg",
    "B.Tech – Electronics & Comm. Engg": "B.Tech ECE",
    "B.Tech – ECE (Embedded Systems)": "B.Tech ECE Embedded",
    "B.Tech – ECE (VLSI)": "B.Tech ECE VLSI",
    "B.Tech – Mechanical Engineering": "B.Tech Mechanical",
    "BBA": "BBA",
    "B.Com – Finance": "B.Com Finance",
    "Integrated M.Tech CSE": "Integrated M.Tech CSE",
    "Integrated M.Tech Software Engg": "Integrated M.Tech SW Engg",
    "M.Tech – VLSI Design": "M.Tech VLSI",
    "M.Sc – Data Science": "M.Sc Data Science",
    "M.Sc – Physics": "M.Sc Physics",
    "M.Sc – Chemistry": "M.Sc Chemistry",
    "MBA – Master of Business Administration": "MBA"
};

// Check if we are editing
let editIndex = localStorage.getItem('editIndex');
let editStudent = JSON.parse(localStorage.getItem('editStudent'));

if(editStudent) {
    document.getElementById('name').value = editStudent.name;
    document.getElementById('email').value = editStudent.email;
    document.getElementById('phone').value = editStudent.phone;
    document.getElementById('password').value = editStudent.password;
    document.getElementById('confirmPassword').value = editStudent.password;

    // Set dropdown selection correctly
    const courseDropdown = document.getElementById('course');
    for (let i = 0; i < courseDropdown.options.length; i++) {
        if(courseDropdown.options[i].value === editStudent.course) {
            courseDropdown.selectedIndex = i;
            break;
        }
    }

    localStorage.removeItem('editStudent'); // Remove after pre-filling
}

form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const course = document.getElementById('course').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Validation
    if(!name || !email || !phone || !course || !password || !confirmPassword) {
        message.textContent = "All fields are required!";
        message.style.color = "red";
        return;
    }

    if(password !== confirmPassword) {
        message.textContent = "Passwords do not match!";
        message.style.color = "red";
        return;
    }

    const studentData = {name, email, phone, course, password};

    if(editIndex !== null) {
        students[editIndex] = studentData;
        localStorage.removeItem('editIndex');
        editIndex = null;
        message.textContent = "Student updated successfully!";
        message.style.color = "green";
    } else {
        students.push(studentData);
        message.textContent = "Student registered successfully!";
        message.style.color = "green";
    }

    fetch("http://localhost:3000/add-student", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: name,
        email: email,
        course: course
    })
})
.then(res => res.json())
.then(data => {
    alert(data.message);
})
.catch(err => {
    console.log(err);
});
    form.reset();
});
