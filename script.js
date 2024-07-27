let API_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown_select = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

for (let select of dropdown_select) {
    for (currCode in countryList) {
      let newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      if (select.name === "from" && currCode === "USD") {
        newOption.selected = "selected";
      } else if (select.name === "to" && currCode === "INR") {
        newOption.selected = "selected";
      }
      select.append(newOption);
    }
  
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
  }

const updateFlag = (element) =>{
    let currCode = element.value;
    let countryCode = countryList[currCode];
    // console.log(currCode, countryCode);
    let newFlag = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newFlag;
}
const updateRate = async() => {
    let amount = document.querySelector("form input");
    let amountVal = amount.value;
    if(amountVal === "" || amountVal < 1){
        alert("Please enter a valid amount");
    }
    const URL = `${API_URL}/${fromCurr.value.toLowerCase()}.json`;
    // console.log(URL);
    let response = await fetch(URL);
    // console.log(response);
    let data = await response.json();
    // console.log(data);
    let exchangeRate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log(exchangeRate);

    let finalRate = amountVal * exchangeRate;
    // console.log(finalRate);

    msg.innerText = `${amountVal}${fromCurr.value} = ${finalRate}${toCurr.value}`;
}
window.addEventListener("load", () => {
    updateRate(); 
});
btn.addEventListener("click",async (ev) =>{
    ev.preventDefault();
    updateRate();
});

