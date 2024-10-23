/**
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { getUser, register } from "../helper/user";
import { useMutation } from "react-query";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();

  const { data, error, mutate, isLoading, isError, isSuccess } = useMutation(
    (variables) => register(variables)
  );

  const user = getUser();

  useEffect(() => {
    if (isError) {
      toast.error(error);
    }

    if (isSuccess || user) {
      navigate("/login");
      
    }
  }, [user, isError, isSuccess, navigate, error]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("Passwords do not match");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      mutate(userData);

      if (isLoading) {
        return <Spinner />;
      }

      if (isError) {
        toast.error(error);
      }

      if (data) {
        navigate("/login");
        toast.success("Register Successfully");
      }
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-100">
      <div className="flex flex-col items-center justify-center px-8 py-8 lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Register your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  required={true}
                  placeholder="John Doe"
                  onChange={onChange}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="email"
                  name="email"
                  value={email}
                  type="email"
                  required={true}
                  placeholder="name@company.com"
                  onChange={onChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="password"
                  name="password"
                  value={password}
                  type="password"
                  required={true}
                  placeholder="••••••••"
                  onChange={onChange}
                />
              </div>

              <div>
                <label
                  htmlFor="password2"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Repeat password
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  id="password2"
                  name="password2"
                  value={password2}
                  type="password"
                  required={true}
                  placeholder="••••••••"
                  onChange={onChange}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
**/
import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User, Phone } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();
		try {
			await signup(email, password, name, phone);
			navigate("/verify-email");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-900">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
			>
				<div className="p-8">
					<h2 className="text-3xl font-bold items-center justify-center mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
						Create Account
					</h2>
					<form onSubmit={handleSignUp}>
						<Input
							icon={User}
							type="text"
							placeholder="Full Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
						<Input
							icon={Mail}
							type="email"
							placeholder="Email Address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							icon={Phone}
							type="phone"
							placeholder="+251..."
							value={phone}
							onChange={(e) => setPhone(e.target.value)}
						/>
						<Input
							icon={Lock}
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
						<PasswordStrengthMeter password={password} />
						<motion.button
							className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
						</motion.button>
					</form>
				</div>
				<div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
					<p className="text-sm text-gray-400">
						Already have an account?{" "}
						<Link to="/login" className="text-green-400 hover:underline">
							Login
						</Link>
					</p>
				</div>
			</motion.div>
		</div>
	);
};

export default Register;
