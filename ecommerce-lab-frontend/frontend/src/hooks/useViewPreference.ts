import { useCallback, useEffect, useMemo, useState } from 'react';
import { UserPreferenceRepository } from '../repository/UserPreferenceRepository';
import type { ViewMode } from '../types';

const buildStorageKey = (username: string | null | undefined, scope: string) => {
    const userKey = username ?? 'guest';
    return `view_pref:${userKey}:${scope}`;
};

export const useViewPreference = (username: string | null | undefined, scope: string) => {
    const storageKey = useMemo(() => buildStorageKey(username, scope), [username, scope]);
    const [viewMode, setViewModeState] = useState<ViewMode>(() => {
        const stored = localStorage.getItem(storageKey) as ViewMode | null;
        return stored === 'grid' || stored === 'column' ? stored : 'grid';
    });
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let active = true;
        const fetchPreference = async () => {
            try {
                const preference = await UserPreferenceRepository.get();
                if (!active) return;
                const resolved = preference.booksViewMode ?? 'grid';
                setViewModeState(resolved);
                localStorage.setItem(storageKey, resolved);
            } catch (error) {
                console.error('Failed to load user preference.', error);
            } finally {
                if (active) setLoading(false);
            }
        };

        if (username) {
            fetchPreference();
        } else {
            setLoading(false);
        }

        return () => {
            active = false;
        };
    }, [username, storageKey]);

    const setViewMode = useCallback(async (mode: ViewMode) => {
        setViewModeState(mode);
        localStorage.setItem(storageKey, mode);
        if (username) {
            try {
                await UserPreferenceRepository.update({ booksViewMode: mode });
            } catch (error) {
                console.error('Failed to persist user preference.', error);
            }
        }
    }, [storageKey, username]);

    return { viewMode, setViewMode, loading };
};
