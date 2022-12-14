import React, { useEffect, useRef, useState } from 'react'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import { useSelector, useDispatch } from 'react-redux'
import address from '../assets/fake-data/address.json'
import { getCart, updateUser } from '../redux/user/userState'
import { getAllProduct } from '../redux/product/productsSlice'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
import numberWithCommas from '../utils/numberWithCommas'
const CustomerInfo = () => {

    const user = useSelector(state => state.userState.user)
    const token = useSelector(state => state.userState.token)
    const cart = useSelector(state => state.userState.cart)
    const products = useSelector(state => state.productsSlice.value)
    const productSaleData = useSelector(state => state.saleSlice.value)
    const initialForm = {
        customer_name: user.customer_name ? user.customer_name : "",
        username: user.username,
        phone: Number(user.phone) ? Number(user.phone) : "",
        house_address: user.house_address ? user.house_address : "",
        address1: user.address1 ? user.address1 : "",
        address2: user.address2 ? user.address2 : "",
        address3: user.address3 ? user.address3 : ""
    }
    const dispatch = useDispatch()
    const infoRef = useRef(null)
    const addressRef = useRef(null)
    const provinceRef = useRef(null)
    const districtRef = useRef(null)
    const wardRef = useRef(null)
    const provinceInvalidRef = useRef(null)
    const districtInvalidRef = useRef(null)
    const wardInvalidRef = useRef(null)

    const [validated, setValidated] = useState(false)
    const [CustomerForm, setCustomerForm] = useState(initialForm)
    const { customer_name, phone, address1, address2, address3, house_address } = CustomerForm
    const [Province, SetProvince] = useState(address)
    const [District, setDistrict] = useState([])
    const [Ward, setWard] = useState([])
    const [Cart, setCart] = useState([])

    const onCustomerFormChange = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value
        })
    }
    const onCustomerFormChangeProvince = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value,
            address2: "",
            address3: ""
        })

    }
    const onCustomerFormChangeDistrict = e => {
        setCustomerForm({
            ...CustomerForm,
            [e.target.name]: e.target.value,
            address3: ""
        })

    }
    const findProductById = (id) => {
        return products.find(item => {
            return item.id === id
        })
    }
    const getProductName = (slug) => {
        let rs = products.filter(item => item.id === slug)[0]
        return rs ? rs.title : ""
    }
    const getProductSale = (slug) => {

        let rs = products.filter(item => item.id === slug)[0]
        return rs ? rs.sale : ""
    }
    const caculatePrice = (product) => {
        let tmp = findProductById(product.product_id)
        if (tmp) {
           return  tmp.sale > 0 ? (tmp.price * product.quantity) - (tmp.price * product.quantity)*25/100  : tmp.price * product.quantity
        }
        return 0
    }
    // submit change customer information
    const handleSubmit = async () => {
        let data = {
            id: user.id,
            ...CustomerForm
        }

        let rs = await axios.patch(`${apiUrl}/user/update`, data, { headers: { Authorization: `Bearer ${token}` } })
        dispatch(updateUser(data))
    }

    useEffect(() => {
        handleSubmit()
    }, [CustomerForm])
    useEffect(() => {
        dispatch(getCart())
        dispatch(getAllProduct())
    }, [user])
    useEffect(() => {
        if (cart.length > 0) {
            let t_cart = cart.map(item => {
                return {
                    ...item,
                    list_product: item.list_product.map(item => {
                        let tmp = findProductById(item.product_id)
                        return {
                            ...item,
                            ...tmp
                        }
                    })
                }

            })
            setCart([...t_cart])
        }

    }, [cart])
    useEffect(() => {
        if (address1) {
            if (address.filter(item => item.Name === address1)[0])
                setDistrict(address.filter(item => item.Name === address1)[0].Districts)
            else
                setDistrict([])
        }
        if (address1 !== "" && provinceRef.current && provinceInvalidRef.current) {
            provinceRef.current.classList.remove('active')
            provinceInvalidRef.current.classList.remove('active')
        }

    }, [address1, Province])
    useEffect(() => {
        if (address2) {
            if (District.filter(item => item.Name === address2)[0])
                setWard(District.filter(item => item.Name === address2)[0].Wards)
        }
        else
            setWard([])
        if (address2 !== "" && districtRef.current && districtInvalidRef.current) {
            districtRef.current.classList.remove('active')
            districtInvalidRef.current.classList.remove('active')
        }
    }, [address2, District])
    useEffect(() => {
        if (address3 !== "" && wardRef.current && wardInvalidRef.current) {
            wardRef.current.classList.remove('active')
            wardInvalidRef.current.classList.remove('active')
        }
    }, [address3])
 
    return (
        <div className='customer-info'>
            <div className="customer-info-header">
                T??i kho???n c???a t??i
            </div>
            <div className="customer-info-content">
                <div className="customer-info-content-left">
                    <div className="customer-info-content-left-header">
                        L???ch s??? ????n h??ng
                    </div>
                    <div className="customer-info-content-left-table " >
                        <Table responsive hover striped variant='info' size='lg'  >
                            <thead>
                                <tr>
                                    <th >????n h??ng</th>
                                    <th >Ng??y</th>
                                    <th >T??nh tr???ng</th>
                                    <th >T???ng</th>
                                    <th>?????a ch??? giao h??ng</th>
                                    <th> S???n ph???m</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    Cart.length > 0 ? Cart.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.cart_id}</td>
                                            <td className='tdcell'>{item.create_date}</td>
                                            <td className='tdcell'>{item.status}</td>
                                            <td className='tdcell'>{numberWithCommas(item.total)}??</td>
                                            <td className='tdcell2'>{item.address}</td>
                                            <td className='tdcell3'>{item.list_product.map((product, index) => {
                                                return (
                                                    <div key={index}>
                                                        {
                                                            `${product.product_id} - ${getProductName(product.product_id)} - 
                                                    sale: ${getProductSale(product.product_id) ? `${getProductSale(product.product_id)}%` : "none"} -
                                                     ${numberWithCommas(caculatePrice(product))}??`
                                                        }
                                                    </div>
                                                )

                                            })}</td>
                                        </tr>
                                    )) : <></>
                                }

                            </tbody>
                        </Table>
                    </div>
                </div>
                <div className="customer-info-content-right">
                    <div className="customer-info-content-right-header">
                        Chi ti???t t??i kho???n
                    </div>
                    <div className="customer-info-content-right-table">
                        <fieldset className='border p-3 mt-4'  >
                            <legend className='float-none w-auto p-3'>Th??ng tin kh??ch h??ng</legend>
                            <Form.Group className='me-5 mb-3'  >
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    disabled
                                    required
                                    type="email"
                                    defaultValue={user.username}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui l??ng nh???p email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='me-5 mb-3'  >
                                <Form.Label>T??n</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    name="customer_name"
                                    value={customer_name}
                                    onChange={onCustomerFormChange}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui l??ng nh???p email.
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className='me-5 mb-4' >
                                <Form.Label>S??? ??i???n tho???i </Form.Label>
                                <Form.Control
                                    required
                                    type="number"
                                    name="phone"
                                    value={phone}
                                    onChange={onCustomerFormChange}
                                    size="lg"
                                />
                                <Form.Control.Feedback type="invalid">
                                    Vui l??ng s??? ??i???n tho???i.
                                </Form.Control.Feedback>
                            </Form.Group>
                        </fieldset>
                        <fieldset className='border p-3 mt-4'  >
                            <legend className='float-none w-auto p-3'>Th??ng tin giao h??ng</legend>
                            <Form validated={validated} noValidate ref={addressRef}>
                                <Form.Group className=' mb-3' >
                                    <Form.Label>?????a ch???</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        value={house_address}
                                        name="house_address"
                                        onChange={onCustomerFormChange}
                                        size="lg"
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        V??i l??ng nh???p ?????a ch???.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                            <div className='customer-info-content-right-table-select  '>
                                <div className='customer-info-content-right-table-select-item'>
                                    <Form.Select size="lg"
                                        required
                                        value={address1}
                                        name="address1"
                                        ref={provinceRef}
                                        onChange={onCustomerFormChangeProvince}
                                        bsPrefix="form-select form-select-lg "
                                    >
                                        <option >T???nh/Th??nh</option>
                                        {
                                            Province.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={provinceInvalidRef}>
                                            Vui l??ng nh???p t???nh th??nh
                                        </div>
                                    </div>
                                </div>
                                <div className='customer-info-content-right-table-select-item'>
                                    <Form.Select size="lg"
                                        required
                                        value={address2}
                                        name="address2"
                                        onChange={onCustomerFormChangeDistrict}
                                        ref={districtRef}
                                        bsPrefix="form-select form-select-lg "
                                    >
                                        <option >Qu???n/Huy???n</option>
                                        {
                                            District.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={districtInvalidRef}>
                                            Vui l??ng nh???p qu???n huy???n
                                        </div>
                                    </div>
                                </div>
                                <div className='customer-info-content-right-table-select-item '>
                                    <Form.Select size="lg"
                                        required
                                        value={address3}
                                        name="address3"
                                        ref={wardRef}
                                        bsPrefix="form-select form-select-lg"
                                        onChange={onCustomerFormChange}
                                    >
                                        <option >Ph?????ng/X??</option>
                                        {
                                            Ward.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.Name} >{item.Name}</option>
                                                )
                                            })
                                        }
                                    </Form.Select>
                                    <div className='p-2 invalidmess '>
                                        <div ref={wardInvalidRef}>
                                            Vui l??ng nh???p ph?????ng x??
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerInfo