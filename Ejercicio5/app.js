const galeria = document.getElementById('galeria');
const filtro = document.getElementById('filtro');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const paginaLabel = document.getElementById('pagina');
const mensaje = document.getElementById('mensaje');

let pagina = 0;
let datos = [];

async function cargarPokemones() {
  galeria.innerHTML = '';
  const url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pagina * 20}`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    const lista = data.results;

    datos = await Promise.all(lista.map(async p => {
      const detalle = await fetch(p.url).then(r => r.json());
      return {
        name: detalle.name,
        id: detalle.id,
        img: detalle.sprites.front_default
      };
    }));

    renderizar();
    mensaje.textContent = `Mostrando ${datos.length} Pokémon.`;
  } catch (e) {
    mensaje.textContent = 'Error al cargar los datos.';
  }
}

function renderizar() {
  const filtroTexto = filtro.value.toLowerCase();
  galeria.innerHTML = '';
  const filtrados = datos.filter(p => p.name.includes(filtroTexto));

  if (filtrados.length === 0) {
    galeria.innerHTML = '<p>No se encontraron coincidencias.</p>';
    return;
  }

  filtrados.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>ID: ${p.id}</p>
    `;
    galeria.appendChild(card);
  });

  paginaLabel.textContent = `Página ${pagina + 1}`;
}

next.addEventListener('click', () => { pagina++; cargarPokemones(); });
prev.addEventListener('click', () => { if (pagina > 0) pagina--; cargarPokemones(); });
filtro.addEventListener('input', renderizar);

cargarPokemones();
