import { Col, Form, Input, Modal, Tabs, Row, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useRef } from "react";
import { setLoader } from "../../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { AddProduct, editProduct } from "../../../apicalls/products";
const formAdditions = [
  { label: "Bill Available", name: "billAvailable" },
  { label: "Warranty Available", name: "warrantyAvailable" },
  { label: "Accessories Available", name: "accessoriesAvailable" },
  { label: "Box Available", name: "boxAvailable" },
];

const rules = [{ required: true, message: "required" }];
const ProductsForm = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) => {
  const { users } = useSelector((state) => state.users);
  const formRef = useRef(null);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      let response = null;
      dispatch(setLoader(true));
      if (selectedProduct) {
        response = await editProduct(selectedProduct._id, values);
      } else {
        values.seller = users._id;
        values.status = "pending";
        await AddProduct(values);
      }
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
        setShowProductForm(false);
      } else {
        message.error(response.error);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (selectedProduct) {
      formRef.current.setFieldsValue(selectedProduct);
    }
  }, [selectedProduct]);
  return (
    <Modal
      centered
      title=""
      width={1000}
      open={showProductForm}
      onCancel={() => setShowProductForm(false)}
      okText="Save"
      onOk={() => {
        formRef.current.submit();
      }}
    >
      <div>
        <h1 className="text-2xl text-center text-primary font-semibold">
          {selectedProduct ? "Edit Product" : "Add product"}
        </h1>
        <Tabs defaultActiveKey="1">
          <Tabs.TabPane tab="General" key="1">
            <Form onFinish={onFinish} ref={formRef} layout="vertical">
              <Form.Item rules={rules} label="Name" name="name">
                <Input type="text" />
              </Form.Item>
              <Form.Item rules={rules} label="Description" name="description">
                <TextArea type="text" />
              </Form.Item>
              <Row gutter={[16, 16]}>
                <Col span={8}>
                  <Form.Item rules={rules} label="Price" name="price">
                    <Input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item rules={rules} label="Category" name="category">
                    <select>
                      <option value="">Select</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="home">Home</option>
                      <option value="sports">Sports</option>
                    </select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item rules={rules} label="Age" name="age">
                    <Input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex gap-10">
                {formAdditions.map((item) => (
                  <Form.Item
                    key={item.name}
                    label={item.label}
                    name={item.name}
                    valuePropName="checked"
                  >
                    <Input
                      value={item.name}
                      onChange={(e) => {
                        formRef.current.setFieldsValue({
                          [item.name]: e.target.checked,
                        });
                      }}
                      checked={formRef.current?.getFieldsValue(item.name)}
                      type="checkbox"
                    />
                  </Form.Item>
                ))}
              </div>
            </Form>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Images" key="2">
            <h1>Images</h1>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Modal>
  );
};

export default ProductsForm;
