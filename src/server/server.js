const express = require('express');
const app= express()
const fs = require('fs');
const livres=require('../../public/livre.json')
app.use(express.json())
let cors=require('cors')
app.use(cors())

function persister() {
    const nouveauContenuJson = JSON.stringify(livres, null, 2);
    fs.writeFileSync('../../public/livre.json', nouveauContenuJson, 'utf8');
  }
// la récuparation de la liste des livres 
// on peut récupérer la liste avec la racine ou bien avec /livres => même résultat
app.get("/livres",(req,res)=>{
  res.status(200).json(livres)
});

app.get("/",(req,res)=>{
 res.status(200).json(livres)
});

app.get("/livres/id/:id",(req,res)=>{
    let id = parseInt(req.params.id); 
    if (Number.isInteger(id)) {
      const livre= livres.find(liv=>liv.id===id)
      if(livre)
      res.status(200).json(livre)
      else{
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1>not found</h1>");
      }
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1> veuillez saisir un entier</h1>");
    }
});

app.get("/livres/titre/:titre",(req,res)=>{
    let titre = req.params.titre; 
    const livre= livres.find(liv=>liv.titre===titre)
    if (livre) {
      res.status(200).json(livre)
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>not found</h1>");
    }
});

app.get("/livres/auteur/:auteur",(req,res)=>{
    let auteur = req.params.auteur; 
    const livre= livres.find(liv=>liv.auteur===auteur)
    if (livre) {
      res.status(200).json(livre)
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>not found</h1>");
    }
});

app.get("/livres/total",(req,res)=>{
    res.end("total est "+livres.length);
});

app.post('/ajouterLivre/',(req,res)=>{
    let maxId = 0;
    livres.forEach((livre) => {
      if (livre.id > maxId) {
      maxId = livre.id;
      }
     });
     req.body.id=maxId+1
    livres.push(req.body)
    persister()
    res.status(200).json(livres)
});
  
app.put('/livres/:id',(req,res)=>{
    const id =parseInt(req.params.id)
    if (Number.isInteger(id)) {
        let livre=livres.find(liv=>liv.id===id)
        if(livre){
         livre.auteur=req.body.auteur,
         livre.description=req.body.description,
         livre.prix=req.body.prix,
         livre.titre=req.body.titre,      
         res.status(200).json(livre) 
         persister()
        }
        else{
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>not found</h1>");
        }
      } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1> veuillez saisir un entier</h1>");
      }
});
app.delete('/livres/:id',(req,res)=>{
    const id =parseInt(req.params.id)
    if (Number.isInteger(id)) {
        let livre=livres.find(liv=>liv.id===id)
        if(livre){
         livres.splice(livres.indexOf(livre),1)
         persister();
         res.status(200).json(livres)
        }
        else{
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end("<h1>not found</h1>");
         }
    } else {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h1> veuillez saisir un entier</h1>");
    }   
}); 

app.listen(3001,()=>{
    console.log("Serveur à l'écoute")
})