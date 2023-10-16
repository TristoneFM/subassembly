'use client'

import {React, useEffect, useState} from 'react'
import axios from 'axios'
import { Table } from 'antd'
import EmployeeModal from './EmployeeModal'
import { SyncOutlined, StopOutlined } from '@ant-design/icons'
import ShiftButton from './ShiftButton'




const columns = [
  // {
  //   title: 'Prioridad',
  //   dataIndex: 'prioridad',
  // },
  {
    title: 'Numero SAP',
    dataIndex: 'sap',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Descripcion',
    dataIndex: 'description',
  },
  {
    title: 'Stock Actual',
    dataIndex: 'stock',
  },
  {
    title: 'Stock Minimo',
    dataIndex: 'minstock',
  },
  {
    title: 'Piezas a Producir',
    dataIndex: 'produccion',
  },
  {
    title: 'Estacion',
    dataIndex: 'station',
  },
  {
    title: 'Empleado Actual',
    dataIndex: 'empleado',
  },
  {
    title: 'Estatus',
    dataIndex: 'estatus',
    render: (estatus) => (
      <span>
        {estatus === 'produccion' ? (
          <>
            <SyncOutlined spin style={{color:'#52c41a', fontSize:'20px'}}/>
          </>
        ) : (
          <>
            <StopOutlined style={{fontSize:'20px'}}/>
          </>
        )}
      </span>
    ),
  },
]


const ProductionTable = () => {

  const [production, setProduction] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRow, setSelectedRow] = useState(null)
  const [modalSource, setModalSource] = useState(null)
  const [selectedRadio, setSelectedRadio] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/production');
        const data = res.data.data
        const productionData = []
        data.map((item) => {

          item.key = item.id
          // item.prioridad = item.priority
          item.sap = item.no_sap.substring(1)
          item.description = item.assembly
          item.stock = item.current_stock
          item.minstock = item.minimum_stock
          item.produccion = parseInt(item.minimum_stock) - parseInt(item.current_stock)
          item.station = item.production_stations
          item.empleado = item.current_employee
          item.empleado ? item.estatus = 'produccion' : item.estatus = 'pendiente'

          productionData.push(item)
        })

        productionData.sort((a, b) => {
          const isAEmpty = a.empleado === null || a.empleado === '';
          const isBEmpty = b.empleado === null || b.empleado === '';
        
          if (isAEmpty && !isBEmpty) {
            return -1;
          } else if (!isAEmpty && isBEmpty) {
            return 1;
          }
        
          const produccionDiff = b.produccion - a.produccion;
        
          if (produccionDiff !== 0) {
            return produccionDiff;
          }
        
          const priorityDiff = a.prioridad - b.prioridad; 
        
          return priorityDiff;
        });
        setProduction(productionData)

    
      } catch(err) {
        console.log(err)
      }
    }

      fetchData();
      const refreshInterval = setInterval(() => {
      if (!isModalOpen) {
        fetchData();
      }
    }, 1000); 
    return () => clearInterval(refreshInterval);
  }, [isModalOpen]);



  const handleRowSelection = (row, selectedRows) => {
    setIsModalOpen(true)
    setSelectedRow(selectedRows)
    setSelectedRadio(row.key);
    setModalSource('row')
  }

  const handleButtonClick = () => {
    setIsModalOpen(true)
    setSelectedRow(null)
    setSelectedRadio(null);
    setModalSource('button')
  }



  return (
    <>
      <ShiftButton setIsModalOpen={handleButtonClick} isModalOpen={isModalOpen} selectedRow={selectedRow}/>
      <Table
        rowSelection={{
          type: 'checkbox',
          selectedRowKeys: [selectedRadio],
          onChange: handleRowSelection,
          getCheckboxProps: (record) => ({
            disabled: record.empleado !== '', 
          }),
        }}
        columns={columns}
        dataSource={production}
        style={{ width: '100%'}}
      />
      <EmployeeModal open={isModalOpen} setModal={setIsModalOpen} selectedRow={selectedRow} modalSource={modalSource}/>
    </>
    
  )
}
export default ProductionTable