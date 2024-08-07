document.addEventListener("DOMContentLoaded", () => {
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
            <div class="header-main-pokemon">
            <span class="number-pokemon">#1</span>
            <div class="container-img-pokemon">
                <img
						src="${poke.sprites.other["official-artwork"].front_default}"
						alt="pokemon bulbasaur"
					/>
            </div>
            <div class="container-info-pokemon">
                <h1>Bulbasaur</h1>
                <div class="card-types">
                    <span class="grass">Planta</span>
                </div>
                <div class="info-pokemon">
                    <div class="group-info">
                        <p>Altura</p>
                        <span>${poke.height}m</span>
                    </div>
                    <div class="group-info">
                        <p>Peso</p>
                        <span>${poke.weight}Kg</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="container-stats">
            <h1>Estadísticas</h1>
            <div class="stats">
                <div class="stat-group">
                    <span>Hp</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">45</span>
                </div>
                <div class="stat-group">
                    <span>Attack</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">49</span>
                </div>
                <div class="stat-group">
                    <span>Defense</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">49</span>
                </div>
                <div class="stat-group">
                    <span>Special Attack</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">65</span>
                </div>
                <div class="stat-group">
                    <span>Special Defense</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">65</span>
                </div>
                <div class="stat-group">
                    <span>Speed</span>
                    <div class="progress-bar"></div>
                    <span class="counter-stat">45</span>
                </div>
            </div>
        </div>
        `;
        listaPokemon.append(div);
    }
});