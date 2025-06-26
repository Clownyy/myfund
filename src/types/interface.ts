import { LucideIcon } from "lucide-react";

export interface AddOn {
	name?: string,
	onClick?: (rowData: any) => void,
	icon?: string
}

export interface Toolbar {
	name?: string,
	onClick?: () => void,
	icon?: string,
	align?: 'left' | 'right',
}


export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';