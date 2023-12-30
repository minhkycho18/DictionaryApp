import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import getTokenFromStorage from "../../helpers/getTokenFromStorage";
import { getUserProfile } from "../../stores/user/userThunk";

const Authenticate = (props) => {
  const token = getTokenFromStorage();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate("/");
    } else {
      dispatch(getUserProfile())
        .unwrap()
        .then((rs) => {
          const role = rs?.role?.name;
          if (role !== "LEARNER") {
            navigate("/manager/vocabulary");
          }
        });
    }
  }, [dispatch, navigate, token]);

  return <>{props.children}</>;
};

export default Authenticate;
