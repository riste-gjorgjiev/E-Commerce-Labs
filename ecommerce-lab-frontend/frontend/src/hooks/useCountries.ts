import { useState, useEffect, useCallback } from 'react';
import { CountryRepository } from '../repository/CountryRepository';
import type { Country, CountryPayload } from '../types';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCountries = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await CountryRepository.getAll();
            setCountries(data);
        } catch (fetchError) {
            console.error(fetchError);
            setError('Failed to fetch countries.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchCountries();
    }, [fetchCountries]);

    const createCountry = async (payload: CountryPayload) => {
        await CountryRepository.create(payload);
        await fetchCountries();
    };

    const updateCountry = async (id: number, payload: CountryPayload) => {
        await CountryRepository.update(id, payload);
        await fetchCountries();
    };

    const deleteCountry = async (id: number) => {
        await CountryRepository.remove(id);
        await fetchCountries();
    };

    return {
        countries,
        loading,
        error,
        refetch: fetchCountries,
        createCountry,
        updateCountry,
        deleteCountry
    };
};
