// eslint-disable-next-line no-use-before-define
import { useDispatch } from "react-redux";
import MainServices from "../services/MainServices";
import { val } from "redux/action/action.reducer";

export const setLocal = (key, value) => localStorage.setItem(key, value);

export const getLocal = (key) => localStorage.getItem(key);

export const getToken = () => localStorage.getItem("token");

export const log = (tag, msg) => {
  if (msg !== undefined) {
    console.log(`[d] ${tag}`, msg);
  } else {
    logO(tag);
  }
};

export const logO = (m) => {
  let name, value;
  for (let v in m) {
    name = v;
    value = m[v];
  }
  console.log(`[d] ${name}`, value);
};

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
  return Object.keys(object).filter((key) => object[key] === value);
};

export const cekToken = async (navigate) => {
  console.log("token");
  const token = getToken();

  try {
    await MainServices.get("company/list");

    console.log("getExpired");

    if (token === null) {
      navigate("/login");
    }
  } catch (error) {
    console.log("error", error.code);

    if (error.code === "ERR_BAD_RESPONSE") {
      navigate("/login");
    } else {
      alert("terjadi kesalahan");
    }
  }
};

export const cekNumber = (val) => {
  if (isNaN(val)) {
    return false;
  } else {
    return true;
  }
};

export const inputTypeTable = (dataIndex) => {
  const inputType =
    dataIndex === "HK" ||
    dataIndex === "KIU" ||
    dataIndex === "GMM" ||
    dataIndex === "KIA" ||
    dataIndex === "BJU" ||
    dataIndex === "BLT" ||
    dataIndex === "BLU" ||
    dataIndex === "BK" ||
    dataIndex === "BSU" ||
    dataIndex === "BSB" ||
    dataIndex === "KIK" ||
    dataIndex === "IKP" ||
    dataIndex === "BAND" ||
    dataIndex === "HSI" ||
    dataIndex === "Holding" ||
    dataIndex === "BBU"
      ? "checkbox"
      : "text";

  return inputType;
};

export const sumYearTotal = (data, keys) => {
  const i = keys.slice(-1);
  const sum =
    parseInt(data[`jan${i}`]) +
    parseInt(data[`feb${i}`]) +
    parseInt(data[`mar${i}`]) +
    parseInt(data[`apr${i}`]) +
    parseInt(data[`mei${i}`]) +
    parseInt(data[`jun${i}`]) +
    parseInt(data[`jul${i}`]) +
    parseInt(data[`agu${i}`]) +
    parseInt(data[`sep${i}`]) +
    parseInt(data[`okt${i}`]) +
    parseInt(data[`nov${i}`]) +
    parseInt(data[`des${i}`]);
  return { sum, i };
};

export const createArray = (length) => {
  const list = Array.from({ length }, () => 0);
  return list;
};

export const getTimeStamp = () => Math.floor(Date.now() / 1000);

export const generateUID = () => {
  // I generate the UID from two parts here
  // to ensure the random number provide enough bits.
  var firstPart = (Math.random() * 46656) | 0;
  var secondPart = (Math.random() * 46656) | 0;
  firstPart = ("000" + firstPart.toString(36)).slice(-3);
  secondPart = ("000" + secondPart.toString(36)).slice(-3);
  return firstPart + secondPart;
};

export const showNotif = (dispatch, { status, message, res = null }) => {
  if (res === null) {
    dispatch(
      val({
        status: status,
        message: message,
      })
    );
  } else {
    dispatch(
      val({
        status: res.data.responseCode,
        message: res.data.responseDescription,
      })
    );
  }
};
