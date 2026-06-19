import api from './axios';
import type {BuyerAttributes, BuyerSearchParams} from "../types/types.ts";


export async function getBuyers(): Promise<BuyerAttributes[]> {
    const {data} = await api.get('/buyers');
    return data.data;
}

export async function getBuyerById(id: number): Promise<BuyerAttributes> {
    const {data} = await api.get(`/buyers/${id}`);
    return data.data;
}

export async function createBuyer(attributes: Omit<BuyerAttributes, 'buyerId'>): Promise<BuyerAttributes> {
    const {data} = await api.post(`/buyers`, attributes);
    return data.data;
}

export async function updateBuyer(id: number, attributes: Omit<BuyerAttributes, 'buyerId'>): Promise<BuyerAttributes> {
    const {data} = await api.put(`/buyers/${id}`, attributes);
    return data.data;
}

export async function deleteBuyer(id: number): Promise<string> {
    const {data} = await api.delete(`/buyers/${id}`);
    return data.message;
}

export async function getBuyersByCarParams(params: BuyerSearchParams): Promise<BuyerAttributes[]> {
    const {data} = await api.get('/buyers/search-by-car-params', {params: params});
    return data.data;
}