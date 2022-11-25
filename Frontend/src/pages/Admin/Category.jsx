import React, { useEffect } from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import Form from 'react-bootstrap/Form'
import Card, { CardBody } from '../../components/Card'
import MyDataGrid from '../../components/MyDataGrid'
import Button from '../../components/Button'
import { useState } from 'react'
const Category = () => {
  const [itemUpdate, setItemUpdate] = useState([])
  const [item, setItem] = useState("")
  const [isUpdate, setIsUpdate] = useState(true)
  const columns = [

    {
      key: "name",
      value: "Tên",
      class: "cell-red",
      width: 330,
    },
    {
      key: "option",
      value: "Tùy chọn",
      class: "cell-red",
      width: 100
    },
  ]
  const getItemUpdate = (id) => {
    setItemUpdate(id)
  }
  const deleteItem = (id) => {
    console.log("delete");
  }
  const rows = [{
    id: "seqweqweqwe",
    name: "Quan jean",
    option: {
      type: "delete",
      click: deleteItem,
      selectclick: getItemUpdate
    }
  },
  {
    id: "sda23412321",
    name: "Quan bo",
    option: {
      type: "delete",
      click: deleteItem,
      selectclick: getItemUpdate
    }
  }
  ]
  const handleChange = (e) => {
    setItem(e.target.value)
    setIsUpdate(false)
  }

  const Update = () => {

    setItem("")
    setIsUpdate(true)
  }
  const Create = () => {
    setItem("")
    setIsUpdate(true)
  }
  useEffect(() => {
    if (itemUpdate.length > 0) {
      const tmp = rows.filter(row => row.id == itemUpdate)[0]
      setItem(tmp.name)
      setIsUpdate(false)
    }
  }, [itemUpdate]);
  return (
    <ContentMain headerTitle='Phân loại'>
      <Card>
        <CardBody>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", columnGap: 10, height: "480px" }}>
            <div style={{ width: "100%" }}>
              <Form.Group className='me-5 mb-3 w-100' >
                <Form.Label>Loại sản phẩm </Form.Label>
                <Form.Control
                  required
                  name="item"
                  value={item}
                  onChange={handleChange}
                  type="text"
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập loại sản phẩm.
                </Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", columnGap: 10 }}>
                <Button
                  disabled={isUpdate}
                  animate={true}
                  size="sm"
                  backgroundColor={"green"}
                  icon="bx bx-edit"
                  onclick={Update}
                >cập nhật</Button>
                {/* <Button
                  disabled={isUpdate}
                  animate={true}
                  size="sm"
                  icon="bx bx-plus"
                  onclick={Create}
                >tạo mới</Button> */}
              </div>
            </div>
            <div style={{ width: "100%", height: "100%" }}>
              <MyDataGrid ColumnHeader={columns} Data={rows} />
            </div>
          </div>
        </CardBody>
      </Card>

    </ContentMain >
  )
}

export default Category