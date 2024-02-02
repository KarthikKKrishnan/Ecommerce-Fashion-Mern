import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; 
import "./style/home.css";

function Home() {
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
    { id: 1, title: 'Sneakers For Men High Tops',price: 10, thumbnail: './public/products/maleshoe1.png'},
    { id: 2, title: 'Slim Fit Single-Breasted Blazer',price: 10, thumbnail: './public/products/malemodel1.png' },
    { id: 3, title: 'Men Blue Washed Denim Jacket',price: 10, thumbnail: './public/products/malemodel2.png' },
    { id: 4, title: 'Prada Structured Handheld Bag',price: 10, thumbnail: './public/products/febag1.png' },
    
    // Add more products as needed
  ];

  const manuallyAddedProducts1 = [
    { id: 1, title: 'Women Relaxed Fit Casual Shirt',price: 10, thumbnail: './public/products/femodel1.png'},
    { id: 2, title: 'Women Floral Peplum Top',price: 10, thumbnail: './public/products/femodel2.png' },
    { id: 3, title: 'Printed Resort Shirt',price: 10, thumbnail: './public/products/malemodel4.png' },
    { id: 4, title: 'Women Stylish Red Floral Gown',price: 10, thumbnail: './public/products/femodel3.png' },
    
    // Add more products as needed
  ];

  // Merge manually added products with fetched products
  // const allProducts = [...manuallyAddedProducts, ...manuallyAddedProducts1, ...products];

  return (
    <div className='container-fluid'>
      <div className='header'>
        <div className='banner'>
          <img src="./products/model1.png" alt="model" />
        </div> 
        <div className="header-text">
          <h1>Discover and find Your own fashion</h1><br/>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Totam molestias minima, obcaecati nam accusamus provident 
            voluptates dignissimos ducimus temporibus. Eos nulla debitis
             animi laboriosam saepe rem ratione amet molestiae at.</p>
             <div className='bannerbtn'>
              <button className="btn btn-outline-success">Explore</button>
             </div>
        </div>
      </div>

      <div className='brand'>
        <h2>GLAM VOUGE</h2>
      </div>

      <div className="searchbar">
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
          <button className="btn btn-outline-success" type="submit">Search</button>
        </form>
      </div>

      <div className='productlihead'>
        <h2>Best Selling</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti modi veniam sunt, fuga, deserunt ipsam, veritatis magnam magni doloribus voluptatibus consequuntur ipsa fugiat consequatur corporis aliquam temporibus quas laborum facilis!</p>
      </div>

      <div className="row list-row">
        {manuallyAddedProducts?.map((product, index) => (
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

      <div className='seeall'>
          <button type="button" class="btn btn-outline-success">See All <i class="bi bi-arrow-right"></i> </button>
      </div>

      <div className='discountbanner'>
        <img src="./public/discountbanner1.jpg" alt="banner" />
      </div>

      <div className='productlihead'>
        <h2>Designer Clothes For You</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum et possimus veniam aut facere quae reprehenderit veritatis sapiente, commodi dolores animi voluptas repellendus ducimus temporibus dignissimos explicabo dolore culpa magnam?</p>
      </div>

      {/* New row added after the discount banner for manually added products */}
      <div className="row list-row">
        {manuallyAddedProducts1.map((product, index) => (
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

                <Link to={`/product/${product.id}`} className='product-view'>Buy</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
