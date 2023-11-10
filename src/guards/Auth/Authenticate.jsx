import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Authenticate = (props) => {
  const [token] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      navigate("/auth/sign-in");
    }
  }, [navigate, token]);
  return <>{props.children}</>;
};

export default Authenticate;
