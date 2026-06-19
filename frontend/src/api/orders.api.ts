import api from './axios';
import type {OrderAttributes} from "../types/types.ts";


export async function getOrders(): Promise<OrderAttributes[]> {
    const {data} = await api.get('/orders');
    return data.data;
}

export async function getOrderById(id: number): Promise<OrderAttributes> {
    const {data} = await api.get(`/orders/${id}`);
    return data.data;
}

export async function createOrder(attributes: Omit<OrderAttributes, 'orderId'>): Promise<OrderAttributes> {
    const {data} = await api.post('/orders', attributes);
    return data.data;
}

export async function updateOrder(id: number, attributes: Pick<OrderAttributes, 'orderStatus' | 'orderSum'>): Promise<OrderAttributes> {
    const {data} = await api.put(`/orders/${id}`, attributes);
    return data.data;
}

export async function deleteOrder(id: number): Promise<string> {
    const {data} = await api.delete(`/orders/${id}`);
    return data.message;
}