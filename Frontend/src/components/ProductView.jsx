import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'
import { remove } from '../redux/product-modal/productModalSlice'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import numberWithCommas from '../utils/numberWithCommas'
import fakegenres from '../assets/fake-data/fakegenres'
import ReactPlayer from "react-player";
import { apiUrl, apiUrlML } from '../utils/constant'

import axios from 'axios'
const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};
function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

const ProductView = props => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryData = useSelector(state => state.categorySlice.value)
    const user = useSelector(state => state.userState.user)
    const token = useSelector(state => state.userState.token)
    const [previewImg, setPreviewImage] = useState(props.product ? props.product.image1 : "")
    const [video, setVideo] = useState("")
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [product, setProduct] = useState({})
    const [rateForm, setRateForm] = useState({})
    const [CFRecommend, setCFRecommend] = useState([])

    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState(2.5)
    const [hover, setHover] = useState(-1)
    const updateQuantity = (type) => {
        if (type === "plus") {
            setQuantity(quantity + 1)
        }
        else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
    const findCategory = (id) => {
        let tmp = categoryData.find(item => item.id === id)

        return tmp ? tmp.name : ""
    }
    const addtoCart = () => {

        dispatch(addItem({
            slug: product.slug,
            quantity: quantity,
            price: product.price

        }))
        dispatch(setAlert({
            message: "Thêm vào giỏ thành công",
            type: "success"
        }))

    }
    const rate = async (value) => {
        let form = {
            user_id: user.id,
            product_id: product.id,
            score: value
        }
        const rs = await axios.post(`${apiUrl}/rate/rate-product`, form, { headers: { Authorization: `Bearer ${token}` } }).catch(data => data)
        console.log(rs,"rate");
    }
    const gotoCart = () => {
        if (true) {
            dispatch(addItem({
                slug: product.slug,
                quantity: quantity,
                price: product.price

            }))
            dispatch(remove())
            navigate("/cart")
        }
    }
    useEffect(() => {
        setPreviewImage(props.product ? props.product.image1 : "")
        setQuantity(1)
        if (props.product)
            setProduct(props.product)
    }, [props.product])
    useEffect(() => {
        if (user && product) {
            const fetchRate = async () => {
                let form = {
                    user_id: user.id,
                    product_id: product.id
                }
                // const rs2 = await axios.get(`${apiUrlML}/load-old/CF/2`).catch(data => data)
                // console.log(rs2.data, "hello");
                const rs = await axios.post(`${apiUrl}/rate/user-product-rating`, form, { headers: { Authorization: `Bearer ${token}` } }).catch(data => data)
                if (rs.data) {
                    const rs2 = await axios.get(`${apiUrlML}/load-old/CF/2`).catch(data => data)
                    setCFRecommend(rs2.data)
                }
                else {
                    // const rs3 = await axios.get(`${apiUrlML}/load-old/CF/2`).catch(data => data)
                }
            }
            fetchRate()
        }


    }, [user, product])
    return (
        <div className='product'>
            <div className="product-images">
                <div className="product-images-list">
                    <div className="product-images-list-item" onClick={() => setPreviewImage(props.product ? product.image1 : "")}>
                        <img src={props.product ? product.image1 : ""} alt="image 1" />
                    </div>
                    <div className="product-images-list-item" onClick={() => setPreviewImage(props.product ? product.image2 : "")}>
                        <img src={props.product ? product.image2 : ""} alt="image 2" />
                    </div>
                    <div className="product-images-list-item" >

                    </div>
                </div>
                <div className="product-images-main">
                    <img src={previewImg} alt='' />
                </div>
                <div className="product-images-video">
                    <div className='product-images-video-title '> Trailer</div>
                    <ReactPlayer controls width="100%" height="100%" className="video" url={`${props.product ? props.product.video : ""}`}  ></ReactPlayer>
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description-title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description-content"
                        dangerouslySetInnerHTML={{ __html: product.descriptions }}
                    ></div>
                    <div className="product-description-toggle">
                        <Button size='sm' onclick={() => setDescriptionExpand(!descriptionExpand)}>
                            {
                                descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                            }
                        </Button>
                    </div>
                </div>
            </div>
            <div className="product-info">
                <h1 className="product-info-title">
                    {product.title}
                </h1>
                <div className="product-info-item">
                    <span className='product-info-item-price'>

                        {product.sale ?
                            (
                                <div>
                                    {numberWithCommas(Number((product.price - product.price * product.sale / 100)))} đ
                                    <span className='product-card-price-old'>
                                        <del>{numberWithCommas(product.price)} đ</del>
                                    </span>
                                </div>)
                            :
                            <div>{numberWithCommas(Number((product.price)))} đ</div>}
                    </span>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Quốc gia / Năm phát hành
                    </div>
                    <div className='product-info-item-list'>
                        {findCategory(product.categorySlug)} / {product.release}
                    </div>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Thể loại :
                    </div>
                    <div className="product-info-item-list">
                        {
                            product.genres ?
                                fakegenres.filter(items => {
                                    return product.genres.includes(items.value)
                                }).map(item => item.display).join(", ")
                                : ""
                        }
                    </div>
                </div>

                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Đạo diễn:
                    </div>
                    <div className="product-info-item-list">
                        {product.director}
                    </div>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Diễn viên:
                    </div>
                    <div className="product-info-item-list">
                        {product.actors}
                        {/* Sam Wothington, Zoe Saldana, Sigourney Weaver, Kate Winslet, Stephen Lang */}
                    </div>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Đánh giá của bạn:
                    </div>
                    <Box
                        sx={{
                            width: 200,
                            display: 'flex',
                            alignItems: 'center',
                            fontSize: '20pt'
                        }}
                    >
                        <Rating
                            name="hover-feedback"
                            value={value}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                setValue(newValue);
                                rate(newValue)
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {value !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                        )}
                    </Box>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Số lượng
                    </div>
                    <div className="product-info-item-quantity">
                        <div className="product-info-item-quantity-btn" onClick={() => updateQuantity("minus")}>
                            <i className='bx bx-minus' />
                        </div>
                        <div className="product-info-item-quantity-input">
                            {quantity}
                        </div>
                        <div className="product-info-item-quantity-btn" onClick={() => updateQuantity("plus")}>
                            <i className='bx bx-plus' />
                        </div>
                    </div>
                </div>
                <div className="product-info-item">
                    <Button onclick={() => addtoCart()}>
                        Thêm vào giỏ
                    </Button>
                    <Button onclick={() => gotoCart()}>
                        Mua ngay
                    </Button>
                </div>
            </div>
            <div className={`product-description mobile ${descriptionExpand ? 'expand' : ''}`}>
                <div className="product-description-title">
                    Chi tiết sản phẩm
                </div>
                <div className="product-description-content"
                    dangerouslySetInnerHTML={{ __html: product.descriptions }}
                ></div>
                <div className="product-description-toggle">
                    <Button size='sm' onclick={() => setDescriptionExpand(!descriptionExpand)}>
                        {
                            descriptionExpand ? 'Thu gọn' : 'Xem thêm'
                        }
                    </Button>
                </div>
            </div>
        </div >
    )
}

ProductView.propTypes = {
    product: PropTypes.object

}

export default ProductView