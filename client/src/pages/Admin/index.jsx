import { Tabs } from "antd";
import React from "react";
import Products from "./products";

const Admin = () => {
  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="users" key="2">
          <h1>Users</h1>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Admin;
