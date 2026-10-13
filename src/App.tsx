import {BrowserRouter, Route, Routes,} from 'react-router-dom'
import VacancyDetailsPage from './pages/VacancyDetailsPage/VacancyDetailsPage'
import VacanciesPage from './pages/VacanciesPage/VacanciesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/vacancies" element={<VacanciesPage activeTab="all" city="" />} />

        <Route
          path="/vacancies/moscow"
          element={<VacanciesPage activeTab="moscow" city="Москва" />}
        />

        <Route
          path="/vacancies/petersburg"
          element={<VacanciesPage activeTab="petersburg" city="Санкт-Петербург" />}
        />

        <Route path="/vacancies/:id" element={<VacancyDetailsPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}