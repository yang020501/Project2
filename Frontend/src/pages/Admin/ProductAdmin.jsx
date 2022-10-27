import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import btnAction from '../../utils/btnAction'
import { Pagination } from 'react-bootstrap'
import Card, { CardBody, CardHeader } from '../../components/Card'
import Grid from '../../components/Grid'
import ProductCard from '../../components/ProductCard'
const ProductAdmin = () => {
  const create = () => {
    console.log("Hello");
  }

  return (
    <ContentMain headerTitle='Sản phẩm'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: create
      }}
    >
      <Card>
        <CardHeader>
          Search bar and Dropdown
        </CardHeader>
        <CardBody>
          <Grid col={4}
            mdCol={2}
            smCol={1}
            gap={10}
          >
            {/* <ProductCard>

            </ProductCard> */}
          </Grid>
        </CardBody>
      </Card>

    </ContentMain>
  )
}

export default ProductAdmin