import Layout from '../components/Layout'
import data from '../utils/data'
import ProductItem from '../components/ProductItem'

export default function Home() {
  const { products } = data;
 
  
  return (
    <Layout title="Home Page">
      <div className="grid grid-cols gap-4 md:grid-cols-3 lg:grid-cols-4">
        { products.map((product, index)=> (
          <ProductItem 
            key={ index }
            product = { product }
          />
        )) }
      </div>
    </Layout>
  )
}
