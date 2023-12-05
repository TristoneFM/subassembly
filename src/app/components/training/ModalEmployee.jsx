'use client'

import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Space, message } from 'antd';

const columns = [
  {
    title: 'Proceso',
    dataIndex: 'proceso',
  },
  {
    title: 'Sello',
    dataIndex: 'sello',
  },
  {
    title: 'Fecha',
    dataIndex: 'fecha',
  },
  {
    title: 'Fecha Vencimiento',
    dataIndex: 'fechaVencimiento',
  },
];

const ModalEmployee = ({isModalOpen, setIsModalOpen, procesosTomados, employee}) => {

  const [messageApi] = message.useMessage();

  const data = procesosTomados.map((procesoTomado, index) => {
    return {
      key: index,
      proceso: procesoTomado.identificador +' '+ procesoTomado.descripcion,
      sello: procesoTomado.sello,
      fecha: procesoTomado.fecha.split('T')[0],
      fechaVencimiento: procesoTomado.fecha_vencimiento.split('T')[0]
    }
  })


  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal title={
        <Space style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Avatar icon={<UserOutlined />} />
          <span>{employee.Gafete+' - '+employee.Nombre + ' ' + employee.Apellido}</span>
        </Space>
      } open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={800}>
        <Table columns={columns} dataSource={data} />
      </Modal>
    </>
  );
};
export default ModalEmployee;