import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../stores/user/userThunk";
// import { getUserProfile } from "../../stores/user/userThunk";
// import { useDispatch } from "react-redux";

const Authenticate = (props) => {
  const [token] = useState(localStorage.getItem("token"));
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
            navigate("/manager");
          }
        });
    }
  }, [dispatch, navigate, token]);

  return <>{props.children}</>;
};

export default Authenticate;
