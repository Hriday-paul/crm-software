import { useCallback, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { LuLayoutDashboard } from 'react-icons/lu';
import { CiUser, CiViewList } from "react-icons/ci";
import { IoPower, IoSettingsOutline } from "react-icons/io5";
import { HiUserCircle } from "react-icons/hi";
import { TbUserDown, TbUserShare } from "react-icons/tb";
import { CgInsertAfter } from "react-icons/cg";
import { MdOutlineAccountBalanceWallet, MdOutlineChecklist, MdPayment } from "react-icons/md";
import { GiMoneyStack, GiPayMoney, GiReceiveMoney } from "react-icons/gi";
import { BiTransfer } from "react-icons/bi";
import { useTranslation } from "react-i18next";
// import LanguageSwitcher from "../../../components/ui/LanguageSwitcher";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../Redux/Store";
import Header from "../Header/Header";
import { resetUser } from "../../Redux/Slices/UserSlice";


const Sidebars = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [toggled, setToggled] = useState(false);
  const styles = useSelector((state: RootState) => state.styles);
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const dispatch = useDispatch<AppDispatch>()

  const tabList = [
    {
      title: t("crm.title"),
      icon: <HiUserCircle className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("crm.subItem.client.title"),
          icon: <TbUserDown className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/crm/client",
          subItem: [
            {
              title: t("crm.subItem.client.subItem.addClient"),
              icon: <CgInsertAfter />,
              link: "/dashboard/crm/client/add"
            },
            {
              title: t("crm.subItem.client.subItem.clientList"),
              icon: <CiViewList />,
              link: "/dashboard/crm/client/List"
            },
            {
              title: t("crm.subItem.client.subItem.clientGroup"),
              icon: <AiOutlineUsergroupAdd />,
              link: "/dashboard/crm/client/group"
            },
            {
              title: t("crm.subItem.client.subItem.clientStatement"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/crm/client/statements"
            },

          ]
        },
        {
          title: t("crm.subItem.supplier.title"),
          icon: <TbUserShare className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/crm/supplier",
          subItem: [
            {
              title: t("crm.subItem.supplier.subItem.addSupplier"),
              icon: <CgInsertAfter />,
              link: "/dashboard/crm/supplier/add"
            },
            {
              title: t("crm.subItem.supplier.subItem.supplierList"),
              icon: <CiViewList />,
              link: "/dashboardcrm/supplier/List"
            },
            {
              title: t("crm.subItem.supplier.subItem.supplierGroup"),
              icon: <AiOutlineUsergroupAdd />,
              link: "/dashboardcrm/supplier/group"
            },
            {
              title: t("crm.subItem.supplier.subItem.supplierStatement"),
              icon: <MdOutlineChecklist />,
              link: "/dashboardcrm/supplier/statements"
            },

          ]
        }
      ]
    },
    {
      title: t("account.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("account.subItem.receive.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/account/receive",
          subItem: [
            {
              title: t("account.subItem.receive.subItem.addReceive"),
              icon: <CgInsertAfter />,
              link: "/dashboard/account/receive/add"
            },
            {
              title: t("account.subItem.receive.subItem.receiveList"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/account/receive/list"
            },
          ]
        },
        {
          title: t("account.subItem.expense.title"),
          icon: <GiPayMoney className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/account/expense",
          subItem: [
            {
              title: t("account.subItem.expense.subItem.addExpense"),
              icon: <CgInsertAfter />,
              link: "/dashboard/account/expense/add"
            },
            {
              title: t("account.subItem.expense.subItem.supplierPayment"),
              icon: <MdPayment />,
              link: "/dashboard/account/expense/supplier-payment"
            },
          ]
        },
        {
          title: t("account.subItem.accounts.title"),
          icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/account/accounts",
          subItem: [
            {
              title: t("account.subItem.accounts.subItem.addAccounts"),
              icon: <CgInsertAfter />,
              link: "/dashboard/account/accounts/add"
            },
            {
              title: t("account.subItem.accounts.subItem.accountsList"),
              icon: <CiViewList />,
              link: "/dashboard/account/accounts/list"
            },
            {
              title: t("account.subItem.accounts.subItem.accountsBalance"),
              icon: <GiMoneyStack />,
              link: "/dashboard/account/accounts/balance"
            },
            {
              title: t("account.subItem.accounts.subItem.accountsStatement"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/account/accounts/statements"
            },

          ]
        },
        {
          title: t("account.subItem.transfer.title"),
          icon: <BiTransfer className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/account/transfer",
          subItem: [
            {
              title: t("account.subItem.transfer.subItem.transferCreat"),
              icon: <CgInsertAfter />,
              link: "/dashboard/account/transfer/add"
            },
            {
              title: t("account.subItem.transfer.subItem.transferList"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/account/transfer/list"
            },
          ]
        },

      ]
    },
    {
      title: t("profit.title"),
      icon: <TbUserDown className={`${styles?.textSizePrim}`} />,
      link: "/dashboard/total-profit"

    },
    {
      title: t("loan.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("loan.subItem.addNewLoan.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/loan/addLoan',
          subItem: []
        },
        {
          title: t("loan.subItem.loanList.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/loan/loanList',
          subItem: []
        },
        {
          title: t("loan.subItem.loanReceive.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/loan/loanReceive',
          subItem: []
        },
      ]
    },
    {
      title: t("bill.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("bill.subItem.addNew.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/bill/addBill',
          subItem: []
        },
        {
          title: t("bill.subItem.invoiceList.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/bill/invoiceList',
          subItem: []
        },
        {
          title: t("bill.subItem.draftInvoice.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/bill/draftInvoice',
          subItem: []
        },
        {
          title: t("bill.subItem.selsReturn.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/bill/selsReturn',
          subItem: [
            {
              title: t("bill.subItem.selsReturn.subItem.addReturn"),
              icon: <CgInsertAfter />,
              link: '/dashboard/bill/selsReturn/addReturn'
            },
            {
              title: t("bill.subItem.selsReturn.subItem.returnList"),
              icon: <CgInsertAfter />,
              link: '/dashboard/bill/selsReturn/returnList'
            },
          ]
        },
      ]
    },
    {
      title: t("product.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("product.subItem.product.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/product/product",
          subItem: [
            {
              title: t("product.subItem.product.subItem.productCreate"),
              icon: <CgInsertAfter />,
              link: "/dashboard/product/product/productCreate"
            },
            {
              title: t("product.subItem.product.subItem.productList"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/product/product/productList"
            },
            {
              title: t("product.subItem.product.subItem.productGroup"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/product/product/productGroup"
            },
          ]
        },
        {
          title: t("product.subItem.productAsset.title"),
          icon: <GiPayMoney className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/product/productAsset",
          subItem: [
            {
              title: t("product.subItem.productAsset.subItem.productUnit"),
              icon: <CgInsertAfter />,
              link: "/dashboard/product/productAsset/productUnit"
            },
          ]
        },
        {
          title: t("product.subItem.purchase.title"),
          icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/product/purchase",
          subItem: [
            {
              title: t("product.subItem.purchase.subItem.addNew"),
              icon: <CgInsertAfter />,
              link: "/dashboard/product/purchase/addNew"
            },
            {
              title: t("product.subItem.purchase.subItem.purchaseList"),
              icon: <CiViewList />,
              link: "/dashboard/product/purchase/purchaseList"
            },
            {
              title: t("product.subItem.purchase.subItem.purchaseInvoiceList"),
              icon: <GiMoneyStack />,
              link: "/dashboard/product/purchase/purchaseInvoiceList"
            },
            {
              title: t("product.subItem.purchase.subItem.purchaseReport"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/product/purchase/purchaseReport"
            },

          ]
        },
        {
          title: t("product.subItem.productStock.title"),
          icon: <BiTransfer className={`${styles?.textSizePrim}`} />,
          link: "/dashboard/product/productStock",
          subItem: []
        },

      ]
    },
    {
      title: t("sms.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("sms.subItem.customer.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/customer',
          subItem: []
        },
        {
          title: t("sms.subItem.customerGroup.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/customerGroup',
          subItem: []
        },
        {
          title: t("sms.subItem.supplier.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/supplier',
          subItem: []
        },
        {
          title: t("sms.subItem.supplierGroup.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/supplierGroup',
          subItem: []
        },
        {
          title: t("sms.subItem.smsSchedule.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/smsSchedule',
          subItem: []
        },
        {
          title: t("sms.subItem.scheduleReport.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/sms/scheduleReport',
          subItem: []
        },
      ]
    },
    {
      title: t("staff.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("staff.subItem.staffCreate.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffCreate',
          subItem: []
        },
        {
          title: t("staff.subItem.StaffList.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffList',
          subItem: []
        },
        {
          title: t("staff.subItem.staffPayment.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffPayment',
          subItem: [
            {
              title: t("staff.subItem.staffPayment.subItem.paymentCreate"),
              icon: <CgInsertAfter />,
              link: "/dashboard/staff/staffPayment/paymentCreate"
            },
            {
              title: t("staff.subItem.staffPayment.subItem.staffPaymentReport"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/staff/staffPayment/staffPaymentReport"
            },
          ]
        },
        {
          title: t("staff.subItem.staffSalary.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffSalary',
          subItem: [
            {
              title: t("staff.subItem.staffSalary.subItem.addSalary"),
              icon: <CgInsertAfter />,
              link: "/dashboard/staff/staffSalary/addSalary"
            },
            {
              title: t("staff.subItem.staffSalary.subItem.salaryReport"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/staff/staffSalary/salaryReport"
            },
          ]
        },
        {
          title: t("staff.subItem.staffAttendence.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffAttendence',
          subItem: [
            {
              title: t("staff.subItem.staffAttendence.subItem.attendenceCreate"),
              icon: <CgInsertAfter />,
              link: "/dashboard/staff/staffAttendence/attendenceCreate"
            },
            {
              title: t("staff.subItem.staffAttendence.subItem.attendenceReport"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/staff/staffAttendence/attendenceReport"
            },
            {
              title: t("staff.subItem.staffAttendence.subItem.monthlyAttendenceReport"),
              icon: <MdOutlineChecklist />,
              link: "/dashboard/staff/staffAttendence/monthlyAttendenceReport"
            },
          ]
        },
        {
          title: t("staff.subItem.staffDipertment.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffDipertment',
          subItem: []
        },
        {
          title: t("staff.subItem.staffDesignation.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/staff/staffDesignation',
          subItem: []
        },
      ]
    },
    {
      title: t("duereport.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("duereport.subItem.dueList.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/dueReport/dueList',
          subItem: []
        },
        {
          title: t("duereport.subItem.clientWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/dueReport/clientWise',
          subItem: []
        },
        {
          title: t("duereport.subItem.groupWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/dueReport/groupWise',
          subItem: []
        },
      ]
    },
    {
      title: t("salesReport.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("salesReport.subItem.all.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/all',
          subItem: []
        },
        {
          title: t("salesReport.subItem.daily.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/daily',
          subItem: []
        },
        {
          title: t("salesReport.subItem.customerWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/customerWise',
          subItem: []
        },
        {
          title: t("salesReport.subItem.groupWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/groupWise',
          subItem: []
        },
        {
          title: t("salesReport.subItem.productWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/productWise',
          subItem: []
        },
        {
          title: t("salesReport.subItem.productGroupWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/salesReport/productGroupWise',
          subItem: []
        },
      ]
    },
    {
      title: t("depositReport.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("depositReport.subItem.allDeposit.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/depositReport/allDeposit',
          subItem: []
        },
        {
          title: t("depositReport.subItem.categoryWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/depositReport/daily',
          subItem: []
        },
        {
          title: t("depositReport.subItem.customerWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/depositReport/customerWise',
          subItem: []
        }
      ]
    },
    {
      title: t("expenseReport.title"),
      icon: <MdOutlineAccountBalanceWallet className={`${styles?.textSizePrim}`} />,
      subItem: [
        {
          title: t("expenseReport.subItem.allExpense.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/expenseReport/allExpense',
          subItem: []
        },
        {
          title: t("expenseReport.subItem.categoryWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/expenseReport/categoryWise',
          subItem: []
        },
        {
          title: t("expenseReport.subItem.subCategoryWise.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/expenseReport/subCategoryWise',
          subItem: []
        },
        {
          title: t("expenseReport.subItem.supplierPurchasePayment.title"),
          icon: <GiReceiveMoney className={`${styles?.textSizePrim}`} />,
          link: '/dashboard/expenseReport/supplierPurchasePayment',
          subItem: []
        }
      ]
    },
    {
      title: t("setting"),
      icon: <IoSettingsOutline className={`${styles?.textSizePrim}`} />,
      link: "/dashboard/setting"
    },

  ];

  const Signout = useCallback(() => {
    dispatch(resetUser())
  }, [])

  return (
    <div>
      <div className='flex'>

        <Sidebar collapsed={collapsed} onBackdropClick={() => setToggled(false)} toggled={toggled} breakPoint='lg' className={`h-screen text-stroke`} width="280px" backgroundColor='#2C3136'>
          <Menu className='flex flex-col'
            menuItemStyles={{
              button: {
                ':hover': {
                  backgroundColor: '#33383E',
                  transition: '0.2s',
                  color: '#fff',
                },
                [`&.active`]: {
                  backgroundColor: '#33383E',
                  borderLeft: '4px solid #22c55e',
                  color: '#22c55e',
                },
              },
            }}
          >
            {/* //user section */}
            <div className='border-b border-strokedark'>
              <Link className='flex justify-center items-center' to="/dashboard">
                <div className='flex flex-row items-center'>
                  <img className='h-12 lg:h-14' src="https://i.ibb.co/gj0mB4d/logo-removebg-preview.png" alt="logo" />
                  {
                    !collapsed && <h2 className='font-bold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-200 to-rose-500'>MS. Soft</h2>
                  }
                </div>

              </Link>

              <div className='flex min-h-44 py-2 flex-col justify-center items-center'>

                <img className={collapsed ? 'h-10 w-10 m-0.5 rounded-full mb-3' : 'h-16 w-16 m-0.5 rounded-full mb-3'} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUDOlaA7x6auc_yDvEigMgyktyrJBM34AFOaauo6-qXD5zg_vpZlZk9offXf9PMLdA0Lw&usqp=CAU"} alt="img" />

                <h4 className={!collapsed ? 'font-medium text-lg text-center mb-1.5 ' : 'font-normal text-sm text-center mb-1.5 text-stroke'}>{'Admin software'}</h4>

                <div className={`flex justify-center items-center gap-2 ${collapsed ? "flex-col" : 'flex-row'}`}>
                  <button className="bg-white/5 rounded-full p-1.5 border border-gray-200"><CiUser className={`text-base ${styles?.inputBorderColor}`} /></button>
                  <button className="bg-white/5 rounded-full p-1.5 border border-gray-200"><IoSettingsOutline className={`text-base ${styles?.inputBorderColor}`} /></button>
                  <button onClick={Signout} className={`bg-white/5 rounded-full p-1.5 border border-stroke`}> <IoPower className={`text-base ${styles?.inputBorderColor}`} /></button>
                </div>

              </div>

            </div>

            {/* // start tab */}

            <div>

              <div className="w-full relative">
                <NavLink className={`font-medium uppercase px-5 flex h-[50px] items-center cursor-pointer ${pathname === '/dashboard' ? 'bg-[#33383E] text-green-500 border-l-4 border-green-500' : 'bg-[#2C3136] hover:bg-[#33383E] text-slate-300 hover:text-white '}`} to={'/dashboard'}>
                  <span className="w-[35px] h-[35px] flex items-center justify-center mr-[10px]"><LuLayoutDashboard className="text-lg" /></span>
                  {!collapsed && <span>{t("dashboard")}</span>}
                </NavLink>
              </div>

              {
                tabList?.map((tabs, indx) => {
                  return tabs?.subItem ?
                    <SubMenu key={indx + tabs.title}
                      icon={tabs?.icon}
                      label={tabs?.title}
                      className={`${styles?.fontSecon} text-stroke`}>

                      {

                        tabs?.subItem?.map((tabinnerList, indx) => {
                          return tabinnerList?.subItem.length > 0 ? <SubMenu key={indx + tabinnerList.title}
                            icon={tabinnerList?.icon} label={tabinnerList?.title}
                            className={`text-sm ${styles?.fontSecon} bg-[#1C1F22]`}>
                            {

                              tabinnerList?.subItem?.map((tab, indx) => {
                                return <MenuItem key={tab?.title + indx}
                                  icon={tab?.icon}
                                  className={`text-sm ${styles?.fontSecon} bg-[#1C1F22]`}
                                  component={<NavLink className={({ isActive }) => isActive ? `bg-[#33383E] border-l-2 border-l-green-500 font-medium uppercase` : "font-medium uppercase"} to={tab?.link} />}>
                                  {tab?.title}
                                </MenuItem>
                              })
                            }

                          </SubMenu>
                            :
                            <MenuItem
                              key={indx + tabinnerList.title}
                              icon={tabinnerList?.icon}
                              className={`text-sm ${styles?.fontSecon} bg-[#1C1F22]`}
                              component={<NavLink className={({ isActive }) => isActive ? `bg-[#1C1F22] border-l-2 border-l-green-500 font-medium uppercase` : "font-medium uppercase"} to={tabinnerList?.link} />}>
                              {tabinnerList?.title}
                            </MenuItem>
                        })

                      }

                    </SubMenu>

                    :

                    <MenuItem
                      key={indx + tabs.title}
                      icon={tabs?.icon}
                      component={<NavLink className={({ isActive }) => isActive ? `bg-[#1C1F22] border-l-2 border-l-green-500 font-medium uppercase` : "font-medium uppercase"} to={tabs?.link} />}>
                      {tabs?.title}
                    </MenuItem>

                })
              }

            </div>

          </Menu>
        </Sidebar>


        <main className={`w-full ${collapsed ? 'lg:w-[calc(100vw-80px)]' : 'lg:w-[calc(100vw-280px)]'}`}>

          <Header sidebarOpen={toggled} setSidebarOpen={setToggled} collapse={collapsed} setCollapse={setCollapsed} />

          <div className={`h-[calc(100vh-68px)] bg-[#F1F3F6] dark:bg-boxdark-2 overflow-y-scroll mx-auto max-w-screen-3xl px-4 md:px-6 2xl:px-10`}>
            <Outlet></Outlet>
          </div>
        </main>

      </div>
    </div>
  );
};

export default Sidebars;
