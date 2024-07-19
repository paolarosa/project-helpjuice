document.addEventListener('DOMContentLoaded', () => {
    const editor = document.querySelector('.editor');
    const suggestions = document.querySelector('.suggestions');
    const keywordSpan = document.querySelector('.keyword');
    const initialPlaceholder = "Type / for blocks, @ to link docs or people";
    const headingPlaceholder = "Heading 1";

    // Inicialmente, adicione o placeholder
    editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;

    editor.addEventListener('input', () => {
        const content = editor.innerHTML.trim();
        if (content.startsWith('/')) {
            const keyword = content.substring(1);
            keywordSpan.textContent = keyword;
            suggestions.hidden = false;
        } else {
            suggestions.hidden = true;
        }
    });

    document.addEventListener('click', (event) => {
        if (!suggestions.contains(event.target) && !editor.contains(event.target)) {
            suggestions.hidden = true;
        }
    });

    suggestions.addEventListener('click', (event) => {
        if (event.target.closest('.suggestion')) {
            editor.innerHTML = `<h1>${headingPlaceholder}</h1>`;
            editor.focus();
            suggestions.hidden = true;
        }
    });

    editor.addEventListener('focus', () => {
        const content = editor.innerHTML.trim();
        if (content === `<div class="placeholder">${initialPlaceholder}</div>` ||
            content === `<h1>${headingPlaceholder}</h1>`) {
            editor.innerHTML = ''; // Limpar conteúdo ao focar
        }
    });

    editor.addEventListener('blur', () => {
        const content = editor.innerHTML.trim();
        if (content === '') {
            editor.innerHTML = `<div class="placeholder">${initialPlaceholder}</div>`;
        }
    });

    editor.addEventListener('keydown', (event) => {
        const content = editor.innerHTML.trim();
        if (content === `<h1>${headingPlaceholder}</h1>` && event.key !== 'Enter' && event.key !== 'Escape') {
            editor.innerHTML = '<h1></h1>'; // Limpa o H1 quando começa a digitar
        }
    });

    editor.addEventListener('input', () => {
        if (editor.innerHTML === '<h1></h1>') {
            editor.innerHTML = '<h1></h1>'; // Mantém o H1 enquanto o usuário digita
        }
    });

    // Adiciona a classe de placeholder para mostrar o texto inicial
    editor.classList.add('placeholder');
});
// document.addEventListener('DOMContentLoaded', function () {
//     const editor = document.querySelector('.editor');
//     const suggestions = document.querySelector('.suggestions');
//     let isTyping = false;
//     let currentElement = null;

//     editor.addEventListener('keydown', function (e) {
//         if (e.key === '/') {
//             // Exibe sugestões
//             suggestions.hidden = false;
//         } else if (e.key === 'Enter') {
//             e.preventDefault();
//             if (isTyping && currentElement) {
//                 convertToHeading(currentElement);
//                 isTyping = false;
//                 currentElement = null;
//             }
//         }
//     });

//     suggestions.addEventListener('click', function (e) {
//         if (e.target.closest('.suggestion')) {
//             const tag = e.target.closest('.suggestion').textContent.includes('Heading 1') ? 'h1' : '';
//             if (tag) {
//                 if (isTyping && currentElement) {
//                     convertToHeading(currentElement);
//                 }
//                 // Adiciona lógica para mostrar e aplicar o tag
//                 isTyping = false;
//                 currentElement = null;
//                 suggestions.hidden = true;
//             }
//         }
//     });

//     function convertToHeading(element) {
//         if (element) {
//             const newElement = document.createElement('h1');
//             newElement.innerHTML = element.innerHTML;
//             element.parentNode.replaceChild(newElement, element);
//             newElement.focus();
//         }
//     }
// });
