import { ImSpinner8 } from "react-icons/im";


export default function AdminLoading() {
    return (
        <div className="min-h-80 flex justify-center items-center">
            <ImSpinner8 className="text-5xl text-primary animate-spin" />
        </div>
    )
}
