import React from 'react';

interface Inventory {
  id: number;
  product: string;
  stock: string;
}

interface InventoryTableProps {
  data: Inventory[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ data }) => {
  return (
    <table className="min-w-full bg-white rounded-md">
      <thead>
        <tr>
          <th className="py-2">Produit</th>
          <th className="py-2">Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td className="py-2">{item.product}</td>
            <td className="py-2">{item.stock}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
