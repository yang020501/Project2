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
import { apiImage, apiUrl } from '../utils/constant'
import CustomerProductCard from '../components/CustomerProductCard'
import { useSelector } from 'react-redux';


const Product = props => {
  const { slug } = useParams();
  const [product, setproduct] = useState()
  const [rproduct, setrproduct] = useState(null)
  const [sproduct, setsproduct] = useState([])
  const [relatedProducts, setRelatedProducts] = useState([])
  const CFProducts = useSelector(state => state.userState.CF)
  const similar = useSelector(state => state.userState.similar)
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
      setrproduct(null)
    }
    else {
      let tmp = CFProducts.find(item => item.id == slug)
      if (tmp)
        setrproduct({ ...tmp })
      else {
        tmp = similar.find(item => item.id == slug)
        if (tmp) {
          let tmp2 = {
            budget: 4750000,
            description: tmp.overview,
            release: tmp.release_date.substring(0, 4),
            img01: apiImage + tmp.poster_path,
            img02: apiImage + tmp.backdrop_path,
            ...tmp
          }
          setrproduct({ ...tmp2 })
        }
      }
    
    }
  }, [slug])
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])
  useEffect(() => {
    if (CFProducts.length > 0) {
      (async function () {
        const response = await Promise.all(CFProducts.map(item => axios.get(`https://api.themoviedb.org/3/movie/${item.id}?api_key=8be33bdae0e6e5766b8e30bf628df7a6&language=en-US`).catch(data => data)));
        let tmp = response.map(item => {
          let rs = item
          let rs_data
          return rs_data = {
            description: rs.data.overview,
            budget: rs.data.budget / 10,
            release: rs.data.release_date.substring(0, 4),
            img01: apiImage + rs.data.poster_path,
            img02: apiImage + rs.data.backdrop_path,
            genres: rs.data.genres.toString(),
            category: rs.data.original_language,
            title: rs.data.title,
            vote: rs.data.vote_average,
            id: rs.data.id
          }
        })
        setRecommend([...tmp])
      })()

    }
  }, [CFProducts])
  useEffect(() => {
    setsproduct([...similar])
  }, [similar])

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
                  getProducts(recommend, 4).map((item, index) => (
                    <CustomerProductCard
                      recommend
                      key={index}
                      img01={item.img01 ? item.img01 : require("../assets/images/tmp.jpg")}
                      img02={item.img02 ? item.img02 : ""}
                      name={item.title}
                      price={item.budget > 0 ? item.budget : 4750000}
                      badge={"normal"}
                      rate={Math.round(item.vote / 2)}
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
              <RecommendProductView product={rproduct} />
              :
              <ProductView ProductReal={product} />
          }

        </SectionBody>
      </Section>
      <Section>
        <SectionTitle>
          Phim liên quan
        </SectionTitle>
        <SectionBody>
          <Grid
            col={4}
            mdCol={2}
            smCol={1}
            gap={20}
          >
            {sproduct.length > 0 ?
              getProducts(sproduct, 8).map((item, index) => (
                <CustomerProductCard
                  recommend
                  key={index}
                  img01={apiImage + item.poster_path}
                  img02={item.image2}
                  name={item.title}
                  price={item.budget > 0 ? item.budget : 4750000}
                  badge={"normal"}
                  rate={Math.round(item.vote_average / 2)}
                  id={item.id}
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
