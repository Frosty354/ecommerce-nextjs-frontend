
const generateProducts = (numProducts: number) => {
    const products = [];
  
    for (let i = 1; i <= numProducts; i++) {
      const product = {
        id: i,
        productname: `Product ${i}`,
        image: `/product${i}.jpg`,
        price: parseFloat((Math.random() * 100).toFixed(2)), // Random price between 0.00 and 100.00
      };
  
      products.push(product);
    }
  
    return products;
  };
  
  const products = generateProducts(50); // Generate 50 product items
  
  
  
  
  
  

export default products
  