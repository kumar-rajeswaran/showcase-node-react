import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { AppNavBar, AppSideBar } from '../../layouts'

export const AppMainLayout = () => {
  const [headerHeight, setHeaderHeight] = useState('97px')
  return (
    <>
      <AppNavBar setHeaderHeight={setHeaderHeight} />
      <div
        className='container-fluid pb-3 flex-grow-1 flex-column flex-sm-row'
        style={{ height: `calc(100vh - ${headerHeight})` }}
      >
        <div className='row flex-grow-sm-1 flex-grow-0 h-100'>
          <AppSideBar />
          <main className='col-sm-10 col-md-10 h-100 mb-3'>
            <div className='p-3 bg-light border rounded-3 h-100'>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
