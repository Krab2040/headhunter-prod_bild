import { Outlet } from 'react-router-dom'
import { HeaderModule } from '../../modules/HeaderModule/HeaderModule'

export function AppLayout() {
  return (
    <>
      <HeaderModule />
      <Outlet />
    </>
  )
}