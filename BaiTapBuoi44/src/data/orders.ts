import type { Order, OrderStatus } from '../types/order'

const customers = [
  'Nguyen Van An',
  'Tran Thi Binh',
  'Le Hoang Chau',
  'Pham Gia Duy',
  'Vo Minh Duc',
  'Dang Thuy Giang',
  'Bui Khanh Ha',
  'Do Quoc Huy',
  'Hoang Lan Anh',
  'Ngo Minh Khoa',
  'Ta Bao Lam',
  'Phan Nhat Mai',
]

const statuses: OrderStatus[] = ['Hoàn thành', 'Đang xử lý', 'Đã hủy']

const padNumber = (value: number, size: number) => {
  return value.toString().padStart(size, '0')
}

const buildDate = (index: number) => {
  const year = 2025 + Math.floor(index / 360)
  const month = Math.floor((index % 360) / 30) + 1
  const day = (index % 28) + 1

  return `${year}-${padNumber(month, 2)}-${padNumber(day, 2)}`
}

export const orders: Order[] = Array.from({ length: 720 }, (_, index) => {
  const customerName = customers[index % customers.length]
  const status = statuses[index % statuses.length]
  const amount = 350_000 + ((index * 145_000) % 5_800_000)

  return {
    id: `ORD-${padNumber(index + 1, 4)}`,
    customerName,
    createdAt: buildDate(index),
    amount,
    status,
  }
})
