import { HeaderModule } from '../../modules/HeaderModule/HeaderModule'
import { VacancyDetailsModule } from '../../modules/VacancyDetailsModule/VacancyDetailsModule'

function VacancyDetailsPage() {
  return (
    <>
      <HeaderModule />

      <main>
        <VacancyDetailsModule />
      </main>
    </>
  )
}

export default VacancyDetailsPage