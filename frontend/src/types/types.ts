// 1. Car interfaces

export enum CarBodyTypes {
    HATCHBACK = 'Хэтчбек',
    SEDAN = 'Седан',
    COUPE = 'Купе',
    CABRIOLET = 'Кабриолет',
    UNIVERSAL = 'Универсал',
    SUV = 'Внедорожник',
    PICKUP = 'Пикап',
    CROSSOVER = 'Кроссовер',
    VAN = 'Вэн'
}

export enum CarWheelDrives {
    FWD = 'Передний',
    RWD = 'Задний',
    AWD = 'Полный'
}

export enum CarGearboxes {
    AUTOMATIC = 'АКПП',
    MANUAL = 'МКПП'
}

export enum CarCompletions {
    BASE = 'Базовая',
    MEDIUM = 'Средняя',
    MAXIMUM = 'Максимальная'
}

export enum CarConditions {
    NEW = 'Новый',
    USED = 'Б/У'
}

export enum CarColors {
    WHITE = 'Белый',
    GREY = 'Серый',
    BLACK = 'Черный',
    BLUE = 'Синий',
    RED = 'Красный',
    GREEN = 'Зеленый',
    YELLOW = 'Желтый',
    ORANGE = 'Оранжевый',
    VIOLET = 'Фиолетовый'
}

export interface CarAttributes {
    carId: number;
    carBrand: string;
    carModel: string;
    carReleaseDate: string | null;
    carCondition: CarConditions;
    carMileage: number;
    carBodyType: CarBodyTypes;
    carWheelDrive: CarWheelDrives;
    carGearbox: CarGearboxes;
    carCompletion: CarCompletions;
    carColor: CarColors;
    carEngineCapacity: number;
    carHorsePower: number;
    carPrice: number;
}

export type CarForm = Omit<CarAttributes, 'carId'>;

export const emptyCarForm: CarForm = {
    carBrand: '',
    carModel: '',
    carReleaseDate: '',
    carCondition: CarConditions.NEW,
    carMileage: 0,
    carBodyType: CarBodyTypes.SEDAN,
    carWheelDrive: CarWheelDrives.FWD,
    carGearbox: CarGearboxes.AUTOMATIC,
    carCompletion: CarCompletions.MEDIUM,
    carColor: CarColors.WHITE,
    carEngineCapacity: 3.5,
    carHorsePower: 250,
    carPrice: 0,
};

export interface CarItemProps {
    car: CarAttributes;
    onEdit: (car: CarAttributes) => void;
    onDelete: (id: number) => void;
}

export interface CarsListProps {
    cars: CarAttributes[];
    loading: boolean;
    error: string;
    onEdit: (car: CarAttributes) => void;
    onDelete: (id: number) => void;
}

export interface CarFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    form: CarForm;
    onFieldChange: (key: keyof CarForm, value: string | number) => void;
    isEditing: boolean;
}

// 2. Buyer interfaces
export interface BuyerAttributes {
    buyerId: number;
    buyerSurname: string;
    buyerName: string;
    buyerPatronymic?: string | null;
    buyerTel: string;
    buyerPreferredBrand?: string | null;
    buyerPreferredModel?: string | null;
    buyerPreferredBodyType?: CarBodyTypes | null;
    buyerPreferredWheelDrive?: CarWheelDrives | null;
    buyerPreferredGearbox?: CarGearboxes | null;
    buyerPreferredCondition?: CarConditions | null;
    buyerPreferredCompletion?: CarCompletions | null;
    buyerPreferredColor?: CarColors | null;
    buyerCarReleaseDate?: string | null;
    buyerMaxMileage?: number | null;
    buyerMaxPrice?: number | null;
}

export type BuyerSearchParams = Partial<Pick<BuyerAttributes,
    'buyerPreferredBrand' | 'buyerPreferredModel' | 'buyerPreferredBodyType' |
    'buyerPreferredWheelDrive' | 'buyerPreferredGearbox' | 'buyerPreferredCondition' |
    'buyerPreferredCompletion' | 'buyerPreferredColor' | 'buyerCarReleaseDate' |
    'buyerMaxMileage' | 'buyerMaxPrice'>>;

export type BuyerForm = Omit<BuyerAttributes, 'buyerId'>;

export const emptyBuyerForm: BuyerForm = {
    buyerSurname: '',
    buyerName: '',
    buyerPatronymic: null,
    buyerTel: '',
    buyerPreferredBrand: null,
    buyerPreferredModel: null,
    buyerPreferredBodyType: null,
    buyerPreferredWheelDrive: null,
    buyerPreferredGearbox: null,
    buyerPreferredCondition: null,
    buyerPreferredCompletion: null,
    buyerPreferredColor: null,
    buyerCarReleaseDate: null,
    buyerMaxMileage: null,
    buyerMaxPrice: null,
};

export interface BuyerItemProps {
    buyer: BuyerAttributes;
    onEdit: (buyer: BuyerAttributes) => void;
    onDelete: (id: number) => void;
}

export interface BuyersListProps {
    buyers: BuyerAttributes[];
    loading: boolean;
    error: string;
    onEdit: (buyer: BuyerAttributes) => void;
    onDelete: (id: number) => void;
}

export interface BuyerFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
    form: BuyerForm;
    onFieldChange: (key: keyof BuyerForm, value: string | number | null) => void;
    isEditing: boolean;
}

export interface BuyerSearchModalProps {
    onClose: () => void;
    onSubmit: () => void;
    onFieldChange: (key: keyof BuyerSearchParams, value: string | number | null | undefined) => void;
    buyerSearchParams: BuyerSearchParams;
}

// 3. Order interfaces
export enum OrderStatuses {
    PENDING = 'Ожидает',
    CONFIRMED = 'Подтверждён',
    COMPLETED = 'Завершён',
    CANCELLED = 'Отменён',
}

export interface OrderAttributes {
    orderId: number;
    buyerId: number;
    carId: number;
    orderStatus: OrderStatuses;
    orderDate: string;
    orderSum: number;
}

export interface OrderItemProps {
    order: OrderAttributes;
    buyer: BuyerAttributes | undefined;
    car: CarAttributes | undefined;
    onEdit: (order: OrderAttributes) => void;
    onDelete: (id: number) => void;
}

export const statusBadge: Record<OrderStatuses, string> = {
    [OrderStatuses.PENDING]: 'badge badge-pending',
    [OrderStatuses.CONFIRMED]: 'badge badge-confirmed',
    [OrderStatuses.COMPLETED]: 'badge badge-completed',
    [OrderStatuses.CANCELLED]: 'badge badge-cancelled',
};

export interface OrdersListProps {
    orders: OrderAttributes[];
    buyers: BuyerAttributes[];
    cars: CarAttributes[];
    loading: boolean;
    error: string;
    onEdit: (order: OrderAttributes) => void;
    onDelete: (id: number) => void;
}

export type OrderForm = Omit<OrderAttributes, 'orderId'>;

export const emptyOrderForm: OrderForm = {
    buyerId: 0,
    carId: 0,
    orderStatus: OrderStatuses.PENDING,
    orderDate: new Date().toISOString().split('T')[0],
    orderSum: 0,
};