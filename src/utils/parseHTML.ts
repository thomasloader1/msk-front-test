export const parseHtml = (contentHtml: string) => {
  // Tu contenido HTML
  const htmlContent: string = contentHtml;

  // Crear un elemento HTML temporal para analizar el contenido
  const tempElement = document.createElement("div");
  tempElement.innerHTML = htmlContent;

  // Buscar elementos UL dentro del contenido
  const ulElements = tempElement.querySelectorAll("ul");

  const pElement = tempElement.querySelector("p");
  pElement?.classList.add("text-violet-strong")

  const spanElements = tempElement.querySelectorAll("span");
  spanElements.forEach(span => {
    if (!span.classList.contains('font-lora')) {
      // Si no tiene la clase 'font-lora', remueve todas las clases existentes
      span.className = '';
  
      // Agrega la clase 'font-lora'
      span.classList.add('font-lora');
    }
  });

  console.log({spanElements})


  ulElements.forEach((ulElement) => {
    // Buscar elementos LI dentro de cada UL
    ulElement.classList.add("m-0", "flex", "flex-col");
    const liElements = ulElement.querySelectorAll("li");
    const brElements = ulElement.querySelectorAll("br");

    brElements.forEach((brElement) => {
      if (brElement.parentNode) {
        brElement?.parentNode.removeChild(brElement);
      }
    });

    liElements.forEach((liElement, index) => {
      // Crear una imagen y configurar sus atributos
      if (index === 0) {
        liElement.classList.add("mt-6");
      }

      liElement.classList.add("flex", "items-start", "mb-6");

      const spanElements = liElement.querySelectorAll("span");

      spanElements.forEach((spanElement) => {
        // Verificar si el <span> está vacío
        if (spanElement.parentNode && spanElement.textContent) {
          // Si el <span> está vacío, eliminarlo
          spanElement?.textContent.trim() === ""
            ? spanElement.parentNode.removeChild(spanElement)
            : null;
        }
      });

      const imgElement = document.createElement("img");
      imgElement.classList.add("m-0", "mr-3", "mt-1", "w-5");
      //console.log({ imgElement });
      imgElement.src = "/images/vectors/isotipo.svg"; // Cambia la URL de la imagen según tus necesidades
      imgElement.alt = "Imagen"; // Cambia el texto alternativo según tus necesidades

      // Agregar la imagen al LI
      liElement.insertBefore(imgElement, liElement.firstChild);
    });
  });

  // Obtener el contenido modificado como cadena de texto
  const modifiedHtmlContent = tempElement.innerHTML;

  return modifiedHtmlContent;
};
