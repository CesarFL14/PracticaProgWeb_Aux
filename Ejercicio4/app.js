const tipoSelect = document.getElementById('tipo');
const valorInput = document.getElementById('valor');
const buscarBtn = document.getElementById('buscarBtn');
const tablaBody = document.querySelector('#tabla tbody');
const mensaje = document.getElementById('mensaje');

buscarBtn.addEventListener('click', buscarDigimon);

async function buscarDigimon() {
  const tipo = tipoSelect.value;
  const valor = valorInput.value.trim();
  let url;

  if (tipo === 'all') {
    url = 'https://digimon-api.vercel.app/api/digimon';
  } else if (tipo === 'name') {
    if (!valor) { mensaje.textContent = 'Ingrese un nombre.'; return; }
    url = `https://digimon-api.vercel.app/api/digimon/name/${valor}`;
  } else if (tipo === 'level') {
    if (!valor) { mensaje.textContent = 'Ingrese un nivel.'; return; }
    url = `https://digimon-api.vercel.app/api/digimon/level/${valor}`;
  }
  tablaBody.innerHTML = '';

  try {
    const res = await fetch(url);
    const data = await res.json();
    if (!Array.isArray(data)) {
      mensaje.textContent = 'No se encontraron resultados.';
      return;
    }
    data.forEach((d, i) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `<td>${i + 1}</td><td>${d.name}</td><td>${d.level}</td>`;
      tablaBody.appendChild(fila);
    });
    mensaje.textContent = `Se encontraron ${data.length} resultados.`;
  } catch (err) {
    mensaje.textContent = 'Error al conectar con la API.';
  }
}
