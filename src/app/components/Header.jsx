'use client'

import { Typography } from 'antd';

const { Text } = Typography;

const Header = ({text, size}) => {
  return (
    <>
     <Text style={{marginBottom:'2%', fontSize:size}}>{text}</Text>
    </>
  )
}

export default Header