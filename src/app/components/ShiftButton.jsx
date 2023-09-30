'use client'

import { React, useState } from 'react'
import { Button } from 'antd';
import EmployeeModal from './EmployeeModal';
import { CloseCircleOutlined } from '@ant-design/icons';


const ShiftButton = ({isModalOpen, selectedRow, setIsModalOpen}) => {



  return (
    <>
     <Button type="primary" style={{marginBottom:'1%'}} icon={<CloseCircleOutlined />} onClick={()=>setIsModalOpen(true)}>Cerrar Turno</Button>
     <EmployeeModal open={isModalOpen} setModal={setIsModalOpen} selectedRow={selectedRow}/>
    </>
  )
}

export default ShiftButton