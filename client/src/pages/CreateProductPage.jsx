import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { createProduct } from "../features/product.slice";

const CreateProductPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: "",
    countInStock: 0,
    isFeatured: false,
    image: "",
  });
  const dispatch = useDispatch();

  const handleImage = (e) => {
    const file = Array.from(e.target.files)[0];
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFormData({ ...formData, image: reader.result });
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ ...formData }));
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

  useEffect(()=>{
    document.title = 'Admin - Create Product'
  },[])

  return (
    <section className="min-h-screen">
      <div className="container">
        <Link
          to="/dashboard"
          className="heading-1 text-xs md:text-sm hover:underline text-gray-500 mb-2"
        >
          DASHBOARD /
        </Link>
        <h1 className="heading-1 text-red-500 uppercase mb-8">
          Create new Product
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
              name="countInStock"
              id="stock"
              value={formData?.countInStock}
              className="form-input-2"
              onChange={handleChange}
            />
            <span>Stock</span>
          </label>
          <div className="flex items-center gap-4">
            <h1 className="heading-5">Is Featured: </h1>
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
          <label className="form-label">
            <input
              type="file"
              className="form-input-2 focus:outline-none bg-gray-50"
              aria-describedby="file_input_help"
              onChange={handleImage}
            />
            <span>Image</span>
          </label>
          <button type="submit" className="button-1">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProductPage;
