import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams,} from 'react-router-dom'
import { CityFilter, type CityRoute,} from '../../components/CityFilter/CityFilter'
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter'
import { VacanciesHeader } from '../../components/VacanciesHeader/VacanciesHeader'
import { VacanciesLayout } from '../../components/VacanciesLayout/VacanciesLayout'
import { VacancyCard } from '../../components/VacancyCard/VacancyCard'
import { VacancyList } from '../../components/VacancyList/VacancyList'
import { fetchJobs, initialSkills, setFilters, setPage, setSearch, setSkills,} from './model/jobsSlice'
import type { JobsFilters } from './model/jobsSlice'
import type { AppDispatch, RootState,} from './model/store'

type VacanciesModuleProps = {
  activeTab: CityRoute
  city: string
}

const cityPaths = {
  all: '/vacancies',
  moscow: '/vacancies/moscow',
  petersburg: '/vacancies/petersburg',
}

function getFiltersFromUrl(
  searchParams: URLSearchParams,
  city: string,
): JobsFilters {
  const skillsParam = searchParams.get('skills')

  const skills = skillsParam === null
    ? initialSkills
    : skillsParam
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)

  return {
    search: searchParams.get('search') ?? '',
    city,
    skills,
  }
}

function getSearchParamsFromFilters(
  filters: JobsFilters,
): URLSearchParams {
  const searchParams = new URLSearchParams()

  if (filters.search) {
    searchParams.set('search', filters.search)
  }

  searchParams.set('skills', filters.skills.join(','))

  return searchParams
}

function areFiltersEqual(
  first: JobsFilters,
  second: JobsFilters,
) {
  return (
    first.search === second.search &&
    first.city === second.city &&
    first.skills.join(',') === second.skills.join(',')
  )
}

export function VacanciesModule({
  activeTab,
  city,
}: VacanciesModuleProps) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [ searchParams, setSearchParams, ] = useSearchParams()

  const skipUrlUpdateRef = useRef(false)
    const { filters, jobs, page, pagination, status, error,} = useSelector((state: RootState) => state.jobs)

  const searchParamsString = searchParams.toString()
  useEffect(() => {
    const urlFilters = getFiltersFromUrl(
      new URLSearchParams(searchParamsString),
      city,
    )

    skipUrlUpdateRef.current = true
    dispatch(setFilters(urlFilters))
  }, [dispatch, searchParamsString, city])

  useEffect(() => {
    if (skipUrlUpdateRef.current) {
      skipUrlUpdateRef.current = false
    return
    }

    const nextSearchParams =
      getSearchParamsFromFilters(filters)

    if (nextSearchParams.toString() !== searchParamsString) {
      setSearchParams(nextSearchParams, {
        replace: true,
      })
    }
  }, [ filters, searchParamsString,setSearchParams, ])

  useEffect(() => {
    const urlFilters = getFiltersFromUrl(
      new URLSearchParams(searchParamsString),
      city,
    )

    if (!areFiltersEqual(filters, urlFilters)) {
      return
    }

    void dispatch(
      fetchJobs({
        ...filters,
        page,
      }),
    )
  }, [ dispatch, filters, page, searchParamsString, city, ])

  return (
    <VacanciesLayout
      header={(
        <VacanciesHeader
          key={filters.search}
          search={filters.search}
          onSearch={(search) => dispatch(setSearch(search))}
        />
      )}
      cities={(
        <CityFilter
          activeCity={activeTab}
          onCityChange={(city) => {
            navigate({
              pathname: cityPaths[city],
              search: searchParams.toString(),
            })
          }}
        />
      )}
      skills={(
        <SkillsFilter
          skills={filters.skills}
          onSkillsChange={(skills) => dispatch(setSkills(skills))}
        />
      )}
      vacancies={(
        <VacancyList
          jobsCount={jobs.length}
          status={status}
          error={error}
          pagination={pagination}
          page={page}
          onPageChange={(nextPage) => dispatch(setPage(nextPage))}
        >
          {jobs.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              onOpen={() => navigate(`/vacancies/${vacancy.id}`)}
            />
          ))}
        </VacancyList>
      )}
    />
  )
}
