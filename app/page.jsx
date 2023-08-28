import Feed from '@components/Feed';
import Footer from '@components/Footer';
import Location  from '@components/Location';

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      
        <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="green_gradient text-center" > Unique Powered Tips & Ideas</span>
        </h1>
            <p className="descnew text-center">
            Variation is an open-source unique sharing tips & ideas that could save a life today,
            tomorrow or the nearest future.
            </p>
            <Location />

            <Feed />
            <Footer />
    </section>
  )
}

export default Home