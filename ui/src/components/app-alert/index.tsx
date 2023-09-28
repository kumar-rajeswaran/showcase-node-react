import { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'
interface IAppAlert {
  variant: Variant
  message: string
}

export const AppAlert = ({ variant, message }: IAppAlert) => {
  const [show, setShow] = useState(true)
  return (
    <ToastContainer position='top-end' className='p-3'>
      <Toast
        bg={variant}
        onClose={() => setShow(false)}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <small>1 sec ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
