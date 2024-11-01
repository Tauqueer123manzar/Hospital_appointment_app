import React from 'react'

const Sidebar = () => {
  return (
    <>
         {
        isAuthenticated ? <nav
          style={isAuthenticated ? { display: "flex" } : { display: "none" }}
          className={show ? "show sidebar" : "sidebar"}>
          <h1>Dashboard</h1>
          <div className='links'>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><TiHome onClick={gotoHome} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><FaUserDoctor onClick={gotoDoctorspage} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><MdAddModerator onClick={gotoAddnewadmin} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><IoPersonAddSharp onClick={gotoAddnewdoctor} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><RiMessage2Fill onClick={gotomessages} style={{ fontSize: "40px" }} /></li>
            <li className='items' style={{ textDecoration: "none", listStyle: "none" }}><RiLogoutBoxRFill onClick={handlelogout} style={{ fontSize: "40px" }} /></li>
          </div>
        </nav> : ''
      }

    </>
  )
}

export default Sidebar
