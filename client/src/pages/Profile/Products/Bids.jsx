import { Modal, Table, message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { GetAllBids } from "../../../apicalls/bids";
import moment from "moment";
import Divider from "../../../components/Divider";
const Bids = ({ selectedProduct, showBidsModal, setShowBidsModal }) => {
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
        product: selectedProduct._id,
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
    if (selectedProduct) {
      getBids();
    }
  }, [selectedProduct]);
  return (
    <Modal
      footer={null}
      width={1500}
      centered
      // title="Bids"
      open={showBidsModal}
      onCancel={() => setShowBidsModal(false)}
    >
      <div className="flex gap-3 flex-col">
        <h1 className="text-primary">Bids</h1>
        <Divider />
        <h1 className="text-xl text-gray-500">{selectedProduct.name}</h1>
        <Table columns={columns} dataSource={bidsData} />
      </div>
    </Modal>
  );
};

export default Bids;
