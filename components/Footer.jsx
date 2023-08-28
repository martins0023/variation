import React from 'react'

const getyear = new Date().getFullYear();
const Footer = () => {
  return (
    <div className="flex justify-center items-center w-full h-full
    text-black text-[14px] font-light">Copyright &copy; {getyear}
      
    </div>
  )
}

export default Footer;