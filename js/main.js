// ==========================
// MAIN PAGE
// ==========================
const uppFirst = (string) => string.charAt(0).toUpperCase() + string.slice(1)

const handleError = (res) => {
    document.getElementById('main').innerHTML = `<h2 class="text-danger">Error en el servidor. Verifique conexión y datos.</h2>`
    throw new Error(`Error: ${res}`)
}

const getList = async (limit, page, param) => {
    // AJAX
    const url = `https://pokeapi.co/api/v2/pokemon/?limit=${limit}`
    const api_call = await fetch(url)
    const data = await api_call.json()
    const list = data.results

    return list
}

const getPokemonsInList = async (pokemons) => {
    // AJAX
    const list = []
    let api_call = data = ``

    for(pokemon of pokemons) {
        api_call = await fetch(pokemon.url)
        data = await api_call.json()
        list.push(data)
    }

    return list
}

const getPokeCard = (pokemon) => {
    const name = pokemon.name
    const id = pokemon.id
    const pic = (pokemon.sprites.front_default != null) ? pokemon.sprites.front_default : 'https://upload.wikimedia.org/wikipedia/commons/6/6c/No_image_3x4.svg'

    return `
        <div class="col-md-4 mt-5">
            <div class="card" style="width: 18rem;">
                <img class="card-img-top" src="${pic}" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${uppFirst(name)}</h5>
                    <a href="index.html?page=bio&id=${id}" class="btn btn-primary">Ver más <i class="fa fa-arrow-right"></i></a>
                </div>
            </div>
        </div>
    `
}

const loadMain = async () => {
    const limit = 10
    const list = await getList(limit)
    const pokemons = await getPokemonsInList(list)

    let html = ``
    for (pokemon of pokemons) {
        html += getPokeCard(pokemon)
    }

    document.getElementById('title').innerHTML = `Listar ${limit} Pokémons`
    document.getElementById('main').innerHTML = html
}

// ==========================
// INIT
// ==========================
(() => {
    const browserUrl = new URL(window.location.href)
    const searchURL = browserUrl.searchParams
    
    const page = searchURL.get("page")
    const pokeId = searchURL.get("id")
    const typeName = searchURL.get("typeName")

    try{
        switch (page) {
            case "bio":
                $.getScript("js/bio.js", () => loadBio(pokeId))
                break
            case "type":
                $.getScript("js/type.js", () => loadType(page, typeName))
                break
            default:
                loadMain()
        }
    } catch (err){
        document.getElementById('main').innerHTML = `Error de ejecución`
        throw `Error: ${err}`
    }
 })()
