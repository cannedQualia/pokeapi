// ==========================
// BIO PAGE
// ==========================
const getPokemonById = async (id) => {
    // AJAX
    url = 'https://pokeapi.co/api/v2/pokemon/'

    const api_call = await fetch(`${url}${id}`)
        .then( (res) => {
            if (res.status >= 400 && res.status < 600) handleError(res)
            return res
        })
    const pokemon = await api_call.json()

    return pokemon
}

const getBioCard = (pokemon) => {
    const pic = (pokemon.sprites.front_default != null) ? pokemon.sprites.front_default : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'
    const pokeTypes = pokemon.types
    const pokeAbilities = pokemon.abilities
    const pokeMoves = pokemon.moves
    const typeURL = `index.html?page=type`

    let name = htmlTypes = htmlAbilities = htmlMoves = ``

    console.log(pokemon)
    
    // Types    
    for(pokeType of pokeTypes) {
        name = pokeType.type.name
        htmlTypes +=    `<a href="${typeURL}&typeName=${name}" class="btn btn-success">
                            ${uppFirst(name)} <i class="fa fa-arrow-right"></i>
                        </a> `
    }

    // Abilities
    for(pokeAbility of pokeAbilities) {
        name = pokeAbility.ability.name
        htmlAbilities += `<span class="badge badge-info">${uppFirst(name)}</span> `
    }

    // Moves    
    for(pokeMove of pokeMoves) {
        name = pokeMove.move.name
        htmlMoves += `<div class="col-md-3"><span class="badge badge-primary">${uppFirst(name)}</span></div>`
    }

    return `
        <div class="col-12 mt-5">
            <div class="card" style="margin: auto;">
                <img class="card-img-top" src="${pic}" style="width: 18rem; margin: auto;" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${uppFirst(pokemon.name)}</h5>
                    <div>
                        <b>Peso:</b> 
                        <span>${pokemon.weight} lbs</span>
                    </div>
                    <div class="mt-3">
                        <b>Altura:</b> <span>
                        ${pokemon.height} ft</span>
                    </div>
                    <div class="mt-3">
                        <b>Tipos:</b>
                        <div>${htmlTypes}</div>
                    </div>
                    <div class="mt-3">
                        <b>Habilidades:</b>
                        <div>${htmlAbilities}</div>
                    </div>
                    <div class="mt-3">
                        <b>Movimientos:</b>
                        <div class="container-fluid">
                            <div class="row" >
                                ${htmlMoves}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
}

const loadBio = async (pokeId) => {
    const pokemon = await getPokemonById(pokeId)
    const htmlInfo = getBioCard(pokemon)

    document.getElementById('title').innerHTML = `Biografía`
    document.getElementById('main').innerHTML = htmlInfo
}