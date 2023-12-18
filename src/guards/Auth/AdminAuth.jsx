import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserProfile } from "../../stores/user/userThunk";

const AdminAuth = (props) => {
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    } else {
      setLoading(true);
      dispatch(getUserProfile())
        .unwrap()
        .then((rs) => {
          const role = rs?.role?.name;
          if (role === "ADMIN") {
            setLoading(false);
            navigate("/manager");
          }
          if (role !== "ADMIN") {
            setLoading(false);
            navigate(-1);
          }
        });
    }
  }, [dispatch, navigate, token]);
  return <>{!loading && props.children}</>;
};

export default AdminAuth;
