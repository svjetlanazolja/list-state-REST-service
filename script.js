let drzave = [];

function ucitajDrzave(region) {
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        if (request.readyState == 4 && request.status == 200) {
            drzave = JSON.parse(request.responseText);
            prikaziDrzave();
            prikazi5Najbrojnih();
            prikaziBrojDrzava();
            saberiPopulaciju();
            popuniGradove();
        } else if (request.readyState == 4 && request.status != 200) {
            document.body.style.backgroundColor = "red";
        }
    }

    request.open("GET", "https://restcountries.eu/rest/v2/region/" + region);
    request.send();

}

function prikaziDrzave() {
    document.getElementById("drzave").innerHTML = "";
    drzave.forEach(drzava => {
        if (drzava.population <= 5000000) {
            document.getElementById("drzave").innerHTML +=
                "<li>" + drzava.name + "</li>";
        }
    });
}

function prikazi5Najbrojnih() {
    document.getElementById("top5").innerHTML = "";
    drzave.sort((a, b) => {
        return b.population - a.population;
    });
    for (i = 0; i < 5; i++) {
        document.getElementById("top5").innerHTML += drzave[i].name + ", ";
    }
}

function prikaziBrojDrzava() {
    document.getElementById("broj-drzava").innerHTML =
        "Ukupno ima " + drzave.length + " drzava";
}

function saberiPopulaciju() {
    let s = drzave.reduce((total, drzava)=>{
        return total + drzava.population;
    },0);
    /*
    let s = 0;
    drzave.forEach(drzava=>{
        s+= drzava.population;
    });
    */
   /*
    let s =0;
    for(i=0;i<drzave.length;i++) {
        s+= drzave[i].population;
    }
   */
    document.getElementById("ukupan-broj-stanovnika")
        .innerHTML = "Ukupno ima " + s + " stanovnika";
}

function popuniGradove(){
    document.getElementById("gradovi").innerHTML = "";
    drzave.forEach(drzava => {
        document.getElementById("gradovi").innerHTML +=
            "<option value=\""+drzava.capital + "\">"
            + drzava.capital + "</option>";
    });
}

function unesiNazivDrzave(grad) {
    let nazivDrzave = prompt("Unesi eng naziv drzave");
    drzave.forEach(drzava => {
        if(drzava.capital == grad) {
            if(nazivDrzave == drzava.name) {
                alert("Tacan odgovor");
            } else {
                alert("Drzava za grad je " + drzava.name);
            }
        }
    });
}

setTimeout(function () {
    let region = prompt("Unesi naziv");
    if (region)
        ucitajDrzave(region);
}, 10000)

