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

// attributes: send object to change as empty state
export async function generateEmptyAttributes(object) {
  let newObject = { ...object };
  Object.keys(newObject).forEach((item) => {
    if (typeof newObject[item] == "number") {
      newObject[item] = 0;
    } else if (typeof newObject[item] == "string") {
      newObject[item] = "";
    } else if (typeof newObject[item] == "boolean") {
      newObject[item] = false;
    }
  });
  return newObject;
}

// object1: last object, object2: newest object
export async function generateAttributesByNewValue(object1, object2) {
  const obj1 = { ...object1 };
  const obj2 = { ...object2 };

  let keys = Object.keys(obj1);

  keys.forEach((key) => {
    let id = Object.keys(obj2).find((a) => a === key);
    if (id) {
      obj1[id] = obj2[id];
    }
  });

  return obj1
}