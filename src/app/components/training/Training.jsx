'use client'

import React from 'react'
import { Modal, Input, message, Card, Row, Col, Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Image from 'next/image'
import logo from "../../../../public/TristoneLogo.png";
import Header from '../Header'
import { SearchOutlined} from '@ant-design/icons'
import ModalEmployee from './ModalEmployee'




const Training = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [procesosTomados, setProcesosTomados] = useState([])
    const [employee, setEmployee] = useState('')
    const [employeeId, setEmployeeId] = useState('')



      const handleEnter = async (e) => {

        if(e.key === 'Enter'){
            const res = await axios.post('/api/training', {employee: employeeId});
 
            e.target.value = '';
            if(res.data.employee){
              if(res.data.procesos_tomados.length > 0){
                setProcesosTomados(res.data.procesos_tomados)
                setEmployee(res.data.employee)
                setIsModalOpen(true)
            }else{  
                message.error('El empleado no tiene procesos tomados')
            }

            }else{
              message.error('Numero de empleado no encontrado');

            }
            setEmployeeId('')
        }
    }



    const error = (error) => {
      messageApi.open({
        type: 'error',
        content: error,
      });
    };

      

  return (
    <>

          <ModalEmployee isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} procesosTomados={procesosTomados} employee={employee} />
          <div className="site-card-border-less-wrapper">
            <Row>
              <Col span={24}>
              <Card
              hoverable
              bordered={false}
              style={{
                width: 450,
                marginTop: 100
              }}
              cover={
                <div style={{textAlign:"center", marginTop:"10%"}}>

                <Image
                  alt="tristone"
                  src={logo}
                  style={{ width: "55%", marginTop:"10%", height: "45%"}}
                />
              <br />

              <Avatar size="large" icon={<UserOutlined />} />
              <br />
              <SearchOutlined style={{fontSize:'25px', marginTop:'10px'}}/>
              <Header text={'Consulta'} size={'30px'}/>
              <br />
              <Header text={'Certificación de Procesos Clave'} size={'25px'}/>

              <Input size="large" placeholder="Numero de Empleado" prefix={<UserOutlined/>} 
              onKeyDown={handleEnter} 
              onChange={(e) => setEmployeeId(e.target.value)}
              style={{width:'75%', marginTop:'30px'}}
              value={employeeId}
              />

                </div>

                
              }
            >

            </Card>
              </Col>
            </Row>

          </div>
    </>
  );
}

export default Training