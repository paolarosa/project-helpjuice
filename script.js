// document.addEventListener("DOMContentLoaded", () => {
//   const editor = document.querySelector(".editor");
//   const suggestions = document.querySelector(".suggestions");
//   const keywordSpan = document.querySelector(".keyword");
//   const initialPlaceholder = "Type / for blocks, @ to link docs or people";
//   const headingPlaceholder = "Heading 1";

//   // Inicialmente, adicione o placeholder
//   editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;

//   editor.addEventListener("input", () => {
//     const content = editor.textContent.trim();
//     if (content.startsWith("/")) {
//       const keyword = content.substring(1);
//       keywordSpan.textContent = keyword;
//       suggestions.hidden = false;
//     } else {
//       suggestions.hidden = true;
//     }

//     // Verifica se o editor contém um Heading 1 e mantém o texto dentro dele
//     if (editor.innerHTML.includes("<h1")) {
//       const regex = /<h1[^>]*>(.*?)<\/h1>/g;
//       let match = regex.exec(editor.innerHTML);
//       if (match) {
//         const newText = match[1]; // Obtém apenas o texto dentro do H1
//         editor.innerHTML = `<h1>${newText}</h1>`; // Reinsere o texto mantendo-o dentro do H1
//         placeCursorAtEnd(); // Coloca o cursor no final do H1
//       }
//     }
//   });

//   document.addEventListener("click", (event) => {
//     if (!suggestions.contains(event.target) && !editor.contains(event.target)) {
//       suggestions.hidden = true;
//     }
//   });

//   suggestions.addEventListener("click", (event) => {
//     if (event.target.closest(".suggestion")) {
//       editor.innerHTML = `<h1>${headingPlaceholder}</h1>`;
//       editor.focus();
//       suggestions.hidden = true;
//       placeCursorAtEnd(); // Coloca o cursor no final do H1
//     }
//   });

//   editor.addEventListener("focus", () => {
//     const content = editor.innerHTML.trim();
//     if (
//       content === `<div class="placeholder">${initialPlaceholder}</div>` ||
//       content === `<h1>${headingPlaceholder}</h1>`
//     ) {
//       editor.innerHTML = ""; // Limpar conteúdo ao focar
//     }
//   });

//   editor.addEventListener("blur", () => {
//     const content = editor.innerHTML.trim();
//     if (content === "") {
//       editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;
//     }
//   });

//   editor.addEventListener("keydown", (event) => {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Impede a inserção de nova linha
//       const content = editor.textContent.trim();
//       if (content.startsWith("/")) {
//         editor.innerHTML = `<h1>${content.substring(1).trim()}</h1>`;
//       }
//     }
//   });

//   editor.addEventListener("input", () => {
//     // Se o editor contém apenas um Heading 1 vazio, remove o placeholder
//     if (editor.innerHTML === "<h1></h1>") {
//       editor.innerHTML = ""; // Remove completamente o placeholder quando começa a digitar
//     }

//     // Mantém o texto digitado dentro do Heading 1
//     if (editor.innerHTML.startsWith("<h1>")) {
//       const headingText = editor.textContent.trim();
//       editor.innerHTML = `<h1>${headingText}</h1>`; // Reinsere o texto mantendo-o dentro do H1
//       placeCursorAtEnd(); // Coloca o cursor no final do H1
//     }
//   });

//   // Função para colocar o cursor no final do conteúdo editável
//   function placeCursorAtEnd() {
//     const range = document.createRange();
//     const sel = window.getSelection();
//     range.selectNodeContents(editor);
//     range.collapse(false); // Coloca o cursor no final
//     sel.removeAllRanges();
//     sel.addRange(range);
//   }

//   // Adiciona a classe de placeholder para mostrar o texto inicial
//   editor.classList.add("placeholder");
// });
document.addEventListener("DOMContentLoaded", () => {
  const editor = document.querySelector(".editor");
  const suggestions = document.querySelector(".suggestions");
  const keywordSpan = document.querySelector(".keyword");
  const initialPlaceholder = "Type / for blocks, @ to link docs or people";
  const headingPlaceholder = "Heading 1";

  // Adiciona o placeholder inicial
  editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;

  editor.addEventListener("input", () => {
    const content = editor.textContent.trim();
    if (content.startsWith("/")) {
      const keyword = content.substring(1);
      keywordSpan.textContent = keyword;
      suggestions.hidden = false;
    } else {
      suggestions.hidden = true;
    }

    // Verifica se o editor contém um Heading 1 e mantém o texto dentro dele
    if (editor.innerHTML.includes("<h1")) {
      const regex = /<h1[^>]*>(.*?)<\/h1>/g;
      let match = regex.exec(editor.innerHTML);
      if (match) {
        const newText = match[1];
        editor.innerHTML = `<h1>${newText}</h1>`;
        placeCursorAtEnd();
      }
    }
  });

  document.addEventListener("click", (event) => {
    if (!suggestions.contains(event.target) && !editor.contains(event.target)) {
      suggestions.hidden = true;
    }
  });

  suggestions.addEventListener("click", (event) => {
    if (event.target.closest(".suggestion")) {
      editor.innerHTML = `<h1>${headingPlaceholder}</h1>`;
      editor.focus();
      suggestions.hidden = true;
      placeCursorAtEnd();
    }
  });

  editor.addEventListener("focus", () => {
    const content = editor.innerHTML.trim();
    if (
      content === `<div class="placeholder">${initialPlaceholder}</div>` ||
      content === `<h1>${headingPlaceholder}</h1>`
    ) {
      editor.innerHTML = "";
    }
  });

  editor.addEventListener("blur", () => {
    const content = editor.textContent.trim();
    if (content === "") {
      editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;
    }
  });

  editor.addEventListener("keydown", (event) => {
    const content = editor.textContent.trim();
    if (event.key === "Enter" && content === headingPlaceholder) {
      editor.innerHTML = `<h1></h1>`;
      event.preventDefault();
      placeCursorAtEnd();
    }
  });

  function placeCursorAtEnd() {
    const range = document.createRange();
    range.selectNodeContents(editor);
    range.collapse(false);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }
});
