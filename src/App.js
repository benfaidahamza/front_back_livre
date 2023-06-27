import './App.css';
import {Route,Routes} from "react-router-dom";
import LivreListe from './composants/ListeLivre/Livreliste';
import ModifierLivre from './composants/modiferLivre/ModifierLivre';
import AjouterLivre from './composants/AjouterLivre/AjouterLivre';

function App() {
  return(
      <div>
        <Routes>
          <Route path="/"  element={<LivreListe/>}/>
          <Route path="/ListeLivres"  element={<LivreListe/>}/>
          <Route path="/AjouterLivre"  element={<AjouterLivre/>}/>
          <Route path="/modifierLivre/:id" element={<ModifierLivre/>} />
        </Routes>
        </div>
  )
}

export default App;
