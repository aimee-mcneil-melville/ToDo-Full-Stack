import type { ReactNode } from 'react'
import Order from './Order'
import { FormattedOrder } from '../../models/Order'

interface Props {
  children: ReactNode
}

function OrderList({ children }: Props) {
  const orders = [] as FormattedOrder[]
  return (
    <div className="orderlist">
      {children} {/* Holds the WaitIndicator */}
      {orders?.map((order) => {
        return <Order key={order.id} order={order} />
      })}
    </div>
  )
}

export default OrderList
