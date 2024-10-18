import moment from "moment";
import { client_types } from "../../../../../Redux/Features/Types";
import ClientTable from "./ClientTable";

const PrintSingleClient = ({ client }: { client: client_types }) => {

    return (
        <div className="px-8 py-10 mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png" alt="Logo" />
                    <div className="text-gray-700 font-semibold text-lg">MS. Softwares co.</div>
                </div>
                <div className="text-gray-700">
                    <div className="font-bold text-xl mb-2">Statements</div>
                    <div className="text-sm">Date: {moment(new Date()).format('DD-MM-YYYY')}</div>
                </div>
            </div>
            <div className="border-b-2 border-gray-300 pb-8 mb-8">
                <h2 className="text-2xl font-bold mb-4">To:</h2>
                <div className="text-gray-700 mb-2">{client?.name}</div>
                <div className="text-gray-700 mb-2">{client?.phone}</div>
                {client?.address && <div className="text-gray-700 mb-2">{client?.address}</div>}
                {client?.email && <div className="text-gray-700">{client?.email}</div>}
            </div>
            <ClientTable client={client} />
        </div>
    );
};

export default PrintSingleClient;