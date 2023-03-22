import type * as React from 'react'
import { useEffect } from 'react'
import Order from './Order'
import { fetchOrders } from '../actions/orders'
import { useAppDispatch, useAppSelector } from '../hooks'

function OrderList({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch()
  const orders = useAppSelector((state) => state.orders)

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])

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
