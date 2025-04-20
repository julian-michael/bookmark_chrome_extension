const mainAddBtn = document.getElementById("main-add-btn");
const scrollBox = document.getElementById("scrollBox");
const editBoxContainer = document.getElementById("edit-box-container");
const editBox = document.getElementById("edit-box");
const editInput = document.getElementById("edit-input");
const editSaveBtn = document.getElementById("edit-save-btn");
const editCancelBtn = document.getElementById("edit-cancel-btn");
let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || {};

let currentlyEditingKey = null; // Track which bookmark is being edited

function renderBookmarks() {
    scrollBox.innerHTML = `<button class="scroll-add-btn" id="scroll-add-btn">
                            <i class="fa-solid fa-plus"></i>
                          </button>`;

    const scrollAddBtn = document.getElementById("scroll-add-btn");

    for (const key in bookmarks) {
        const div = document.createElement("div");
        div.className = "bookmark-item";

        const span = document.createElement("span");
        span.textContent = bookmarks[key];
        span.addEventListener("click", () => showEditBox(key, bookmarks[key]));
        // Add click listener to span

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
        deleteButton.addEventListener("click", () => deleteBookmark(key));

        div.appendChild(span); // Append span, not just text
        div.appendChild(deleteButton);
        scrollBox.appendChild(div);
    }

    scrollAddBtn.addEventListener("click", () => {
        addBookmark();
        scrollBox.scrollLeft = scrollBox.scrollWidth;
    });
}

function addBookmark() {
    const timestamp = new Date().toLocaleString();
    bookmarks[timestamp] = "New Bookmark";
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
}

function deleteBookmark(key) {
    delete bookmarks[key];
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    renderBookmarks();
}

function editBookmarkName(key, span) {
    const newName = prompt("Enter new bookmark name:", bookmarks[key]);
    if (newName) {
        bookmarks[key] = newName;
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
        span.textContent = newName; // Update the displayed name
    }
}

renderBookmarks();

mainAddBtn.addEventListener("click", addBookmark);

function showEditBox(key, currentName) {
    currentlyEditingKey = key;
    editInput.value = currentName;
    editBoxContainer.style.display = "flex"; // Show the edit box
    editInput.focus(); // Focus on the input
}

function hideEditBox() {
    editBoxContainer.style.display = "none";
    currentlyEditingKey = null;
}

editSaveBtn.addEventListener("click", () => {
    if (currentlyEditingKey) {
        const newName = editInput.value.trim();
        if (newName) {
            bookmarks[currentlyEditingKey] = newName;
            localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
            renderBookmarks();
        }
        hideEditBox();
    }
});

editCancelBtn.addEventListener("click", hideEditBox);

renderBookmarks();
mainAddBtn.addEventListener("click", addBookmark);