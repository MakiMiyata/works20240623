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

document.addEventListener("DOMContentLoaded", function () {
  const worksGallery = document.getElementById("works-gallery");
  const wordpressApiUrl = "https://mamiya.pecori.jp/works/wp-json/wp/v2/posts";

  fetch(wordpressApiUrl)
    .then((response) => response.json())
    .then((posts) => {
      posts.forEach((post) => {
        getPostImage(post.featured_media).then((postImage) => {
          const workItem = document.createElement("div");
          workItem.className = "work-item";
          workItem.innerHTML = `
                      <a href="${post.link}" target="_blank">
                          <img src="${postImage}" alt="${post.title.rendered}">
                          <h3>${post.title.rendered}</h3>
                      </a>
                  `;
          worksGallery.appendChild(workItem);
        });
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));

  function getPostImage(mediaId) {
    if (!mediaId) return Promise.resolve("default-image-path.jpg");
    const mediaApiUrl = `https://mamiya.pecori.jp/works/wp-json/wp/v2/media/${mediaId}`;
    return fetch(mediaApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((media) => media.source_url)
      .catch((error) => {
        console.error("Error fetching media:", error);
        return "default-image-path.jpg";
      });
  }
});
