import React, { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { CurrentUserContext } from '../../Contexts/UserСontext';



function ProtectedRoute ({ element: Component, ...props }) {
const {currentUser} = useContext(CurrentUserContext)

  return (
    currentUser ? <Component  {...props} /> : <Navigate to="/" replace />
  );
};

export default ProtectedRoute;