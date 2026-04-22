import { memo } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer as MuiTableContainer,
  Typography,
} from '@mui/material'
import type { Order } from '../types/order'
import { OrderRow } from './OrderRow'

interface TableContainerProps {
  orders: Order[]
}

export const TableContainer = memo(function TableContainer({
  orders,
}: TableContainerProps) {
  return (
    <MuiTableContainer component={Paper} elevation={0}>
      <Table sx={{ minWidth: 720 }}>
        <TableHead>
          <TableRow>
            <TableCell>Mã ĐH</TableCell>
            <TableCell>Khách hàng</TableCell>
            <TableCell>Ngày tạo</TableCell>
            <TableCell>Giá trị</TableCell>
            <TableCell>Trạng thái</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {orders.length > 0 ? (
            orders.map((order) => <OrderRow key={order.id} order={order} />)
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                <Typography color="text.secondary">
                  Không có đơn hàng nào phù hợp với bộ lọc hiện tại.
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </MuiTableContainer>
  )
})
