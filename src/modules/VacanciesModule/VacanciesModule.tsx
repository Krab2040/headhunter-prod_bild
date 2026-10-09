import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams,} from 'react-router-dom'
import { CityTabs } from '../../components/CityTabs/CityTabs'
import { SkillsFilter } from '../../components/SkillsFilter/SkillsFilter'
import { VacanciesHeader } from '../../components/VacanciesHeader/VacanciesHeader'
import { VacanciesLayout } from '../../components/VacanciesLayout/VacanciesLayout'
import { VacancyCard } from '../../components/VacancyCard/VacancyCard'
import { VacancyList } from '../../components/VacancyList/VacancyList'
import { fetchJobs, initialSkills, setCity, setFilters, setPage, setSearch, setSkills,} from './model/jobsSlice'
import type { JobsFilters } from './model/jobsSlice'
import type { AppDispatch, RootState,} from './model/store'

function getFiltersFromUrl(
  searchParams: URLSearchParams,
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
    city: searchParams.get('city') ?? '',
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

  if (filters.city) {
    searchParams.set('city', filters.city)
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

export function VacanciesModule() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  const [ searchParams, setSearchParams, ] = useSearchParams()

  const skipUrlUpdateRef = useRef(false)
    const { filters, jobs, page, pagination, status, error,} = useSelector((state: RootState) => state.jobs)

  const searchParamsString = searchParams.toString()
  useEffect(() => {
    const urlFilters = getFiltersFromUrl(
      new URLSearchParams(searchParamsString),
    )

    skipUrlUpdateRef.current = true
    dispatch(setFilters(urlFilters))
  }, [dispatch, searchParamsString])

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
  }, [ dispatch, filters, page, searchParamsString, ])

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
        <CityTabs
          city={filters.city}
          onCityChange={(city) => dispatch(setCity(city))}
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
