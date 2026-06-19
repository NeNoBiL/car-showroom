import {useState, useEffect} from 'react';
import {
    getCars,
    createCar,
    updateCar,
    deleteCar,
    getCarsLowMileage,
    getNewCars,
    getMostExpensiveCar
} from '../api/cars.api';
import {emptyCarForm} from '../types/types.ts';
import type {CarAttributes, CarForm} from '../types/types.ts';
import CarsList from '../components/CarsList';
import CarFormModal from '../components/CarFormModal';
import '../App.css';


export default function CarsPage() {
    const [cars, setCars] = useState<CarAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingCar, setEditingCar] = useState<CarAttributes | null>(null);
    const [form, setForm] = useState<CarForm>(emptyCarForm);
    const [specialResult, setSpecialResult] = useState<CarAttributes[] | CarAttributes | null>(null);
    const [specialTitle, setSpecialTitle] = useState('');

    const load = async () => {
        try {
            setLoading(true);
            setCars(await getCars());
            setError('');
        } catch {
            setError('Не удалось загрузить автомобили');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        load();
    }, []);

    const showSuccess = (msg: string) => {
        setSuccess(msg);
        setTimeout(() => setSuccess(''), 3000);
    };

    const openCreate = () => {
        setEditingCar(null);
        setForm(emptyCarForm);
        setShowModal(true);
    };

    const openEdit = (car: CarAttributes) => {
        setEditingCar(car);
        setForm({
            carBrand: car.carBrand,
            carModel: car.carModel,
            carReleaseDate: car.carReleaseDate ?? '',
            carCondition: car.carCondition,
            carMileage: car.carMileage,
            carBodyType: car.carBodyType,
            carWheelDrive: car.carWheelDrive,
            carGearbox: car.carGearbox,
            carCompletion: car.carCompletion,
            carColor: car.carColor,
            carEngineCapacity: car.carEngineCapacity,
            carHorsePower: car.carHorsePower,
            carPrice: car.carPrice,
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (editingCar) {
                await updateCar(editingCar.carId, form);
                showSuccess('Автомобиль обновлён');
            } else {
                await createCar(form);
                showSuccess('Автомобиль добавлен');
            }
            setShowModal(false);
            load();
        } catch {
            setError('Ошибка при сохранении');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Удалить автомобиль?')) return;
        try {
            await deleteCar(id);
            showSuccess('Автомобиль удалён');
            load();
        } catch {
            setError('Ошибка при удалении');
        }
    };

    const handleSpecial = async (type: 'low-mileage' | 'new' | 'expensive') => {
        try {
            if (type === 'low-mileage') {
                setSpecialTitle('Автомобили с пробегом < 30 000 км');
                setSpecialResult(await getCarsLowMileage());
            } else if (type === 'new') {
                setSpecialTitle('Новые автомобили');
                setSpecialResult(await getNewCars());
            } else {
                setSpecialTitle('Самый дорогой автомобиль');
                setSpecialResult(await getMostExpensiveCar());
            }
        } catch {
            setError('Ошибка при выполнении запроса');
        }
    };

    const handleFieldChange = (key: keyof CarForm, val: string | number) => {
        setForm(prev => ({...prev, [key]: val}));
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingCar(null);
    }

    const specialCars =
        specialResult ? Array.isArray(specialResult) ? specialResult : [specialResult] : null;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">
                    {
                        specialResult ? specialTitle : <>Автомобили</>
                    }
                </h1>
                <button className="btn-primary" onClick={openCreate}>+ Добавить автомобиль</button>
            </div>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            <div className="toolbar">
                <button className="btn-secondary" onClick={() => {
                    setSpecialResult(null);
                    load();
                }}>Все автомобили
                </button>
                <button className="btn-secondary" onClick={() => handleSpecial('new')}>Новые</button>
                <button className="btn-secondary" onClick={() => handleSpecial('low-mileage')}>Пробег &lt; 30 000 км
                </button>
                <button className="btn-secondary" onClick={() => handleSpecial('expensive')}>Самый дорогой автомобиль
                </button>
            </div>

            <CarsList
                cars={specialCars ?? cars}
                loading={loading}
                error={error}
                onEdit={openEdit}
                onDelete={handleDelete}
            />

            <CarFormModal
                isOpen={showModal}
                onClose={closeModal}
                onSubmit={handleSubmit}
                form={form}
                onFieldChange={handleFieldChange}
                isEditing={!!editingCar}
            />
        </div>
    );
}