import { NavLink } from 'react-router-dom'
import { Box, Group, IconUserCircle, Text } from '../../ui/mantine'
import Logo from '../../ui/Logo/Logo'
import './Header.css'

export function Header() {
  return (
    <Box component="header" className="header">
      <Group gap={10} className="header__logo">
        <Logo />

        <Text className="header__logo-text">
          .FrontEnd
        </Text>
      </Group>

      <Group gap={24} className="header__navigation">
        <NavLink
          to="/vacancies"
          className={({ isActive }) =>
            `header__link header__nav-link ${
              isActive ? 'header__nav-link--active' : ''
            }`
          }
        >
          Вакансии FE
          <span className="header__active-dot" aria-hidden="true" />
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `header__link header__nav-link ${
              isActive ? 'header__nav-link--active' : ''
            }`
          }
        >
          <IconUserCircle
            className="header__about-icon"
            size={16}
          />
          Обо мне
          <span className="header__active-dot" aria-hidden="true" />
        </NavLink>
      </Group>
    </Box>
  )
}