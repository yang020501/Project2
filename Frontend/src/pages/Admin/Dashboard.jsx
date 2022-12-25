import React, { useEffect, useState } from 'react'
import Card, { CardBody, CardHeader } from '../../components/Card'
import ContentMain from '../../components/Admin/ContentMain'
import { useSelector } from 'react-redux'
import numberWithCommas from '../../utils/numberWithCommas'
import Form from 'react-bootstrap/Form'
import { Doughnut, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Colors, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';


const Dashboard = () => {
    ChartJS.register(ArcElement, Tooltip, Legend, Colors);
    ChartJS.register(CategoryScale, LinearScale, BarElement,);
    const options = {
        plugins: {
            colors: {
                forceOverride: true
            }
        }
    }
    const Saleoptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Chart.js Bar Chart',
            },
        },
        scales: {
            yAxes: [{
              id: 'order',
              type: 'linear',
              position: 'left',
            }, {
              id: 'sale',
              type: 'linear',
              position: 'right',
              ticks: {
                max: 1000,
                min: 0
              }
            }]
          }
    };
    const categoryData = useSelector(state => state.categorySlice.value)
    const orderData = useSelector(state => state.orderSlice.value)
    const customerData = useSelector(state => state.customerSlice.value)
    const productData = useSelector(state => state.productsSlice.value)
    const staffData = useSelector(state => state.staffSlice.value)
    const [ProductDataChart, setProductDataChart] = useState({
        labels: [],
        datasets: [{
            label: ' số lượng: ',
            data: [],

        }]
    })
    const [SaleDataChart, setSaleDataChart] = useState({
        labels: [],
        datasets: [{
            label: ' Đơn hàng: ',
            data: [],

        },
        {
            label: ' Doanh thu: ',
            data: [],

        }
        ]
    })
    const [year, setYear] = useState(new Date().getFullYear())

    const findProdutByCategory = (find, data) => {
        if (data && data.length > 0) {
            let tmp = data.filter(item => item.categorySlug === find)
            return tmp.length
        }
        return 0
    }
    const productDataChart = (Data) => {

        if (Data && Data.length > 0) {
            let labels = categoryData.map(item => { return item.name })
            let data = categoryData.map(item => {
                let count = findProdutByCategory(item.slug, Data)
                return count
            })

            return {
                labels: labels,
                datasets: [{
                    label: ' số lượng: ',
                    data: data,
                    // borderWidth: 1
                }]

            }
        }
        return {
            labels: [],
            datasets: [{
                label: ' số lượng: ',
                data: [],
            }]
        }
    }

    const saleDataChart = (Data, year) => {

        if (Data && Data.length > 0) {
            let labels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
            let orders = labels.map((item, index) => {
                let count = Data.filter(item => {
                    console.log(item.create_date[1] === (index + 1));
                    return item.create_date[1] === (index + 1)
                })
                return count.length
            })
            let sales = labels.map((item, index) => {
                let total = Data.reduce((prev, cur) => {
                    if (cur.create_date[1] === (index + 1))
                        return prev + cur.total
                    return prev
                }, 0)
                return total
            })
            return {
                labels: labels,
                datasets: [{
                    label: ' Đơn hàng: ',
                    yAxisID:'order',
                    data: orders,

                },
                {
                    label: ' Doanh thu: ',
                    yAxisID:'sale',
                    data: sales,

                }]
            }
        }
        return {
            labels: [],
            datasets: [{
                label: ' Đơn hàng: ',
                data: [],

            },
            {
                label: ' Doanh thu: ',
                data: [],

            }]
        }
    }
    const totalSales = (data) => {
        if (data && data.length > 0) {
            let tmp = data.reduce((prev, cur) => { return prev + cur.total }, 0)
            return tmp
        }
        return 0
    }
    useEffect(() => {
        if (productData && productData.length > 0) {
            setProductDataChart({ ...productDataChart(productData) })
        }

    }, [productData])
    useEffect(() => {
        if (orderData && orderData.length > 0) {
            setSaleDataChart({ ...saleDataChart(orderData, year) })
        }

    }, [orderData, year])
    return (
        <ContentMain headerTitle='Dashboard'>
            <div className="dashboard">
                <div className="dashboard-counts">
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon sale'>
                                        <i className="bx bx-money"></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Doanh thu</p>
                                        <p>{numberWithCommas(totalSales(orderData))} đ</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon customer'>
                                        <i className='bx bx-face'></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Khách hàng</p>
                                        <p>{customerData ? customerData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon order'  >
                                        <i className='bx bxs-shopping-bags' ></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Đơn hàng</p>
                                        <p>{orderData ? orderData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div><div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon product'>
                                        <i className={"bx bx-money"}></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Sản phẩm</p>
                                        <p>{productData ? productData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-counts-item">
                        <Card>
                            <CardBody>
                                <div className="dashboard-counts-item-container">
                                    <span className='dashboard-counts-item-container-icon staff'>
                                        <i className='bx bx-user-circle'></i>
                                    </span>
                                    <div className='dashboard-counts-item-container-title'>
                                        <p>Nhân viên</p>
                                        <p>{staffData ? staffData.length : 0}</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="dashboard-statistic">
                    <div className="dashboard-statistic-chart">
                        <Card>
                            <CardHeader>
                                Doanh thu
                                <Form.Group className='h-100' >
                                    <Form.Select
                                        size="lg"
                                        required
                                        // value={categorySlug}
                                        name="categorySlug"
                                        // onChange={onChange}
                                        bsPrefix="form-select form-select-lg"
                                    >  <option  >12</option>
                                        {/* {
                                            categoryData.map((item, index) => {
                                                return (
                                                    <option key={index} value={item.slug} >{item.name}</option>
                                                )
                                            })
                                        } */}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Vui lòng nhập loại sản phẩm.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </CardHeader>
                            <CardBody>
                                <Bar data={SaleDataChart}
                                    options={Saleoptions}
                                    redraw
                                />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="dashboard-statistic-chart">
                        <Card>
                            <CardHeader>
                                Sản phẩm
                            </CardHeader>
                            <CardBody>
                                <Doughnut data={ProductDataChart}
                                    redraw
                                    options={options}
                                />
                            </CardBody>
                        </Card>
                    </div>
                </div>
                <div className="dashboard-order">
                    <div className="dashboard-order-title">
                        Latest Orders
                    </div>
                </div>
            </div>

        </ContentMain>
    )
}

export default Dashboard