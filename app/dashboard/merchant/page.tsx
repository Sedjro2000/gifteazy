'use client'
import Card from '@/components/merchant/dashboard/Card';
import OrderTable from '@/components/merchant/dashboard/OrderTable';
import InventoryTable from '@/components/merchant/dashboard/InventoryTable';

const orders = [
  { id: 1, client: 'John Doe', amount: '150€', date: '14 Octobre 2024' },
  { id: 2, client: 'Jane Smith', amount: '200€', date: '13 Octobre 2024' },
  { id: 3, client: 'Paul Allen', amount: '300€', date: '12 Octobre 2024' },
];

const inventory = [
  { id: 1, product: 'Télévision 4K', stock: '20 unités' },
  { id: 2, product: 'Ordinateur Portable', stock: '15 unités' },
  { id: 3, product: 'Casque Bluetooth', stock: '30 unités' },
];

export default function Home() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tableau de bord du marchand</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card title="Revenu Total" value="150.45K €" subtitle="Ce mois-ci" />
        <Card title="Nombre de Commandes" value="456" subtitle="Dernier mois" />
        <Card title="Produits les plus vendus" value="30 Articles" subtitle="Meilleures ventes" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Nouvelles Commandes</h2>
          <OrderTable data={orders} />
        </div>

        <div className="p-4 bg-white rounded-md shadow-md">
          <h2 className="text-lg font-semibold">Gestion d&apos; inventaire</h2>
          <InventoryTable data={inventory} />
        </div>
      </div>
    </div>
  );
}
