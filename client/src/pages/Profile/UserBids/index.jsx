import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/bids";
import moment from "moment";
const UserBids = () => {
  const { users } = useSelector((state) => state.users);
  const [bidsData, setBidsData] = useState([]);
  const dispatch = useDispatch();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => {
        return record.buyer.name;
      },
    },
    {
      title: "Seller",
      dataIndex: "seller",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    {
      title: "Offered Price",
      dataIndex: "offeredPrice",
      render: (text, record) => {
        return record.product.price;
      },
    },
    { title: "Bid Amount", dataIndex: "bidAmount" },
    {
      title: "Bid Date",
      dataIndex: "createdAt",
      render: (text, record) => {
        return moment(text).format("MMM DD YYYY, h:mm A");
      },
    },
    { title: "Message", dataIndex: "message" },
    {
      title: "Contact",
      dataIndex: "contactDetails",
      render: (text, record) => {
        return (
          <div>
            <p>Phone: {record.phone}</p>
            <p>Email: {record.buyer.email}</p>
          </div>
        );
      },
    },
  ];

  const getBids = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetAllBids({
        buyer: users._id,
      });
      dispatch(setLoader(false));

      if (response.success) {
        setBidsData(response.data);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getBids();
  }, []);
  return (
    <div className="flex gap-3 flex-col">
      <Table columns={columns} dataSource={bidsData} />
    </div>
  );
};

export default UserBids;
