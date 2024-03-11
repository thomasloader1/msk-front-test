export const compareByNameDescending = (a:{name: string}, b:{name: string}) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA === "MEDICINA") {
      return -1;
    }
  
    if (nameB === "MEDICINA") {
      return 1;
    }
  
    //Si el nombre es "Opinion", lo colocamos al final
    if (nameA === "OPINION") {
      return 1;
    }
  
    if (nameB === "OPINION") {
      return -1;
    }
  
    // Ordenar de manera descendente por el campo "name"
    if (nameA > nameB) {
      return -1;
    }
  
    if (nameA < nameB) {
      return 1;
    }
  
    return 0;
  };