const getListByType = async (page, param) => {
    // AJAX
    const url = `https://pokeapi.co/api/v2/${page}/${param}/`
    const api_call = await fetch(url)
        .then( (res) => {
            if (res.status >= 400 && res.status < 600) handleError(res)
            return res;
        })
    const data = await api_call.json()
    const list = data.pokemon

    return list
}

const getPokemonsInTypeList = async (pokemons) => {
    // AJAX
    const list = []

    for(pokemon of pokemons) {
        const api_call = await fetch(pokemon.pokemon.url)
        const data = await api_call.json()
        list.push(data)
    }

    return list
}

const loadType = async (page, typeName) => {
    const list = await getListByType(page, typeName)
    const pokemons = await getPokemonsInTypeList(list)

    let html = ``
    for (pokemon of pokemons) {
        html += getPokeCard(pokemon)
    }

    document.getElementById('title').innerHTML = `Pokémons tipo: ${uppFirst(typeName)}`
    document.getElementById('main').innerHTML = html
}