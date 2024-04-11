import React, { useEffect, useState } from "react";
import { GetProducts } from "../../apicalls/products";
import { message } from "antd";
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Divider from "../../components/Divider";
import Filters from "./Filters";
const Home = () => {
  const [showFilters, setShowFilters] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    status: "approved",
    category: [],
    age: [],
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
  useEffect(() => {
    console.log(filters);
  }, [filters]);
  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setFilters={setFilters}
          filters={filters}
          setShowFilters={setShowFilters}
        />
      )}

      <div className="flex flex-col gap-5">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            placeholder="Search Product"
            className="border border-solid border-gray-300 w-full p-2 h-14"
          />
        </div>
        <div
          className={`grid gap-5 ${
            showFilters ? "grid-cols-4" : "grid-cols-5"
          }`}
        >
          {products &&
            products.map((item) => (
              <div
                onClick={() => navigate(`/product/${item._id}`)}
                className=" cursor-pointer border border-solid border-gray-300 flex flex-col rounded gap-2 pb-2"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-52 p-2 rounded-md object-cover"
                />
                <div className="px-2 flex flex-col ">
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
    </div>
  );
};

export default Home;
