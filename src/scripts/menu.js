fetch("src\\scripts\\pizze.csv")
    .then(response => response.text())
    .then(function (text) {
        //ottengo una stringa con tutto il file
        // console.log(text);


        //creo una funzione che mi ritorna un array di oggetti pizza
        function creaPizze(array = [], text) {
            const tmp = text.split("\n");
            const heading = tmp[0].split(",");
            let obj = {};

            //genero l'array di oggetti pizza
            for (i = 1; i < tmp.length; i++) {
                for (j = 0; j < heading.length; j++) {
                    obj[heading[j]] = tmp[i].split(",")[j];
                }
                array.push(obj);
                obj = {};
            }

            //ritorno l'heading per comodità
            return heading;
        }

        //creo un array di oggetti pizza
        let pizze = [];
        const headings = creaPizze(pizze, text);
        // console.log(pizze);

        //--------------------------------------------------------- PROGRAMMA ---------------------------------------------------------
        const cards = document.querySelectorAll(".card");


        cards.forEach(item => {
            itemPizza = getPizzaById(item.getAttribute("id"));

            //creo l'interno delle cards
            const paragrafoIngr = document.createElement("p");
            const paragrafoPrezzo = document.createElement("p");
            const h3 = document.createElement("h3");
            const img = document.createElement("img");

            //ci aggiungo il testo e il resto
            if (imageExists("src/img/Pizze/" + itemPizza[headings[0]].toLowerCase() + ".jpg")) {
                img.setAttribute("src", "src/img/Pizze/" + itemPizza[headings[0]].toLowerCase() + ".jpg");
            } else {
                img.setAttribute("src", "src/img/Pizze/not_found.jpg");
            }
            img.setAttribute("alt", item.getAttribute("id").toLowerCase());
            h3.textContent = itemPizza[headings[0]].toUpperCase().replaceAll("_", " ");
            h3.className = "name";
            paragrafoIngr.textContent = itemPizza[headings[1]].replaceAll(" ", ", ").replaceAll("_", " ");
            paragrafoIngr.className = "ingredienti";
            paragrafoPrezzo.textContent = "€ " + itemPizza[headings[2]].replaceAll(".", ",");
            paragrafoPrezzo.className = "prezzo";

            //le metto nel body
            item.appendChild(img);
            item.appendChild(h3);
            item.appendChild(paragrafoIngr);
            item.appendChild(paragrafoPrezzo);


            //apparizione delle info al click
            item.addEventListener("click", event => {
                displayInfo(item, headings);
                console.log(item);
            });
        })


        //funzione che mostra le info (tipo di pizza, prezzo...)
        function displayInfo(item, headings) {
            itemPizza = getPizzaById(item.getAttribute("id"));
            let display = document.querySelector(".display");
            let img = document.querySelector(".display img");
            let prezzo = document.querySelector(".display .prezzo");
            let ingredienti = document.querySelector(".display .ingredienti");
            let name = document.querySelector(".display .name");
            let description = document.querySelector(".display .description");
            // particolarita'
            let glutenfree = document.querySelector(".display .glutenfree");
            let bianca = document.querySelector(".display .bianca");
            let vegan = document.querySelector(".display .vegan");
            let farina_integrale = document.querySelector(".display .farina_integrale");
            let senza_lievito = document.querySelector(".display .senza_lievito");
            let ingr_locali = document.querySelector(".display .ingr_locali");
            let crosta_sottile = document.querySelector(".display .crosta_sottile");

            //metti le informazioni nel div.display e rendilo visibile. poi fai un eventlistener per renderlo invisibile     !!!
            display.style.display = "flex";
            if (imageExists("src/img/Pizze/" + itemPizza[headings[0]].toLowerCase() + ".jpg")) {
                img.setAttribute("src", "src/img/Pizze/" + itemPizza[headings[0]].toLowerCase() + ".jpg");
            } else {
                img.setAttribute("src", "src/img/Pizze/not_found.jpg");
            }
            prezzo.textContent = "€ " + itemPizza[headings[2]].replaceAll(".", ",");
            ingredienti.textContent = itemPizza[headings[1]].replaceAll(" ", ", ").replaceAll("_", " ");
            name.textContent = itemPizza[headings[0]].toUpperCase().replaceAll("_", " ");
            description.textContent = itemPizza[headings[headings.length-1]];

            // particolarita'
            glutenfree.style.display = itemPizza[headings[3]] === "true" ? "" : "none";
            bianca.style.display = itemPizza[headings[4]] === "true" ? "" : "none";
            vegan.style.display = itemPizza[headings[5]] === "true" ? "" : "none";
            farina_integrale.style.display = itemPizza[headings[6]] === "true" ? "" : "none";
            senza_lievito.style.display = itemPizza[headings[7]] === "true" ? "" : "none";
            ingr_locali.style.display = itemPizza[headings[8]] === "true" ? "" : "none";
            crosta_sottile.style.display = itemPizza[headings[9]] === "true" ? "" : "none";
        }

        //funzione che mi trova la pizza in base al nome
        function getPizzaById(id) {
            let tmp = {};

            pizze.forEach(pizza => {
                if (pizza[headings[0]] === id) {
                    tmp = pizza;
                }
            });

            return tmp;
        }

        //evento di chusura della finestra delle info
        const display = document.querySelector(".display");
        const chiudiDisplay = () => {
            display.style.display = "none";
        }

        display.addEventListener("click", (e) => {
            chiudiDisplay();
        });
        document.querySelector(".display .pizza_card .close").addEventListener("click", (e) => {
            chiudiDisplay();
        });
    });

function imageExists(image_url) {

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    return http.status != 404;

}