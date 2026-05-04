const val = document.getElementById('c').textContent
console.log(val)


// Modification du contenu d'un element HTML
// document.getElementById('c').innerHTML = '88'

// Fonction permettant de compter 
function compte () {
    let val1 = document.getElementById('c').textContent
    val1++
    document.getElementById('c').innerHTML = val1
    if (val1 == 5) {
    document.getElementById('o').innerHTML = "C'est le nombre 5"
    } else if (val1 == 10) {
    document.getElementById('o').innerHTML = "C'est le nombre 10" 
    } else if (val1 == 15) {
    document.getElementById('o').innerHTML = "C'est le nombre 15" 
    } else {document.getElementById('o').innerHTML = ''}
}