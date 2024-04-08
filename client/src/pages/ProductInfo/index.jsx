import React, { useState, useEffect } from "react";
import { GetSingleProduct } from "../../apicalls/products";
import { message } from "antd";
import { setLoader } from "../../redux/loaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Divider from "../../components/Divider";
import moment from "moment";
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
      <div className="mt-5">
        <div className="grid grid-cols-2 gap-8">
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
            <Divider />
            <div>
              <h1 className="text-slate-600">Added On</h1>
              <span className="text-slate-600">
                {moment(product.createdAt).format("MMM DD, YYYY hh:mm A")}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <h1 className="text-2xl font-semibold text-orange-900">
                {product?.name}
              </h1>
              <span className="">{product?.description}</span>
            </div>
            <Divider />
            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Product Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Price</span>
                <span>$ {product?.price}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Category</span>
                <span>{product?.category}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Bill Available</span>
                <span>{product?.billAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Box Available</span>
                <span>{product?.boxAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Accessories Available</span>
                <span>{product?.accessoriesAvailable ? "Yes" : "No"}</span>
              </div>
              <div className="flex justify-between mt-2">
                <span>Warranty Available</span>
                <span>{product?.warrantyAvailable ? "Yes" : "No"}</span>
              </div>
            </div>
            <Divider />

            {/* seller details */}

            <div className="flex flex-col">
              <h1 className="text-2xl font-semibold text-orange-900">
                Seller Details
              </h1>
              <div className="flex justify-between mt-2">
                <span>Name</span>
                <span>{product?.seller?.name}</span>
              </div>

              <div className="flex justify-between mt-2">
                <span>ُEmail</span>
                <span>{product?.seller?.email}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ProductInfo;
