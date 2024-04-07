import React, { useState, useEffect } from "react";
import { GetSingleProduct } from "../../apicalls/products";
import { message } from "antd";
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/Divider";
const ProductInfo = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const { id } = useParams();
  console.log("productid", id);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetSingleProduct(id);
      dispatch(setLoader(false));
      if (response.success) {
        setProduct(response.data);
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
    product && (
      <div>
        <div className="grid grid-cols-2">
          {/* images */}

          <div className="flex flex-col gap-5">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-96 object-cover rounded-md"
            />
            <div className="flex gap-5">
              {product.images.map((item, index) => (
                <img
                  src={item}
                  alt=""
                  className={
                    "w-20 h-20 object-cover rounded-md cursor-pointer" +
                    (selectedImage === index
                      ? "border-2 border-primary border-dashed p-2"
                      : "")
                  }
                  onClick={() => setSelectedImage(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfo;
