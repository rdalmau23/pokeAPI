document.addEventListener("DOMContentLoaded", () => {
    const btnFilter = document.querySelector('.icon-filter');
    const listaPokemon = document.querySelector(".card-list-pokemon.container");
    const selectCantidad = document.createElement("select");
    let URL = "https://pokeapi.co/api/v2/pokemon/";
    let cantidadPokemon = 10; 

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

    function cargarPokemones() {
        listaPokemon.innerHTML = "";
        for (let i = 1; i <= cantidadPokemon; i++) {
            fetch(URL + i)
                .then(response => response.json())
                .then(data => mostrarPokemon(data));
        }
    }

    function mostrarPokemon(poke) {
        let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');

        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
            <a href="pokemon.html" class="card-pokemon">
                <div class="card-img">
                    <img
                        src="${poke.sprites.other["official-artwork"].front_default}"
                        alt="${poke.name}"
                    />
                </div>
                <div class="card-info">
                    <span class="pokemon-id">N° ${poke.id}</span>
                    <h3>${poke.name}</h3>
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

