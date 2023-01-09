import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from './Button'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../redux/shopping-cart/cartItemsSlice'
import { setAlert } from '../redux/alert-message/alertMessage'

import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import numberWithCommas from '../utils/numberWithCommas'
import fakegenres from '../assets/fake-data/fakegenres'
import ReactPlayer from "react-player";
import { apiImage, apiUrl, apiUrlML, apiVideo } from '../utils/constant'

import axios from 'axios'
import { setCF, setSimilar, setW } from '../redux/user/userState'
const labels = {
    0.5: 'Bad',
    1: 'Bad+',
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

const RecommendProductView = props => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const categoryData = useSelector(state => state.categorySlice.value)
    const user = useSelector(state => state.userState.user)
    const token = useSelector(state => state.userState.token)
    const [previewImg, setPreviewImage] = useState(props.product ? props.product.img01 : "")
    const [descriptionExpand, setDescriptionExpand] = useState(false)
    const [product, setProduct] = useState({})
    const [Rate, setRate] = useState(0)
    const [Rated, setRated] = useState(false)
    const [video, setvideo] = useState("")
 
    const [quantity, setQuantity] = useState(1)

    const [hover, setHover] = useState(-1)
    const updateQuantity = (type) => {
        if (type === "plus") {
            setQuantity(quantity + 1)
        }
        else {
            setQuantity(quantity - 1 < 1 ? 1 : quantity - 1)
        }
    }
    const findCategory = (slug) => {
        switch (slug) {
            case "en": return Math.random() * 100 > 0.5 ? "Mỹ" : "Anh"
            case "vi": return "Việt Nam"
            case "ja": return "Nhật Bản"
            case "fr": return "Pháp"
            default: return "Đang cập nhật"
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
    const rate = async (value) => {
        let form = {
            user_id: user.id,
            product_id: product.id,
            score: value
        }
        const rs = await axios.post(`${apiUrl}/rate/rate-product`, form, { headers: { Authorization: `Bearer ${token}` } }).catch(data => data)
        if (rs.data && rs.data.score) {
            setRate(rs.data.score)
            setRated(true)
        }
    }
    const gotoCart = () => {
        if (true) {
            // dispatch(addItem({
            //     slug: product.slug,
            //     quantity: quantity,
            //     price: product.price

            // }))
            // dispatch(remove())
            navigate("/cart")
        }
    }
    useEffect(() => {
        setPreviewImage(props.product ? props.product.img01 : "")
        setQuantity(1)
        if (props.product)
            setProduct(props.product)
    }, [props.product])
    useEffect(() => {

        if (Object.keys(product).length > 0) {
            const fetchSimilar = async () => {
                // const rs = await axios.get(`https://api.themoviedb.org/3/movie/${props.product.id}/similar?api_key=8be33bdae0e6e5766b8e30bf628df7a6&language=en-US&page=${Math.round(Math.random()*100)}`).catch(data => data)
                const rs = await axios.get(`https://api.themoviedb.org/3/movie/${props.product.id}/similar?api_key=8be33bdae0e6e5766b8e30bf628df7a6&language=en-US&page=${1}`).catch(data => data)

                dispatch(setSimilar(rs.data.results))
            }
            fetchSimilar()
            const fetchProduct = async () => {
                const rs = await axios.get(`https://api.themoviedb.org/3/movie/${props.product.id}?api_key=8be33bdae0e6e5766b8e30bf628df7a6&language=en-US`).catch(data => data)

                if (rs.data) {
                    let data_tmp = {

                        description: rs.data.overview,
                        budget: Number(rs.data.budget) / 10,
                        release: rs.data.release_date.substring(0, 4),
                        img01: apiImage + rs.data.poster_path,
                        img02: apiImage + rs.data.backdrop_path,
                        genres: rs.data.genres.toString(),
                        category: rs.data.original_language,
                        title: rs.data.title

                    }
                    setPreviewImage(apiImage + rs.data.poster_path)
                    const rs2 = await axios.get(`https://api.themoviedb.org/3/movie/${props.product.id}/videos?api_key=8be33bdae0e6e5766b8e30bf628df7a6&language=en-US`).catch(data => data)
                    if (rs2.data) {
                   
                        data_tmp = {
                            ...data_tmp,
                            video: apiVideo + rs2.data.results[0].key
                        }
                        setProduct({ ...data_tmp })
                        return
                    }
                    setProduct({ ...data_tmp })
                }
            }
            fetchProduct()
        }

    }, [props.product])

    return (
        <div className='product'>
            <div className="product-images">
                <div className="product-images-list">
                    <div className="product-images-list-item" onClick={() => setPreviewImage(product.img01 ? product.img01 : require("../assets/images/tmp.jpg"))}>
                        <img src={Object.keys(product).length > 0 ? product.img01 ? product.img01 : "" : require("../assets/images/tmp.jpg")} alt="Hình ảnh bìa" />
                    </div>
                    <div className="product-images-list-item" onClick={() => setPreviewImage(product.img02 ? product.img02 : require("../assets/images/tmp.jpg"))}>
                        <img src={Object.keys(product).length > 0 ? product.img02 ? product.img02 : "" : require("../assets/images/tmp.jpg")} alt="Hình ảnh bìa" />
                    </div>
                    <div className="product-images-list-item" >

                    </div>
                </div>
                <div className="product-images-main">
                    <img src={previewImg} alt='' />
                </div>
                <div className="product-images-video">
                    <div className='product-images-video-title '> Trailer</div>
                    <ReactPlayer controls width="100%" height="100%" className="video" url={`${Object.keys(product).length > 0 ? product.video : ""}`}  ></ReactPlayer>
                </div>
                <div className={`product-description ${descriptionExpand ? 'expand' : ''}`}>
                    <div className="product-description-title">
                        Chi tiết sản phẩm
                    </div>
                    <div className="product-description-content"
                        dangerouslySetInnerHTML={{ __html: product.description }}
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

                        {product.budget ?
                            // (
                            //     <div>
                            //         {numberWithCommas(Number((product.budget - product.budget * product.sale / 100)))} đ
                            //         <span className='product-card-price-old'>
                            //             <del>{numberWithCommas(product.budget)} đ</del>
                            //         </span>
                            //     </div>)
                            // :
                            <div>{numberWithCommas(Number((product.budget)))} đ</div>
                            : <div>{numberWithCommas(4750000)} đ</div>
                        }
                    </span>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Quốc gia / Năm phát hành
                    </div>
                    <div className='product-info-item-list'>
                        {findCategory(product.category)} / {product.release ? product.release.substring(0, 4) : "Đang cập nhật."}
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
                        Đang cập nhật.
                    </div>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Diễn viên:
                    </div>
                    <div className="product-info-item-list">
                        Đang cập nhật.
                    </div>
                </div>
                <div className="product-info-item">
                    <div className='product-info-item-title'>
                        Đánh giá của bạn: {Rated ? "" : "Chưa có đánh giá"}
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
                            value={Rate}
                            precision={0.5}
                            getLabelText={getLabelText}
                            onChange={(event, newValue) => {
                                rate(newValue)
                            }}
                            onChangeActive={(event, newHover) => {
                                setHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />
                        {Rate !== null && (
                            <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : Rate]}</Box>
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
                    <Button
                    //  onclick={() => addtoCart()}
                    >
                        Thêm vào giỏ
                    </Button>
                    <Button
                        onclick={() => gotoCart()}>
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

RecommendProductView.propTypes = {
    product: PropTypes.object

}

export default RecommendProductView