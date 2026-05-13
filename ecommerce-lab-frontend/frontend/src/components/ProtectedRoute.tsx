import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const normalizeRole = (role?: string | null) => {
    if (!role) return null;
    return role.replace('ROLE_', '').toUpperCase();
};

type ProtectedRouteProps = {
    allowedRoles?: string[];
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && allowedRoles.length > 0) {
        const normalizedRole = normalizeRole(role);
        if (!normalizedRole || !allowedRoles.includes(normalizedRole)) {
            return <Navigate to="/" replace />;
        }
    }

    return <Outlet />;
};
