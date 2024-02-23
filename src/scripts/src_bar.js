function search() {
    // Declare variables
    var input, filter, cards;
    input = document.getElementById("mySearch");
    filter = input.value.toUpperCase();
    cards = document.querySelectorAll(".card");

    // Loop through all list items, and hide those who don't match the search query
    cards.forEach(card => {
        if (card.querySelector("h3").textContent.toUpperCase().substring(0, filter.length) === filter) {//|| areIngredienti(card.querySelector(".ingredienti").textContent.split(", "), filter)) {
        card.style.display = "";
    } else {
        card.style.display = "none";
    }
});
}

// function areIngredienti(ingr, filter) {
//     let filterIngr = filter.split(" ");
//     let areIngr = true;

//     filterIngr.forEach(elm => {
//         if (areIngr) {
//             areIngr = isAPartOf(elm, ingr);
//         }
//     });

//     return areIngr;
// }

// function isAPartOf(elm, array) {
//     let isAPartOf = false;
//     for (i = 0; i < array.length; i++) {
//         if (elm === array[i].substring(0, elm.length)) {
//             isAPartOf = true;
//         }
//     }
//     return isAPartOf;
// } 