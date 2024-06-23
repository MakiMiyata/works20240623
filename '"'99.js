document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("header");
  const works = document.getElementById("works");

  works.addEventListener("mouseover", () => {
    works.classList.add("highlight");
  });
  works.addEventListener("mouseout", () => {
    works.classList.remove("highlight");
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > window.innerHeight / 2) {
      header.style.transform = "translateX(0)";
    } else {
      header.style.transform = "translateX(-100%)";
    }
  });
});
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // デフォルトのフォーム送信を防ぐ

  var form = e.target;
  var formData = new FormData(form);

  // Google Formにデータを送信
  fetch(form.action, {
    method: form.method,
    body: formData,
    mode: "no-cors",
  })
    .then(() => {
      // 送信後にTHANKSページへリダイレクト
      window.location.href = "thanks.html";
    })
    .catch((error) => {
      console.error("Error!", error.message);
    });
});
