export const slugify = (title: string | null | undefined): string => {
  if (title == null) {
    return "";
  }

  // Reemplazar caracteres especiales y espacios con guiones
  const slug = title
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios en blanco al principio y al final
    .replace(/[^\w\s-]/g, "") // Eliminar caracteres especiales excepto espacios y guiones
    .replace(/\s+/g, "-") // Reemplazar espacios con guiones
    .replace(/--+/g, "-"); // Reemplazar múltiples guiones con uno solo

  return slug;
};
