"use client";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ServiceCard from "@/components/ServiceCard";
import { useFilter } from "@/hooks/useFilter";

export interface IServices {
  title: string;
  symptoms: string;
  category: string;
  price: number;
  cause: string;
  img: string;
  _id: string;
}

const Home = () => {
  const [categories, setCategories] = useState<string[]>([
    "All",
    "AC",
    "Refrigerator",
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string>("All");
  const [services, setServices] = useState<IServices[]>([]);
  const [temp, setTemp] = useState<IServices[]>([]);
  const [selectedItems, setSelectedItems] = useState<IServices[]>([]);
  const [error, setError] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setIsLoading(true);
    fetch("https://repair-zone.onrender.com/allServices")
      .then((response) => response.json())
      .then((data) => {
        setServices(data);
        setTemp(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    setServices(useFilter(selectedCategories, temp));
    setSelectedItems(useFilter(selectedCategories, temp));
  }, [selectedCategories]);

  const onChangeSearch = (e: any) => {
    setSearchQuery(e.target.value);
    const searchText = e.target.value.toLowerCase();
    const matchedItems = selectedItems.filter((item) => {
      const itemName = item.title.toLowerCase();
      return itemName.indexOf(searchText) > -1;
    });
    if (e.target.value === "") {
      setServices(selectedItems);
    } else {
      setServices(matchedItems);
    }
  };

  return (
    <>
      <Navbar />
      <ul className="flex justify-end items-center gap-2">
        <li>
          <input
            value={searchQuery}
            type="text"
            placeholder="search services..."
            onChange={(e) => onChangeSearch(e)}
            className="outline-none border-2 border-violet-400 rounded-2xl px-2 py-1"
          />
        </li>
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
      <div className="flex justify-center items-center">
        {error.length > 0 && (
          <h3>{error} the data. Please check your internet connection.</h3>
        )}
      </div>
      <div className="flex justify-center items-center">
        {isLoading && <h3>Loading....</h3>}
      </div>
      <div className="grid grid-cols-4 gap-6 my-10">
        {!error.length &&
          // searchResult.length === 0 &&
          services.map((service, i) => (
            <ServiceCard key={service._id} ser={service} />
          ))}
        {/* {searchResult.map((service, i) => (
          <ServiceCard key={service._id} ser={service} />
        ))} */}
      </div>
    </>
  );
};

export default Home;
