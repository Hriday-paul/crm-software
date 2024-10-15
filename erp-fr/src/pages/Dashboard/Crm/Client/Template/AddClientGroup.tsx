import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddClientGroupMutation } from "../../../../../Redux/Features/BaseApi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";

export type add_group_type = {
    grp_name: string;
    description: string
}

const AddClientGroup = React.memo(() => {
    const [postGroupCreate, { isLoading, isError, isSuccess, data, error }] = useAddClientGroupMutation()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<add_group_type>();

    const handleAddGroup: SubmitHandler<add_group_type> = (data) => {
        postGroupCreate(data);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
            reset();
        }
        if (isError) {
            const err = error as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [isSuccess, isError])

    return (
        <form className="px-5" onSubmit={handleSubmit(handleAddGroup)}>
            <div className="w-full mb-3">
                <label htmlFor="name" className="mb-2 block text-black dark:text-white">
                    Name
                    <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('grp_name', { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                    className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark outline-none text-black dark:text-white ${errors.grp_name ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                />
                {errors.grp_name && <p className="text-red-500 text-sm">{errors.grp_name.message}</p>}
            </div>

            <div className="w-full mb-3">
                <label htmlFor="description" className="mb-2 block text-black dark:text-white">
                    Details
                </label>
                <textarea
                    id="description"
                    rows={4}
                    {...register('description', { minLength: { value: 3, message: "Description must be at least 3 characters" } })}
                    className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark outline-none text-black dark:text-white ${errors.description ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>

            <button type="submit" className="px-3 py-1.5 bg-primary hover:opacity-70 duration-200 text-white rounded-sm text-base flex flex-row gap-x-2 items-center ml-auto">
                {isLoading && < ImSpinner2 className="text-lg text-white animate-spin" />}
                <span>Save Group</span>
            </button>
        </form>
    );
});

export default AddClientGroup;