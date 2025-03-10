document.addEventListener("DOMContentLoaded", () => {
    const btnFilter = document.querySelector('.icon-filter');
    const listaPokemon = document.querySelector(".card-list-pokemon.container");
    const selectCantidad = document.createElement("select");
    const URL = "https://pokeapi.co/api/v2/pokemon?limit=";
    let cantidadPokemon = 10;

    // Crear el select de cantidad de Pokémon
    selectCantidad.innerHTML = `
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
    `;
    
    selectCantidad.addEventListener("change", (e) => {
        cantidadPokemon = parseInt(e.target.value);
        cargarPokemones();
    });

    document.querySelector(".container-filter").appendChild(selectCantidad);

    btnFilter.addEventListener("click", () => {
        const containerFilter = document.querySelector(".container-filters");
        containerFilter.classList.toggle("active");
    });

    async function cargarPokemones() {
        listaPokemon.innerHTML = ""; // Limpia la lista antes de agregar nuevos Pokémon
        try {
            const response = await fetch(URL + cantidadPokemon);
            const data = await response.json();
            const promises = data.results.map(pokemon => fetch(pokemon.url).then(res => res.json()));
            const pokemones = await Promise.all(promises);

            pokemones.forEach(mostrarPokemon);
        } catch (error) {
            console.error("Error cargando los Pokémon:", error);
        }
    }

    function mostrarPokemon(poke) {
        let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join('');

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <a href="pokemon.html?id=${poke.id}" class="card-pokemon">
                <div class="card-img">
                    <img
                        src="${poke.sprites.other["official-artwork"].front_default}"
                        alt="${poke.name}"
                    />
                </div>
                <div class="card-info">
                    <span class="pokemon-id">N° ${poke.id}</span>
                    <h3>${poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}</h3>
                    <div class="card-types">
                        ${tipos}
                    </div>
                </div>
            </a>
        `;
        listaPokemon.append(div);
    }

    cargarPokemones();
});
