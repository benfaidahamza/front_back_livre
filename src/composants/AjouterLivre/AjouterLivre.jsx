import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import './AjouterLivre.css';
import { useNavigate } from 'react-router-dom';

const AjouterLivre = () => {

  const navigate = useNavigate();
  const [livre, setLivre] = useState({
    auteur: '',
    description: '',
    prix: null,
    titre: '',
  });

  const handleInputChange = (e) => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleEnregistrer = () => {
    axios.post('http://localhost:3001/ajouterLivre', livre)
      .then(response => {
        console.log('Le livre a été ajouté avec succès:', response.data);
        navigate('/ListeLivres');
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de l\'ajout du livre:', error);
      });
  };

  return (
    <div>
        <Navbar/>
        <div className='top'></div>
      <h2>Ajouter Livre</h2>
      <form>
        <div>
          <label>Auteur:</label>
          <input type="text" name="auteur" value={livre.auteur} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" value={livre.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" name="prix" value={livre.prix} onChange={handleInputChange} />
        </div>
        <div>
          <label>Titre:</label>
          <input type="text" name="titre" value={livre.titre} onChange={handleInputChange} />
        </div>
      </form>
      <div>
        <button onClick={handleEnregistrer}>Enregistrer</button>
      </div>
    </div>
  );
};

export default AjouterLivre;