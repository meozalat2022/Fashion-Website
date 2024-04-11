import React from "react";

const categories = [
  { name: "Electronics", value: "electronics" },
  { name: "Home", value: "home" },
  { name: "Fashion", value: "fashion" },
  { name: "Sports", value: "sports" },
  { name: "Books", value: "books" },
];
const ages = [
  { name: "0-2 Years Old", value: "0-2" },
  { name: "3-5Years Old", value: "3-5" },
  { name: "6-8 Years Old", value: "6-8" },
  { name: "9-12 Years Old", value: "9-12" },
  { name: "13+ Years Old", value: "12-20" },
];

const Filters = ({ filters, setShowFilters, showFilters, setFilters }) => {
  return (
    <div className="w-72 flex-col">
      <div className="flex justify-between">
        <h1 className="text-orange-900 text-2xl">Filters</h1>
        <i
          onClick={() => setShowFilters(!showFilters)}
          className="cursor-pointer ri-close-line text-2xl"
        ></i>
      </div>
      <div className="flex flex-col gap-1 mt-5">
        <h1 className="text-gray-600">Categories</h1>
        <div className="flex flex-col gap-1">
          {categories.map((category) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="category"
                className="max-width"
                checked={filters.category.includes(category.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      category: [...filters.category, category.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      category: filters.category.filter(
                        (item) => item !== category.value
                      ),
                    });
                  }
                }}
              />
              <label htmlFor="category">{category.name}</label>
            </div>
          ))}
        </div>
        <h1 className="text-gray-600">Ages</h1>
        <div className="flex flex-col gap-1">
          {ages.map((age) => (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="age"
                className="max-width"
                checked={filters.age.includes(age.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setFilters({
                      ...filters,
                      age: [...filters.age, age.value],
                    });
                  } else {
                    setFilters({
                      ...filters,
                      age: filters.age.filter((item) => item !== age.value),
                    });
                  }
                }}
              />
              <label htmlFor="age">{age.name}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
