import { HeaderModule } from '../../modules/HeaderModule/HeaderModule'
import { VacanciesModule } from '../../modules/VacanciesModule/VacanciesModule'
import type { CityRoute } from '../../components/CityFilter/CityFilter'

type VacanciesPageProps = {
  activeTab: CityRoute
  city: string
}

function VacanciesPage({ activeTab, city }: VacanciesPageProps) {
  return (
    <>
      <HeaderModule />

      <main id="vacancies">
        <VacanciesModule activeTab={activeTab} city={city} />
      </main>
    </>
  )
}

export default VacanciesPage