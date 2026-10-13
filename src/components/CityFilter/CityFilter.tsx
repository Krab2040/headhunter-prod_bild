import { Box, IconMapPin, Select } from '../../ui/mantine'
import './CityFilter.css'

export type CityRoute = 'all' | 'moscow' | 'petersburg'

type CityFilterProps = {
  activeCity: CityRoute
  onCityChange: (city: CityRoute) => void
}

const cityOptions = [
  { value: 'all', label: 'Все города' },
  { value: 'moscow', label: 'Москва' },
  { value: 'petersburg', label: 'Санкт-Петербург' },
]

export function CityFilter({
  activeCity,
  onCityChange,
}: CityFilterProps) {
  function handleChange(value: string | null) {
    if (
      value === 'all' ||
      value === 'moscow' ||
      value === 'petersburg'
    ) {
      onCityChange(value)
    }
  }

  return (
    <Box className="city-filter">
      <Select
        value={activeCity}
        data={cityOptions}
        onChange={handleChange}
        leftSection={<IconMapPin size={18} />}
        classNames={{
          input: 'city-filter__input',
          dropdown: 'city-filter__dropdown',
          option: 'city-filter__option',
        }}
      />
    </Box>
  )
}