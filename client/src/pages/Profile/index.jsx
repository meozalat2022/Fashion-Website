import React from "react";
import { Tabs } from "antd";
import Products from "./Products";
import UserBids from "./UserBids";
import { useSelector } from "react-redux";
import moment from "moment";
const Profile = () => {
  const { users } = useSelector((state) => state.users);
  return (
    <div>
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Products" key="1">
          <Products />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My Bids" key="2">
          <UserBids />
        </Tabs.TabPane>
        <Tabs.TabPane tab="General" key="3">
          <div className="flex flex-col w-1/3">
            <span className="text-xl text-primary flex justify-between">
              Name: <span className="text-xl">{users.name}</span>
            </span>
            <span className="text-xl text-primary flex justify-between">
              Email: <span className="text-xl">{users.email}</span>
            </span>
            <span className="text-xl text-primary flex justify-between">
              Created AT:{" "}
              <span className="text-xl">
                {moment(users.createdAt).format("MMM DD YYYY, hh:mm A")}
              </span>
            </span>
          </div>
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
