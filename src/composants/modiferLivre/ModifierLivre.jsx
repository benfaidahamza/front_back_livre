import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const ModifierLivre = () => {
  const { id } = useParams();

  const [livre, setLivre] = useState({
    auteur: '',
    description: '',
    prix: 0,
    titre: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:3001/livres/id/${id}`)
      .then(response => {
        setLivre(response.data);
        console.log(livre)
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération du livre:', error);
      });
  }, [id]);

  const handleInputChange = (e) => {
    setLivre({ ...livre, [e.target.name]: e.target.value });
  };

  const handleEnregistrer = () => {
    axios.put(`http://localhost:3001/livres/${id}`, livre)
      .then(response => {
        console.log('Le livre a été modifié avec succès:', response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la modification du livre:', error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="top"></div>
      <h2>Modifier Livre</h2>
      <form>
        <div>
          <label>Auteur:</label>
          <input type="text" name="auteur" defaultValue={livre.auteur} onChange={handleInputChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea name="description" defaultValue={livre.description} onChange={handleInputChange}></textarea>
        </div>
        <div>
          <label>Prix:</label>
          <input type="number" name="prix" defaultValue={livre.prix} onChange={handleInputChange} />
        </div>
        <div>
          <label>Titre:</label>
          <input type="text" name="titre" defaultValue={livre.titre} onChange={handleInputChange} />
        </div>
      </form>
      <div>
        <button onClick={handleEnregistrer}>Enregistrer</button>
        <button>Annuler</button>
      </div>
    </div>
  );
};

export default ModifierLivre;
