import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Category from '../../components/category/Category';
import Hero from '../../components/hero/Hero';
import Product from '../../components/product/Product';
import './Home.scss';
import { axiosClient } from '../../utils/axiosClient';



function Home() {
  const categories = useSelector((state) => state.categoryReducer.categories);
  const [topProducts, setTopProducts] = useState(null);

  async function fetchData() {
    const topProductResponse = await axiosClient.get('/products?filters[isTopPick][$eq]=true&populate=image');
    setTopProducts(topProductResponse.data.data);

    // console.log(categoryResponse);
    // console.log(topProductResponse);
  }
  useEffect(() => {
    fetchData();
  }, [])


  return (
    <div className='Home'>
      <Hero />
      <section className='collection container'>
        <div className='info'>
          <h2 className="heading">Shop By Categories</h2>
          <p className="subheading">
            Shop from the best, our Film and TV Posters Collection.
          </p>

        </div>
        <div className='content'>
          {categories?.map(category => <Category key={category.id} category={category} />)}

        </div>
      </section>
      <section className='collection container'>
        <div className='info'>
          <h2 className="heading">Our Top Picks</h2>
          <p className="subheading">
            All New Designs, Same Old Details.
          </p>

        </div>
        <div className='content'>
          {topProducts?.map(product => <Product key={product.id} product={product} />)}

        </div>
      </section>
    </div>
  )
}

export default Home