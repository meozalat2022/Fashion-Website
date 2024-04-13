import React, { useState } from "react";
import { Button, message } from "antd";
import Upload from "antd/es/upload/Upload";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { EditProduct, UploadImages } from "../../../apicalls/products";
const Images = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [images, setImages] = useState(selectedProduct.images);
  const [showPreview, setShowPreview] = useState(true);
  const upload = async () => {
    try {
      dispatch(setLoader(true));
      // upload the image
      const formData = new FormData();
      formData.append("file", file);
      formData.append("productId", selectedProduct._id);
      const response = await UploadImages(formData);

      if (response.success) {
        message.success(response.message);
        setImages([...images, response.data]);
        setShowPreview(false);
        getData();
        // dispatch(setLoader(false));
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };

  const deleteImage = async (image) => {
    try {
      dispatch(setLoader(true));
      const updatedImageArray = images.filter((item) => item !== image);
      const updatedProduct = { ...selectedProduct, images: updatedImageArray };
      const response = await EditProduct(selectedProduct._id, updatedProduct);
      if (response.success) {
        message.success(response.message);
        setImages(updatedImageArray);
        setFile(null);
        getData();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      message.error(error.message);
    }
  };
  return (
    <div>
      <div className="flex gap-5 mb-5">
        {images.map((image) => (
          <div className="flex gap-2 border border-solid border-slate-500 rounded p-2 items-end">
            <img className="h-20 w-20 object-cover" src={image} alt="" />
            <i
              onClick={() => deleteImage(image)}
              className="ri-delete-bin-line"
            ></i>
          </div>
        ))}
      </div>
      <Upload
        listType="picture"
        onChange={(info) => {
          setFile(info.file);
          setShowPreview(true);
        }}
        beforeUpload={() => false}
        showUploadList={showPreview}
        fileList={file ? [file] : []}
      >
        <Button type="dashed">Upload Images</Button>
      </Upload>
      <div className="flex justify-end gap-5">
        <Button type="default" onClick={() => setShowProductForm(false)}>
          Cancel
        </Button>
        <Button type="primary" onClick={upload} disabled={!file}>
          Upload
        </Button>
      </div>
    </div>
  );
};

export default Images;
