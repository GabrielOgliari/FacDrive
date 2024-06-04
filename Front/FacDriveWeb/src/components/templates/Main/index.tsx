import { Outlet } from 'react-router-dom'
import * as S from './styles'

export const MainTemplate = () => {
  return (
    <S.MainTemplate>
      <Outlet />
    </S.MainTemplate>
  )
}
