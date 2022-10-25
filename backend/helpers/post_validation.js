// CHECK ARRAY IS EMPTY
export const isEmptyOrExist = (array) => {
  // CHECK IF ARRAY EXIST
  if (typeof array === "undefined") {
    return true;
  }

  // CHECK ARRAY IS EMPTY
  if (array.length === 0) {
    return true;
  }

  return false;
};

// CHECKS BODY IF IT HAS DUPLICATES
export const hasDuplicates = (twoDArray) => {
  // GET THE TOTAL INDEX OF THE FIRST ARRAY
  const totalIndex = twoDArray[0].length;

  // CREATE 2D ARRAY TO STORE EACH VALUE || EXAMPLE [[], [], []]
  let duplicatesArrays = [];
  for (let i = 0; i < totalIndex; i++) {
    duplicatesArrays.push([]);
  }

  twoDArray.forEach((array) => {
    for (let i = 0; i < totalIndex; i++) {
      duplicatesArrays[i].push(array[i]);
    }
  });

  // LOOP TO CHECK IF ARRAY HAS DUPLICATE RETURN BOOLEAN
  let hasDuplicates = false;
  duplicatesArrays.forEach((array) => {
    hasDuplicates = new Set(array).size !== array.length;
    // console.log(hasDuplicates);

    if (hasDuplicates) {
      return hasDuplicates;
    }
  });

  return hasDuplicates;
};
