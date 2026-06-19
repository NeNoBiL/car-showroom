import {useState, useEffect} from 'react';
import {
    getBuyers,
    createBuyer,
    updateBuyer,
    deleteBuyer,
    getBuyersByCarParams
} from '../api/buyers.api';
import {emptyBuyerForm} from '../types/types.ts';
import type {BuyerAttributes, BuyerSearchParams, BuyerForm} from '../types/types.ts';
import BuyersList from '../components/BuyersList';
import BuyerFormModal from '../components/BuyerFormModal';
import BuyerSearchModal from "../components/BuyerSearchModal.tsx";


const emptySearch: BuyerSearchParams = {};

export default function BuyersPage() {
    const [buyers, setBuyers] = useState<BuyerAttributes[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [editingBuyer, setEditingBuyer] = useState<BuyerAttributes | null>(null);
    const [form, setForm] = useState<BuyerForm>(emptyBuyerForm);
    const [searchParams, setSearchParams] = useState<BuyerSearchParams>(emptySearch);
    const [searchResults, setSearchResults] = useState<BuyerAttributes[] | null>(null);

    const load = async () => {
        try {
            setLoading(true);
            setBuyers(await getBuyers());
            setError('');
        } catch {
            setError('Не удалось загрузить покупателей');
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
        setEditingBuyer(null);
        setForm(emptyBuyerForm);
        setShowModal(true);
    };

    const openEdit = (buyer: BuyerAttributes) => {
        setEditingBuyer(buyer);
        setForm({
            buyerSurname: buyer.buyerSurname,
            buyerName: buyer.buyerName,
            buyerPatronymic: buyer.buyerPatronymic ?? null,
            buyerTel: buyer.buyerTel,
            buyerPreferredBrand: buyer.buyerPreferredBrand ?? null,
            buyerPreferredModel: buyer.buyerPreferredModel ?? null,
            buyerPreferredBodyType: buyer.buyerPreferredBodyType ?? null,
            buyerPreferredWheelDrive: buyer.buyerPreferredWheelDrive ?? null,
            buyerPreferredGearbox: buyer.buyerPreferredGearbox ?? null,
            buyerPreferredCondition: buyer.buyerPreferredCondition ?? null,
            buyerPreferredCompletion: buyer.buyerPreferredCompletion ?? null,
            buyerPreferredColor: buyer.buyerPreferredColor ?? null,
            buyerCarReleaseDate: buyer.buyerCarReleaseDate ?? null,
            buyerMaxMileage: buyer.buyerMaxMileage ?? null,
            buyerMaxPrice: buyer.buyerMaxPrice ?? null,
        });
        setShowModal(true);
    };

    const handleSubmit = async () => {
        try {
            if (editingBuyer) {
                await updateBuyer(editingBuyer.buyerId, form);
                showSuccess('Покупатель обновлён');
            } else {
                await createBuyer(form);
                showSuccess('Покупатель добавлен');
            }
            setShowModal(false);
            load();
        } catch {
            setError('Ошибка при сохранении');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Удалить покупателя?')) return;
        try {
            await deleteBuyer(id);
            showSuccess('Покупатель удалён');
            load();
        } catch {
            setError('Ошибка при удалении');
        }
    };

    const handleSearch = async () => {
        try {
            const results = await getBuyersByCarParams(searchParams);
            setSearchResults(results);
            setShowSearchModal(false);
            showSuccess(`Найдено покупателей: ${results.length}`);
        } catch {
            setError('Ошибка при поиске');
        }
    };

    const handleFieldChange = (key: keyof BuyerForm, val: string | number | null) =>
        setForm(prev => ({...prev, [key]: val}));

    const handleSearchParamChange = (key: keyof BuyerSearchParams, val: string | number | null | undefined) =>
        setSearchParams(prev => ({...prev, [key]: val ?? undefined}));

    const closeModal = () => {
        setShowModal(false);
        setEditingBuyer(null);
    }

    const closeSearchModal = () => {
        setShowSearchModal(false);
    }

    const displayBuyers = searchResults ?? buyers;

    return (
        <div className="page-container">
            <div className="page-header">
                <h1 className="page-title">
                    {searchResults
                        ? `Найдено покупателей: ${searchResults.length}`
                        : <>Покупатели</>
                    }
                </h1>
                <div style={{display: 'flex', gap: 10}}>
                    <button className="btn-secondary" onClick={() => setShowSearchModal(true)}>
                        🔍 Поиск по параметрам
                    </button>
                    <button className="btn-primary" onClick={openCreate}>
                        + Добавить покупателя
                    </button>
                </div>
            </div>

            {error && <div className="error-msg">{error}</div>}
            {success && <div className="success-msg">{success}</div>}

            {searchResults && (
                <div className="toolbar">
                    <button
                        className="btn-secondary"
                        onClick={() => {
                            setSearchResults(null);
                            setSearchParams(emptySearch);
                        }}
                    >
                        Сбросить поиск
                    </button>
                </div>
            )}

            <BuyersList
                buyers={displayBuyers}
                loading={loading}
                error={error}
                onEdit={openEdit}
                onDelete={handleDelete}
            />

            {/* Модальное окно для создания или редактирования покупателя */}
            <BuyerFormModal
                isOpen={showModal}
                onClose={closeModal}
                onSubmit={handleSubmit}
                form={form}
                onFieldChange={handleFieldChange}
                isEditing={!!editingBuyer}
            />

            {/* Модальное окно для поиска по параметрам покупателя */}
            {showSearchModal && (
                <BuyerSearchModal
                    onClose={closeSearchModal}
                    onSubmit={handleSearch}
                    onFieldChange={handleSearchParamChange}
                    buyerSearchParams={searchParams}
                />
            )}
        </div>
    );
}