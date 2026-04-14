import { Navigate, useLocation } from 'react-router-dom';
import { getToken, getUserRole } from '../utils/authStorage';

const ROLE_HOME = {
  STUDENT: '/etudiant/dashboard',
  ENTERPRISE: '/entreprise/dashboard',
  ADMIN: '/admin/dashboard',
};

export default function ProtectedRoute({ allowedRoles, children }) {
  const location = useLocation();
  const token = getToken();
  const role = getUserRole();

  if (!token) {
    return <Navigate to="/connexion" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.includes(role)) {
    return children;
  }

  const fallback = ROLE_HOME[role] || '/';
  return <Navigate to={fallback} replace />;
}
