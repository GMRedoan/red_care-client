import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../Authentication/AuthContex";
import useAxios from "../Hooks/UseAxios";
import Swal from "sweetalert2";

const FundForm = () => {
    const { userInfo, user } = useContext(AuthContext);
    const axiosInstance = useAxios();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            funderName: userInfo?.name || "",
            fundingDate: new Date().toISOString().split("T")[0],
        },
    });

    const onSubmit = (data) => {

        const fundData = {
            funderName: data.funderName,
            funderEmail: userInfo.email,
            fundAmount: parseInt(data.fundAmount),
            fundingDate: data.fundingDate,
        };
        axiosInstance.post("/create-payment-checkout", fundData)
            .then(res => {
                window.location.href = res.data.url
            })
    };

    return (
        <div className="min-h-screen flex justify-center items-center px-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="card w-full max-w-md bg-base-100 shadow-xl p-6"
            >
                <h2 className="text-2xl font-bold text-center mb-2">Donate Fund</h2>
                <p className="text-center text-gray-500 mb-6">
                    Support by contributing funds
                </p>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Funder Name</span>
                    </label>
                    <input
                        type="text"
                        {...register("funderName")}
                        defaultValue={user?.name}
                        readOnly
                        className="input input-bordered bg-gray-100 cursor-not-allowed w-full"
                    />
                </div>

                <div className="form-control mb-4">
                    <label className="label">
                        <span className="label-text">Fund Amount</span>
                    </label>
                    <input
                        type="number"
                        placeholder="Enter amount"
                        {...register("fundAmount", {
                            required: "Amount is required",
                            min: { value: 1, message: "Amount must be at least 1" },
                        })}
                        className="input input-bordered w-full"
                    />
                    {errors.fundAmount && (
                        <p className="text-red-500 mt-1">{errors.fundAmount.message}</p>
                    )}
                </div>

                <div className="form-control mb-6">
                    <label className="label">
                        <span className="label-text">Funding Date</span>
                    </label>
                    <input
                        type="date"
                        {...register("fundingDate")}
                        readOnly
                        className="input input-bordered bg-gray-100 cursor-not-allowed w-full"
                    />
                </div>

                <button type="submit" className="btn btn-primary w-full text-white">
                    Donate Fund
                </button>
            </form>
        </div>
    );
};

export default FundForm;
