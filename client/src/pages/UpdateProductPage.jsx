import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../features/product.slice";
import { LoaderCircle } from "lucide-react";

const UpdateProductPage = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const {
    loading,
    data: { productDetails },
  } = useSelector((state) => state.product);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    isFeatured: false,
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ _id: id, ...formData }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  useEffect(() => {
    if (productDetails?.name !== undefined) {
      setFormData({
        name: productDetails?.name,
        description: productDetails?.description,
        brand: productDetails?.brand,
        category: productDetails?.category,
        price: productDetails?.price,
        countInStock: productDetails?.countInStock,
        isFeatured: productDetails?.isFeatured,
      });
    }
  }, [productDetails]);


  useEffect(()=>{
    document.title = 'Dashboard - Update Product'
  }, [])

  return (
    <section className="min-h-screen">
      <div className="container">
        <Link
          to="/dashboard"
          className="heading-1 text-xs md:text-sm hover:underline text-gray-500 mb-2"
        >
          DASHBOARD /
        </Link>
        <h1 className="heading-1 text-lg text-red-500 uppercase mb-8">
          Update Product
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="name" className="form-label">
            <input
              type="text"
              name="name"
              value={formData?.name}
              id="name"
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Name</span>
          </label>
          <label htmlFor="description" className="form-label">
            <textarea
              rows={4}
              name="description"
              id="description"
              value={formData?.description}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Description</span>
          </label>
          <label htmlFor="price" className="form-label">
            <input
              type="number"
              name="price"
              id="price"
              value={formData?.price}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Price</span>
          </label>
          <label htmlFor="brand" className="form-label">
            <input
              type="text"
              name="brand"
              id="brand"
              value={formData?.brand}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Brand</span>
          </label>
          <label htmlFor="category" className="form-label">
            <input
              type="text"
              name="category"
              id="category"
              value={formData?.category}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Category</span>
          </label>
          <label htmlFor="stock" className="form-label">
            <input
              type="number"
              name="stock"
              id="stock"
              value={formData?.countInStock}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Stock</span>
          </label>
          <div className="flex items-center gap-4">
            <h1 className="heading-1 text-sm">Is Featured: </h1>
            <label className="flex gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                value={true}
                checked={formData?.isFeatured === true}
                onChange={() =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      isFeatured: true,
                    };
                  })
                }
              />
              <span>True</span>
            </label>
            <label className="flex gap-2">
              <input
                type="checkbox"
                name="isFeatured"
                value={false}
                checked={formData?.isFeatured === false}
                onChange={() =>
                  setFormData((prev) => {
                    return {
                      ...prev,
                      isFeatured: false,
                    };
                  })
                }
              />
              <span>False</span>
            </label>
          </div>
          <button type="submit" className="button-1" disabled={loading}>
            {loading ? (
              <LoaderCircle className="animate-spin mx-auto" />
            ) : (
              "Update"
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default UpdateProductPage;
