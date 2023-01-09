import React, { useEffect, useState } from 'react'
import Helmet from '../components/Helmet'
import Section, { SectionBody, SectionTitle } from '../components/Section'
import Grid from '../components/Grid'
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { useParams } from 'react-router-dom'
import ProductView from '../components/ProductView'
import RecommendProductView from '../components/RecommendProductView'
import axios from 'axios'
import { apiUrl } from '../utils/constant'
import CustomerProductCard from '../components/CustomerProductCard'
import { useSelector } from 'react-redux';

const Product = props => {
  const { slug } = useParams();
  const [product, setproduct] = useState()
  const [rproduct, setrproduct] = useState(null)
  const [relatedProducts, setRelatedProducts] = useState([])
  const CFProducts = useSelector(state => state.userState.CF)

  const [recommend, setRecommend] = useState([])

  const getProducts = (products, count) => {
    if (products.length < count) {
      return products
    }
    const max = products.length - count
    const min = 0
    const start = Math.floor(Math.random() * (max - min) + min)
    return products.slice(start, start + count)
  }
  useEffect(() => {
    const fetchData = async () => {
      const rs = await axios.get(`${apiUrl}/product/category_slug/${product.categorySlug}`)
      setRelatedProducts(rs.data)
    }
    if (product)
      fetchData()
  }, [product])
  useEffect(() => {
    if (!Number(slug)) {
      const fetchData = async () => {
        const rs = await axios.get(`${apiUrl}/product/slug/${slug}`)
        setproduct(
          rs.data[0]
        )
      }
      fetchData()
      setproduct(null)
    }
    else {
      setrproduct({ ...CFProducts.find(item => item.id == slug) })

    }
  }, [slug])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])
  useEffect(() => {
    setRecommend([...CFProducts])
  }, [CFProducts])

  return (
    <Helmet title={product ? product.title : ""}>
      <Section>
        <SectionTitle>
          Có thể bạn sẽ thích
        </SectionTitle>
        <SectionBody>
          {
            recommend.length > 0 ?
              <Grid
                col={4}
                mdCol={2}
                smCol={1}
                gap={20}
              >
                {
                  getProducts(CFProducts, 4).map((item, index) => (
                    <CustomerProductCard
                      recommend
                      key={index}
                      img01={item.image1 ? item.image1 : require("../assets/images/tmp.jpg")}
                      img02={item.image2 ? item.image2 : ""}
                      name={item.title}
                      price={item.budget > 0 ? item.budget / 10 : 4750000}
                      badge={"normal"}
                      rate={item.vote / 2}
                      id={item.id}
                    />
                  ))
                }
              </Grid>

              :
              <Grid
                col={1}
                mdCol={2}
                smCol={1}
                gap={20}
              >
                <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                  <LinearProgress color="secondary" />
                  <LinearProgress color="success" />
                  <LinearProgress color="inherit" />
                </Stack>
              </Grid>


          }

        </SectionBody>
      </Section>
      <Section>
        <SectionBody>
          {
            rproduct ?
              <RecommendProductView  product={rproduct}/>
              :
              <ProductView product={product} />
          }

        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Phim cùng thể loại
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {relatedProducts ?
              relatedProducts.map((item, index) => (
                <CustomerProductCard
                  key={index}
                  img01={item.image1}
                  img02={item.image2}
                  name={item.title}
                  price={item.price}
                  slug={item.slug}
                  badge={item.status ? item.status : "normal"}
                />
              ))
              : <></>
            }
          </Grid>
        </SectionBody>
      </Section>

    </Helmet>
  )
}

export default Product
