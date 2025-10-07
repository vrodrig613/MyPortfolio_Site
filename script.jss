// Enable keyboard navigation for links
document.addEventListener("keydown", function(event) {
    if (event.key === "Tab") {
        document.activeElement.classList.add("focused");
    }
});
