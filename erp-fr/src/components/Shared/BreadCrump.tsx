import { IoHomeOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
interface BreadcrumbProps {
    routList: { name: string, rout: string }[]
}
const BreadCrumb = ({ routList }: BreadcrumbProps) => {
    return (
        <div className="flex gap-3 flex-row items-center justify-between mt-1.5">
            <span></span>

            <nav>
                <ol className="flex items-center gap-2">
                    <li>
                        <Link className="text-black text-sm flex items-center gap-x-0.5" to="/dashboard">
                        <IoHomeOutline className='text-xs'/>
                            Home
                        </Link>
                    </li>
                    {
                        routList.map((routItem, indx) => {
                            return <li key={indx + routItem?.name} >
                                {
                                    indx != (routList.length - 1) ?
                                        <Link className="text-black text-sm" to={routItem.rout}>
                                            {routItem.name}
                                        </Link>
                                        :
                                        <span className='text-bodydark text-sm'>{routItem.name}</span>
                                }
                            </li>
                        })
                    }
                </ol>
            </nav>
        </div>
    );
};

export default BreadCrumb;
