 document.write('<br/>' + "Bonjour Tout Le Monde !")

 // Variable
 let nombre1 = 10
 const Pi = 3.14

 // Tableau
 const capitale = ["Conakry", "Paris", "Dakar"]
 const valeur = [1, 2, 3, 4, 5]

 // Objet 
 const personne = {
    nom : 'Dramou',
    prenom : 'Maurice',
    age : 21 + 'ans'
 }

 // Affichage avec la console log
 console.log(nombre1)
 console.log(Pi)
 console.log(capitale[0])
 console.log(capitale[1])
 console.log(capitale[2])
 console.log(personne.nom)
 console.log(personne.prenom)
 console.log(personne.age)

 // Afifchage dans le JavaScript "Navigateur"
 document.write('<br/>' + nombre1) 
 document.write('<br/>' + Pi + '<br/>')

 document.write('<br/>' + capitale[0])
 document.write('<br/>' + capitale[1])
 document.write('<br/>' + capitale[2] + '<br/>')

 document.write('<br/>' + personne.nom)
 document.write('<br/>' + personne.prenom)
 document.write('<br/>' + personne.age + '<br/>')

 // Les conditions 
 if (personne.nom == 'Dramou') {
    document.write('<br/>' + "Bienvenue M. Dramou")
 } else if (personne.prenom == 'Maurice'){
    document.write('<br/>' + "Bienvenue M. Maurice" + '<br/>')
} else {
    document.write('<br/>' + "Desole, vous n'etes pas M. Dramou" + '<br/>')
 }

 // Les boucles 
 for(let i = 0; i < 10; i++) {
    document.write('<br>' + i)
 }