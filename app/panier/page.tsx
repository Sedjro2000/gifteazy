// pages/cart.tsx
const CartPage = () => {
    {/*useEffect(() => {
    const loadCart = async () => {
      if (session) {
        console.log('Session active, loading cart...'); 
        try {
          const response = await fetch('/api/cart');
          const data = await response.json();
          console.log('Cart items loaded from API:', data.items); 
          setCartItems(data.items || []);
        } catch (error) {
          console.error('Error loading cart:', error);
        }
      } else {
        console.log('No session, skipping cart load');
      }
    };
    loadCart();
  }, [session]);
  useEffect(() => {
    console.log('Cart items state updated:', cartItems);
  }, [cartItems]);*/}

    return (
      <div className="container mx-auto p-6 border border-red-600">
        <h1 className="text-3xl font-bold mb-4">Votre Panier</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Section du panier */}
          <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center">
                <img src="/placeholder-image.jpg" alt="Produit" className="w-24 h-24 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Nom du produit</h3>
                  <p>€20.00</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mr-4">Quantité: 1</p>
                <button className="text-red-500 hover:text-red-700">Retirer</button>
              </div>
            </div>
  
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <div className="flex items-center">
                <img src="/placeholder-image.jpg" alt="Produit" className="w-24 h-24 object-cover rounded" />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold">Nom du produit</h3>
                  <p>€40.00</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="mr-4">Quantité: 1</p>
                <button className="text-red-500 hover:text-red-700">Retirer</button>
              </div>
            </div>
            
            <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-md">
              Vider le panier
            </button>
          </div>
  
          {/* Résumé de la commande */}
          <div className="bg-gray-100 p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Résumé de la commande</h2>
            <div className="border-b pb-4 mb-4">
              <p>Sous-total : €60.00</p>
              <p>Frais de livraison : Gratuits</p>
              <p>Total : <span className="font-bold">€60.00</span></p>
            </div>
  
            <label htmlFor="deliveryDate" className="block mb-2">Date de livraison :</label>
            <input
              type="date"
              id="deliveryDate"
              className="w-full p-2 mb-4 border rounded-md"
            />
  
            <div className="mb-4">
              <input type="checkbox" id="giftWrap" />
              <label htmlFor="giftWrap" className="ml-2">Ajouter un emballage cadeau (+5€)</label>
            </div>
  
            <label htmlFor="promoCode" className="block mb-2">Code promo :</label>
            <input
              type="text"
              id="promoCode"
              className="w-full p-2 border rounded-md"
            />
  
            <button className="w-full bg-green-500 text-white mt-4 py-2 rounded-md">
              Procéder au paiement
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartPage;
  