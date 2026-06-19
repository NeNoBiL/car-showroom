import api from './axios';
import type {CarAttributes} from "../types/types.ts";


export async function getCars(): Promise<CarAttributes[]> {
    const {data} = await api.get('/cars');
    return data.data;
}

export async function getCarById(id: number): Promise<CarAttributes> {
    const {data} = await api.get(`/cars/${id}`);
    return data.data;
}

export async function createCar(attributes: Omit<CarAttributes, 'carId'>): Promise<CarAttributes> {
    const {data} = await api.post(`/cars`, attributes);
    return data.data;
}

export async function updateCar(id: number, attributes: Omit<CarAttributes, 'carId'>): Promise<CarAttributes> {
    const {data} = await api.put(`/cars/${id}`, attributes);
    return data.data;
}

export async function deleteCar(id: number): Promise<string> {
    const {data} = await api.delete(`/cars/${id}`);
    return data.message;
}

export async function getCarsLowMileage(): Promise<CarAttributes[]> {
    const {data} = await api.get('/cars/low-mileage');
    return data.data;
}

export async function getNewCars(): Promise<CarAttributes[]> {
    const {data} = await api.get('/cars/new');
    return data.data;
}

export async function getMostExpensiveCar(): Promise<CarAttributes> {
    const {data} = await api.get('/cars/most-expensive');
    return data.data;
}