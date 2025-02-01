let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})

function toggleOrderDetails(orderItem) {
    let details = orderItem.nextElementSibling;
    if (details && details.classList.contains("order-details")) {
        details.style.display = details.style.display === "block" ? "none" : "block";
    }
}
