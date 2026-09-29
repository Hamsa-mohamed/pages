const header = document.getElementById("header");
const headerTop = document.getElementById("headerTop");

function handleScroll() {
  const scrolled = window.scrollY > 80;
  header.classList.toggle("shadow-lg", scrolled);
  headerTop.classList.toggle("max-h-20", !scrolled);
  headerTop.classList.toggle("max-h-0", scrolled);
  headerTop.classList.toggle("border-transparent", scrolled);
}

window.addEventListener("scroll", handleScroll);
handleScroll();

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("hidden");
  navLinks.classList.toggle("flex");
  const isOpen = navLinks.classList.contains("flex");
  menuToggle.setAttribute("aria-expanded", isOpen);

  const [l1, l2, l3] = menuToggle.children;
  l1.classList.toggle("translate-y-2", isOpen);
  l1.classList.toggle("rotate-45", isOpen);
  l2.classList.toggle("opacity-0", isOpen);
  l3.classList.toggle("-translate-y-2", isOpen);
  l3.classList.toggle("-rotate-45", isOpen);
});

const committees = [
  { name: "لجنة التعليم الهندسي", image: "/images/c3.jpg" },
  { name: "لجنة الطاقة", image: "/images/c1.jpg" },
  { name: "لجنة الموارد البشرية", image: "/images/c2.jpg" },
  { name: "لجنة التعليم الهندسي", image: "/images/c3.jpg" },
  { name: "لجنة الموارد البشرية", image: "/images/c2.jpg" },
  { name: "لجنة التعليم الهندسي", image: "/images/c3.jpg" },
  { name: "لجنة الطاقة", image: "/images/c1.jpg" },
  { name: "لجنة التعليم الهندسي", image: "/images/c3.jpg" },
  { name: "لجنة الطاقة", image: "/images/c1.jpg" },
  { name: "لجنة الموارد البشرية", image: "/images/c2.jpg" },
  { name: "لجنة التعليم الهندسي", image: "/images/c3.jpg" },
  { name: "لجنة الطاقة", image: "/images/c1.jpg" },
];

function cardTemplate(committee) {
  return `
    <article class="group relative aspect-[4/3] sm:aspect-[5/6] overflow-hidden rounded-sm bg-brand-dark shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <img src="${committee.image}" alt="${committee.name}" loading="lazy" onerror="this.remove()"
           class="absolute inset-0 size-full object-cover transition duration-500 group-hover:scale-110">

      <div class="absolute inset-0 bg-linear-to-b from-transparent to-[#005d38]"></div>

      <div class="absolute inset-x-0 bottom-0 p-5 text-white">
        <h3 class="text-lg font-bold mb-3">${committee.name}</h3>
        <a href="#"
           class="inline-block px-3 py-1.5 rounded bg-white/90 text-brand text-xs font-semibold transition
                  hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
          تعرف على اللجنة
        </a>
      </div>
    </article>
  `;
}

const grid = document.getElementById("committeesGrid");
const loadMoreBtn = document.getElementById("loadMoreBtn");
const emptyMsg = document.getElementById("emptyMsg");
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");

const STEP = 8;
let visibleCount = STEP;
let searchTerm = "";

function render() {
  const filtered = committees.filter((c) => c.name.includes(searchTerm));
  const toShow = filtered.slice(0, visibleCount);

  grid.innerHTML = toShow.map(cardTemplate).join("");

  emptyMsg.classList.toggle("hidden", filtered.length > 0);
  loadMoreBtn.classList.toggle("hidden", visibleCount >= filtered.length);
}

loadMoreBtn.addEventListener("click", () => {
  visibleCount += STEP;
  render();
});

searchInput.addEventListener("input", () => {
  searchTerm = searchInput.value.trim();
  visibleCount = STEP;
  render();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  grid.scrollIntoView({ behavior: "smooth", block: "center" });
});

render();
