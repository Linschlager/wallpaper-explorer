export const findInMultiArray = (array, index, needle) => {
  return array.find(singleItem => singleItem[index] === needle);
};
