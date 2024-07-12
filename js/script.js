"use strict";
const btnEl = document.querySelector("#search");
const inpEl = document.querySelector("#inp");
const resultSection = document.querySelector("#result");
const borderSection = document.querySelector("#borders");
btnEl.addEventListener("click", async () => {

    resultSection.innerHTML=''
    borderSection.innerHTML=''
    resultSection.textContent="loading..."
  try {
    const res = await fetch(
      `https://restcountries.com/v3.1/name/${inpEl.value}?fullText=true`
    );
    const data = await res.json();

    resultSection.innerHTML = `<div class="card">
        <img src="${data[0].flags.png}" alt="">
        <h2>${data[0].name.official}</h2>
        <p>${data[0].capital[0]}</p>
    </div>`;
    data[0].borders.map(async(e)=>{
        const res = await fetch(
            `https://restcountries.com/v3.1/alpha/${e}`
          );
          const data = await res.json();
          borderSection.innerHTML+=`<div class="card">
          <img src="${data[0].flags.png}" alt="">
          <h2>${data[0].name.official}</h2>
          <p>${data[0].capital[0]}</p>
      </div>`
    })
  } catch (err) {
    alert(err);
  }
  inpEl.value=''

});
