import { useDispatch } from "react-redux";
import { val } from "redux/action/action.reducer";

const Logic = () => {
  const dispatch = useDispatch();

  const responseShow = ({ status, message }) => {
    dispatch(
      val({
        status,
        message,
      })
    );
  };

  return {
    value: {},
    func: {},
  };
};

export default Logic;
