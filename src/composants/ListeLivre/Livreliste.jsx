import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Livreliste.css';
import Navbar from '../Navbar/Navbar';
import { Link } from 'react-router-dom';

const LivreListe = () => {
  const [livres, setLivres] = useState([]);
  const [recherche, setRecherche] = useState('');
  const [critere, setCritere] = useState('id');
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(6);

  useEffect(() => {
    axios.get('http://localhost:3001/livres')
      .then(response => {
        setLivres(response.data);
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des livres:', error);
      });
  }, []);

  const rechercherLivres = () => {
    if (recherche.trim() === '') {
      axios.get('http://localhost:3001/livres')
        .then(response => {
          setLivres(response.data);
          setMessage('');
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la récupération des livres:', error);
        });
    } else {
      let url = '';

      if (critere === 'id') {
        url = `http://localhost:3001/livres/id/${recherche}`;
      } else if (critere === 'titre') {
        url = `http://localhost:3001/livres/titre/${recherche}`;
      } else if (critere === 'auteur') {
        url = `http://localhost:3001/livres/auteur/${recherche}`;
      }

      axios.get(url)
        .then(response => {
          if (response.data) {
            setLivres([response.data]);
            setMessage('');
          } else {
            setLivres([]);
            setMessage('Aucun résultat trouvé');
          }
        })
        .catch(error => {
          console.error('Une erreur s\'est produite lors de la recherche des livres:', error);
        });
    }
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/livres/${id}`)
    .then(response => {
      if (response.status === 200) {
        const updatedLivres = livres.filter(livre => livre.id !== id);
        setLivres(updatedLivres);
      } else {
        console.error('Une erreur s\'est produite lors de la suppression du livre.');
      }
    })
    .catch(error => {
      console.error('Une erreur s\'est produite lors de la suppression du livre:', error);
    });
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = livres.slice(indexOfFirstBook, indexOfLastBook);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <div className='top'></div>
      <Navbar></Navbar>
      <div className="recherche">
        <input
          type="text"
          placeholder="Rechercher..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />

        <select value={critere} onChange={(e) => setCritere(e.target.value)}>
          <option value="id">ID</option>
          <option value="auteur">Auteur</option>
          <option value="titre">Titre</option>
        </select>

        <button onClick={rechercherLivres}>Rechercher</button>
      </div>

      {message && <p>{message}</p>}

      <div className="livre-liste">
        {currentBooks.map(livre => (
          <div key={livre.id} className="livre-carte">
            <div className="livre-details">
              <h3>{livre.titre}</h3>
              <p><strong>Auteur :</strong> {livre.auteur}</p>
              <p><strong>Prix :</strong> {livre.prix} €</p>
              <p>{livre.description}</p>
              <div className="boutons-actions">
              <Link to={`/modifierLivre/${livre.id}`} >  <button className="modifier-btn">Modifier</button> </Link>
              <button className="supprimer-btn" onClick={() => handleDelete(livre.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        {livres.length > booksPerPage && (
        <div className="pagination-buttons">
        {Array.from({ length: Math.ceil(livres.length / booksPerPage) }).map((_, index) => (
        <button
          key={index}
          onClick={() => paginate(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
          ))}
        </div>
        )}
        </div>
    </div>
  );
};

export default LivreListe;