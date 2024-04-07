import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { DeleteProduct, GetProducts } from "../../../apicalls/products";
import moment from "moment";
const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [showProductForm, setShowProductForm] = useState(false);
  const { users } = useSelector((state) => state.users);
  const deleteProduct = async (id) => {
    try {
      dispatch(setLoader(true));
      const response = await DeleteProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  const columns = [
    { title: "Name", dataIndex: "name" },
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
        return (
          <div className="flex gap-5">
            <i
              className="ri-pencil-line"
              onClick={() => {
                setSelectedProduct(record);
                setShowProductForm(true);
              }}
            ></i>
            <i
              onClick={() => deleteProduct(record._id)}
              className="ri-delete-bin-line"
            ></i>
          </div>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetProducts({
        seller: users._id,
      });
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
      <div className="flex justify-end">
        <Button
          onClick={() => {
            setSelectedProduct(null);
            setShowProductForm(true);
          }}
          type="default"
        >
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
          selectedProduct={selectedProduct}
          getData={getData}
        />
      )}
    </div>
  );
};

export default Products;
