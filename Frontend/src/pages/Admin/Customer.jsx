import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'

import MyDataGrid from '../../components/MyDataGrid'
const Customer = () => {
  return (
    <ContentMain headerTitle='Khách hàng'>
       <div style={{ width: "100%", columnGap: 10, height: "560px" }}>
        {/* <MyDataGrid ColumnHeader={columns} Data={rows} /> */}
      </div>

    </ContentMain >
  )
}

export default Customer