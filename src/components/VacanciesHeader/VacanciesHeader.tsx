import type { FormEvent } from 'react'
import { Button, IconSearch, Text, TextInput, Title } from '../../ui/mantine'
import { useState } from 'react'
import './VacanciesHeader.css'

type VacanciesHeaderProps = {
  search: string
  onSearch: (search: string) => void
}

export function VacanciesHeader({
  search,
  onSearch,
}: VacanciesHeaderProps) {
  const [searchValue, setSearchValue] = useState(search)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(searchValue.trim())
  }

  return (
    <section className="vacancies-header">
      <div>
        <Title order={1} className="vacancies-header__title">
          Список вакансий
        </Title>

        <Text className="vacancies-header__subtitle">
          по профессии Frontend-разработчик
        </Text>
      </div>

      <form
        className="vacancies-header__search"
        onSubmit={handleSubmit}
      >
        <TextInput
          value={searchValue}
          onChange={(event) => setSearchValue(event.currentTarget.value)}
          className="vacancies-header__input"
          placeholder="Должность или название компании"
          leftSection={<IconSearch size={16} />}
        />

        <Button
          type="submit"
          className="vacancies-header__button"
        >
          Найти
        </Button>
      </form>
    </section>
  )
}