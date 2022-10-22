export const sortObjectArray = <T>(data: T[], keyName: keyof T, asc: boolean, sortFunction?: CallableFunction) => {
  let sortedData;
  if (sortFunction) {
    sortedData = data.sort((a, b) => sortFunction(a, b));
  } else {
    sortedData = data.sort((a, b) => (a[keyName] < b[keyName] ? -1 : 1));
  }

  if (asc) sortedData.reverse();
  return sortedData;
};
