export const addParameterToURL = (param: string, value: string) => {
    const url = new URL(window.location.href);
  
    if (!url.searchParams.has("recurso") && param === 'resources') {
        let valueToUrl = value.includes("Curso") ? 'curso' : 'guia-profesionales';
        url.searchParams.set("recurso", valueToUrl);
        // Actualizar la URL con el nuevo parámetro
        window.history.replaceState({}, document.title, url.toString());
        console.log(url,window.history,{param,value})
    }
  }