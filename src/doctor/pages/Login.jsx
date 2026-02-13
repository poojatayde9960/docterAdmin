import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation, useRefreshMutation } from "../../redux/apis/authApi";

const Login = () => {
    const navigate = useNavigate();
    const [login, { isLoading }] = useLoginMutation();
    const [refresh] = useRefreshMutation()

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm({
        mode: "onBlur",
        reValidateMode: "onChange"
    });

    const onSubmit = async (data) => {
        try {

            const response = await login({
                email: data.email.trim(),
                password: data.password
            }).unwrap();


            console.log("LOGIN RESPONSE:", response);

            // ✅ Only store the access token here
            // The admin data is automatically stored by the auth slice
            if (response?.access_token) {
                localStorage.setItem("token", response.access_token);
            }

            // ✅ Store credentials for token refresh
            // Note: In production, consider using a more secure method
            localStorage.setItem("userCredentials", btoa(JSON.stringify({
                email: data.email.trim(),
                password: data.password
            })));

            console.log("TOKEN STORED:", localStorage.getItem("token"));
            console.log("ADMIN STORED:", localStorage.getItem("admin"));

            navigate("/", { replace: true });
        } catch (err) {
            setError("root", {
                type: "manual",
                message:
                    err?.data?.message ||
                    "Invalid email or password. Please try again."
            });
        }
    };


    return (
        <div className="flex h-screen">
            {/* Left Image */}
            <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-[#2D9AD9] p-10 relative overflow-hidden">

                <div className="flex justify-center mb-6">
                    <img
                        src="/logo.png"
                        alt="TechSurya Logo"
                        className="w-40 object-contain"
                    />
                </div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold text-white mb-3 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="text-white text-lg max-w-sm leading-relaxed">
                        Streamline your practice and manage patient records with ease and precision.
                    </p>
                </div>
            </div>

            {/* Right Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-gray-100">
                <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl text-black font-bold text-center mb-4">
                        Login
                    </h2>

                    {/* API Error */}
                    {errors.root && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                            {errors.root.message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                disabled={isLoading}
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Invalid email address"
                                    }
                                })}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="mb-4">
                            <label className="block text-gray-600 text-sm mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                disabled={isLoading}
                                {...register("password", {
                                    required: "Password is required"
                                })}
                                className="w-full px-4 py-2 border rounded-md"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
                        >
                            {isLoading ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
