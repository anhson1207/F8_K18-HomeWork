import { memo } from 'react'
import { Chip, TableCell, TableRow } from '@mui/material'
import type { Order } from '../types/order'
import { formatCurrency } from '../utils/formatters'

interface OrderRowProps {
  order: Order
}

const statusColorMap = {
  'Hoàn thành': 'success',
  'Đang xử lý': 'warning',
  'Đã hủy': 'error',
} as const

export const OrderRow = memo(function OrderRow({ order }: OrderRowProps) {
  return (
    <TableRow hover>
      <TableCell sx={{ fontWeight: 700 }}>{order.id}</TableCell>
      <TableCell>{order.customerName}</TableCell>
      <TableCell>{order.createdAt}</TableCell>
      <TableCell sx={{ fontWeight: 700 }}>{formatCurrency(order.amount)}</TableCell>
      <TableCell>
        <Chip
          label={order.status}
          color={statusColorMap[order.status]}
          variant="filled"
          sx={{ fontWeight: 700 }}
        />
      </TableCell>
    </TableRow>
  )
})
