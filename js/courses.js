// courses.js

const courses = [
    // B.Tech
    "B.Tech – Computer Science & Engineering",
    "B.Tech – Artificial Intelligence & Machine Learning",
    "B.Tech – Computer Science & Business Systems",
    "B.Tech – Cyber Security",
    "B.Tech – Data Analytics",
    "B.Tech – Software Engineering",
    "B.Tech – Electronics & Comm. Engg",
    "B.Tech – ECE (Embedded Systems)",
    "B.Tech – ECE (VLSI)",
    "B.Tech – Mechanical Engineering",
    // BBA/B.Com
    "BBA",
    "B.Com – Finance",
    // Integrated/Postgraduate
    "Integrated M.Tech CSE",
    "Integrated M.Tech Software Engg",
    "M.Tech – VLSI Design",
    "M.Sc – Data Science",
    "M.Sc – Physics",
    "M.Sc – Chemistry",
    "MBA – Master of Business Administration"
];

const coursesList = document.getElementById('coursesList');
const searchInput = document.getElementById('searchCourses');

function displayCourses(filteredCourses = null) {
    coursesList.innerHTML = '';
    const list = filteredCourses || courses;

    list.forEach(course => {
        const div = document.createElement('div');
        div.className = 'course-box-page';
        div.textContent = course;
        coursesList.appendChild(div);
    });
}

// Initial display
displayCourses();

// Search functionality
searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filtered = courses.filter(course => course.toLowerCase().includes(query));
    displayCourses(filtered);
});
