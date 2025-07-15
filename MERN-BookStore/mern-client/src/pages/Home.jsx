import Banner from '../components/Banner'
import BestSellerBooks from '../components/BestSellerBooks'
import FavBook from '../components/FavBook'
import OtherBooks from '../components/OtherBooks'
import PromoBanner from '../components/PromoBanner'
import Review from '../components/Review'

const Home = () => {
  return (
  <>
    <Banner/>
    <BestSellerBooks/>
    <FavBook/>
    <PromoBanner/>
    <OtherBooks/>
    <Review/>
  </>
  )
}

export default Home
