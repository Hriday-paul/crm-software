import React from 'react';
import { client_types } from '../../../../../Redux/Features/Types';

const ClientTable = React.memo(({ client }: { client: client_types }) => {
    return (
        <div className="px-8 py-10 mx-auto">
            <table className="border border-stroke min-w-32 w-full p-5">
                <tbody className="p-5">
                    <tr className="border border-stroke">
                        <td className="p-1 border-r border-stroke">Name</td>
                        <td className="p-1 min-w-28">{client?.name}</td>
                    </tr>
                    <tr className="border border-stroke bg-slate-100">
                        <td className="p-1 border-r border-stroke">Phone</td>
                        <td className="p-1 min-w-28">{client?.phone ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke">
                        <td className="p-1 border-r border-stroke">Email</td>
                        <td className="p-1 min-w-28">{client?.email ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke bg-slate-100">
                        <td className=" p-1 border-r border-stroke">Group</td>
                        <td className="p-1 min-w-28">{client?.group_name ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke ">
                        <td className="p-1 border-r border-stroke">Company</td>
                        <td className="p-1 min-w-28">{client?.company ?? ''}</td>
                    </tr>
                    <tr className="border-stroke bg-slate-100">
                        <td className="p-1 border-r border-stroke">Country</td>
                        <td className="p-1 min-w-28 ">{client?.country ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke ">
                        <td className=" p-1 border-r border-stroke">City</td>
                        <td className="p-1 min-w-28">{client?.city ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke bg-slate-100">
                        <td className="p-1 border-r border-stroke">Address</td>
                        <td className="p-1 min-w-28">{client?.address ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke ">
                        <td className="p-1 border-r border-stroke">Post code</td>
                        <td className="p-1 min-w-28">{client?.post_code ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke bg-slate-100">
                        <td className="p-1 border-r border-stroke">Refference</td>
                        <td className="p-1 min-w-28">{client?.refference ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke">
                        <td className="p-1 border-r border-stroke">Description</td>
                        <td className="p-1 min-w-28">{client?.description ?? ''}</td>
                    </tr>
                    <tr className="border border-stroke bg-slate-100">
                        <td className="p-1 border-r border-stroke">Due / Advance</td>
                        <td className="p-1 min-w-28">
                            {(client?.previous_due <= 0) && <span className="text-primary p-1.5 font-medium">{client?.previous_due ?? ''}</span>}
                            {(client?.previous_due > 0) && <span className="text-danger p-1.5 font-medium">{client?.previous_due ?? ''}</span>}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
});

export default ClientTable;