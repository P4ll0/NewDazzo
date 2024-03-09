const d = new Date();
const orari = document.querySelectorAll(".footer .orari li");
let today = d.getDay() - 1;
if (today < 0) {
    today = 6;
}

orari[today].style.color = "var(--text-special-color)";
orari[today].querySelectorAll("span").forEach(span => {
    span.style.filter = "drop-shadow(0 0 0.6rem var(--text-special-color-darker))";
});


// in caso di orari nel main
const orariMain = document.querySelectorAll(".main .orari li");

orariMain[today].classList.add("today");