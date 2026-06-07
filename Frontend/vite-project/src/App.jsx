import { Routes, Route, Navigate } from "react-router-dom";
import JoinPage from "./pages/JoinPage";
import RoomPage from "./pages/RoomPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from "./redux/authSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/protected/ProtectedRoute";


function App() {

  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);
  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]); 
  
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return (
    <Routes>
        {/* ROOT */}
        <Route
          path="/"
          element={
            isAuthenticated
              ? <Navigate to="/join" replace />
              : <Navigate to="/signup" replace />
          }
        />

        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={
            isAuthenticated
              ? <Navigate to="/join" replace />
              : <Login />
          }
        />

        <Route
          path="/signup"
          element={
            isAuthenticated
              ? <Navigate to="/join" replace />
              : <Signup />
          }
        />

        {/* PROTECTED ROUTES */}
        <Route
          path="/join"
          element={
            <ProtectedRoute>
              <JoinPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/room/:roomId"
          element={
            <ProtectedRoute>
              <RoomPage />
            </ProtectedRoute>
          }
        />
         
        <Route path="/forgot-password" element={ isAuthenticated ? <Navigate to="/" /> : <ForgotPassword /> }/>
        <Route path="/reset-password/:token" element={ isAuthenticated ? <Navigate to="/" /> : <ResetPassword />}/>

        {/* FALLBACK */}
        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/join" : "/signup"}
              replace
            />
          }
        />

    </Routes>
  );
}

export default App;


// bhai ye replce wala samj nhi aaya  