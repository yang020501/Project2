import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'
import { remove } from '../redux/product-modal/productModalSlice'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import numberWithCommas from '../utils/numberWithCommas'
import fakegenres from '../assets/fake-data/fakegenres'
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

    const [previewImg, setPreviewImage] = useState(props.product ? props.product.image1 : "")
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [product, setProduct] = useState({})
    const [rateForm, setRateForm] = useState({})
    const { rate } = product

    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState(3.5)
    const [hover, setHover] = useState(-1)
    const updateQuantity = (type) => {
        if (type === "plus") {
            setQuantity(quantity + 1)
        }
        else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
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
                    <div className="product-images-list-item">
                        <div className="video-responsive">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/watch?v=gq2xKJXYZ80`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Embedded youtube"
                            />
                        </div>
                    </div>
                </div>
                <div className="product-images-main">
                    <img src={previewImg} alt='' />
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
                        Quốc gia : Mỹ
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
                        James Cameron's
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
                        Đánh giá
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