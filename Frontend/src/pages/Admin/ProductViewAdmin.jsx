import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody } from '../../components/Card'
import Form from 'react-bootstrap/Form'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { apiUrl } from '../../utils/constant'
import { addProduct, updateProduct } from '../../redux/product/productsSlice'
import { setAlert } from '../../redux/alert-message/alertMessage'
import fakegenres from '../../assets/fake-data/fakegenres'
const ProductViewAdmin = props => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { slug } = useParams();
  const productData = useSelector(state => state.productsSlice.value)
  const categoryData = useSelector(state => state.categorySlice.value)
  const token = useSelector(state => state.userState.token)
  const [validated, setValidated] = useState(false);
  const [productForm, setproductForm] = useState({
    title: "",
    image1: "",
    image2: "",
    id_cate: "",
    categorySlug: "",
    genres: "",
    actors: "",
    sale: 0,
    price: 0,
    release: 0,
    status: "",
    descriptions: "",
    slug: "",
    category: "",
    director: "",
    video: "",
  })


  const { title, sale, price, descriptions, actors, release, status, categorySlug, image1, image2, video, director } = productForm
  const [genres, setGenres] = useState([])
  const [saleCheck, setSaleCheck] = useState(false)
  const [checkPrice, setCheckPrice] = useState(false)
  const [checkSale, setCheckSale] = useState(false)
  const onChange = e => {

    var file = e.target.files
    if (FileReader && file && file.length) {
      var fr = new FileReader();
      fr.onload = function () {
        // document.getElementById('avatar').childNodes[0].src = fr.result;
        setproductForm({
          ...productForm,
          [e.target.name]: fr.result,
        })
      }
      fr.readAsDataURL(file[0]);
    }
    else {
      if (e.target.name === "genres") {
        let tmp = e.target.value
        let tmpgenres
        if (!genres.includes(tmp))
          genres.push(tmp)
        else {
          let index = genres.findIndex(item => item === tmp)
          genres.splice(index, 1)
        }

        tmpgenres = genres.join(",")
        setproductForm({
          ...productForm,
          [e.target.name]: tmpgenres,
        })
      }
      else {
        setproductForm({
          ...productForm,
          [e.target.name]: e.target.value,
        })
      }

    }

  }
  const check = () => {
    let tmp = 0
    if (saleCheck && !(sale > 5 && sale <= 70)) {
      setCheckSale(true)
      tmp++
    }
    else {
      setCheckSale(false)
    }
    if (price < 50000) {
      setCheckPrice(true)
      tmp++

    }
    else {
      setCheckPrice(false)
    }
    return tmp > 0
  }


  const Update = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
    else if (check()) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    }
    else {
      setValidated(false)
      let categoryId = categoryData.find(item => item.slug === productForm.categorySlug) ? categoryData.find(item => item.slug === productForm.categorySlug).id : categoryData[0].id
      let type = productData.findIndex(item => item.id === productForm.id)
      let body = {
        ...productForm,
        category: categoryId,
        sale: saleCheck ? sale : 0
      }
     
      if (type > -1 && slug !== "new") {
        let rs = await axios.post(`${apiUrl}/product/update-product`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })
        if (rs.data) {
          dispatch(setAlert({
            message: "C???p nh???t s???n ph???m th??nh c??ng",
            type: "success"
          }))
          dispatch(updateProduct(productForm))
        }
        else {
          dispatch(setAlert({
            message: "C???p nh???t s???n ph???m th???t b???i ",
            type: "danger"
          }))
        }
      }
      else {
        let rs = await axios.post(`${apiUrl}/product/add-product`, body, { headers: { Authorization: `Bearer ${token}` } }).catch(data => { return data })

        if (rs.data) {
          dispatch(setAlert({
            message: "T???o s???n ph???m th??nh c??ng",
            type: "success"
          }))
          dispatch(addProduct(rs.data))
        }
        else {
          dispatch(setAlert({
            message: "L???i: T??n s???n ph???m ???? t???n t???i",
            type: "danger"
          }))
        }
      }
    }
  }

  useEffect(() => {
    if (productData) {
      let product = productData.find((item) => {
        return item.slug === slug
      })
      if (product) {
        setGenres(product.genres.split(","))
        setproductForm({ ...product })
      }
    }
  }, [slug, productData])

  return (
    <Form noValidate validated={validated} onSubmit={Update}>
      <ContentMain headerTitle='S???n ph???m'
        headerLeftAction={{
          ...btnAction,
          title: 'Quay l???i S???n ph???m',
          action: () => navigate('/admin/product')
          // action: BacktoProducts
        }}
        headerRightAction={{
          ...btnAction,
          color: 'green',
          title: 'C??p nh???t',
          type: "submit",
          action: null
          // action: BacktoProducts
        }}
      >
        <Card>
          <CardBody>
            <fieldset className='border p-3'  >
              <legend className='float-none w-auto p-3'>{slug === "new" ? "T???o s???n ph???m m???i" : "Ch???nh s???a th??ng tin s???n ph???m"}</legend>
              <Form.Group className='me-5 mb-3'  >
                <Form.Label>T??n s???n ph???m</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p t??n s???n ph???m.
                </Form.Control.Feedback>
              </Form.Group>
              <div style={{ display: "flex", alignContent: "center", justifyContent: "center", width: "100%" }}>
                <Form.Group className='me-5 mb-3 w-100'  >
                  <Form.Label>Gi??</Form.Label>
                  <Form.Control
                    isInvalid={checkPrice}
                    required
                    type="number"
                    size="lg"
                    name="price"
                    value={price}
                    onChange={onChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    Gi?? t???i thi???u 50 000 ??.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className='me-5 mb-4 w-100' >
                  <Form.Check name="genres" type="checkbox" label="Gi???m gi?? %" onChange={(e) => {
                    setSaleCheck(e.currentTarget.checked)
                    setCheckSale(false)
                  }} />
                  <Form.Control
                    isInvalid={checkSale}
                    disabled={!saleCheck}
                    required
                    type="number"
                    size="lg"
                    name="sale"
                    value={sale}
                    onChange={onChange}
                    min={0}
                    max={77}
                  />
                  <Form.Control.Feedback type="invalid">
                    Ph???n tr??m kh??ng ???????c v?????t qu?? 70% v?? t???i thi???u 5%.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className='me-5 mb-3 w-100'  >
                  <Form.Label>T??nh tr???ng</Form.Label>
                  <div style={{ display: "flex", alignContent: "center", justifyContent: "space-around", width: "100%", marginTop: "10px" }}>
                    <Form.Check
                      type='radio'
                      label="M???i"
                      name="status"
                      value={"new"}
                      onChange={onChange}
                      checked={status === "new"}
                    />
                    <Form.Check
                      type='radio'
                      label="Th?????ng"
                      name="status"
                      value={"normal"}
                      onChange={onChange}
                      checked={status === "normal"}
                    />
                    <Form.Check
                      type='radio'
                      label="B??n ch???y"
                      name="status"
                      value={"hot"}
                      onChange={onChange}
                      checked={status === "hot"}
                    />
                  </div>
                </Form.Group>
              </div>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Qu???c gia</Form.Label>
                <Form.Select
                  size="lg"
                  required
                  value={categorySlug}
                  name="categorySlug"
                  onChange={onChange}
                  bsPrefix="form-select form-select-lg"
                >
                  {
                    categoryData.map((item, index) => {
                      return (
                        <option key={index} value={item.slug} >{item.name}</option>
                      )
                    })
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p Qu???c gia.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>H??nh ???nh 1</Form.Label>
                <Form.Control

                  type="file"
                  // value={image1}
                  name="image1"
                  onChange={onChange}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng ch???n ???nh 1.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>H??nh ???nh 2</Form.Label>
                <Form.Control

                  type="file"
                  name="image2"
                  // value={image2}
                  onChange={onChange}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng ch???n ???nh 2.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Di???n vi??n</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  name="actors"
                  value={actors}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p t??n di???n vi??n.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>?????o di???n</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  name="director"
                  value={director}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p t??n ?????o di???n.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Trailer</Form.Label>
                <Form.Control
                  
                  type="text"
                  size="lg"
                  name="video"
                  value={video}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p url trailer.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>N??m ph??t h??nh</Form.Label>
                <Form.Control
                  type="number"
                  size="lg"
                  name="release"
                  value={release}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng nh???p N??m ph??t h??nh.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3  "  >
                <Form.Label>Th??? lo???i </Form.Label>
                <div className='d-flex flex-row w-100 col-3 flex-wrap'>
                  {
                    fakegenres.map((item, index) => {
                      return (
                        <Form.Check className='w-25' key={index} name="genres" type="checkbox" label={item.display} checked={genres.includes(item.value)} value={item.value} onChange={onChange} />
                      )
                    })
                  }
                </div>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>M?? t???</Form.Label>
                <Form.Control
                  as="textarea"
                  name="descriptions"
                  value={descriptions}
                  onChange={onChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Vui l??ng ghi m?? t???.
                </Form.Control.Feedback>
              </Form.Group>
            </fieldset>
          </CardBody>
        </Card>
      </ContentMain >
    </Form>
  )
}


export default ProductViewAdmin