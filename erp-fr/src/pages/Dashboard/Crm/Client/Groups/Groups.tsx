import { useCallback, useEffect, useRef, useState } from 'react';
import { useClientGroupsQuery, useDeleteClientGroupMutation } from '../../../../../Redux/Features/BaseApi';
import { Popover, Table, TableColumnsType } from 'antd';
import { client_group_type } from '../../../../../Redux/Features/Types';
import { CiEdit } from 'react-icons/ci';
import { AiOutlineDelete } from 'react-icons/ai';
import Swal from 'sweetalert2';
import BreadCrumb from '../../../../../components/Shared/BreadCrump';
import { FaPlus } from 'react-icons/fa';
import { GoScreenFull } from 'react-icons/go';
import { MdFullscreenExit } from 'react-icons/md';
import AdminLoading from '../../../../../components/Shared/AdminLoading';
import AdminError from '../../../../../components/Shared/AdminError';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import ModalDefault from '../../../../../components/Shared/ModalDefault';
import moment from 'moment';
import AddClientGroup from '../Template/AddClientGroup';
import EditGroup from './EditGroup';
import { toast } from 'react-toastify';

const bradCrumpList = [
    {
        name: '/ Client',
        rout: '#'
    },
    {
        name: '/ groups',
        rout: '#'
    }
];

const Groups = () => {
    const [postdltGroup, {error:dltErr, isError : dltIsErr, isSuccess : dltIsSuccess, data : dltData}] = useDeleteClientGroupMutation();
    const [debouncedInputValue, setDebouncedInputValue] = useState<string>("");
    const { isLoading, isError, isSuccess, data } = useClientGroupsQuery({ search: debouncedInputValue });
    const tableRef = useRef<null | HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');

    useEffect(() => {
        const delayInputTimeoutId = setTimeout(() => {
            setDebouncedInputValue(search);
        }, 500);
        return () => clearTimeout(delayInputTimeoutId);
    }, [search]);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }

    const getTriggerNode = (): HTMLElement => {
        return tableRef.current!;
    };

    const handleDelete = useCallback((id: number) => {
        Swal.fire({
            title: "Are you sure, want to delete this group ?",
            customClass: {
                title: "text-base text-slack-900 dark:text-gray-200 font-satoshi",
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
                postdltGroup({ id })
            }
        });
    }, []);

    const columns: TableColumnsType<client_group_type> = [
        {
            title: 'Serrial',
            key: 'serrial',
            dataIndex: 'z',
            render: (_, __, indx) => {
                return indx + 1;
            }
        },
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            sorter: (a, b) => (a?.name && b.name) ? a?.name.localeCompare(b?.name) : 0,
        },
        {
            title: 'Description',
            key: 'description',
            dataIndex: 'description',
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
            title: 'Updated',
            key: 'updated',
            dataIndex: 'updated',
            render: (record) => {
                return moment(record).format('L');
            },
            sorter: (a, b) => new Date(a?.updated).getTime() - new Date(b?.updated).getTime(),
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
                        </li>} title="Client Edit">
                            <EditGroup groupData={record}/>
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

    useEffect(() => {
        if (dltIsSuccess) {
            toast.success(dltData?.message);
        }
        if (isError) {
            const err = dltErr as { data: { message: string } };
            toast.error(err?.data?.message);
        }
    }, [dltIsSuccess, dltIsErr])

    return (
        <div>
            <BreadCrumb routList={bradCrumpList} />
            <div ref={tableRef} className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark my-2">
                <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex flex-row justify-between items-center">
                    <div className="flex flex-row items-center">
                        <ModalDefault title='Add client group' clicker={<button className={`inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs`}>
                            <p className='flex items-center gap-x-1'>
                                <FaPlus />
                                <span>Add Group</span>
                            </p>
                        </button>}>
                            <AddClientGroup />
                        </ModalDefault>

                        {/* {isSuccess &&
                            <PrintComponent title="All Clients" landscape clicker={<button className={`inline-flex items-center justify-center gap-x-1 rounded bg-primary p-2 text-center font-medium text-white hover:bg-opacity-90 m-1 text-xs`}>
                                <p className='flex items-center gap-x-1'>
                                    <MdOutlinePrint />
                                    <span>Print All</span>
                                </p>
                            </button>}>

                                <Print_all_client clients={data?.collections} />

                            </PrintComponent>
                        } */}
                    </div>
                    {!isFullScreen ? <GoScreenFull onClick={fullScreen} className="text-2xl cursor-pointer" /> : <MdFullscreenExit onClick={exitFullScreen} className="text-2xl cursor-pointer" />
                    }
                </div>

                <div className="flex felx-row justify-between items-center py-2 px-5">
                    <h3 className="font-medium text-black dark:text-white text-base">
                        All Client Groups
                    </h3>
                    <div>
                        <input
                            onChange={handleSearchChange}
                            type="text"
                            placeholder="🔍"
                            className="max-w-44 rounded-sm border border-stroke px-2 py-1 dark:bg-boxdark dark:border-strokedark col-span-2 focus:border-primary outline-none text-black dark:text-white placeholder:text-left"
                        />

                    </div>
                </div>

                {isLoading ? <AdminLoading /> : isSuccess ? <Table<client_group_type>
                    columns={columns}
                    dataSource={data}
                    bordered
                    scroll={{ x: 'max-content', }}
                    pagination={false}
                /> : isError ? <AdminError /> : <></>}
            </div>
        </div>
    );
};

export default Groups;