import React, { useEffect, useState } from "react";
import { GetProducts } from "../../apicalls/products";
import { message } from "antd";
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
  });
  const { users } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(setLoader(true));

      const response = await GetProducts(filters);
      dispatch(setLoader(false));
      if (response.success) {
        setProducts(response.data);
      } else {
        throw new Error(response.message);
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
      <div className="grid grid-cols-5 gap-2">
        {products &&
          products.map((item) => (
            <div
              onClick={() => navigate(`/product/${item._id}`)}
              className=" cursor-pointer border border-solid border-gray-300 flex flex-col rounded gap-5 pb-2"
            >
              <img
                src={item.images[0]}
                alt={item.name}
                className="w-full h-40 object-cover"
              />
              <div className="px-2 flex flex-col gap-1">
                <h1 className="text-lg font-semibold">{item.name}</h1>
                <p className="text-sm">{item.description}</p>
                <Divider />
                <span className="text-xl font-semibold text-primary">
                  $ {item.price}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Home;
