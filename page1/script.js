let uploadBtn = document.querySelector(".upload-btn");
let fileInput = document.querySelector(".file-input");
let textarea = document.querySelector("textarea");
let fileHint = document.querySelector(".file-hint");
let dropCode = document.querySelector(".drop-code");

uploadBtn.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", () => {
  handleFile(fileInput.files[0]);
});

/* ================= Drag & Drop ================= */

textarea.addEventListener("dragover", (e) => {
  e.preventDefault();
  textarea.classList.add("drag-over");
  dropCode.classList.add("active");
});

textarea.addEventListener("dragleave", () => {
  textarea.classList.remove("drag-over");
  dropCode.classList.remove("active");
});

textarea.addEventListener("drop", (e) => {
  e.preventDefault();
  textarea.classList.remove("drag-over");
  dropCode.classList.remove("active");
  handleFile(e.dataTransfer.files[0]);
});
//
function handleFile(file) {
  if (!file) return;

  let allowedExtensions = ["cpp", "py", "js", "java", "cs", "txt"];
  let ext = file.name.split(".").pop().toLowerCase();

  if (!allowedExtensions.includes(ext)) {
    alert("Please upload a valid code file");
    return;
  }

  let reader = new FileReader();
  reader.onload = () => {
    textarea.value = reader.result;
    fileHint.textContent = file.name;
  };

  reader.readAsText(file);
}

function resetBtn() {
  textarea.value = "";
  fileInput.value = "";
  fileHint.textContent = "No file selected";
}
