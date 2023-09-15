import React from "react";

const page = ({ params }: { params: { booking: string } }) => {
  console.log(params);
  return <div>{params.booking}</div>;
};

export default page;
