import { useCallback, useEffect, useRef, useState } from "react";
import BreadCrumb from "../../../components/Shared/BreadCrump";
import { FaPlus } from "react-icons/fa";
import { GoScreenFull } from "react-icons/go";
import { MdFullscreenExit } from "react-icons/md";
import { useAccountsQuery, useDeleteAccountMutation } from "../../../Redux/Features/BaseApi";
import { account_type } from "../../../Redux/Features/Types";
import { Pagination, Popover, Table, TableColumnsType } from "antd";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Swal from "sweetalert2";
import AdminLoading from "../../../components/Shared/AdminLoading";
import AdminError from "../../../components/Shared/AdminError";
import { toast } from "react-toastify";
import ModalDefault from "../../../components/Shared/ModalDefault";
import AddAccountForm from "./Template/AddAccountForm";
import moment from "moment";
import EditAccount from "./Template/EditAccount";


const bradCrumpList = [
    {
        name: '/ Account',
        rout: '#'
    },
    {
        name: '/ list',
        rout: '#'
    }
];

const Accounts = () => {
    const [postDelete, { isError: dltIsErr, isSuccess: dltSuccess, error: dltErr, data: dltData }] = useDeleteAccountMutation();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");

    const { isLoading, isError, isSuccess, data } = useAccountsQuery({ current_page: currentPage - 1, limit, search: debouncedInputValue });
    const [search, setSearch] = useState<string>('');
    const tableRef = useRef<null | HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const getTriggerNode = (): HTMLElement => {
        return tableRef.current!;
    };

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(search);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure, want to delete this account?",
            text : "If deleted, your all transection removed from this account",
            customClass: {
                title: "text-lg text-slack-900 dark:text-gray-200 font-satoshi",
                cancelButton: "bg-danger text-white",
            },
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: "Yes",
            confirmButtonColor: "#38CB6E",
            cancelButtonText: "No",
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                postDelete({ id })
            }
        });
    }

    const columns: TableColumnsType<account_type> = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => (a?.name && b.name) ? a?.name.localeCompare(b?.name) : 0,
        },
        {
            title: 'Account number',
            key: 'account_num',
            dataIndex: 'account_num',
        },
        {
            title: 'Balance',
            key: 'balance',
            dataIndex: 'balance',
            sorter: (a, b) => (a?.balance - b.balance),
        },
        {
            title: 'Note',
            key: 'description',
            dataIndex: 'description',
        },
        {
            title: 'Contact person phone',
            key: 'contact_person_phone',
            dataIndex: 'contact_person_phone',
            width : 150,
        },
        {
            title: 'Created',
            key: 'created',
            dataIndex: 'created',
            render: (record) => {
                return moment(record).format('L');
            },
            sorter: (a, b) => new Date(a?.created).getTime() - new Date(b?.created).getTime(),
        },
        {
            title: 'Status',
            key: 'account_status',
            sorter: (a, b) => (a?.balance - b.balance),
            dataIndex: 'account_status',
            render: (value) => {
                return value == 1 ? <span className="bg-success text-white px-1 py-0.5 text-sm">Active</span> : <span className="bg-danger text-white px-1 py-0.5 text-sm">Disable</span>
            },
        },
        {
            title: 'Action',
            dataIndex: '',
            fixed: 'right',
            width: 80,
            key: 'x',
            render: (_, record) => <Popover
                getPopupContainer={getTriggerNode}
                content={
                    <ul className="rounded-sm z-999999 w-36 p-1 bg-white dark:bg-boxdark-2 text-slate-900 dark:text-slate-200">

                        <ModalDefault clicker={<li className={`p-0.5 pl-2 hover:bg-primary dark:hover:bg-primary duration-200 rounded cursor-pointer hover:text-white`}>
                            <p className='flex items-center gap-x-1'>
                                <CiEdit />
                                <span>Edit</span>
                            </p>
                        </li>} title="Edit Account">
                            <EditAccount account={record}/>
                        </ModalDefault>


                        <li onClick={() => handleDelete(record?.id)} className={`p-0.5 pl-2 hover:bg-primary dark:hover:bg-primary duration-200 rounded cursor-pointer hover:text-white`}>
                            <p className='flex items-center gap-x-1'>
                                <AiOutlineDelete />
                                <span>Delete</span>
                            </p>
                        </li>
                    </ul>
                }
                trigger="click" placement="bottomRight">
                <div role="button" className="inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs">
                    Actions
                    <HiOutlineDotsVertical />
                </div>
            </Popover>,
        },
    ];

    const fullScreen = () => {
        if (tableRef.current) {
            if (tableRef.current.requestFullscreen) {
                tableRef.current.requestFullscreen();
                setIsFullScreen(true);
            }
        }
    }
    const exitFullScreen = () => {
        if (tableRef.current) {
            if (document.fullscreenElement === tableRef.current) {
                document.exitFullscreen();
                setIsFullScreen(false);
            }
        }
    }

    const handleChangeLimit = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(1);
        setLimit(parseInt(e.target.value));
    }, [])

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    useEffect(() => {
        if (dltSuccess) {
            toast.success(dltData?.message);
        }
        if (dltIsErr) {
            const err = dltErr as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [dltSuccess, dltIsErr])

    return (
        <div>
            <BreadCrumb routList={bradCrumpList} />
            <div ref={tableRef} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <ModalDefault clicker={<button className={`inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs`}>
                            <p className='flex items-center gap-x-1'>
                                <FaPlus />
                                <span>Add Account</span>
                            </p>
                        </button>} title="Add Account">
                            <AddAccountForm />
                        </ModalDefault>
                    </div>
                    {!isFullScreen ? <GoScreenFull onClick={fullScreen} className="text-2xl cursor-pointer" /> : <MdFullscreenExit onClick={exitFullScreen} className="text-2xl cursor-pointer" />
                    }
                </div>

                <div className="flex felx-row justify-between items-center py-2 px-5">
                    <h3 className="font-medium text-black dark:text-white text-base">
                        All Accounts
                    </h3>
                    <div>
                        <input
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="🔍"
                            className="max-w-44 rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white placeholder:text-left"
                        />
                        <select onChange={handleChangeLimit} value={limit} className="rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white placeholder:text-left ml-3">
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                {isLoading ? <AdminLoading /> : isSuccess ? <Table<account_type>
                    columns={columns}
                    dataSource={data?.collections}
                    bordered
                    footer={() => <div>
                        <Pagination defaultCurrent={currentPage} hideOnSinglePage total={data?.count[0]?.total} pageSize={limit} align="end" showSizeChanger={false} onChange={onPageChange} />
                    </div>}
                    scroll={{ x: 'max-content', }}
                    pagination={false}
                /> : isError ? <AdminError /> : <></>}

            </div>
        </div>
    );
};

export default Accounts;