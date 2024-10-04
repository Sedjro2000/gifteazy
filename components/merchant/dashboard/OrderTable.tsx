import React from 'react';

interface Order {
  id: number;
  client: string;
  amount: string;
  date: string;
}

interface OrderTableProps {
  data: Order[];
}

const OrderTable: React.FC<OrderTableProps> = ({ data }) => {
  return (
    <table className="min-w-full bg-white rounded-md">
      <thead>
        <tr>
          <th className="py-2">Client</th>
          <th className="py-2">Montant</th>
          <th className="py-2">Date</th>
        </tr>
      </thead>
      <tbody>
        {data.map((order) => (
          <tr key={order.id}>
            <td className="py-2">{order.client}</td>
            <td className="py-2">{order.amount}</td>
            <td className="py-2">{order.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
