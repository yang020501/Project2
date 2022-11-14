import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import Card, { CardBody, CardHeader } from '../../components/Card'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
import Searchbar from '../../components/Searchbar'
import { useNavigate } from 'react-router-dom'
const ProductAdmin = () => {
  const navigate = useNavigate()

  return (
    <ContentMain headerTitle='Sản phẩm'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: () => navigate('/admin/product/new')
      }}
    >
      <Card>
        <CardHeader>
          <Searchbar admin placeholder={"Tìm kiếm sản phẩm..."} data={[{
            title: 'Ao am mua dong'
          }]} />
        </CardHeader>
        <CardBody>
          <Grid col={4}
            mdCol={2}
            smCol={1}
            gap={10}
          >
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />
            <ProductCard
              img01="aolenextradaitay-1.png"
              img02="aolenextradaitay-2.png"
              name='Ao len'
              price={200000}
              slug="ao-len--extra-dai-tay"
              sale={0}
              admin />

          </Grid>
        </CardBody>
      </Card>

    </ContentMain>
  )
}

export default ProductAdmin