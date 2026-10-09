import { Badge, Button, Card, Group, Text, Title } from '../../ui/mantine'
import type { Vacancy } from './vacancy.types'
import './VacancyCard.css'

type VacancyCardProps = {
  vacancy: Vacancy
  onOpen: () => void
}

export function VacancyCard({ vacancy, onOpen, }: VacancyCardProps) {
  return (
    <Card className="vacancy-card">
      <Title order={3} className="vacancy-card__title">
        {vacancy.title}
      </Title>

      <Group gap={16} className="vacancy-card__meta">
        <Text className="vacancy-card__salary">
          {vacancy.salary}
        </Text>

        <Text className="vacancy-card__experience">
          {vacancy.experience}
        </Text>
      </Group>

      <Badge
        size="xs"
        radius="xs"
        className={`vacancy-card__badge vacancy-card__badge--${vacancy.employmentType}`}
      >
        {vacancy.employment}
      </Badge>

      <Text className="vacancy-card__company">
        {vacancy.company}
      </Text>

      <Text className="vacancy-card__city">
        {vacancy.city}
      </Text>

      <Button
        className="vacancy-card__button"
        onClick={onOpen}
      >
        Смотреть вакансию
      </Button>
    </Card>
  )
}