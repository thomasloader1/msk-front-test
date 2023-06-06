import { Popover, Transition } from "@headlessui/react";
import api from "Services/api";
import Input from "components/Input/Input";
import { FetchCourseType } from "data/types";
import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchProducts = () => {
  const [auxProducts, setAuxProducts] = useState<FetchCourseType[]>([]);
  const [products, setProducts] = useState<FetchCourseType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const triggerSearch = (event: any) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      const filteredProducts = auxProducts.filter((product) =>
        product.title.toLowerCase().includes(value)
      );
      setProducts(filteredProducts);
    } else {
      setProducts(auxProducts);
    }
  };

  const fetchProducts = async () => {
    const productList = await api.getAllCourses();
    setAuxProducts([...productList]);
    setProducts(productList);
  };

  const onBlur = () => {
    setTimeout(() => {
      setIsInputFocused(false);
    }, 200);
  };

  const clearInputValue = () => {
    setInputValue("");
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="search-products">
      <Input
        type="search"
        placeholder="Buscar"
        className="pr-10 w-full"
        sizeClass="h-[42px] pl-4 py-3"
        value={inputValue}
        onChange={triggerSearch}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => onBlur()}
      />
      {inputValue && isInputFocused && (
        <div className="search-products-results">
          {products
            .map((product, index) => (
              <Link
                to={`/curso/${product.slug}`}
                key={product.id}
                className="product-item"
                onClick={clearInputValue}
              >
                <div className="img-container">
                  <img
                    src={product.image.replace("mx.", "")}
                    alt={product.title}
                  />
                </div>
                <p>{product.title}</p>
              </Link>
            ))
            .filter((product, index) => index < 5)}
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
