// EXAMPLE: [{'zpid': '2', 'testKEY': 'test'}] => [[2, 'test']]
export const jsonArrayToNestedArray = (jsonArr) => {
  let array = [];
  for (let i in jsonArr) {
    let innerArray = [];
    for (let key in jsonArr[i]) {
      innerArray.push(jsonArr[i][key]);
    }

    array.push(innerArray);
    // RESET INNER ARRAY
    innerArray = [];
  }

  return array;
};
