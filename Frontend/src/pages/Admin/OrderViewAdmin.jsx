import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import formatDate from '../../utils/formatDate'
import Button from '../../components/Button'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { apiUrl } from '../../utils/constant'
import { setAlert } from '../../redux/alert-message/alertMessage'
import { updateOrder } from '../../redux/order/orderSlice'
const OrderViewAdmin = () => {

  const { id } = useParams()
  const orderData = useSelector(state => state.orderSlice.value)
  const token = useSelector(state => state.userState.token)
  const [order, setOrder] = useState({})
  const [status, setStatus] = useState("")
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const statusOption = [
    "đang chờ xữ lí",
    "Xác nhận",
    "Đang chuẩn bị hàng",
    "Đang giao hàng",
    "Đã giao hàng",
    "Đã thanh toán",
    "Chờ thanh toán"
  ]
  const onChange = (e) => {
    setStatus(e.target.value)
  }
  const updateStatus = async () => {
    if (status !== "Trạng thái" && status !== order.status)
      if (window.confirm(`Xác nhận thay đổi trạng thái đơn hàng?`)) {
        let body = {
          id: order.id,
          status: status
        }
        let rs = await axios.post(`${apiUrl}/cart/update-by-id`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
        if (rs.data) {

          dispatch(setAlert({
            message: "Cập nhật trạng thái đơn hàng thành công!",
            type: "success"
          }))
          let tmp = {
            ...order,
            status: status
          }
          dispatch(updateOrder(tmp))
        }
        else {
          dispatch(setAlert({
            message: "Cập nhật trạng thái đơn hàng thất bại",
            type: "danger"
          }))
        }
      }
  }
  useEffect(() => {
    if (orderData) {
      let order = orderData.find((item) => {
        return item.id === id
      })
      setOrder({ ...order })

    }

  }, [id, orderData])
  useEffect(() => {
    setStatus(order.status)
  }, [order])
  return (
    <ContentMain headerTitle='Chi tiết đơn hàng'
      headerLeftAction={{
        ...btnAction,
        title: 'Quay lại Đơn hàng',
        action: () => navigate('/admin/order')
      }}
    >
      <div className='orderview'>
        <Card>
          <CardHeader>
            <div className='orderview-header'>
              <div className="orderview-header-item">
                <div className='orderview-header-item-date'>
                  <i className='bx bx-calendar'></i>
                  <span>{formatDate(order.create_date ? order.create_date : [])}</span>
                </div>
                <div className='orderview-header-item-orderid'>
                  <span>{`Mã đơn hàng: ${order.id}`}</span>
                </div>
              </div>
              <div className="orderview-header-item">
                <Form.Group  >
                  <Form.Select
                    size="lg"
                    value={status}
                    name="status"
                    onChange={onChange}
                    bsPrefix="form-select form-select-lg"
                  >
                    <option>Trạng thái</option>
                    {
                      statusOption.map((item, index) => {
                        return (
                          <option key={index} value={item} >{item}</option>
                        )
                      })
                    }
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Vui lòng nhập loại sản phẩm.
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="orderview-header-item" onClick={updateStatus}>
                <Button backgroundColor={"green"}
                  size={"sm"}
                >
                  <i className='bx bx-save'></i>
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardBody>


          </CardBody>
        </Card>
      </div>
    </ContentMain >
  )
}

export default OrderViewAdmin