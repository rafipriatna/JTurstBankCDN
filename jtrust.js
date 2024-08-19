const jsonFile = "https://rafipriatna.github.io/JTurstBankCDN/data/berita.json";
let dataJSON = [];
let currentIndex = 0;

const fetchData = async () => {
  await fetch(jsonFile)
    .then((response) => response.json())
    .then((json) => (dataJSON = json));
};

const populateData = async () => {
  await fetchData();
  if (dataJSON !== null && dataJSON.length > 0) {
    updateContentAndCarousel(currentIndex);
  }
};

function updateContentAndCarousel(index) {
  const contents = document.getElementById("contents");
  const judul = document.getElementById("judul");
  const carouselInner = document.getElementById("carouselInner");

  // Reset carousel content
  carouselInner.innerHTML = "";

  // Update carousel items
  dataJSON[index].images.forEach((image, imgIndex) => {
    const carouselItem = document.createElement("div");
    carouselItem.className = "carousel-item";
    if (imgIndex === 0) {
      carouselItem.classList.add("active");
    }
    carouselItem.setAttribute("data-bs-interval", "2000");

    const imgElement = document.createElement("img");
    imgElement.src = `img/${image}`;
    imgElement.className = "d-block w-100";

    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  // Apply fade-out effect
  contents.classList.add("fade-out");
  judul.classList.add("fade-out");

  setTimeout(() => {
    document.getElementById("isi").style = "display: block";

    // Update content after fade-out
    contents.innerHTML = dataJSON[index].contents;
    judul.innerHTML = dataJSON[index].title;

    // Apply fade-in effect
    contents.classList.remove("fade-out");
    contents.classList.add("fade-in");

    judul.classList.remove("fade-out");
    judul.classList.add("fade-in");
  }, 1000);
}

function nextItem() {
  currentIndex = (currentIndex + 1) % dataJSON.length;
  updateContentAndCarousel(currentIndex);
}

populateData();
setInterval(nextItem, 10000);
