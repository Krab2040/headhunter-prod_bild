import {BrowserRouter, Navigate, Route, Routes,} from 'react-router-dom'
import VacancyDetailsPage from './pages/VacancyDetailsPage/VacancyDetailsPage'
import VacanciesPage from './pages/VacanciesPage/VacanciesPage'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          path="/vacancies"
          element={<VacanciesPage />}
        />

        <Route
          path="/vacancies/:id"
          element={<VacancyDetailsPage />}
        />

        <Route
          path="*"
          element={<Navigate to="/vacancies" replace />}
        />
      </Routes>
    </BrowserRouter>
  )
}