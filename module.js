import { marked } from "marked";

const RESOURCE_PATH = "./Assets/Resources/";
const IMAGE_PATH = "./Assets/Images/";

export function toggleSidebar(event) {
    event.stopPropagation();
    document.getElementById("sidebar").classList.toggle("hidden");
}

export function toggleFolder(element, event) {
    event.stopPropagation();
    element.classList.toggle('open');
    
    // toggle hidden for content
    let children = element.querySelector(".folder-content");
    if (children) {
        children.classList.toggle("hidden");
    }
    
    // transform header's caret
    let header = element.querySelector(".folder-header");
    let caret = header.querySelector(":scope > .caret");
    if (caret) {
        caret.style.transform = element.classList.contains("open") ? "rotate(90deg)" : "rotate(0deg)";
    }
}

function logError(err, fileName) {
    console.error(err);
    display.innerHTML = `<h2>Error: cannot load ${fileName}`;
}

function displayMarkdown(display, fileName) {
    display.style.paddingLeft = "10px";
    display.style.paddingRight = "10px";
    fetch(fileName)
        .then(response => response.text())
        .then(md_text => {
            const content = marked.parse(md_text);
            display.innerHTML = `<div>${content}</div>`;
        }).catch(err => logError(err, fileName));
}

function createDeleteTab(newTab) {
    const deleteTab = document.createElement("img");
    deleteTab.className = "delete_button";
    deleteTab.src = IMAGE_PATH + "/deleteButton.png";
    deleteTab.alt = "X";
    deleteTab.addEventListener("click", function(event) {
        event.stopPropagation();
        tabs.removeChild(newTab);
        if (tabs.children.length == 0) {
            document.getElementById('file-display').innerHTML = "";
        } else {
            openFile(tabs.children[tabs.children.length - 1].innerText, event);
        }
    });
    newTab.appendChild(deleteTab);
}

function createTab(fileName) {
    const tabs = document.getElementById("tabs");
    let openTabs = tabs.children;
    for (let i = 0; i < openTabs.length; i++) {
        openTabs[i].classList.remove("active");
    }

    for (let i = 0; i < openTabs.length; i++) {
        if (openTabs[i].innerText === fileName) {
            openTabs[i].classList.add("active");
            return null;
        }
    }

    const newTab = document.createElement("div");
    newTab.className = "tab";
    newTab.innerText = fileName;
    newTab.classList.add("active");
    newTab.addEventListener("click", () => {
        openFile(fileName, event);
    });

    createDeleteTab(newTab);

    tabs.appendChild(newTab);
}

export function openFile(fileName, event) {
    event.stopPropagation();
    let display = document.getElementById('file-display');
    const filePath = RESOURCE_PATH + fileName;

    if (fileName.endsWith(".md")) {
        displayMarkdown(display, filePath);
    } else if (fileName.endsWith(".pdf")) {
        display.style.padding = "0px";
        display.innerHTML = `<iframe src="${filePath}"></iframe>`;
    } else {
        // *** NOTE: should never occur once all resources uploaded
        display.innerHTML = `<h2>Error: "${filePath}" is not a supported file type</h2>`;
    }

    createTab(fileName);
}