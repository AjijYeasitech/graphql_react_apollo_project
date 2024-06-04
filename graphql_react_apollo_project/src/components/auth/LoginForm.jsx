import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "../../utils/validation";
import AuthInput from "./AuthInput.jsx";
import { useDispatch, useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../features/userSlice";
import { USER_SIGN_IN_MUTATION } from "../../dataFetchQuery/user.query.js";
import { useMutation } from "@apollo/client";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  console.log("user", user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(signInSchema) });

  const [userSignIn, { loading, userError, data }] = useMutation(
    USER_SIGN_IN_MUTATION
  );

  const onSubmit = async (values) => {
    // console.log("values", values);
    const { data } = await userSignIn({
      variables: { ...values },
    });
    // console.log("data", data);
    let res = await dispatch(loginUser({ loading, userError, data }));
    console.log("res", res);

    // if (res?.payload?.user) {
    //   console.log("loginform");
    //   navigate("/");
    // }
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* Heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-5xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign in</p>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="text"
            placeholder="Email address"
            error={errors?.email?.message}
            register={register}
          />

          <AuthInput
            name="password"
            type="text"
            placeholder="Password"
            error={errors?.password?.message}
            register={register}
          />

          {/* if we have an error */}
          {userError ? (
            <div>
              <p className="text-red-400">{userError}</p>
            </div>
          ) : null}
          {/* Submit button */}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300"
            type="submit"
          >
            {" "}
            {loading ? <PulseLoader color="#fff" size={16} /> : "Sign in"}
          </button>
          {/* Sign uin Link */}
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>you do not have an account ?</span>
            <Link
              to="/register"
              className="hover:underline cursor-pointer transition ease-in duration-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// export default function LoginForm() {
//   return (
//     <div className="h-screen w-full flex  items-center justify-center overflow-hidden">
//     {/* Container */}
//     <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
//         {/* Heading */}
//         <div className="text-center dark:text-dark_text_1">
//             <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
//             <p className="mt-2 text-sm">Sign in</p>
//         </div>
//         {/* Form */}
//         <form className="mt-6 space-y-6"></form>
//     </div>
// </div>
//   )
// }
