import { BrowserRouter, Navigate, Route, Routes, } from 'react-router-dom'
import { AppLayout } from './layouts/AppLayout/AppLayout'
import AboutPage from './pages/AboutPage/AboutPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import VacancyDetailsPage from './pages/VacancyDetailsPage/VacancyDetailsPage'
import VacanciesPage from './pages/VacanciesPage/VacanciesPage'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          <Route
            index
            element={<Navigate to="/vacancies" replace />}
          />

          <Route
            path="/vacancies"
            element={<VacanciesPage activeTab="all" city="" />}
          />

          <Route
            path="/vacancies/moscow"
            element={<VacanciesPage activeTab="moscow" city="Москва" />}
          />

          <Route
            path="/vacancies/petersburg"
            element={
              <VacanciesPage
                activeTab="petersburg"
                city="Санкт-Петербург"
              />
            }
          />

          <Route
            path="/vacancies/:id"
            element={<VacancyDetailsPage />}
          />

          <Route path="/about" element={<AboutPage />} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}