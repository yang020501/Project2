import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import ContentMain from '../../components/Admin/ContentMain'
import Card, { CardBody, CardHeader } from '../../components/Card'
import btnAction from '../../utils/btnAction'
import Searchbar from '../../components/Searchbar'
import CheckBox from '../../components/CheckBox'
import MyDataGrid from '../../components/MyDataGrid'
import { useEffect } from 'react'
const Staff = () => {
  const Staff = useSelector(state => state.staffSlice.value)
  const [Check, setCheck] = useState("name")
  const [staffDataSearch, setstaffDataSearch] = useState([])
  const [rows, setRows] = useState([])
  const columns = [
    {
      key: "customer_name",
      value: "Tên",
      width: 200,
    },
    {
      key: "username",
      value: "Tài khoản",
      width: 250,
    },
    {
      key: "phone",
      value: "Số điện thoại",
      width: 250,
    },
    {
      key: "address",
      value: "Địa chỉ",
      width: 250,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-red",
      width: 100
    }
  ]
  useEffect(() => {

  }, [])
  return (
    <ContentMain headerTitle='Nhân viên'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: null
      }}
    >
      <Card>
        <CardHeader>
          <Searchbar type="staff" keyword={`${Check}`} admin placeholder={"Tìm kiếm nhân viên..."} data={rows} onsearch={(data) => { setstaffDataSearch(data) }} />
          <div style={{ display: "contents" }}>
            <div onClick={() => { setCheck("name") }}>
              <CheckBox label='Tên' checked={Check === "name"} />
            </div>
            <div onClick={() => { setCheck("email") }}>
              <CheckBox label='Tài khoản' checked={Check === "email"} />
            </div>
          </div>
        </CardHeader>
        <CardBody>
          {
            staffDataSearch.length < rows.length ?
              <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
                <MyDataGrid ColumnHeader={columns} Data={staffDataSearch} />
              </div>
              :
              <div style={{ width: "100%", columnGap: 10, height: "540px" }}>
                <MyDataGrid ColumnHeader={columns} Data={rows} />
              </div>
          }

        </CardBody>
      </Card>


    </ContentMain >
  )
}

export default Staff