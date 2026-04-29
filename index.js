const form = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const dropZone = document.getElementById("dropZone");
const fileListContainer = document.getElementById("fileList");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");
const btnText = document.getElementById("btnText");
const status = document.getElementById("status");

let queue = [];

dropZone.onclick = () => fileInput.click();

fileInput.onchange = (e) => {
  handleNewFiles(e.target.files);
  fileInput.value = "";
};

// Drag & Drop
["dragover", "dragleave", "drop"].forEach((name) => {
  dropZone.addEventListener(name, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

dropZone.ondragover = () => dropZone.classList.add("drop-zone--active");
dropZone.ondragleave = () => dropZone.classList.remove("drop-zone--active");
dropZone.ondrop = (e) => {
  dropZone.classList.remove("drop-zone--active");
  handleNewFiles(e.dataTransfer.files);
};

function handleNewFiles(files) {
  Array.from(files).forEach((file) => {
    if (!queue.some((f) => f.name === file.name && f.size === file.size)) {
      queue.push(file);
    }
  });
  renderQueue();
}

function removeFile(index) {
  queue.splice(index, 1);
  renderQueue();
}

function renderQueue() {
  fileListContainer.innerHTML = "";
  queue.forEach((file, index) => {
    const item = document.createElement("div");
    item.className = "file-item";
    item.innerHTML = `
                    <div class="file-meta">
                        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color:var(--primary)">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                        </svg>
                        <div class="file-details">
                            <span class="file-name">${file.name}</span>
                            <span class="file-size">${(file.size / 1024).toFixed(1)} KB</span>
                        </div>
                    </div>
                    <button type="button" class="remove-file" onclick="removeFile(${index})">
                        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                `;
    fileListContainer.appendChild(item);
  });

  // Auto-scroll to bottom as files are added
  fileListContainer.scrollTop = fileListContainer.scrollHeight;
}

form.onsubmit = async (e) => {
  e.preventDefault();
  if (queue.length === 0) {
    updateStatus("Attach files first", "msg-error");
    return;
  }

  setLoading(true);
  updateStatus("", "");

  const formData = new FormData();
  formData.append("name", document.getElementById("name").value);
  queue.forEach((file) => formData.append("files", file));

  try {
    const response = await fetch(
      "http://192.168.1.11:8080/upload",
      {
        method: "POST",
        body: formData,
      },
    );
    if (response.ok) {
      updateStatus("Upload successful", "msg-success");
      queue = [];
      renderQueue();
      form.reset();
    } else {
      updateStatus("Server error: " + response.status, "msg-error");
    }
  } catch (err) {
    updateStatus("Network error (check console)", "msg-error");
  } finally {
    setLoading(false);
  }
};



function setLoading(isLoading) {
  submitBtn.disabled = isLoading;
  loader.style.display = isLoading ? "block" : "none";
  btnText.textContent = isLoading ? "Processing..." : "Upload to Server";
}

function updateStatus(text, className) {
  status.textContent = text;
  status.className = "status-area " + className;
}
