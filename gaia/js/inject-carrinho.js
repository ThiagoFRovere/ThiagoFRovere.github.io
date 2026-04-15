function loadComponent(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;

      if (callback) callback();
    })
    .catch(err => console.error("Erro ao carregar:", file, err));
}

loadComponent("cardshop", "hf/cardshop.html", () => {
  console.log("Carrinho carregado");

  const closeBtn = document.getElementById("close-cart");
  const modal = document.getElementById("cart-modal");

  if (closeBtn && modal) {
    closeBtn.addEventListener("click", () => {
      modal.style.display = "none";
      document.getElementById("overlay").style.display = "none";
    });
  }
});