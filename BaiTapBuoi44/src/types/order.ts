export type OrderStatus = 'Hoàn thành' | 'Đang xử lý' | 'Đã hủy'

export interface Order {
  id: string
  customerName: string
  createdAt: string
  amount: number
  status: OrderStatus
}
