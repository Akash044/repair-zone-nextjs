"use client";
import React, { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";

const signUpValidationSchema = yup.object().shape({
  name: yup.string().required("User name is Required"),
  contact: yup
    .string()
    .matches(
      /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/,
      "Must follow bd number pattern"
    )
    .required("Contact number is Required"),
  email: yup
    .string()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/,
      "Please enter valid email"
    )
    .email("Please enter valid email")
    .required("Email Address is Required"),
  address: yup.string().required("User address is Required"),
  password: yup
    .string()
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords do not match")
    .required("Confirm password is required"),
});

interface ISignUp {
  name: string;
  contact: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
}

const page = () => {
  const [imageData, setImageData] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [takenImg, setTakenImg] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleRegisterBtn = (values: ISignUp) => {
    setIsLoading(true);
    fetch("https://repair-zone.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...values,
        ...imageData,
        admin: false,
        user: true,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        //   setUserInfo({ ...values, ...imageData })
        data && alert("OTP has been sent in your email, please verify");
        setIsLoading(false);
        //   data && navigation.navigate('OTPPage');
        !data &&
          alert("This email has already used.Please try with a new one!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex h-screen justify-center items-center ">
      <div className="p-30 bg-violet-300 rounded-lg">
        <Formik
          validationSchema={signUpValidationSchema}
          initialValues={{
            name: "",
            contact: "",
            email: "",
            address: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => handleRegisterBtn(values)}
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
              <div className="flex justify-between gap-3">
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your Name
                    </label>
                    <input
                      type="name"
                      id="name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="User name"
                      //   style={styles.textInput}
                      name="name"
                      onChange={handleChange("name")}
                      onBlur={handleBlur("name")}
                      value={values.name}
                      required
                    />
                    {errors.name && (
                      <h3 style={{ fontSize: 10, color: "red" }}>
                        {errors.name}
                      </h3>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="contact"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your contact information
                    </label>
                    <input
                      type="text"
                      id="contact"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="User contact"
                      //   style={styles.textInput}
                      name="contact"
                      onChange={handleChange("contact")}
                      onBlur={handleBlur("contact")}
                      value={values.contact}
                      required
                    />
                    {errors.contact && (
                      <h3 style={{ fontSize: 10, color: "red" }}>
                        {errors.contact}
                      </h3>
                    )}
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Your email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="name@gmail.com"
                      name="email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      required
                    />
                    {errors.email && (
                      <h3 style={{ fontSize: 10, color: "red" }}>
                        {errors.email}
                      </h3>
                    )}
                  </div>
                </div>
                <div>
                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Your address
                    </label>
                    <input
                      type="text"
                      id="address"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder="User address"
                      //   style={styles.textInput}
                      name="address"
                      onChange={handleChange("address")}
                      onBlur={handleBlur("address")}
                      value={values.address}
                      required
                    />
                    {errors.email && (
                      <h3 style={{ fontSize: 10, color: "red" }}>
                        {errors.address}
                      </h3>
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
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      name="password"
                      placeholder="Password"
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
                  <div className="mb-6">
                    <label
                      htmlFor="repeat-password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      Repeat password
                    </label>
                    <input
                      type="password"
                      id="repeat-password"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      name="confirmPassword"
                      placeholder="confirm Password"
                      onChange={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      value={values.confirmPassword}
                      required
                    />
                    {errors.confirmPassword && (
                      <h3 style={{ fontSize: 10, color: "red" }}>
                        {errors.confirmPassword}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label
                  className="block mb-2 text-sm font-medium text-gray-900"
                  htmlFor="user_avatar"
                >
                  Upload file
                </label>
                <input
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 "
                  aria-describedby="user_avatar_help"
                  id="user_avatar"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    console.log(e?.currentTarget?.files[0]);
                  }}
                />
                <div
                  className="mt-1 text-sm text-black-500 "
                  id="user_avatar_help"
                >
                  A profile picture is useful to confirm your are logged into
                  your account
                </div>
              </div>
              <div className="flex items-start mt-4 mb-6">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                    required
                  />
                </div>
                <label
                  htmlFor="terms"
                  className="ml-2 text-sm font-medium text-gray-900 "
                >
                  I agree with the{" "}
                  <a
                    href="#"
                    className="text-blue-600 hover:underline dark:text-blue-500"
                  >
                    terms and conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={!isValid}
              >
                Register new account
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
