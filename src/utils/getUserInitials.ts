export const getUserInitials = (name: string) => {
  // Divide el nombre en partes por espacio
  const nameParts = name.split(' ');

  // Si no hay partes, retorna un string vacío
  if (nameParts.length === 0) return '';

  // Toma la primera letra de la primera palabra
  const firstInitial = nameParts[0].charAt(0);

  // Toma la primera letra de la última palabra
  const lastInitial =
    nameParts.length > 1 ? nameParts[nameParts.length - 1].charAt(0) : '';

  return `${firstInitial}${lastInitial}`;
};
