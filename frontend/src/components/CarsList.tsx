import CarItem from './CarItem';
import type {CarsListProps} from '../types/types.ts';


export default function CarsList({cars, loading, error, onEdit, onDelete}: CarsListProps) {
    if (loading) {
        return <div className="loading">Загрузка автомобилей...</div>;
    }

    if (error) {
        return <div className="error-msg">{error}</div>;
    }

    if (cars.length === 0) {
        return (
            <div className="empty-state">
                <p>Автомобили не найдены</p>
            </div>
        );
    }

    return (
        <div className="cars-grid">
            {cars.map((car) => (
                <CarItem
                    key={car.carId}
                    car={car}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}