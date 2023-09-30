'use client'

import { React, useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, Input, message } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import Image from 'next/image'
import { Typography } from 'antd';

const { Text } = Typography;



const EmployeeModal = ({open, setModal, selectedRow, modalSource }) => {
    const [messageApi] = message.useMessage();
    const inputRef = useRef(null)
    const [modalKey, setModalKey] = useState(0)

    useEffect(() => {
        if (open) {
            setModalKey((prevKey) => prevKey + 1)
        }
      }, [open])

      useEffect(() => {
        if (inputRef.current) {
          setTimeout(() => {
            inputRef.current.focus();
          }, [500]);
        }
      }, [modalKey])
    
    

    const handleClose = () => {
        setModal(false)

    }

    const handleEnter = async (e) => {

        if(e.key === 'Enter'){
          if(modalSource === 'button'){
            const res = await axios.put('/api/production', {employee: e.target.value });
            if(res.data.error === undefined){
              handleClose()
              message.success('Turno Cerrado');
            }else{
              message.error(res.data.error);
              e.target.value = '';
            }  

          }else{
            const res = await axios.post('/api/production', {employee: e.target.value, id: selectedRow[0].id });
            if(res.data.error === undefined){
              handleClose()
              message.success('Empleado Asignado');
            } else{
              message.error(res.data.error);
              e.target.value = '';
            }
            
          }
        }
    }

    const error = (error) => {
      messageApi.open({
        type: 'error',
        content: error,
      });
    };

    const success = (success) => {
      messageApi.open({
        type: 'success',
        content: success,
      });
    };

  return (
    <>
      <Modal title="" open={open} onCancel={handleClose} key={modalKey} footer={null} centered>
      <Image src="/TristoneLogo.png" alt="" width={70} height={40} style={{marginBottom:'1%'}}/>
      <div style={{textAlign:'center'}}>
        <Text style={{ fontSize:'30px'}}>{ selectedRow ? 'SAP: '+selectedRow[0].sap : 'Cerrar Turno'}</Text>
      </div>
      <div style={{textAlign:'center', marginBottom:'2%'}}>
        <Text style={{marginTop:'20px', fontSize:'25px'}}>{ selectedRow ? 'Piezas a Producir: '+ selectedRow[0].produccion : ''}</Text>
      </div>
     
     
        <Input size="large" placeholder="Numero de Empleado" prefix={<UserOutlined/>} ref={inputRef} onKeyDown={handleEnter}/>
      </Modal>
    </>
  )
}

export default EmployeeModal