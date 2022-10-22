export const getObjectValues = <T extends {}>(obj: T) => {
    return Object.keys(obj).map((objKey) => obj[objKey as keyof T]);
};
