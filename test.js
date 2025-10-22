

//  le slider


const slider = document.querySelector('.slider');

if(!slider) throw new error ('Aucun élément avec la classe .slider trouvé');

let slidesContainer = slider.querySelector("#slides");

if(!slidesContainer) throw new error ('Aucun conteneur de slides (#slides) trouvé à l\'intérieur de .slider');

let slides = Array.from(slidesContainer.children);

if(slides.length === 1 && slides[0].classList) {
    const appWrapper = slides[0];
    slides = Array.from(appWrapper.children);
    slidesContainer = appWrapper;

}

slidesContainer.style.display = 'flex';
slidesContainer.style.height = '100%';
slidesContainer.style.transition = 'transform 300s ease-in-out';


slides.forEach(s => {
    s.style.minWidth = "100%";
    s.style.boxSizing = "border-box";
});

const pagination = document.getElementById('pagination') || (function (){
    const element = document.createElement('div');
    element.id = 'pagination';
    element.className = "mt-4 flex justify-center gap-2";
    slider.parentNode.insertBefore(element, slider.nextSibling);
    return element;
})();

let current = 0 ;

function upgradePagination() {
    const buttons = Array.from(pagination.querySelectorAll('button'));
    buttons.forEach((btn, i) => {
        btn.classList.toggle('bg-green-500', i === current);
        btn.classList.toggle('text-white', i === current);
        btn.classList.toggle('bg-slate-700', i !== current);
        btn.classList.toggle('text-slate-300', i !== current);
    });
}

function goto(index) {
    if (index < 0) index = 0   ;
    if (index  > slides.lenght - 1) index = slides.length - 1 ;
    current = index ;
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
    upgradePagination();

}

function createPagination() {
  pagination.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = (i + 1).toString();
    btn.className = 'w-10 h-10 rounded-md text-sm bg-slate-700 text-slate-300 flex items-center justify-center';
    btn.addEventListener('click', () => goTo(i));
    pagination.appendChild(btn);
  });
  updatePaginationButtons();
}

createPagination();
goTo(0);



// navigation clavier
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goTo(current + 1);
  if (e.key === 'ArrowLeft') goTo(current - 1);
});

// optionnel : aller à la slide suivante dès qu'on choisit une réponse
document.addEventListener('change', (e) => {
  const target = e.target;
  if (target && target.matches('input[type="radio"]')) {
    if (current < slides.length - 1) {
      setTimeout(() => goTo(current + 1), 150);
    }
  }
});