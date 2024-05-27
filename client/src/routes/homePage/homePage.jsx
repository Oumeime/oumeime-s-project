import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='homePage'>
      <div className='textContainer'>
        <div className='wrapper'>
        <h1 className="title">Bienvenue Sur Notre Plateforme Immobilière</h1>
          <p>
          Salut {currentUser ? currentUser.username : "Nos invités"},Bienvenue sur notre site. Trouvez la maison de vos rêves avec nous.
          </p>
          <SearchBar />
          <div className='boxes'>
            <div className='box'>
              <h1>45%</h1>
              <h2> différents logements sont adaptés à la location ou à la vente</h2>
            </div>
            <div className='box'>
              <h1>50%</h1>
              <h2>bénéfice client dès la première version du site</h2>
            </div>
            <div className='box'>
              <h1>99%</h1>
              <h2> des clients bénéficieront prochainement de la version améliorée du site</h2>
            </div>
          </div>
        </div>
      </div>
      <div className='imgContainer'>
        <img src='/bg.png' alt='' />
      </div>
    </div>
  );
}

export default HomePage;
