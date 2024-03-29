import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
const ProtectedRoutes = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const validateToken = async () => {
    try {
      const response = await GetCurrentUser();
      if (response.success) {
        setUser(response.data);
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
    }
  }, []);
  return (
    <div>
      {user && (
        <div className="p-5">
          {user.name}
          {children}
        </div>
      )}
    </div>
  );
};

export default ProtectedRoutes;
