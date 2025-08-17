"use strict";
const btnEl = document.querySelector("#search");
const inpEl = document.querySelector("#inp");
const resultSection = document.querySelector("#result");
const borderSection = document.querySelector("#borders");

// Attach the delegated click handler ONCE
let flipEventsAttached = false;
attachFlipEvents();

btnEl.addEventListener("click", async () => {
  resultSection.innerHTML = "";
  borderSection.innerHTML = "";
  resultSection.textContent = "loading...";

  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${encodeURIComponent(inpEl.value)}?fullText=true`
    );
    const data = await res.json();

    // Main country card
    resultSection.innerHTML = createCard(data[0]);

    // Border countries
    if (data[0].borders && data[0].borders.length) {
      data[0].borders.forEach(async (code) => {
        const r = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
        const bd = await r.json();
        borderSection.insertAdjacentHTML("beforeend", createCard(bd[0]));
      });
    }
  } catch (err) {
    alert("Something went wrong: " + err);
  }

  inpEl.value = "";
});

// ---------- Helpers ----------
function createCard(country) {
  return `
    <div class="card">
      <div class="card-inner">
        <div class="card-front">
          <img src="${country.flags.png}" alt="">
          <h2>${country.name.official}</h2>
          <p>${country.capital ? country.capital[0] : "No capital"}</p>
          <div class="corner-btn" role="button" aria-label="Flip to back"></div>
        </div>
        <div class="card-back">
          <h3>Info</h3>
          <p>Region: ${country.region}</p>
          <p>Population: ${country.population.toLocaleString()}</p>
          <p>Area: ${country.area.toLocaleString()} km²</p>
          <div class="corner-btn" role="button" aria-label="Flip to front"></div>
        </div>
      </div>
    </div>`;
}

function attachFlipEvents() {
  if (flipEventsAttached) return;
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".corner-btn");
    if (!btn) return; // click wasn't on a corner button
    const card = btn.closest(".card");
    if (card) card.classList.toggle("flipped");
  });
  flipEventsAttached = true;
}
