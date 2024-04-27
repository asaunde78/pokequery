// const { resolve } = require("path")

// console.log(getPoke("type/psychic"))
function getPokemon(name) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
    .then( (response) => response.json())
    .then((body) => (body))
    
}
function pokeQuery(base,specifier,identifier) {
    console.log(specifier)
    let specifiers = specifier.split(" ")

    return Promise.all(specifiers.map( (t) => {
        return fetch(`https://pokeapi.co/api/v2/${base}/${t}`)
        .then( (response) => response.json())
        .then((body) => {
            output = []
            
            body[identifier].forEach( (mon) => {
                output.push(mon.pokemon.name)
            })
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
    pokeQuery("type",text.value,"pokemon").then( (names) => {
        names.forEach( (mon) => {
            getPokemon(mon)
                .then( (name) => {
                        results.innerHTML += `<img src="${name.sprites.other["official-artwork"]["front_default"]}"></img>`
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