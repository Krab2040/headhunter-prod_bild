import ky from 'ky'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Badge, Card, Container, Group, Text, Title,} from '../../ui/mantine'
import './VacancyDetailsModule.css'

type VacancyDetails = {
  id: number
  company_name: string
  name: string
  city: string
  salary: string
  space: 'remote' | 'office' | 'hybrid'
  experience: string
  description: string
  about_company: string
}

type VacancyResponse = {
  success: boolean
  job: VacancyDetails
}

const employmentLabels = {
  remote: 'Можно удалённо',
  office: 'Офис',
  hybrid: 'Гибрид',
}

function formatSalary(salary: string) {
  return `${Number(salary).toLocaleString('ru-RU')} ₽`
}

export function VacancyDetailsModule() {
  const { id } = useParams<{ id: string }>()
  const [vacancy, setVacancy] =
    useState<VacancyDetails | null>(null)
  const [status, setStatus] = useState<
    'loading' | 'success' | 'error'
  >('loading')

  useEffect(() => {
    async function loadVacancy() {
      if (!id) {
        setStatus('error')
        return
      }

      try {
        setStatus('loading')

        const response = await ky
          .get(`https://kata-jobs.onrender.com/api/jobs/${id}`)
          .json<VacancyResponse>()

        setVacancy(response.job)
        setStatus('success')
      } catch {
        setStatus('error')
      }
    }

    void loadVacancy()
  }, [id])

  if (status === 'loading') {
    return (
      <Container size="md" py="xl">
        <Text>Загрузка вакансии...</Text>
      </Container>
    )
  }

  if (status === 'error' || !vacancy) {
    return (
      <Container size="md" py="xl">
        <Text c="red">
          Не удалось загрузить вакансию
        </Text>
      </Container>
    )
  }

  return (
    <Container
      size="md"
      className="vacancy-details"
    >
      <Card className="vacancy-details__summary">
        <Title
          order={1}
          className="vacancy-details__title"
        >
          {vacancy.name}
        </Title>

        <Group
          gap={16}
          className="vacancy-details__meta"
        >
          <Text className="vacancy-details__salary">
            {formatSalary(vacancy.salary)}
          </Text>

          <Text className="vacancy-details__experience">
            {vacancy.experience}
          </Text>
        </Group>

        <Text className="vacancy-details__company">
          {vacancy.company_name}
        </Text>

        <Badge
          size="xs"
          radius="xs"
          className={`vacancy-details__badge vacancy-details__badge--${vacancy.space}`}
        >
          {employmentLabels[vacancy.space]}
        </Badge>

        <Text className="vacancy-details__city">
          {vacancy.city}
        </Text>
      </Card>

      <Card className="vacancy-details__description">
        <Title order={2}>
          Компания
        </Title>

        <Text className="vacancy-details__text">
          {vacancy.about_company}
        </Text>

        <Title
          order={2}
          className="vacancy-details__section-title"
        >
          О вакансии
        </Title>

        <Text className="vacancy-details__text">
          {vacancy.description}
        </Text>
      </Card>
    </Container>
  )
}