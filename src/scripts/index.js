// const { resolve } = require("path")

// console.log(getPoke("type/psychic"))
function getPokemon(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
        .then( (response) => response.json())
        .then((body) => (body)).catch( (error) => {
            console.error(error)
            console.log(response)
        })
    
}
function pokeQuery(specifier) {
    console.log(specifier)
    let specifiers = specifier.split(" ")

    return Promise.all(specifiers.map( (t) => {
        let q = t.split(":")
        if(q.length !== 2) {
            return []
        }
        return fetch(`https://pokeapi.co/api/v2/${q[0]}/${q[1]}`)
        .then( (response) => response.json())
        .then((body) => {
            output = []
            switch(q[0]) {
                case 'type':
                    body.pokemon.forEach( (mon) => {
                        // console.log(mon.pokemon.)
                        output.push(mon.pokemon.name)
                    })
                    break;
                case 'move':
                    body.learned_by_pokemon.forEach( (mon) => {
                        output.push(mon.name)
                    })
                    break;
                case 'pokedex':
                    body.pokemon_entries.forEach( (mon) => {
                        output.push(mon.pokemon_species.name)
                    })
                    break;
                case 'evolution-trigger':
                    body.pokemon_species.forEach( (mon) => {
                        output.push(mon.name)
                    })
                    break;
                case 'generation':
                    body.pokemon_species.forEach( (mon) => {
                        output.push(mon.name)
                    })
                    break;
            }
            
            console.log(output)
            return output

        })
    })).then((mons) => {
        let lengths = mons.map( (m) => m.length)
        let ind = lengths.indexOf(Math.max(...lengths))
        let output = []
        for ( poke of mons[ind].values()) {
            let inn = true
            for (others of mons.filter((v,i) => {return i!==ind})) {
                if(!others.includes(poke) ) {
                    inn = false
                    break
                }
            }
            if(inn) {
                output.push(poke)
            }
        }
        return output
    })
}

const button = document.getElementById("button")
const text = document.getElementById("textin")
const results = document.getElementById("results")
button.addEventListener("click", () => {
    results.innerHTML = ""
    pokeQuery(text.value.trim()).then( (names) => {
        names.forEach( (mon, i) => {
            getPokemon(mon)
                .then( (name) => {
                        if(name) {
                            results.innerHTML += `<img name=${i} title="${mon}" src="${name.sprites.other["official-artwork"]["front_default"]}"></img>`

                        }
                        // results.innerHTML += `<img title="${mon}" src="${name.sprites.front_default}"></img>`
                        // results.innerHTML += `<img title="${mon}" src="${name.sprites.other.dream_world.front_default}"></img>`
                        // results.innerHTML += `<img title="${mon}" src="${name.sprites.other.showdown.front_default}"></img>`
                    })
                
        })
    })
    // getTypes(text.value).then( (val) => {
    //     val.pokemon.forEach((mon) => {
    //         getPokemon(mon.pokemon.name)
    //             .then( (name) => {
    //                 console.log(name)
    //                 results.innerHTML += `<img src="${name.sprites.other["official-artwork"]["front_default"]}"></img>`
    //             })

    //     })
    // })
    // getTypes(text.value)
    //     .then( (val) => {
    //         console.log(val)
    //         let temp = ""
    //         val.pokemon.forEach((mon) => {
    //             getPokemon(mon.pokemon.name)
    //                 .then( (name) => {
    //                     console.log(name)
    //                     results.innerHTML += `<img src="${name.sprites.other["official-artwork"]["front_default"]}"></img>`
    //                 })

    //         })
    //         // console.log(temp)
    //         // results.innerHTML = temp
    //         // results.innerHTML = `<img src="${val.sprites.other["official-artwork"]["front_default"]}"></img>`;
    //     })
    // text.value = "" 
})