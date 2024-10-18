export type client_group_type = {
    id: number;
    name: string;
    description: string;
    created: string;
    updated: string;
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