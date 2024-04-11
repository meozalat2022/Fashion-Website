import { Form, Input, Modal, message } from "antd";
import React, { useRef } from "react";
import { AddNewBid } from "../../apicalls/bids";
import { useSelector, useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";

const BideModal = ({
  setShowNewBidModal,
  showNewBidModal,
  product,
  reloadData,
}) => {
  const formRef = useRef(null);
  const { users } = useSelector((state) => state.users);
  const rules = [{ required: true, message: "Required" }];
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await AddNewBid({
        ...values,
        product: product._id,
        seller: product.seller._id,
        buyer: users._id,
      });
      dispatch(setLoader(false));

      if (response.success) {
        message.success("Bid Added Successfully");
        reloadData();
        setShowNewBidModal(false);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  return (
    <Modal
      centered
      open={showNewBidModal}
      onCancel={() => setShowNewBidModal(false)}
      width={600}
      onOk={() => formRef.current.submit()}
    >
      <div className="flex flex-col gap-5 mb-5">
        <h1 className="text-2xl font-semibold text-orange-900 text-center">
          Place New Bid
        </h1>
        <Form onFinish={onFinish} ref={formRef} layout="vertical">
          <Form.Item rules={rules} label="Bid Amount" name="bidAmount">
            <Input />
          </Form.Item>

          <Form.Item rules={rules} label="Message" name="message">
            <Input.TextArea />
          </Form.Item>
          <Form.Item rules={rules} label="Phone" name="phone">
            <Input type="phone" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default BideModal;
