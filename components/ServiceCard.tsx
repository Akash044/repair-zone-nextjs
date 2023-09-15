"use client";
import { IServices } from "@/app/page";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const ServiceCard = ({ ser }: { ser: IServices }) => {
  const [isSym, setIsSym] = useState<boolean>(false);
  const [isCause, setIsCause] = useState<boolean>(false);
  const [service, setService] = useState<IServices>(ser);
  // const router = useRouter();

  // const handleBooking = () => {
  //   router.push("/booking");
  // };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg mb-4">
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
        <div>
          <h5
            onClick={() => setIsCause(!isCause)}
            className="inline-block rounded-xl px-2 transition duration-300 hover:cursor-pointer  hover:bg-gray-200"
          >
            Causes
          </h5>
          {isCause && (
            <p className="text-gray-700 text-base text-ellipsis overflow-hidden">
              {service.cause}
            </p>
          )}
        </div>
        <div>
          <h5
            onClick={() => setIsSym(!isSym)}
            className="inline-block rounded-xl px-2 transition duration-300 hover:cursor-pointer hover:bg-gray-200"
          >
            Symptoms
          </h5>
          {isSym && (
            <p className="text-gray-700 text-base my-4 transition duration-300">
              {service.symptoms}
            </p>
          )}
        </div>
        {/* ---------------------------------------------------- */}

        {/* ------------------------------------------------------- */}
      </div>
      <div className="flex justify-between px-2 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Service Charge: {service.price}$
        </span>
        <Link
          // onClick={() => handleBooking}
          href={`/service/${ser._id}`}
          className="inline-block bg-gray-200 rounded-full px-2 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:cursor-pointer hover:bg-violet-400 transition duration-300"
        >
          Click to Booking
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
