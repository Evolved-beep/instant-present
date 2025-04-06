import React from 'react'
import { Metadata } from 'next';
import { getMyOrders } from '@/lib/actions/order.actions';
import { formatCurrency, formatDateTime, formatId } from '@/lib/utils';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from '@/components/shared/pagination';
import DeleteDialog from '@/components/shared/delete-dialog';


export const metadata: Metadata = {
    title: 'Mes commandes',
  };
  
  const OrdersPage = async (props: {
    searchParams: Promise<{ page: string }>;
  }) => {
    const { page } = await props.searchParams;
  
    const orders = await getMyOrders({
      page: Number(page) || 1,
    });
  
    return (
      <div className='space-y-2'>
        <h2 className='h2-bold'>Mes commandes</h2>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>NUMERO DE COMMANDE</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>TOTAL</TableHead>
                <TableHead>PAIEMENT</TableHead>
                <TableHead>LIVRAISON</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{formatId(order.id)}</TableCell>
                  <TableCell>
                    {formatDateTime(order.createdAt).dateTime}
                  </TableCell>
                  <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                  <TableCell>
                    {order.isPaid && order.paidAt
                      ? formatDateTime(order.paidAt).dateTime
                      : 'En attente de paiment'}
                  </TableCell>
                  <TableCell>
                    {order.isDelivered && order.deliveredAt
                      ? formatDateTime(order.deliveredAt).dateTime
                      : 'Non livré'}
                  </TableCell>
                  <TableCell>
                    <Link href={`/order/${order.id}`}>
                      <span className='px-2'>Details</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {orders.totalPages > 1 && (
            <Pagination 
                page={Number(page) || 1}
                totalPages={orders?.totalPages} />
          )}
        </div>
      </div>
    );
  };

export default OrdersPage