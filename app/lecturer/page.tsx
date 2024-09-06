import React from 'react'
import Lecturer from '../components/lecturer';
import Navbar from '../components/navbar';



type Props = {}

const LecturerPage = (props: Props) => {
  return (
    <div>
          <Navbar />
        <Lecturer />
    </div>
  )
}

export default LecturerPage