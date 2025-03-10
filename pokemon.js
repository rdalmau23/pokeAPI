document.addEventListener("DOMContentLoaded", async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); 

    if (!id) {
        document.body.innerHTML = "<h1>Error: No se encontró un ID válido.</h1>";
        return;
    }

    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const poke = await response.json();

        document.getElementById("pokemon-name").textContent = poke.name.toUpperCase();
        document.getElementById("pokemon-img").src = poke.sprites.front_default;
        document.getElementById("pokemon-img").alt = poke.name;
        document.getElementById("pokemon-type").textContent = poke.types.map(t => t.type.name).join(", ");
        document.getElementById("pokemon-height").textContent = poke.height / 10;
        document.getElementById("pokemon-weight").textContent = poke.weight / 10;
    } catch (error) {
        document.body.innerHTML = `<h1>Error al cargar el Pokémon.</h1><p>${error.message}</p>`;
    }
});
