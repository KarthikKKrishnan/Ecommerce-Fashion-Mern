import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "./style/home.css";

function Women() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/get-products');
        const fetchedProducts = response.data?.data?.products || [];
        setProducts(fetchedProducts);
        setLoading(false);
        console.log("products", fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Error fetching products.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.includes(productId);
  };

  const handleWishlistToggle = (productId) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(productId)) {
        // Product is in the wishlist, remove it
        return prevWishlist.filter((id) => id !== productId);
      } else {
        // Product is not in the wishlist, add it
        return [...prevWishlist, productId];
      }
    });
  };

  // Manually added products
  const manuallyAddedProducts = [
    { id: 1, title: 'Women Relaxed Fit Casual Shirt',price: 10, thumbnail: './public/products/femodel1.png'},
    { id: 2, title: 'Women Floral Peplum Top',price: 10, thumbnail: './public/products/femodel2.png' },
    { id: 3, title: 'Women Stylish Red Floral Gown',price: 10, thumbnail: './public/products/femodel3.png' },
    { id: 4, title: 'Women Spread Collar Shirt Green',price: 10, thumbnail: './public/products/femodel4.png' },
    
    // Add more products as needed
  ];

  // Merge manually added products with fetched products
  const allProducts = [...manuallyAddedProducts, ...products];

  return (
    <div className='container-fluid'>
      <div className="row list-row">
        {allProducts?.map((product, index) => (
          <div key={index} className="col-lg-3 col-md-6 col-sm-12 list-col">
            <div className="product-list">
              <div className="product-upper">
                <img className='product-image' src={product.thumbnail} alt={product.title} />

                <button type="button" className={`wishlist-btn ${isProductInWishlist(product.id) ? 'active' : ''}`} onClick={() => handleWishlistToggle(product.id)}>
                  <i className={`bi bi-heart${isProductInWishlist(product.id) ? '-fill' : ''}`}></i>
                </button>
              </div>
              <div className="product-down">
                <h3 className='product-title'>{product.title}</h3>
                <p>Price: ${product.price} | <i className="bi bi-star-half">4.0</i> </p>

                <Link to={`/product/${product.id}`} className="buy btn btn-success">Buy</Link>
                <button type="button" className="btn btn-success">+</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Women;
