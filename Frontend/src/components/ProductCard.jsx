import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from './Button'
import numberWithCommas from '../utils/numberWithCommas'
import { useDispatch } from 'react-redux'
import { set } from '../redux/product-modal/productModalSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'


const ProductCard = props => {
    const productSale = useSelector(state => state.saleSlice.value)

    const dispatch = useDispatch()
    return (
        <div className='product-card'>
            <Link to={`/catalog/${props.slug}`}>
                <div className='product-card-image'>
                    <img src={require(`../assets/${props.img01}`)} alt="" />
                    <img src={require(`../assets/${props.img02}`)} alt="" />
                </div>
                <h3 className='product-card-name'>{props.name}</h3>
                <div className="product-card-price">
                    {
                        props.sale ?
                            (
                                <div>
                                    {numberWithCommas(Number((props.price - props.price * props.sale / 100)))} đ
                                    <span className='product-card-price-old'>
                                        <del>{numberWithCommas(props.price)} đ</del>
                                    </span>
                                </div>)
                            :
                            <div>{numberWithCommas(Number((props.price)))} đ</div>
                    }

                </div>
            </Link>
            <div className="product-card-btn">
                <Button
                    size='sm'
                    icon='bx bx-cart'
                    animate={true}
                    onclick={() => dispatch(set(props.slug))}
                >
                    chọn mua
                </Button>
            </div>
        </div>
    )
}

ProductCard.propTypes = {
    img01: PropTypes.string.isRequired,
    img02: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    slug: PropTypes.string.isRequired,
    sale: PropTypes.number
}

export default ProductCard
