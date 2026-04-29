import { useState, useEffect } from 'react';
import { CountryRepository } from '../repository/CountryRepository';
import type { Country } from '../types';

export const useCountries = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        CountryRepository.getAll()
            .then(setCountries)
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    return { countries, loading };
};