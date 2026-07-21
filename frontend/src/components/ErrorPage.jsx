import Header from './Header';
import Footer from './Footer';

function ErrorPage() {
  return (
    <div className='page'>
        <Header />
        <h1>Error 404 - the URL you were trying to reach does not exist</h1>
        <Footer />
    </div>
  )
};

export default ErrorPage;