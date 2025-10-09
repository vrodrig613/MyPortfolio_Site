// Enable keyboard navigation for links
document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        document.activeElement.classList.add("focused");
    }
});
// Project Filtering Function
function filterProjects(category) {
    let projects = document.querySelectorAll(".project");
    
    projects.forEach(project => {
        if (category === "all" || project.dataset.category === category) {
            project.style.display = "block";
        } else {
            project.style.display = "none";
        }
    });
}
// Smooth Scrolling for Navigation Links
document.querySelectorAll("nav ul li a").forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault();
        let targetSection = document.querySelector(this.getAttribute("href"));
        targetSection.scrollIntoView({ behavior: "smooth" });
    });
});
// Fade-in Animation on Scroll
document.addEventListener("scroll", function() {
    document.querySelectorAll(".fade-in").forEach(section => {
        let position = section.getBoundingClientRect().top;
        let windowHeight = window.innerHeight;
        
        if (position < windowHeight - 50) {
            section.classList.add("visible");
        }
    });
});
