import type * as React from 'react'
import { OrderWithProducts } from '../../common/interfaces'
import Order from './Order'

interface Props {
  children: React.ReactNode
}

function OrderList({ children }: Props) {
  const orders: OrderWithProducts[] = []

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
