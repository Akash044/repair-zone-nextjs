"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const signInValidationSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
      "Please enter valid email"
    )
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: yup
    .string()
    .min(7, ({ min }) => `Password must be at least ${min} characters`)
    .max(8)
    .required("Password is required"),
});

interface ILoginInfo {
  email: string;
  password: string;
}

const page = () => {
  // const [loggedUser, setLoggedUser] = useContext();
  const [error, setError] = useState<string>("");
  const [visible, setVisible] = useState<boolean>(false);
  const [netStatus, setNetStatus] = useState<boolean>(true);

  const handleEmailPassSignIn = async (userInfo: ILoginInfo) => {
    // NetInfo.addEventListener((networkState) => {
    //   setNetStatus(networkState.isConnected);
    // });
    console.log(userInfo);
    setVisible(true);
    await fetch("https://repair-zone.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((res) => res.json())
      .then((data) => {
        // data.login &&
        //   setLoggedUser({ ...loggedUser, ...data.info, isLogged: true });
        // data.admin &&
        //   setLoggedUser({
        //     ...loggedUser,
        //     ...data.info,
        //     isLogged: true,
        //     admin: true,
        //   });
        console.log(data);
        setError(data.message);
        setVisible(false);
      })
      .catch((err) => {});
  };
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="p-30 bg-violet-300 rounded-lg">
        <Formik
          validationSchema={signInValidationSchema}
          initialValues={{
            email: "",
            password: "",
          }}
          onSubmit={(values) => handleEmailPassSignIn(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            isValid,
          }) => (
            <form onSubmit={handleSubmit} className="p-10">
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter your email address"
                  name="email"
                  onChange={handleChange("email")}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  required
                />
                {errors.email && (
                  <h3 style={{ fontSize: 10, color: "red" }}>{errors.email}</h3>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your password
                </label>
                <input
                  type="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Enter your password"
                  name="password"
                  onChange={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  required
                />
                {errors.password && (
                  <h3 style={{ fontSize: 10, color: "red" }}>
                    {errors.password}
                  </h3>
                )}
              </div>
              <div className="flex items-start mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Remember me
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                disabled={!isValid}
                // onClick={}
              >
                Submit
              </button>
              {error.length > 0 && (
                <h4
                  style={{
                    textAlign: "center",
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  {error}
                </h4>
              )}
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default page;
