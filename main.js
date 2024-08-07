document.addEventListener("DOMContentLoaded", () => {
    const btnFilter = document.querySelector('.icon-filter');

    btnFilter.addEventListener('click', () => {
        const containerFilter = document.querySelector('.container-filters');
        containerFilter.classList.toggle('active');
    });

    const listaPokemon = document.querySelector(".card-list-pokemon.container");
    let URL = "https://pokeapi.co/api/v2/pokemon/";

    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => mostrarPokemon(data));
    }

    function mostrarPokemon(poke) {

        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
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
});
