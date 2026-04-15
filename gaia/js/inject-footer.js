function loadFooter(file) {
  const placeholders = ["footer", "footer-placeholder"];
  let target = null;
  
  for (const id of placeholders) {
    const el = document.getElementById(id);
    if (el) {
      target = el;
      break;
    }
  }

  if (!target) return;

  fetch(file)
    .then(res => {
      if (!res.ok) throw new Error('Falha ao carregar footer');
      return res.text();
    })
    .then(data => {
      target.innerHTML = data;
    })
    .catch(err => console.error(err));
}

loadFooter("hf/footer.html");
