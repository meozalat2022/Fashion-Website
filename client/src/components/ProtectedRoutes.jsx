import React, { useState, useEffect } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUsers } from "../redux/usersSlice";
const ProtectedRoutes = ({ children }) => {
  const { users } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    const validateToken = async () => {
      try {
        const response = await GetCurrentUser();
        if (response.success === false) {
          navigate("/login");
        } else {
          dispatch(setUsers(response.data));
        }
      } catch (error) {
        navigate("/login");
        message.error(error.message);
      }
    };
    validateToken();
  }, []);
  return (
    users && (
      <div className="">
        {/*  header */}

        <div className="flex justify-between items-center bg-primary py-6">
          <h1 className="text-white text-2xl">Fashion</h1>
          <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
            <i className="ri-shield-user-line"></i>
            <span
              onClick={() => navigate("/profile")}
              className="cursor-pointer underline"
            >
              {users?.name}
            </span>
            <i
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
              className="ri-logout-box-line"
            ></i>
          </div>
        </div>

        {/*  body */}
        <div className="p-5">{children}</div>
      </div>
    )
  );
};

export default ProtectedRoutes;
