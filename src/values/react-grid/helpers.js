export function months() {
  return new Array(25).fill(0);
}

export function capitalize(str) {
  const arr = str.split(" ");

  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }

  return arr.join(" ");
}

// attributes: send array of attributes/key/field and object data which is want to edit as dropdown cell
export async function generateObjectAttributes(obj, attributes) {
  attributes.forEach((a) => {
    // ADD: push new attributes with boolean value, default open dropdown is 'false'
    // because the dropdown cell should have unique key in every single cell
    obj[`is_${a}`] = false;
  });
  return obj;
}

// attributes: send array of attributes/key/field and array data which is want to edit as dropdown cell
export async function generateArrayAttributes(arr, attributes) {
  const newArray = arr.map((ar) => {
    let obj = { ...ar };
    attributes.forEach((a) => {
      if (Object.keys(ar).find((b) => a === b)) {
        obj[`is_${a}`] = false;
      }
    });

    return obj;
  });
  return newArray;
}
