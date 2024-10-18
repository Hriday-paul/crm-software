import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom"
import { RootState } from "../../Redux/Store";
import moment from "moment";
import 'moment/dist/locale/de';
import 'moment/dist/locale/zh-cn';
import 'moment/dist/locale/en-gb';
import 'moment/dist/locale/fr';
import 'moment/dist/locale/de';


export default function Private({ children }: { children: React.ReactNode }) {
    const userInfo = useSelector((state: RootState) => state.user);
    const location = useLocation();

    moment.locale(userInfo?.local);

    if (userInfo?.isVerified && userInfo?.isAuthonicated) {
        return children;
    }
    return <Navigate to={`/login${location.pathname ? '?back='+location.pathname : ''}` } replace></Navigate>
}
