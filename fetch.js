
    
    //fetch using search by name
     fetch(`https://rawg.io/api/games?key=c1be38abe1e74ea3a7b554f19b8a9df6&search=${urlEncodedSearchString}`)
    .then((response) =>{
        return response.json()
    })
    .then(data => {
        console.log(data)
        
        for (let index = 0; index < data.value.length; index++) {
        
        let gameCard = {
           name: data.results.name,
        //    id: data.results.id,
        //    rating:data.results.rating,
        //    released: data.results.released
        }
        console.log(gameCard)
        }
    })

console.log(search)

// search.addEventListener('click', gameSearch)
