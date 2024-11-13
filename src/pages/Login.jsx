import { useState } from "react";
import { useLogin } from "../api/hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const { mutate: login, isLoading } = useLogin(
    (data) => {
      console.log("Login Success", data);
      // Assuming `data.token` is returned from the login API
      localStorage.setItem("token", data.token);
      // Optionally, store the user's role if needed
      localStorage.setItem("role", data.role);
      // Handle success actions, like redirecting
      navigate("/");
    },
    (error) => {
      console.log("ERROR Login failed", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="h-screen w-full flex justify-center items-center">
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
        <figure className="lg:w-1/2">
          <img
            src="https://media.istockphoto.com/id/1487894858/photo/candlestick-chart-and-data-of-financial-market.jpg?s=612x612&w=0&k=20&c=wZ6vVmbm4BV2JOePSnNNz-0aFVOJZ0P9nhdeOMGUg5I="
            alt="Random image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold mb-6">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  name="username"
                  className="grow"
                  placeholder="email@example.com"
                  value={formData.username}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  name="password"
                  className="grow"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </label>
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Don&apos;t have an account?</p>
            {/* <a href="" className="link link-primary">
              Sign up now
            </a> */}
            <Link className="link link-primary" to="/register">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
