import { VacanciesModule } from '../../modules/VacanciesModule/VacanciesModule'
import type { CityRoute } from '../../components/CityFilter/CityFilter'

type VacanciesPageProps = {
  activeTab: CityRoute
  city: string
}

function VacanciesPage({ activeTab, city }: VacanciesPageProps) {
  return (
    <>
      <main id="vacancies">
        <VacanciesModule activeTab={activeTab} city={city} />
      </main>
    </>
  )
}

export default VacanciesPage