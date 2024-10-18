import React from 'react';
import { client_types } from '../../../../../Redux/Features/Types';

const Print_all_client = React.memo(({ clients }: { clients: client_types[] }) => {
    return (
        <div>
            <div className="py-10 mx-auto">
                <table className="border border-stroke min-w-32 w-full">
                    <thead>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Company</th>
                            <th>Group</th>
                            <th>Address</th>
                            <th>Country</th>
                            <th>City</th>
                            <th>Refrence</th>
                            <th>Post code</th>
                            <th>Due / Advance</th>
                    </thead>
                    <tbody className="p-5">
                        {
                            clients.map((client, indx) => {
                                return <tr key={client.id} className={`border border-stroke ${indx%2 == 0 ? 'bg-slate-100' : ''}`}>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.name}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.phone}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.email}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.company}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.group_name}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.address}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.country}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.city}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.refference}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">{client?.post_code}</td>
                                    <td className="p-1 min-w-28 border-r border-r-stroke">
                                        {(client?.previous_due <= 0) && <span className="text-primary p-1.5 font-medium">{client?.previous_due ?? ''}</span>}
                                        {(client?.previous_due > 0) && <span className="text-danger p-1.5 font-medium">{client?.previous_due ?? ''}</span>}
                                    </td>
                                </tr>
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
});

export default Print_all_client;