import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet'
import HeroSlider from '../components/HeroSlider'
import Section, { SectionTitle, SectionBody } from '../components/Section'
import PolicyCard from '../components/PolicyCard'
import heroSliderData from '../assets/fake-data/hero-slider'
import policy from '../assets/fake-data/policy'
import Grid from '../components/Grid'
import ProductCard from '../components/ProductCard'
import { Link } from 'react-router-dom'
import banner from '../assets/images/banner.png'
import { getAllSale } from '../redux/product/saleSlice'
import { getAllProduct } from '../redux/product/productsSlice'
import { useDispatch, useSelector } from 'react-redux'
import CustomerProductCard from '../components/CustomerProductCard'

const Home = () => {
  let dispatch = useDispatch()
  const productData = useSelector(state => state.productsSlice.value)
  const productSale = useSelector(state => state.saleSlice.value)
  const [hotProducts, setHotProducts] = useState([])
  const [newProducts, setNewProducts] = useState([])
  const [saleProducts, setSaleProducts] = useState([])
  const getProducts = (count) => {
    const max = productData.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return productData.slice(start, start + count)
  }
  const getProductsByStatus = (products, count) => {
    if (products.length < count) {
      return products
    }
    const max = products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return products.slice(start, start + count)
  }

  useEffect(() => {
    if (productData && productData.length > 0) {
      let hot = productData.filter(item => item.status === "hot")
      setHotProducts([...hot])
      let New = productData.filter(item => item.status === "new")
      setNewProducts([...New])
      let sale = productData.filter(item => item.sale > 0)
      setSaleProducts([...sale])
    }
  }, [productData])
  useEffect(() => {
    dispatch(getAllProduct())
    dispatch(getAllSale())
  }, [])
 
  return (
    <Helmet title='Trang chủ'>
      <HeroSlider data={heroSliderData} control={true} auto={true} timeOut={3000} />

      <Section>
        <SectionBody>
          <Grid
            col={3}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {policy.map((item, index) => (
              <Link key={index} to="/">
                <PolicyCard
                  name={item.name}
                  description={item.description}
                  icon={item.icon}
                />
              </Link>

            ))
            }
          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>
          sản phẩm mới
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {
              getProductsByStatus(newProducts,8).map((item, index) => (
                <CustomerProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  slug={item.slug}
                  price={item.price}
                  rate={item.rate}
                  badge={item.status}

                >
                </CustomerProductCard>
              )
              )
            }

          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>
          Top sản phẩm bán chạy
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {

              getProductsByStatus(hotProducts, 4).map((item, index) => (
                <CustomerProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  slug={item.slug}
                  price={item.price}
                  rate={item.rate}
                  badge={item.status}
                >
                </CustomerProductCard>
              ))

            }

          </Grid>
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>
          sản phẩm giảm giá
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {

              productSale.map((item, index) => (
                <CustomerProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  slug={item.slug}
                  price={item.price}
                  sale={item.sale}
                  rate={item.rate}
                  badge={item.status}
                >
                </CustomerProductCard>
              )
              )
            }

          </Grid>
        </SectionBody>
      </Section>

      <Section>
        {/* <Link to="/catalog"> */}
        <img id="banner" src={banner} alt="" />
        {/* </Link> */}
      </Section>


      <Section>
        <SectionTitle>
          phổ biến
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {

              getProducts(12).map((item, index) => (
                <CustomerProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  slug={item.slug}
                  price={item.price}
                  rate={item.rate}
                  badge={item.status}
                >
                </CustomerProductCard>
              )
              )
            }

          </Grid>
        </SectionBody>
      </Section>

    </Helmet>
  )
}

export default Home