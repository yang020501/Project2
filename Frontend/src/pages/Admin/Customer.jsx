import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ContentMain from '../../components/Admin/ContentMain'

import MyDataGrid from '../../components/MyDataGrid'
import numberWithCommas from '../../utils/numberWithCommas'
const Customer = () => {
  const customerData = useSelector(state => state.customerSlice.value)
  const orderData = useSelector(state => state.orderSlice.value)
  const [rows, setRows] = useState([])
  const columns = [
    {
      key: "customer_name",
      value: "Tên",
      class: "cell-green",
      width: 200,
    },
    {
      key: "username",
      value: "Email",
      class: "cell-green",
      width: 250,
    },
    {
      key: "phone",
      value: "Số điện thoại",
      class: "cell-green",
      width: 250,
    },
    {
      key: "address",
      value: "Địa chỉ",
      class: "cell-green",
      width: 250,
    },
    {
      key: "total",
      value: "Tổng số đơn hàng",
      class: "cell-green",
      width: 120,
    },
    {
      key: "totalMoney",
      value: "Tổng tiền tích lũy",
      class: "cell-green",
      width: 120,
    }
  ]
  console.log(rows);
  useEffect(() => {
    const tmprows = customerData.map((item) => {
      return {
        ...item,
        address: item.house_address ? `${item.house_address} phường ${item.address3},quận ${item.address2}, tp ${item.address1}` : "",
        total: orderData ? orderData.filter(itemt => { return itemt.customer_id === item.id }).length : "",
        totalMoney: orderData ? numberWithCommas(orderData.filter(itemt => { return itemt.customer_id === item.id }).reduce((p, c) => { return p + c.total }, 0)) : ""
      }
    })
    setRows(tmprows)
  }, [customerData])
  return (
    <ContentMain headerTitle='Khách hàng'>
      <div style={{ width: "100%", columnGap: 10, height: "560px" }}>
        <MyDataGrid ColumnHeader={columns} Data={rows} />
      </div>

    </ContentMain >
  )
}

export default Customer