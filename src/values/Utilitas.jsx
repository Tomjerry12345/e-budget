// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const getToken = () => localStorage.getItem("token");

export const log = (tag, msg) => console.log(tag, msg);

export const logObj = (tag, message) => console.log(`${tag} => ${JSON.stringify(message)}`);

export const logS = (tag, message) => console.log(`${tag} => ${message}`);

export const getSizeScreen = (set) => {
  set({
    x: window.innerWidth,
    y: window.innerHeight,
  });
};

export const areEqual = (array1, array2) => {
  let isEqual = false;

  if (typeof array1 != "undefined") {
    try {
      array1.forEach((e) => {
        if (e === array2.key) {
          isEqual = true;
          const errorMessage = { status: "Break" };
          throw errorMessage;
        }
      });
    } catch (e) {
      if (e.status !== "Break") throw e;
    }
  }

  return isEqual;
};

export const classx = (obj) => {
  let classes = "";
  for (const ob in obj) {
    if (obj[ob]) {
      classes += ob + " ";
    }
  }

  return classes;
};

export const fastIf = (if1, if2, val1, val2) => {
  return if1 === if2 ? val1 : val2;
};

Number.prototype.format = function (n, x, s, c) {
  var re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
    num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace(".", c) : num).replace(new RegExp(re, "g"), "$&" + (s || ","));
}; /*eslint no-extend-native: ["error", { "exceptions": ["Number"] }]*/

export const slicing = (text, format, i) => {
  const split = text.split(format);

  return split[i];
};

export const getKeyByValue = (object, value) => {
  return Object.keys(object).find(key => object[key] === value);
}
