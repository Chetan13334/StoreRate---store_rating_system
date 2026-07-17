import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ChangePassword from "../pages/auth/ChangePassword";

import AdminDashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Stores from "../pages/admin/Stores";
import AddUser from "../pages/admin/AddUser";
import UserDetails from "../pages/admin/UserDetails";

import UserDashboard from "../pages/user/Dashboard";
import StoreList from "../pages/user/StoreList";
import MyRatings from "../pages/user/MyRatings";

import OwnerDashboard from "../pages/owner/Dashboard";
import OwnerRatings from "../pages/owner/Ratings";

import MainLayout from "../components/layout/MainLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route
        path="/change-password"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ChangePassword />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------------- ADMIN ---------------- */}

      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MainLayout>
              <AdminDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MainLayout>
              <Users />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/add-user"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MainLayout>
              <AddUser />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/admin/users/:id"
  element={
    <ProtectedRoute roles={["ADMIN"]}>
      <MainLayout>
        <UserDetails />
      </MainLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="/admin/stores"
        element={
          <ProtectedRoute roles={["ADMIN"]}>
            <MainLayout>
              <Stores />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------------- USER ---------------- */}

      <Route
        path="/user/dashboard"
        element={
          <ProtectedRoute roles={["USER"]}>
            <MainLayout>
              <UserDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/stores"
        element={
          <ProtectedRoute roles={["USER"]}>
            <MainLayout>
              <StoreList />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/user/ratings"
        element={
          <ProtectedRoute roles={["USER"]}>
            <MainLayout>
              <MyRatings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ---------------- STORE OWNER ---------------- */}

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoute roles={["STORE_OWNER"]}>
            <MainLayout>
              <OwnerDashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route
        path="/owner/ratings"
        element={
          <ProtectedRoute roles={["STORE_OWNER"]}>
            <MainLayout>
              <OwnerRatings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/login" />} />

    </Routes>
  );
};

export default AppRoutes;