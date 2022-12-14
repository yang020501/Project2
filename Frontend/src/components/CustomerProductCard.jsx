import React from 'react'
import PropTypes from 'prop-types'
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { useDispatch, useSelector } from 'react-redux'
import { set } from '../redux/product-modal/productModalSlice'
import Badge from '@mui/material/Badge';
import axios from 'axios'
import { apiUrl } from '../utils/constant'
import { deleteProduct } from '../redux/product/productsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'

const CustomerProductCard = props => {
    const productData = useSelector(state => state.productsSlice.value)
    const categoryData = useSelector(state => state.categorySlice.value)
    const token = useSelector(state => state.userState.token)

    const delProduct = async (id, name) => {
        if (window.confirm(`Bạn có muốn xóa sản phẩm ${name} này chứ?`)) {
            let productForm = productData.find(item => item.id === id)
            if (productForm) {
                let categoryName = categoryData.find(item => item.slug === productForm.categorySlug) ? categoryData.find(item => item.slug === productForm.categorySlug).name : ""
                let body = {
                    ...productForm,
                    category: categoryName ? categoryName : ""
                }
                let rs = await axios.post(`${apiUrl}/product/delete-product`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
                if (rs.data) {
                    dispatch(setAlert({
                        message: "Xóa sản phẩm thành công",
                        type: "success"
                    }))
                    dispatch(deleteProduct(productForm))
                }
                else {
                    dispatch(setAlert({
                        message: "Xóa sản phẩm thất bại ",
                        type: "danger"
                    }))
                }
            }
        }
    }

    const navigate = useNavigate();
    const dispatch = useDispatch()
    return (
        <Badge badgeContent={props.badge ? props.badge === "normal" ? null : props.badge : null} color={props.badge ? props.badge === "new" ? "success" : "error" : "warning"} >
            <div className='customer-product-card'>
                <Link to={props.recommend ? `/catalog/${props.id}` : `/catalog/${props.slug}`}>
                    <img className='customer-product-card-image' src={props.img01} alt="" />
                    <div className="customer-product-card-description">
                        <span className='customer-product-card-quality'>FHD</span>
                        <span style={{ float: 'right', fontSize: '14pt' }}>
                            <i className='bx bxs-star ' style={{ color: "yellow" }} />
                            {`${props.rate}/5`}
                        </span>
                        <h3 className='customer-product-card-name'>{props.name}</h3>
                        <div className="customer-product-card-price">
                            {
                                props.sale ?
                                    (
                                        <div>
                                            {numberWithCommas(Number((Number(props.price) - Number(props.price) * props.sale / 100)))} đ
                                            <span className='customer-product-card-price-old'>
                                                <del>{numberWithCommas(props.price)} đ</del>
                                            </span>
                                        </div>)
                                    :
                                    <div>{numberWithCommas(Number((props.price)))} đ</div>
                            }

                        </div>
                        {/* <div className="customer-product-card-btn">
                        {!props.admin ?
                            <Button
                                size='xs'
                                icon='bx bx-cart'
                                animate={true}
                                onclick={() => dispatch(set(props.slug))}
                            >
                                chọn mua
                            </Button>
                            :
                            <div className="customer-product-card-btn-double">
                                <Button
                                    backgroundColor={'green'}
                                    size='sm'
                                    icon='bx bx-edit'
                                    animate={true}
                                    onclick={() => navigate(`/admin/product/${props.slug}`)}
                                >
                                    chỉnh sửa
                                </Button>  <Button
                                    size='sm'
                                    backgroundColor={'red'}
                                    icon='bx bx-trash'
                                    animate={true}
                                    onclick={() => delProduct(props.id, props.name)}
                                >
                                    xóa
                                </Button>
                            </div>
                        }

                    </div> */}
                    </div>
                </Link>
            </div>
        </Badge >
    )
}

CustomerProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string,
    sale: PropTypes.number,
    admin: PropTypes.bool,
    id: PropTypes.string,
    badge: PropTypes.string,
    rate: PropTypes.number,
    recommend: PropTypes.bool,

}

export default CustomerProductCard
