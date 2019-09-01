import React from "react";
import { Footer } from '../components/footer';

const Home: React.FC = () => {
  return (
    <div className='page'>Home
    <section className='footer'><Footer/></section>
    </div>
  );

} 

export default Home;



    // <div className="home bg">
    //   <div className="home-grid">
        
    //     <header className="left-logo">
    //         <Link to={{pathname: '/state'}}>Global: {txt.language}</Link>
    //         <p>{txt.language}</p>
    //         <button onClick={() => setGlobal({...global, language: 'en'})}>English</button>
    //         <button onClick={() => setGlobal({...global, language: 'cn'})}>Chinese</button>
    //     </header>
    //     <section>
      
    //     </section>
    //     <footer className="home-footer">
    //       © 2019 Agenix LLC.
    //     </footer>

    //   </div>
    // </div>