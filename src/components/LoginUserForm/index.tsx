import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useLocation } from "react-router-dom";
import { loginSchema } from "../Schema";
import useLoginUserAPI from "../LoginUserApi";

function LoginUserForm() {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const { loginUser, profileData } = useLoginUserAPI();

  function onSubmit(profileData: object) {
    loginUser(profileData);
  }

  type ErrorObject = { path: string[]; message: string };
  type ErrorResponse = { errors: ErrorObject[] };

  const errorResponse = (data: any): data is { errors: ErrorResponse } => {
    return (
      data &&
      "errors" in data &&
      Array.isArray(data.errors) &&
      data.errors.length > 0
    );
  };

  const hasErrors = (data: ErrorResponse | null) => {
    return errorResponse(data) ? data.errors[0].message : "";
  };

  const loginError = hasErrors(profileData);

  return (
    <div className="max-w-md mx-auto mt-16">
      <span className="flex px-4 my-3">
        <h1 className="text-2xl font-bold px-4 dark:text-white-pink text-dark-green">
          Fill out to login
        </h1>
      </span>
      <div className="drop-shadow m-4 rounded-2xl p-4 backdrop-blur-lg bg-black/30 inset-0 border border-green">
        <span className="flex justify-center pt-6">
          <Link to={`/register`}>
            <div className="bg-white-pink rounded-l-full w-32">
              <h1 className="text-xl font-bold mb-4 px-1 pt-1 pb-2 text-center">
                Register
              </h1>
            </div>
          </Link>
          <Link to={`/login`}>
            <div className="bg-white-pink rounded-r-full w-32 p-1">
              <h1
                className={`text-xl font-bold px-4 pb-1 text-center text-white-pink dark:text-dark-green ${
                  location.pathname === "/login"
                    ? "bg-green dark:bg-pink rounded-full"
                    : ""
                }`}
              >
                Login
              </h1>
            </div>
          </Link>
        </span>
        <form id="registerform" onSubmit={handleSubmit(onSubmit)}>
          <label className="block text-white-pink text-xs">
            <label htmlFor="email" className="block">
              <input
                autoComplete="email"
                type="text"
                id="email"
                placeholder="Please enter email..."
                {...register("email")}
                className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
              <p className="text-dark-red pl-3 pb-2">{errors.email?.message}</p>
            </label>
            <label htmlFor="password" className="block">
              <input
                type="password"
                id="password"
                placeholder="Please enter your password..."
                {...register("password")}
                className="mt-2 mb-8 mx-auto block w-full bg-white-pink border border-white-pink rounded-md focus:outline-none focus:border-green dark:focus:border-pink text-dark-green dark:bg-dark-green dark:text-white-pink dark:border-green dark:placeholder-white-pink focus:ring-green dark:focus:ring-pink"
              />
              <p className="text-dark-red pl-3 pb-2">
                {errors.password?.message}
              </p>
              <p className="text-dark-red pl-3 pb-2">{loginError}</p>
            </label>
            <button className="btn-primary">Login</button>
          </label>
        </form>
      </div>
    </div>
  );
}

export default LoginUserForm;
