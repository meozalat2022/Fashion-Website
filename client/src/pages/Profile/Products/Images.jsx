import React, { useState } from "react";
import { Button, message } from "antd";
import Upload from "antd/es/upload/Upload";
import { useDispatch } from "react-redux";
import { setLoader } from "../../../redux/loaderSlice";
import { UploadImages } from "../../../apicalls/products";
const Images = ({
  showProductForm,
  setShowProductForm,
  selectedProduct,
  getData,
}) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
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
  return (
    <div>
      <Upload
        listType="picture"
        onChange={(info) => setFile(info.file)}
        beforeUpload={() => false}
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
