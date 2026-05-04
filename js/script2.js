// Les fonctions
function dire_bonjour() {
  document.write("Bonjour les gars" + "<br/>");
}
dire_bonjour();

function somme(a, b) {
  document.write(a + b + "<br/>");
}
somme(10, 20);

function puissance(a, n) {
  return a ** n;
}
document.write(puissance(5, 2) + "<br/>");

document.write("Script2" + "<br>");

let personne2 = {
  pnom: "Dramou",
  prenom: "Maurice",
  age: 21 + "ans",
};

document.write("Cette personne a  : " + personne2.age);

// Declaration d'une classe
class Personne {
  constructor(nom, prenom, age) {
    this.nom = nom, 
    this.prenom = prenom, 
    this.age = age
  }
  afficher_nom() {
    return this.nom;
  }
  afficher_prenom() {
    return this.prenom;
  }
  afficher_age() {
    return this.age;
  }
}

const p1 = new Personne ("Dramou", "Maurice", 21 + "ans")
const p2 = new Personne ("Diallo", "Algassime", 25 + "ans")
const p3 = new Personne ("Keïta", "Bakary", 22 + "ans")

document.write("<br>" + "Nom : " + p1.afficher_nom() + "<br>")
document.write("Prenom : " + p1.afficher_prenom() + "<br>")
document.write("Age : " + p1.afficher_age() + "<br>")

document.write("<br>" + "Nom : " + p2.afficher_nom() + "<br>")
document.write("Prenom : " + p2.afficher_prenom() + "<br>")
document.write("Age : " + p2.afficher_age() + "<br>")

document.write("<br>" + "Nom : " + p3.afficher_nom() + "<br>")
document.write("Prenom : " + p3.afficher_prenom() + "<br>")
document.write("Age : " + p3.afficher_age() + "<br>")

// Declaration d'une classe
class Universite {
  constructor(nom, quartier, statut ) {
    this.nom = nom, 
    this.quartier = quartier, 
    this.statut = statut
  }
  afficher_nom() {
    return this.nom;
  }
  afficher_quartier() {
    return this.quartier;
  }
  afficher_statut() {
    return this.statut;
  }
}

const u1 = new Universite ("Kofi Anna", "Nongo", "Privée")
const u2 = new Universite ("Gamal", "Dixinn", "Public")
const u3 = new Universite ("UNC", "Nongo", "Privée")


document.write("<br>" + "Nom : " + u1.afficher_nom() + "<br>")
document.write("Quartier : " + u1.afficher_quartier() + "<br>")
document.write("Statut : " + u1.afficher_statut() + "<br>")

document.write("<br>" + "Nom : " + u2.afficher_nom() + "<br>")
document.write("Quartier : " + u2.afficher_quartier() + "<br>")
document.write("Statut : " + u2.afficher_statut() + "<br>")

document.write("<br>" + "Nom : " + u3.afficher_nom() + "<br>")
document.write("Quartier : " + u3.afficher_quartier() + "<br>")
document.write("Statut : " + u3.afficher_statut() + "<br>")

// Notion de DOM 
