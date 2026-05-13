export const normalizeRole = (role?: string | null) => {
    if (!role) return null;
    return role.replace('ROLE_', '').toUpperCase();
};

export const isAdminRole = (role?: string | null) => {
    const normalized = normalizeRole(role);
    return normalized === 'ADMIN' || normalized === 'ADMINISTRATOR';
};

export const formatRoleLabel = (role?: string | null) => {
    const normalized = normalizeRole(role);
    return normalized ?? '';
};
