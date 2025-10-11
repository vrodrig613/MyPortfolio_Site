document.addEventListener("DOMContentLoaded", () => {

    /* --------------------------------
       Keyboard Accessibility
    -------------------------------- */
    document.addEventListener("keydown", (event) => {
        if (event.key === "Tab") {
            document.activeElement.classList.add("focused");
        }
    });

    /* --------------------------------
       Project Filtering
    -------------------------------- */
    function filterProjects(category) {
        const projects = document.querySelectorAll(".project");
        projects.forEach(project => {
            project.style.display = 
                category === "all" || project.dataset.category === category 
                ? "block" 
                : "none";
        });
    }
    window.filterProjects = filterProjects;

    /* --------------------------------
       Smooth Scrolling for Navigation
    -------------------------------- */
    document.querySelectorAll("nav ul li a").forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            target.scrollIntoView({ behavior: "smooth" });
        });
    });

    /* --------------------------------
       Fade-In on Scroll
    -------------------------------- */
    const fadeElements = document.querySelectorAll(".fade-in");
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        fadeElements.forEach(section => {
            const position = section.getBoundingClientRect().top;
            if (position < windowHeight - 50) {
                section.classList.add("visible");
            }
        });
    };
    document.addEventListener("scroll", revealOnScroll);
    revealOnScroll(); // Trigger once on load

    /* --------------------------------
       Contact Form Validation
    -------------------------------- */
    const form = document.getElementById("contactForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        let isValid = true;

        const validateField = (input, errorId, condition, message) => {
            const errorElement = document.getElementById(errorId);
            if (!condition) {
                errorElement.textContent = message;
                input.style.border = "1px solid red";
                isValid = false;
            } else {
                errorElement.textContent = "";
                input.style.border = "1px solid green";
            }
        };

        validateField(nameInput, "nameError", nameInput.value.trim() !== "", "Name is required.");
        validateField(emailInput, "emailError", /^[^ ]+@[^ ]+\.[a-z]{2,3}$/.test(emailInput.value), "Enter a valid email address.");
        validateField(messageInput, "messageError", messageInput.value.trim() !== "", "Message cannot be empty.");

        if (isValid) {
            successMessage.style.display = "block";
            setTimeout(() => {
                successMessage.style.display = "none";
                form.reset();
                [nameInput, emailInput, messageInput].forEach(i => i.style.border = "");
            }, 3000);
        }
    });

    /* --------------------------------
       Dark Mode Toggle
    -------------------------------- */
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    const darkModePref = localStorage.getItem("dark-mode");

    if (darkModePref === "enabled") {
        body.classList.add("dark-mode");
        themeToggle.textContent = "☀️ Toggle Light Mode";
    } else {
        themeToggle.textContent = "🌙 Toggle Dark Mode";
    }

    themeToggle.addEventListener("click", () => {
        const darkEnabled = body.classList.toggle("dark-mode");
        localStorage.setItem("dark-mode", darkEnabled ? "enabled" : "disabled");
        themeToggle.textContent = darkEnabled ? "☀️ Toggle Light Mode" : "🌙 Toggle Dark Mode";
    });

});
