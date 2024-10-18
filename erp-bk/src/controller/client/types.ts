export type addClientType = {
    id ?: number,
    name : string,
    email : string | null,
    phone : string | null,
    address : string | null,
    city : string | null,
    post_code : string | null,
    country : string | null,
    company : string | null,
    group_id : number | null,
    previous_due : number | null,
    refference : string | null,
    description : string | null,
}

export type addClientGroupType = {
    name : string,
    description : string | null
}