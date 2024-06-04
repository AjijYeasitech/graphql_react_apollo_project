import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signUpSchema } from "../../utils/validation";
import AuthInput from "./AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { changeStatus, registerUser } from "../../features/userSlice.js";
import { useState } from "react";
import Picture from "./Picture";
import axios from "axios";
import { REGISTER_USER_MUTATION } from "../../dataFetchQuery/user.query.js";
import { useMutation } from "@apollo/client";

export default function RegisterForm() {
  const REACT_APP_CLOUD_NAME = "dttyymeh3";
  const REACT_APP_CLOUD_SECRET = "zygmbiw6";
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.user);
  const [picture, setPicture] = useState();
  const [readablePicture, setReadablePicture] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signUpSchema) });

  const [createUser, { loading, userError, data }] = useMutation(
    REGISTER_USER_MUTATION
  );

  const onSubmit = async (userData) => {
    try {
      if (loading) {
        dispatch(changeStatus("loading"));
      }
      const { data } = await createUser({
        variables: { input: { ...userData } },
      });

      let res = await dispatch(registerUser({ loading, userError, data }));
      console.log("res", res);
      if (res?.payload?.createUser?.data) {
        navigate("/");
      }
    } catch (error) {
      console.error("SignUp error:", error.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-5xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Full Name"
            error={errors?.name?.message}
            register={register}
          />
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            error={errors?.email?.message}
            register={register}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            error={errors?.status?.message}
            register={register}
          />
          <AuthInput
            name="password"
            type="text"
            placeholder="Password"
            error={errors?.password?.message}
            register={register}
          />
          <AuthInput
            name="confirmPassword"
            type="text"
            placeholder="Confirm Password"
            error={errors?.confirmPassword?.message}
            register={register}
          />
          {/* Picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
          />
          {/* if we have an error */}
          {error ? (
            <div>
              <p className="text-red-400">{error}</p>
            </div>
          ) : null}
          {/* Submit button */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {" "}
            {status === "loading" ? (
              <PulseLoader color="#fff" size={16} />
            ) : (
              "Sign up"
            )}
          </button>
          {/* Sign uin Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span> have an account ?</span>
            <Link
              to="/login"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
