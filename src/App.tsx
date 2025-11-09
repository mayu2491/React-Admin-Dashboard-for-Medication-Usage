import { Routes, Route, Navigate } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthenticatedLayout } from './components/layout/authenticated-layout';
import { LoginPage } from './pages/login';
import { OverviewPage } from './pages/overview';
import { PatientsPage } from './pages/patients';
import { MedicationsPage } from './pages/medications';
import { ProtectedRoute } from './routes/protected-route';

function App() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading…</div>}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<OverviewPage />} />
          <Route path="patients" element={<PatientsPage />} />
          <Route path="medications" element={<MedicationsPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/overview" replace />} />
      </Routes>
    </Suspense>
  );
}

export default App;
