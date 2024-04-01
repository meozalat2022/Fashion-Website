import { Button } from "antd";
import React, { useState } from "react";
import ProductsForm from "./ProductsForm";

const Products = () => {
  const [showProductForm, setShowProductForm] = useState(false);
  return (
    <div>
      <div className="flex justify-end">
        <Button onClick={() => setShowProductForm(true)} type="default">
          Add Product
        </Button>
      </div>
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
