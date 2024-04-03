import { Button, Table, message } from "antd";
import React, { useState, useEffect } from "react";
import ProductsForm from "./ProductsForm";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { GetProducts } from "../../../apicalls/products";
const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const [showProductForm, setShowProductForm] = useState(false);
  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Description", dataIndex: "description" },
    { title: "Price", dataIndex: "price" },
    { title: "Category", dataIndex: "category" },
    { title: "Age", dataIndex: "age" },
    { title: "Status", dataIndex: "status" },
    { title: "Action", dataIndex: "action" },
  ];
  console.log(products);
  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(setLoader(true));
        const response = await GetProducts();
        dispatch(setLoader(false));

        if (response.success) {
          setProducts(response.products);
        }
      } catch (error) {
        dispatch(setLoader(false));
        message.error(error.message);
      }
    };
    getData();
  }, []);
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setShowProductForm(true)} type="default">
          Add Product
        </Button>
      </div>
      <Table columns={columns} dataSource={products} />
      {showProductForm && (
        <ProductsForm
          showProductForm={showProductForm}
          setShowProductForm={setShowProductForm}
        />
      )}
    </div>
  );
};

export default Products;
