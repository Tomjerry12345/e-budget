// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const log = (tag, message) => (typeof message === "undefined" ? console.log(`${tag}`) : console.log(`${tag} => ${JSON.stringify(message)}`));

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
