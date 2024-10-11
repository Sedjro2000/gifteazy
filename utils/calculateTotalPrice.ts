export const calculateTotalPrice = (items: any[]) => {
    return items.reduce((acc, item) => {
      if (item.product && item.product.price) {
        return acc + item.quantity * parseFloat(item.product.price);
      }
      return acc;
    }, 0).toFixed(2);
  };
  