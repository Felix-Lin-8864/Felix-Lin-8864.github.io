import { toggleFolder, toggleSidebar, openFile } from "./module.js";

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("explore").addEventListener("click", function(event) {
        toggleSidebar(event);
    });
    
    // clicking a file calls openFile
    document.querySelectorAll(".file").forEach(file => {
        file.addEventListener("click", function(event) {
            openFile(file.textContent, event);
        });
    });
    
    // Ensure all folders are in their initial "closed" state when the page loads
    document.querySelectorAll('.folder').forEach(folder => {
        // on click, folder will toggle
        folder.addEventListener("click", function(event) {
            toggleFolder(folder, event);
        });

        const caret = folder.querySelector(".caret");
        if (caret) {
            // ensure subfolder carets are set properlyu
            caret.style.transform = "rotate(0deg)";
        }
        const hiddenDiv = folder.querySelector('.hidden');
        if (hiddenDiv) {
            hiddenDiv.classList.add('hidden');
        }
    });

    openFile("Welcome.md", event);
});