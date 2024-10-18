import { SubmitHandler, useForm } from 'react-hook-form';
import logo from '../../images/logo/btLogo.png';
import { ImSpinner2 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../Redux/Store';
import { useLoginMutation } from '../../Redux/Features/BaseApi';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { addUserDetails } from '../../Redux/Slices/UserSlice';
import { useNavigate, useSearchParams } from 'react-router-dom';

export type login_input_types = {
    user_name: string;
    password: string;
}

const Login = () => {
    const [postLogin, { isLoading, isError, error, isSuccess, data }] = useLoginMutation();
    const dispatch = useDispatch<AppDispatch>();
    const [searchParams] = useSearchParams();
    const navig = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<login_input_types>();

    const handleLogin: SubmitHandler<login_input_types> = (data) => {
        postLogin(data);
    }

    useEffect(() => {
        if (isSuccess) {
            toast.success(data?.message, {autoClose : 1000});
            dispatch(addUserDetails(data?.user))
            reset();
            const rout = searchParams.get('back')
            navig(rout || '/dashboard')
        }
        if (isError) {
            const err = error as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [isSuccess, isError, data])

    return (
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {/* <!-- ===== Page Wrapper Start ===== --> */}
            <div className="flex flex-col min-h-screen items-center justify-center px-4">
                {/* <!-- Sign Up Form --> */}
                <div className="w-full md:w-[500px] max-w-96 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <img src={logo} alt="logo" className='mx-auto h-10 w-32' />
                        <h3 className="font-medium mt-1 text-black dark:text-white text-center text-lg">
                            Login as a Admin
                        </h3>
                    </div>


                    <form onSubmit={handleSubmit(handleLogin)}>
                        <div className="p-6.5">

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    User name
                                    <span className="text-red-500 text-base ml-1"> * </span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter user name"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.user_name ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white`}
                                    {...register("user_name", { required: true })}
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Password
                                    <span className="text-red-500 text-base ml-1"> * </span>
                                </label>
                                <input
                                    type="password"
                                    placeholder="Enter password"
                                    className={`w-full rounded border-[1.5px]  bg-transparent py-3 px-5 text-black outline-none transition ${errors.password ? "border-red-500" : 'border-stroke focus:border-primary active:border-primary dark:border-form-strokedark dark:focus:border-primary'} disabled:cursor-default disabled:bg-whiter  dark:bg-form-input dark:text-white `}
                                    {...register("password", { required: true })}
                                />
                            </div>

                            <button disabled={isLoading} className="flex w-full justify-center items-center rounded bg-primary disabled:bg-opacity-60 disabled:cursor-not-allowed p-3 font-medium text-gray hover:bg-opacity-90">
                                {isLoading && <ImSpinner2 className="text-xl text-white animate-spin mr-1.5" />}
                                {isLoading ? <p>Loading...</p> : <p>Sign In</p>}
                            </button>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;