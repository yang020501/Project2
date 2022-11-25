import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
import MyDataGrid from '../../components/MyDataGrid'

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useNavigate } from 'react-router-dom'
const Order = () => {
  const navigate = useNavigate()
  const columns = [
    {
      key: "name",
      value: "Tên",
      class: "cell-green",
      width: 330,
    },
    {
      key: "email",
      value: "Email",
      class: "cell-green",
      width: 330,
    },
    {
      key: "status",
      value: "Trạng thái",
      class: "cell-green",
      width: 100,
    },
    {
      key: "createdate",
      value: "Ngày",
      class: "cell-green",
      width: 250,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-green",
      width: 70
    },
  ]
  const gotoOrderView = (id) => {
    navigate(`/admin/order/${id}`)
  }
  const rows = [{
    id: "seqweqweqwe",
    name: "Quan jean",
    option: {
      type: "view",
      click: gotoOrderView
    }
  },
  {
    id: "se2e",
    name: "Quan qwe",
    option: {
      type: "view",
      click: gotoOrderView
    }
  }
  ]

  return (

    <ContentMain headerTitle='Đơn hàng'>
      <div style={{ width: "100%", columnGap: 10, height: "560px" }}>
        <MyDataGrid ColumnHeader={columns} Data={rows} />
      </div>
    </ContentMain >
  )
}

export default Order