import { useMemo, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  TextField,
  Typography,
} from '@mui/material'
import { orders } from './data/orders'
import { formatCurrency } from './utils/formatters'
import { TableContainer } from './components/TableContainer'
import './App.css'

function App() {
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  const hasInvalidRange = Boolean(fromDate && toDate && fromDate > toDate)

  const filteredOrders = useMemo(() => {
    if (hasInvalidRange) {
      return []
    }

    return orders.filter((order) => {
      const matchesFromDate = !fromDate || order.createdAt >= fromDate
      const matchesToDate = !toDate || order.createdAt <= toDate

      return matchesFromDate && matchesToDate
    })
  }, [fromDate, toDate, hasInvalidRange])

  const totalRevenue = useMemo(() => {
    return filteredOrders.reduce((sum, order) => {
      return order.status === 'Hoàn thành' ? sum + order.amount : sum
    }, 0)
  }, [filteredOrders])

  const completedOrdersCount = useMemo(() => {
    return filteredOrders.reduce((count, order) => {
      return order.status === 'Hoàn thành' ? count + 1 : count
    }, 0)
  }, [filteredOrders])

  const resetFilters = () => {
    setFromDate('')
    setToDate('')
  }

  return (
    <Box className="dashboard-shell">
      <Box className="dashboard-hero">
        <Typography className="dashboard-eyebrow">Báo cáo bán hàng</Typography>
      </Box>

      <Box className="dashboard-grid">
        <Card className="summary-card summary-card--orders" elevation={0}>
          <CardContent>
            <Typography component="h2" className="summary-label">
              Số lượng đơn hàng
            </Typography>
            <Typography className="summary-value">
              {filteredOrders.length}
              <span>đơn</span>
            </Typography>
          </CardContent>
        </Card>

        <Card className="summary-card summary-card--revenue" elevation={0}>
          <CardContent>
            <Typography component="h2" className="summary-label">
              Tổng doanh thu (Hoàn thành)
            </Typography>
            <Typography className="summary-value summary-value--revenue">
              {formatCurrency(totalRevenue)}
            </Typography>
            <Typography className="summary-caption">
              {completedOrdersCount} đơn hoàn thành trong bộ lọc hiện tại.
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Card className="panel-card" elevation={0}>
        <CardContent className="panel-card__content">
          <Box className="panel-heading">
            <Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }}>
                Bộ lọc theo ngày
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 0.75 }}
              >
                Chọn khoảng thời gian để xem nhanh các đơn hàng phù hợp.
              </Typography>
            </Box>
          </Box>

          <Box className="filter-row">
            <TextField
              label="Từ ngày"
              type="date"
              value={fromDate}
              onChange={(event) => setFromDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              helperText=" "
              className="filter-field"
              fullWidth
            />

            <TextField
              label="Đến ngày"
              type="date"
              value={toDate}
              onChange={(event) => setToDate(event.target.value)}
              slotProps={{ inputLabel: { shrink: true } }}
              error={hasInvalidRange}
              helperText={
                hasInvalidRange
                  ? 'Đến ngày phải lớn hơn hoặc bằng từ ngày.'
                  : ' '
              }
              className="filter-field"
              fullWidth
            />

            <Box className="filter-actions">
              <Button
                variant="text"
                onClick={resetFilters}
                className="filter-reset"
              >
                Xóa bộ lọc
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>

      <Card className="panel-card" elevation={0}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ px: { xs: 2.5, md: 3.5 }, pt: { xs: 2.5, md: 3.5 } }}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              Danh sách đơn hàng
            </Typography>
          </Box>

          <Divider sx={{ mt: 2.5 }} />

          <TableContainer orders={filteredOrders} />
        </CardContent>
      </Card>
    </Box>
  )
}

export default App
