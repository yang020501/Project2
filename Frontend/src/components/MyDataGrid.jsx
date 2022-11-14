import React from 'react'
import PropTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid';
import DataGridOptions from './DataGridOptions';

const MyDataGrid = props => {
    const columns = props.ColumnHeader ?
        props.ColumnHeader.map((item) => {
            return {
                field: item.key,
                headerName: item.value,
                width: item.width,
                headerAlign: 'center',
                align: 'center',
                renderCell: (params) => {
                    if (params.field === "option")
                        return (<DataGridOptions />)

                }

            }
        }
        ) : []
    const rows = props.Data ? props.Data.map((item, index) => {
        let keys = Object.keys(item)
        let values = Object.values(item)
        let row = {}
        for (let i = 0; i < keys.length; i++) {
            row = {
                ...row,
                [keys[i]]: values[i]
            }
        }
        return {
            ...row
        }
    }) : []
    const handlechange = (items) => {
        let tmp = rows.filter((row) => { return row.id == items })[0]
        tmp.option(items)
    }
    return (
        <DataGrid
            density='comfortable'
            rows={rows}
            columns={columns}
            // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            // rowsPerPageOptions={[5, 10, 15]}
            // disableSelectionOnClick
            onSelectionModelChange={item => handlechange(item)}
            experimentalFeatures={{ newEditingApi: true }}
        />
    )
}

MyDataGrid.propTypes = {
    ColumnHeader: PropTypes.array,
    Data: PropTypes.array
}

export default MyDataGrid