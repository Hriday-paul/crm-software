import BreadCrumb from "../../../../../components/Shared/BreadCrump";
import { Pagination, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { useClientsQuery, useDeleteClientMutation } from "../../../../../Redux/Features/BaseApi";
import AdminLoading from "../../../../../components/Shared/AdminLoading";
import { client_types } from "../../../../../Redux/Features/Types";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AdminError from "../../../../../components/Shared/AdminError";
import { Popover } from 'antd'
import { IoEyeOutline, IoPrint } from "react-icons/io5";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { GoScreenFull } from "react-icons/go";
import { MdFullscreenExit, MdOutlinePrint } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { AiOutlineDelete } from "react-icons/ai";
import ModalDefault from "../../../../../components/Shared/ModalDefault";
import ClientTable from "../Template/ClientTable";
import PrintComponent from "../../../../../components/Shared/PrintComponent";
import PrintSingleClient from "../Template/Print_Single_client";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import Print_all_client from "../Template/Print_all_client";
import EditClient from "../Template/EditClient";
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { toast } from "react-toastify";

const bradCrumpList = [
    {
        name: '/ Client',
        rout: '#'
    },
    {
        name: '/ list',
        rout: '#'
    }
];

const Clients = () => {
    const [postDelete, { isError: dltIsErr, isLoading: dltLoading, isSuccess: dltSuccess, error: dltErr, data: dltData }] = useDeleteClientMutation()
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(10);
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
    const { isLoading, isError, isSuccess, data } = useClientsQuery({ current_page: currentPage - 1, limit, search: debouncedInputValue });
    const [search, setSearch] = useState<string>('');
    const tableRef = useRef<null | HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const base_url = import.meta.env.VITE_BASE_URL!;

    const getTriggerNode = (): HTMLElement => {
        return tableRef.current!;
    };

    const columns: TableColumnsType<client_types> = [
        {
            title: 'Photo',
            dataIndex: 'photo',
            key: 'photo',
            render: (photo) => <img src={photo ? base_url + photo : '/placeholder-img.png'} alt="client" className="w-10 h-10 rounded-full" />,
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => (a?.name && b.name) ? a?.name.localeCompare(b?.name) : 0,
        },
        {
            title: 'Phone',
            key: 'phone',
            dataIndex: 'phone',
        },
        {
            title: 'Email',
            key: 'email',
            dataIndex: 'email',
            sorter: (a, b) => (a?.email && b.email) ? a?.email.localeCompare(b?.email) : 0,
        },
        {
            title: 'Previous due',
            key: 'previous_due',
            dataIndex: 'previous_due',
            width: 140,
            sorter: (a, b) => (a?.previous_due - b.previous_due),
        },
        {
            title: 'Group',
            key: 'group_name',
            dataIndex: 'group_name',
            sorter: (a, b) => (a?.group_name && b.group_name) ? a?.group_name.localeCompare(b.group_name) : 0,
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
                                <IoEyeOutline />
                                <span>View</span>
                            </p>
                        </li>} title="Client view">
                            <ClientTable client={record} />
                        </ModalDefault>

                        <PrintComponent title="Client Print" clicker={<li className={`p-0.5 pl-2 hover:bg-primary dark:hover:bg-primary duration-200 rounded cursor-pointer hover:text-white`}>
                            <p className='flex items-center gap-x-1'>
                                <IoPrint />
                                <span>Print</span>
                            </p>
                        </li>}>
                            <PrintSingleClient client={record} />
                        </PrintComponent>

                        <ModalDefault clicker={<li className={`p-0.5 pl-2 hover:bg-primary dark:hover:bg-primary duration-200 rounded cursor-pointer hover:text-white`}>
                            <p className='flex items-center gap-x-1'>
                                <CiEdit />
                                <span>Edit</span>
                            </p>
                        </li>} title="Client Edit">
                            <EditClient client={record} />
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

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handleChangeLimit = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentPage(1);
        setLimit(parseInt(e.target.value));
    }, [])

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

    const handleDelete = (id: number) => {
        Swal.fire({
            title: "Are you sure, want to delete this client?",
            customClass: {
                title: "text-base text-slack-900 dark:text-gray-200",
                cancelButton: "bg-secondary text-white",
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
                        <Link to='/dashboard/crm/client/add' className={`inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs`}>
                            <p className='flex items-center gap-x-1'>
                                <FaPlus />
                                <span>Add Client</span>
                            </p>
                        </Link>
                        {isSuccess &&
                            <PrintComponent title="All Clients" landscape clicker={<button className={`inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs`}>
                                <p className='flex items-center gap-x-1'>
                                    <MdOutlinePrint />
                                    <span>Print All</span>
                                </p>
                            </button>}>

                                <Print_all_client clients={data?.collections} />

                            </PrintComponent>
                        }

                    </div>
                    {!isFullScreen ? <GoScreenFull onClick={fullScreen} className="text-2xl cursor-pointer" /> : <MdFullscreenExit onClick={exitFullScreen} className="text-2xl cursor-pointer" />
                    }
                </div>

                <div className="flex felx-row justify-between items-center py-2 px-5">
                    <h3 className="font-medium text-black dark:text-white text-base">
                        All Clients
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

                {isLoading ? <AdminLoading /> : isSuccess ? <Table<client_types>
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

export default Clients;