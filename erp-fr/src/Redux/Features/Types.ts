export type client_group_type = {
    id: number;
    name: string;
    description: string;
    created: Date;
    updated: Date;
}

export type client_types = {
    id : number
    group_id ?: number,
    group_name?: string,
    name: string,
    email?: string,
    phone?: string,
    company?: string,
    country?: string,
    address?: string,
    post_code?: string,
    previous_due: number,
    city?: string,
    refference?: string,
    description?: string,
    photo?: string;
    status : 'active' | 'disable',
    created : string,
    updated : string
}

export type account_type = {
    id : number,
    name : string,
    balance : number,
    account_num : string,
    description : string,
    contact_person_phone : string,
    account_status : 0 | 1,
    created : string,
    updated : string,
}