import { Tabs } from "antd";
import React, { useEffect } from "react";
import Products from "./products";
import Users from "./users";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Admin = () => {
  const navigate = useNavigate();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    if (users.role !== "admin") {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="users" key="2">
          <Users />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
