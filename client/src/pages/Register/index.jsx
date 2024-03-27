import React from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
const rules = [
  {
    required: true,
    message: "Field is Required",
  },
];
const Register = () => {
  const onFinish = async (values) => {
    try {
      const response = await RegisterUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="h-screen bg-primary flex justify-center items-center">
      <div className="bg-white p-5 rounded w-[450px]">
        <h1 className="text-primary text-2xl">
          Fashion - <span className="text-gray-400">Register</span>
        </h1>
        <Divider />
        <Form onFinish={onFinish} layout="vertical">
          <Form.Item rules={rules} label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item rules={rules} label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item rules={rules} label="Password" name="password">
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button className="md-2" type="primary" htmlType="submit" block>
            Register
          </Button>
          <div className="mt-5 text-center">
            <span className="text-gray-500">
              Already have an account?{" "}
              <Link className="text-primary hover:text-primary" to="/login">
                Login
              </Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
