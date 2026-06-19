import {CarConditions} from '../types/types.ts';
import type {CarItemProps} from '../types/types.ts';


export default function CarItem({car, onEdit, onDelete}: CarItemProps) {
    return (
        <div className="car-card">
            <div className="car-card-header">
                <div>
                    <h3 className="car-title">{car.carBrand} {car.carModel}</h3>
                    <span className="car-year">{car.carReleaseDate} г. в.</span>
                </div>
                <span className={`badge ${car.carCondition === CarConditions.NEW ? 'badge-new' : 'badge-used'}`}>
          {car.carCondition === 'Новый' ? 'НОВЫЙ' : 'Б/У'}
        </span>
            </div>
            <div className="car-specs">
                <div className="spec-item">🚗 {car.carBodyType}</div>
                <div className="spec-item">⚙️ {car.carGearbox}</div>
                <div className="spec-item">📏 {car.carMileage.toLocaleString()} км</div>
                <div className="spec-item">🐎 {car.carHorsePower} л. с. / {car.carEngineCapacity} л</div>
                <div className="spec-item">🎨 {car.carColor}</div>
                <div className="spec-item">🔧 {car.carCompletion}</div>
            </div>
            <div className="car-card-footer">
                <span className="car-price">{Number(car.carPrice).toLocaleString()} ₽</span>
                <div className="car-actions">
                    <button className="btn-edit" onClick={() => onEdit(car)}>Изменить</button>
                    <button className="btn-danger" onClick={() => onDelete(car.carId)}>Удалить</button>
                </div>
            </div>
        </div>
    );
}