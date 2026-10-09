import ky from 'ky'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { Vacancy } from '../../../components/VacancyCard/vacancy.types'

type ApiJob = {
  id: number
  company_name: string
  name: string
  city: string
  salary: string
  space: 'remote' | 'office' | 'hybrid'
  experience: string
}

type ApiPagination = {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

type ApiResponse = {
  success: boolean
  pagination: ApiPagination
  jobs: ApiJob[]
}

export const initialSkills = [
  'JavaScript',
  'React',
  'Redux',
  'Python',
]

export type JobsFilters = {
  search: string
  city: string
  skills: string[]
}

type JobsStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type JobsState = {
  jobs: Vacancy[]
  pagination: ApiPagination | null
  filters: JobsFilters
  page: number
  status: JobsStatus
  error: string | null
}

type LoadJobsParams = JobsFilters & {
  page: number
}

const employmentLabels = {
  remote: 'Можно удалённо',
  office: 'Офис',
  hybrid: 'Гибрид',
}

function mapJob(job: ApiJob): Vacancy {
  return {
    id: job.id,
    title: job.name,
    salary: `${Number(job.salary).toLocaleString('ru-RU')} ₽`,
    experience: job.experience,
    employment: employmentLabels[job.space],
    employmentType: job.space,
    company: job.company_name,
    city: job.city,
  }
}

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async ({
    search,
    city,
    skills,
    page,
  }: LoadJobsParams) => {
    const searchParams: Record<string, string> = {
      page: String(page),
    }

    if (search) {
      searchParams.search = search
    }

    if (city) {
      searchParams.city = city
    }

    if (skills.length > 0) {
      searchParams.skills = skills.join(',')
    }

    return ky
      .get('https://kata-jobs.onrender.com/api/jobs', {
        searchParams,
      })
      .json<ApiResponse>()
  },
)

const initialState: JobsState = {
  jobs: [],
  pagination: null,
  filters: {
    search: '',
    city: '',
    skills: initialSkills,
  },
  page: 1,
  status: 'idle',
  error: null,
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload
      state.page = 1
    },

    setCity(state, action: PayloadAction<string>) {
      state.filters.city = action.payload
      state.page = 1
    },

    setSkills(state, action: PayloadAction<string[]>) {
      state.filters.skills = action.payload
      state.page = 1
    },

    setFilters(state, action: PayloadAction<JobsFilters>) {
      state.filters = action.payload
      state.page = 1
    },

    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.jobs = action.payload.jobs.map(mapJob)
        state.pagination = action.payload.pagination
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message ?? 'Не удалось загрузить вакансии'
      })
  },
})

export const {
  setSearch,
  setCity,
  setSkills,
  setFilters,
  setPage,
} = jobsSlice.actions

export default jobsSlice.reducer
