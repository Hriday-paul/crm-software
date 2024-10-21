import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEditClientGroupMutation } from "../../../../../Redux/Features/BaseApi";
import { toast } from "react-toastify";
import { ImSpinner2 } from "react-icons/im";
import { client_group_type } from "../../../../../Redux/Features/Types";

const EditGroup = React.memo(({groupData} : {groupData : client_group_type}) => {
    const [postGroupEdit, { isLoading, isError, isSuccess, data, error }] = useEditClientGroupMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<client_group_type>({
        defaultValues : {
            name  : groupData?.name,
            description : groupData?.description,
        }
    });

    const handleEditGroup: SubmitHandler<client_group_type> = (data) => {
        postGroupEdit({id : groupData?.id, data});
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
        <form className="p-5" onSubmit={handleSubmit(handleEditGroup)}>
            <div className="w-full mb-3">
                <label htmlFor="name" className="mb-2 block text-black dark:text-white">
                    Name
                    <span className="text-red-500 text-base ml-1">*</span>
                </label>
                <input
                    type="text"
                    id="name"
                    {...register('name', { required: "Name is required", minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                    className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark outline-none text-black dark:text-white ${errors.name ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="w-full mb-3">
                <label htmlFor="description" className="mb-2 block text-black dark:text-white">
                    Details
                </label>
                <textarea
                    id="description"
                    rows={4}
                    {...register('description', { minLength: { value: 10, message: "Description must be at least 10 characters" } })}
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

export default EditGroup;