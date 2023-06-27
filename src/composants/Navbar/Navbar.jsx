import logo from '../../assets/pile-de-livres.png';
import './Navbar.css'
import { Link } from 'react-router-dom';

function NavbarApp() {
  return (
    <>
    <nav class="navbar navbar-expand-lg  fixed-top navbar-light bg-primary">
        <div class="container-fluid">
            <Link  class="navbar-brand" to="/">
                <img src={logo} alt="" width="20" height="20" class="d-inline-block align-text-top"/>
                <span class="stylish-text">My BOOk</span>
            </Link>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
        <li class="nav-item">
        <Link class="nav-link stylish" to="/ListeLivres">Liste des livres</Link>
        </li>
        <li class="nav-item">
        <Link class="nav-link stylish" to="/AjouterLivre">Ajouter un livre</Link>
        </li>
       </ul>
      </div>     
    </div>
    </nav>
    </>
  );
}
export default NavbarApp;