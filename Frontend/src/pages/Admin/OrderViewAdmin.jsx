import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
const OrderViewAdmin = () => {
    const navigate = useNavigate()
    return (
        <ContentMain headerTitle='Chi tiết đơn hàng'
        headerLeftAction={{
          ...btnAction,
          title: 'Quay lại Đơn hàng',
          action: () => navigate('/admin/order')
        }}
      >
        <Card>
          <CardBody>
          
  
          </CardBody>
        </Card>
      </ContentMain >
    )
}

export default OrderViewAdmin