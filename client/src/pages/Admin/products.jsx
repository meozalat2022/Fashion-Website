import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../redux/loaderSlice";
import { GetProducts } from "../../apicalls/products";
import moment from "moment";
const Products = () => {
  const [products, setProducts] = useState([]);

  const dispatch = useDispatch();
  console.log(products);
  const columns = [
    { title: "Product", dataIndex: "name" },
    {
      title: "Seller",
      dataIndex: "name",
      render: (text, record) => {
        return record.seller.name;
      },
    },
    { title: "Description", dataIndex: "description" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    { title: "Age", dataIndex: "age" },
    { title: "Status", dataIndex: "status" },
    {
      title: "Added On",
      dataIndex: "createdAt",
      render: (text, record) =>
        moment(record.createdAt).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => {
        return <div className="flex gap-5"></div>;
      },
    },
  ];

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts(null);
      dispatch(setLoader(false));

      if (response.success) {
        setProducts(response.products);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <Table columns={columns} dataSource={products} />
    </div>
  );
};

export default Products;
