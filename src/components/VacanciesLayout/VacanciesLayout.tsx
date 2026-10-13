import type { ReactNode } from 'react'
import { Container } from '../../ui/mantine'
import './VacanciesLayout.css'

type VacanciesLayoutProps = {
  header: ReactNode
  cities: ReactNode
  skills: ReactNode
  vacancies: ReactNode
}

export function VacanciesLayout({
  header,
  cities,
  skills,
  vacancies,
}: VacanciesLayoutProps) {
  return (
    <Container size="lg">
      {header}

    <div className="vacancies-layout">
    <aside className="vacancies-layout__sidebar">
      {skills}
      {cities}
    </aside>

    {vacancies}
    </div>
    </Container>
  )
}