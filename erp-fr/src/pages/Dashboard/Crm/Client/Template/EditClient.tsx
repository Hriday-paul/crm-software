import React, { useCallback, useEffect, useState } from 'react';
import { add_client_type } from '../AddClient/AddClient';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import Select from 'react-select'
import { client_types } from '../../../../../Redux/Features/Types';
import { base_url, useClientGroupsQuery, useEditClientMutation } from '../../../../../Redux/Features/BaseApi';
import { toast } from 'react-toastify';

const EditClient = React.memo(({ client }: { client: client_types }) => {
    const { isLoading: groupLoading, data: groupdata } = useClientGroupsQuery();
    const [postEdit, { isError, isLoading, isSuccess, error, data }] = useEditClientMutation();
    const [photo, setPhoto] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<add_client_type>({
        defaultValues: {
            name: client.name,
            email: client.email,
            phone: client.phone,
            company: client.company,
            country: client.country,
            address: client.address,
            post_code: client.post_code,
            previous_due: client.previous_due,
            city: client.city,
            refference: client.refference,
            description: client.description,
            group_id: client.group_id,
        }
    });

    const handleChangePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];
        setPhoto(file);
    }, []);

    const handleEditClient: SubmitHandler<add_client_type> = (data) => {
        const form = new FormData();

        for (const key in data) {
            const value = data[key as keyof add_client_type];

            if (value !== undefined && value !== null && value !== '') {
                form.append(key, value.toString());
            }
        }
        if (photo) {
            form.append('client_photo', photo);
        }
        postEdit({ id: client.id, data : form }).unwrap();
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message);
        }
        if (isError) {
            const err = error as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [isSuccess, isError]);

    return (
        <div>
            <form className="p-6.5" onSubmit={handleSubmit(handleEditClient)}>
                <div className="grid grid-cols-1 items-start">
                    {/* // left side  */}
                    <div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="name" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Client Name
                                <span className="text-red-500 text-base ml-1"> * </span>
                                :
                            </label>
                            <input
                                type="text"
                                id="name"
                                {...register('name', { required: { value: true, message: "Name is required" }, minLength: { value: 3, message: "Name must be at least 3 characters" } })}
                                className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark col-span-2 outline-none text-black dark:text-white ${errors.name ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                            />
                            <span className="col-span-1"></span>
                            {errors.name && <p className="text-red-500 text-sm col-span-2">{errors.name.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="email" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Email :
                            </label>
                            <input
                                {...register("email", { pattern: { value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'invalid email' } })}
                                type="email"
                                id="email"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                            <span className="col-span-1"></span>
                            {errors?.email && <p className="text-red-500 text-sm col-span-2">{errors?.email?.message}</p>}
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="phone" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Phone
                                <span className="text-red-500 text-base ml-1"> * </span>
                                :
                            </label>
                            <input
                                {...register("phone", { minLength: { value: 11, message: "Phone must be at least 11 characters" } })}
                                type="number"
                                id="phone"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                            <span className="col-span-1"></span>
                            {errors.phone && <p className="text-red-500 text-sm col-span-2">{errors.phone.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="company" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Company :
                            </label>
                            <input
                                {...register("company")}
                                type="text"
                                id="company"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="country" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Country :
                            </label>
                            <input
                                {...register("country")}
                                type="text"
                                id="country"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="address" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Address :
                            </label>
                            <input
                                {...register("address")}
                                type="text"
                                id="address"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="post_code" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Post Code :
                            </label>
                            <input
                                {...register("post_code")}
                                type="text"
                                id="post_code"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>
                    </div>

                    {/* //right side  */}
                    <div>
                        {/* // grop selection */}
                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="group" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Group :
                            </label>
                            <div className="col-span-2 flex flex-row gap-x-2">
                                <div className="w-full">
                                    <Controller name="group_id" control={control}
                                        render={({ field }) => (
                                            <Select
                                                onChange={(val) => field.onChange(val?.value)}
                                                options={
                                                    groupdata?.map((item) => {
                                                        return {
                                                            value: item.id,
                                                            label: item.name
                                                        }
                                                    })
                                                }
                                                defaultValue={{ label: client?.group_name, value: client?.group_id }}
                                                isClearable={true}
                                                isSearchable={true}
                                                isLoading={groupLoading}
                                                classNames={{
                                                    control: (state) =>
                                                        state.isFocused ? '!border-primary !shadow-none !bg-white dark:!bg-boxdark' : '!border-stroke dark:!border-strokedark !outline-none dark:!bg-boxdark dark:!text-white',

                                                    option: ({ isSelected }) =>
                                                        isSelected ? '!bg-primary' : 'hover:!bg-primary hover:!text-white dark:bg-box-dark'
                                                }}
                                            />
                                        )}>

                                    </Controller>
                                </div>

                            </div>

                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="prev_due" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Previous Due
                                :
                            </label>
                            <input
                                {...register("previous_due", { min: { value: 0, message: "Previous due must be greater than 0" }, max: { value: 1000000000, message: "Previous due must be less than 1000000000" } })}
                                type="number"

                                id="prev_due"
                                defaultValue={0}
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                            <span className="col-span-1"></span>
                            {errors.previous_due && <p className="text-red-500 text-sm col-span-2">{errors.previous_due.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="city" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                City
                                :
                            </label>
                            <input
                                {...register("city")}
                                type="text"
                                id="city"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="refference" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Refference
                                :
                            </label>
                            <input
                                {...register("refference")}
                                type="text"
                                id="refference"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="details" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Details
                                :
                            </label>
                            <textarea
                                {...register("description")}
                                rows={3}
                                id="details"
                                className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                            <label htmlFor="photo" className="text-base text-black font-medium dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                                Photo
                                :
                            </label>
                            <input
                                onChange={handleChangePhoto}
                                type="file"
                                id="photo"
                                accept="image/*"
                                className="col-span-2 w-full rounded-md border border-stroke px-2 py-1 outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-[#EEEEEE] file:py-0.5 file:px-1 file:text-sm focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-strokedark dark:file:bg-white/30 dark:file:text-white "
                            />
                            <span className="col-span-1"></span>
                            <div>
                                <img className="col-span-2 w-28 h-auto mt-5" src={photo ? URL.createObjectURL(photo) : client.photo ? (base_url + client.photo) : '/placeholder-img.png'} alt='client photo' />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-3 py-1.5 bg-primary outline-none hover:opacity-70 duration-200 text-white rounded-sm text-base flex flex-row gap-x-2 items-center">
                        {isLoading && < ImSpinner2 className="text-lg text-white animate-spin" />}
                        <span>Save</span>
                    </button>
                </div>
            </form>
        </div>
    );
});

export default EditClient;