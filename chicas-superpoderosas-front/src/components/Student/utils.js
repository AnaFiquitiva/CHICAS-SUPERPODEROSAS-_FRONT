export const getNameFromEmail = (email) => {
    if (!email) return "Estudiante";
    const [localPart] = email.split("@");
    const [first, last] = localPart.split(".");
    if (!first || !last) return localPart;
    const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    const lastName = last.split("-")[0];
    return `${capitalize(first)} ${capitalize(lastName)}`;
};
