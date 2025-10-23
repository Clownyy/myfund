export interface AddOn {
    name?: string;
    onClick?: (rowData: unknown) => void;
    icon?: string;
}

export interface Toolbar {
    name?: string;
    onClick?: () => void;
    icon?: string;
    align?: "left" | "right";
}

export interface ItemGroupProps {
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
}

export interface InstrumentData {
    id: number;
    instrumentCode: string;
    instrumentName: string;
    buyPrice: number;
    sellPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface Bill {
    id: number;
    month: number;
    year: number;
    notes: string;
    paid: boolean;
    createdAt: string;
    updatedAt: string;
    template: BillTemplate;
}

export interface BillTemplate {
    id: number;
    billName: string;
    billAmount: number;
    type: string;
    currFreq: number;
    frequency: number;
    active: true;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface SavingData {
    id: number;
    savingName: string;
    amount: number;
    date: string;
    createdAt: string;
    updatedAt: string;
    instrument: InstrumentData;
    userId: number;
}

export interface Transaction {
    id: number;
    amount: number;
    type: string;
    price: number;
    category: string;
    date: string;
    notes: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface PortfolioData {
    totalValue: number;
    totalProfit: number;
    holdings: Holding[];
}

export interface Holding {
    id: number;
    savingName: string;
    instrumentCode: string;
    instrumentName: string;
    amount: number;
    date: Date;
    profit: number;
    value: number;
}

export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
