import React from 'react'
import { Container } from 'react-bootstrap'
import Sidebar from '../../components/Sidebar'
const Chat = () => {
  return (
    <>
      <Sidebar/>
        <Container fluid>
          <h1 className='text-center'>Chats</h1>
        </Container>
    </>
  )
}

export default Chat
