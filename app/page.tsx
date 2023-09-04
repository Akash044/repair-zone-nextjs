"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

// import Navbar from "components/Navbar";
const Home = () => {
  const [categories, setCategories] = useState<string[]>([
    "AC",
    "Refrigerator",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string>("AC");
  const [services, setServices] = useState<Object[]>([]);
  useEffect(() => {
    fetch("https://repair-zone.onrender.com/allServices")
      .then((response) => response.json())
      .then((data) => setServices(data));
  }, [selectedCategories]);
  return (
    <>
      <Navbar />
      <ul className="flex justify-end items-center gap-2">
        {categories.map((category, i) => (
          <li
            onClick={() => setSelectedCategories(category)}
            key={i}
            className={`${
              category === selectedCategories ? "bg-violet-500 text-white" : ""
            } border-2 px-2 rounded-2xl transition duration-300 hover:bg-violet-500 hover:text-white hover:cursor-pointer`}
          >
            {category}
          </li>
        ))}
      </ul>
      <div className="grid grid-cols-4 gap-4 my-10">
        {services
          .filter((e) => e.category === selectedCategories)
          .map((service, i) => (
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <img
                className="w-full h-[200px]"
                src={`data:image/jpeg;base64,${service.img}`}
                alt="Sunset in the mountains"
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{service.title}</div>
                <div className="font-bold text-md mb-2">
                  category: {service.category}
                </div>
                <p className="text-gray-700 text-base">{service.cause}</p>
                <p className="text-gray-700 text-base my-4">
                  {service.symptoms}
                </p>
                {/* ---------------------------------------------------- */}

                {/* ------------------------------------------------------- */}
              </div>
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  Service Charge: {service.price}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
