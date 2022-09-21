// eslint-disable-next-line no-use-before-define

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const log = (message) => console.log(message);

export const getSizeScreen = (set) => {
  set({
    x: window.innerWidth,
    y: window.innerHeight,
  });
};
