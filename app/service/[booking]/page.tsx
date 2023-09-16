import { IReducers, IServices } from "@/type";
import React from "react";
import { useSelector } from "react-redux";

const page = ({ params }: { params: { booking: string } }) => {
  console.log(params);
  const service = useSelector((state: IReducers) =>
    state.loadServices.services.filter(
      (service: IServices) => service._id === params.booking
    )
  );
  return (
    <div>
      {service.map((ser: any) => {
        console.log(ser);
      })}
    </div>
  );
};

export default page;
