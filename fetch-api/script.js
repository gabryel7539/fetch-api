const capitalInput = document.querySelector("#capital");

capitalInput.addEventListener("input", () => {
  const capital = capitalInput.value.trim().toLowerCase();

  if (capital.length < 3) return;

  clearTimeout(capitalInput.timer);
  capitalInput.timer = setTimeout(() => {
    fetch(`https://restcountries.com/v3.1/capital/${capital}`)
      .then(res => res.json())
      .then(data => {
        if (!data || !data.length) return alert("Capital não encontrada.");

        const pais = data[0];
        document.querySelector("#pais").value = pais.name.common;
        document.querySelector("#regiao").value = pais.region;
        document.querySelector("#populacao").value = pais.population.toLocaleString();
        document.querySelector("#area").value = pais.area.toLocaleString();

        const moeda = pais.currencies ? Object.values(pais.currencies)[0].name : "N/A";
        document.querySelector("#moeda").value = moeda;

        const bandeira = document.querySelector("#bandeira");
        bandeira.src = pais.flags.png;
        bandeira.style.display = "inline";
      })
      .catch(err => {
        console.error("Erro:", err);
        alert("Erro ao buscar dados.");
      });
  }, 600);
});

fetch('./main.php')

.then(response => response.json())
.then(data => console.log(data) )  
