import React from 'react'
import ContentMain from '../../components/Admin/ContentMain'
import Card, { CardBody, CardHeader } from '../../components/Card'
import btnAction from '../../utils/btnAction'
const Staff = () => {
  const create = () => {
    console.log("Hello");
  }
  return (
    <ContentMain headerTitle='Nhân viên'
      headerRightAction={{
        ...btnAction,
        title: 'Tạo mới',
        action: create
      }}
    >
      <Card>
        <CardHeader>

        </CardHeader>
        <CardBody>
        </CardBody>
      </Card>

    </ContentMain >
  )
}

export default Staff