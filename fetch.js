let title = document.getElementsByClassName("card-title")

let body1 = document.getElementsByClassName("card-text")
let url1 = document.getElementsByClassName("btn btn-lg btn-block btn-primary mt-auto")
let img = document.getElementsByClassName("card-img-top")
// let title2 = document.getElementsByClassName("card-title1")
// let body2 = document.getElementsByClassName("card-text1")
// let url2 = document.getElementsByClassName("btn btn-lg btn-block btn-primary mt-auto")
// let city = document.getElementById('city')
// let search = document.getElementById("search")

function gameSearch(e) {
   
    e.preventDefault()
let gameSearch = document.querySelector(".search-button").value
const urlEncodedSearchString = encodeURIComponent(gameSearch);

    //document.getElementById('loader').innerHTML = `<div class="d-flex justify-content-center"><div class="lds-circle"><div></div></div></div>`
    
    //fetch using search by name
     fetch(`https://rawg.io/api/games?key=c1be38abe1e74ea3a7b554f19b8a9df6&search=${urlEncodedSearchString}`)
    .then((response) =>{
        return response.json()
    })
    .then(data => {
        console.log(data)
        
        for (let index = 0; index < data.value.length; index++) {
            title[index].innerHTML= data.value[index].results.map.name
            body1[index].innerHTML= data.value[index].snippet
            url1[index].setAttribute("href", data.value[index].url)
            img[index].setAttribute("src", data.value[index].image.url)
        }
    })
}
console.log(search)

search.addEventListener('click', gameSearch)
