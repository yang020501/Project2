import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody } from '../../components/Card'
import Form from 'react-bootstrap/Form'
import colors from '../../assets/fake-data/product-color'
import size from '../../assets/fake-data/product-size'
import { useSelector } from 'react-redux'
const ProductViewAdmin = props => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const productData = useSelector(state => state.productsSlice.value)
  const categoryData = useSelector(state => state.categorySlice.value)
  console.log(categoryData);
  const [color, setColor] = useState([])
  const [sizes, setSizes] = useState([])
  const [productForm, setproductForm] = useState({
    title: "",
    img01: "",
    img02: "",
    categoryid: "",
    colors: "",
    size: "",
    sale: 0,
    price: 0,
    description: ""
  })
  const { title, sale, price, description } = productForm
  const onChange = e => {

    var file = e.target.files
    if (FileReader && file && file.length) {
      var fr = new FileReader();
      fr.onload = function () {
        // document.getElementById('avatar').childNodes[0].src = fr.result;
        setproductForm({
          ...productForm,
          [e.target.name]: fr.result
        })
      }
      fr.readAsDataURL(file[0]);
    }
    else {
      setproductForm({
        ...productForm,
        [e.target.name]: e.target.value
      })
    }

  }
  const setActiveColor = (itemActive) => {
    if (color.includes(itemActive)) {
      let list = color.filter(item => item !== itemActive)
      setColor([...list])
    }
    else {
      color.push(itemActive)
      setColor([...color])
    }
  }
  const setActiveSize = (itemActive) => {
    if (sizes.includes(itemActive)) {
      let list = sizes.filter(item => item !== itemActive)
      setSizes([...list])
    }
    else {
      sizes.push(itemActive)
      setSizes([...sizes])
    }
  }
  const clearValues = (type) => {
    if (type) {
      switch (type) {
        case "size": setSizes([])
        case "color": setColor([])
      }
    }
  }
  const Update = () => {
    console.log(productForm);
  }

  return (
    <ContentMain headerTitle='Sản phẩm'
      headerLeftAction={{
        ...btnAction,
        title: 'Quay lại Sản phẩm',
        action: () => navigate('/admin/product')
        // action: BacktoProducts
      }}
      headerRightAction={{
        ...btnAction,
        color: 'green',
        title: 'Câp nhật',
        action: Update
        // action: BacktoProducts
      }}
    >
      <Card>
        <CardBody>
          <Form >
            <fieldset className='border p-3'  >
              <legend className='float-none w-auto p-3'>{slug === "new" ? "Tạo sản phẩm mới" : "Chỉnh sửa thông tin sản phẩm"}</legend>
              <Form.Group className='me-5 mb-3'  >
                <Form.Label>Tên sản phẩm</Form.Label>
                <Form.Control
                  required
                  type="text"
                  size="lg"
                  name="title"
                  value={title}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên sản phẩm.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-3'  >
                <Form.Label>Giá</Form.Label>
                <Form.Control
                  required
                  type="number"
                  size="lg"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập tên sản phẩm.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Loại sản phẩm</Form.Label>
                <Form.Select
                  size="lg"
                  required
                  // value={address1}
                  // name="address1"
                  // ref={provinceRef}
                  // onChange={onOrderFormChangeProvince}
                  bsPrefix="form-select form-select-lg"
                >
                  <option>Loại sản phẩm</option>
                  {
                    // Province.map((item, index) => {
                    //   return (
                    //     <option key={index} value={item.Name} >{item.Name}</option>
                    //   )
                    // })
                  }
                </Form.Select>
                <Form.Control.Feedback type="invalid">
                  Vui lòng nhập loại sản phẩm.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Hình ảnh 1</Form.Label>
                <Form.Control
                  required
                  type="file"
                  // value={img01}
                  name="img01"
                  onChange={onChange}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn ảnh 1.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Hình ảnh 2</Form.Label>
                <Form.Control
                  required
                  type="file"
                  name="img02"
                  // value={img02}
                  onChange={onChange}
                  size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng chọn ảnh 2.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Màu sắc  <i className='bx bx-trash bx-tad ms-2 fs-5 ' style={{ cursor: 'pointer' }} onClick={() => clearValues("color")} /></Form.Label>
                <div className="product-info-item-list">
                  {
                    colors.map((item, index) => (
                      <div key={index} className={`product-info-item-list-item ${color.includes(item.color) ? 'active' : ""} `}
                        onClick={() => { setActiveColor(item.color) }}
                      >
                        {
                          <div className={`circle bg-${item.color}`}></div>
                        }
                      </div>
                    ))
                  }
                </div>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Kích cỡ <i className='bx bx-trash bx-tad ms-2 fs-5' style={{ cursor: 'pointer' }} onClick={() => clearValues("size")} /></Form.Label>
                <div className="product-info-item-list">
                  {
                    <div className="product-info-item-list">
                      {size.map((item, index) => (
                        <div key={index} className={`product-info-item-list-item ${sizes.includes(item.size) ? 'active' : ''}`}
                          onClick={() => setActiveSize(item.size)}
                        >
                          <div className="product-info-item-list-item-size">
                            {item.size}
                          </div>
                        </div>
                      ))
                      }
                    </div>
                  }
                </div>
              </Form.Group>
              <Form.Group className='me-5 mb-4' >
                <Form.Label>Mô tả</Form.Label>
                <Form.Control

                  as="textarea"
                  row={5}
                  name="description"
                  value={description}
                  onChange={onChange}
                // size="lg"
                />
                <Form.Control.Feedback type="invalid">
                  Vui lòng ghi mô tả.
                </Form.Control.Feedback>
              </Form.Group>
            </fieldset>

          </Form>

        </CardBody>
      </Card>

    </ContentMain >
  )
}


export default ProductViewAdmin