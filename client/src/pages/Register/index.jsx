import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import { Link } from "react-router-dom";
import Divider from "../../components/Divider";
import { RegisterUser } from "../../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
const rules = [
  {
    required: true,
    message: "Field is Required",
  },
];
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(setLoader(true));
      const response = await RegisterUser(values);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
      } else {
        dispatch(setLoader(false));

        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));

      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);
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
