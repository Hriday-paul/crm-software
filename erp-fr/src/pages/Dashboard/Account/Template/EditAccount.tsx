import React, { useEffect } from 'react';
import { account_type } from '../../../../Redux/Features/Types';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { add_account_type } from './AddAccountForm';
import { ImSpinner2 } from 'react-icons/im';
import moment from 'moment';
import Flatpickr from "react-flatpickr";
import { useEditAccountMutation } from '../../../../Redux/Features/BaseApi';
import { toast } from 'react-toastify';
import { CiCircleQuestion } from 'react-icons/ci';

const EditAccount = React.memo(({ account }: { account: account_type }) => {
    const [postEdit, { isError, isLoading, isSuccess, error, data }] = useEditAccountMutation();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<add_account_type>({
        defaultValues: {
            account_num: account?.account_num,
            contact_person_phone: account?.contact_person_phone,
            balance: account?.balance,
            description: account?.description,
            created: account?.created,
            name: account?.name
        }
    });

    const handleEditAccount: SubmitHandler<add_account_type> = (data) => {
        console.log(data)
        const form = new FormData();

        for (const key in data) {
            if (key == 'balance') {
                continue;
            }
            const value = data[key as keyof add_account_type];
            if (value !== undefined && value !== null && value !== '') {
                form.append(key, value.toString());
            }
        }
        postEdit({ id: account.id, data: form });
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
        <div className='p-8'>
            <form className="" onSubmit={handleSubmit(handleEditAccount)}>
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

                <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                    <label htmlFor="account-num" className="text-base text-black dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                        Account number
                        :
                    </label>
                    <input
                        {...register("account_num", { minLength: { value: 5, message: "Account number must be at least 5 characters" } })}
                        type="number"
                        id="account-num"
                        className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                    />
                    <span className="col-span-1"></span>
                    {errors.account_num && <p className="text-red-500 text-sm col-span-2">{errors.account_num.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                    <label htmlFor="balance" className="text-base text-black dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                        Balance
                        <span className="text-red-500 text-base ml-1">*</span>
                        <div className="tooltip" data-tip="unable to edit balance">
                            <CiCircleQuestion className='text-lg mt-1 ml-1' />
                        </div>
                        :
                    </label>
                    <input
                        disabled
                        {...register("balance", { required: 'Initial balance required', min: { value: 0, message: "Intital balance must be greater than 0" }, max: { value: 1000000000, message: "Intital balance must be less than 1000000000" } })}
                        type="number"
                        id="balance"
                        defaultValue={0}
                        className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white disabled:bg-stroke disabled:dark:bg-strokedark"
                        step="0.01"
                    />
                    <span className="col-span-1"></span>
                    {errors.balance && <p className="text-red-500 text-sm col-span-2">{errors.balance.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 items-start mb-4">
                    <label htmlFor="phone" className="text-base text-black dark:text-white block mb-2 col-span-1 mr-5 md:text-right">
                        Emergency contact
                        :
                    </label>
                    <input
                        {...register("contact_person_phone", { minLength: { value: 11, message: "Emergency contact must be at least 11 characters" } })}
                        type="number"
                        placeholder='01....'
                        id="phone"
                        className="w-full rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white"
                    />
                    <span className="col-span-1"></span>
                    {errors.contact_person_phone && <p className="text-red-500 text-sm col-span-2">{errors.contact_person_phone.message}</p>}
                </div>

                <div className="w-full mb-3">
                    <Controller
                        name="created"
                        control={control}
                        defaultValue={moment().format()}
                        rules={{ required: "creation date is required" }}
                        render={({ field }) => (
                            <Flatpickr
                                placeholder='YYYY-MM-DD'
                                defaultValue={moment().format()}
                                onChange={(_, str) => {
                                    field.onChange(str)
                                }}
                                options={{ static: true }}
                                render={
                                    ({ defaultValue }, ref) => {
                                        return <div className='w-full'>
                                            <label className="mb-2.5 block text-black dark:text-white" >
                                                Creation date
                                                <span className="text-red-500 text-base ml-1">*</span>
                                            </label>
                                            <input placeholder='YYYY-MM-DD' defaultValue={defaultValue} ref={ref} className={`form-datepicker w-full rounded border bg-transparent px-2 py-1 font-normal outline-none transition dark:bg-form-input ${errors?.created ? 'border-red-500' : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'}`} />
                                        </div>
                                    }
                                }
                            />
                        )}
                    />
                    {errors.created && <p className="text-red-500 text-sm">{errors.created.message}</p>}
                </div>

                <div className="w-full mb-3">
                    <label htmlFor="description" className="mb-2 block text-black dark:text-white">
                        Note
                    </label>
                    <textarea
                        id="description"
                        rows={2}
                        {...register('description', { minLength: { value: 10, message: "Note must be at least 10 characters" } })}
                        className={`w-full rounded-sm border px-2 py-1 dark:bg-boxdark outline-none text-black dark:text-white ${errors.description ? 'border-red-500' : 'border-stroke dark:border-strokedark focus:border-primary'}`}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
                </div>





                <button type="submit" className="px-3 py-1.5 bg-primary hover:opacity-70 duration-200 text-white rounded-sm text-base flex flex-row gap-x-2 items-center ml-auto">
                    {isLoading && < ImSpinner2 className="text-lg text-white animate-spin" />}
                    <span>Create</span>
                </button>
            </form>
        </div>
    );
});

export default EditAccount;