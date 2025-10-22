import {data} from "./data.js";

// console.log(data);

const score = document.getElementById("score");
const questionElement = document.getElementById("question");
const reponsesElement = document.getElementById("reponses");
const valider = document.getElementById("valider");
const liste = document.getElementById("ul");
const app = document.querySelector(".app");



function afficherQuestion() {
    const questions = data;

    questions.forEach((q, index) => {  
        let box = document.createElement("article");
        box.className = "w-full flex-shrink-0 p-6 h-full flex flex-col gap-6";
        box.innerHTML = `
            <div>
                     <h2 class="text-sm md:text-base font-semibold text-slate-300">Question ${index + 1}</h2>
                        <p id="question-0" class="mt-2 text-xl md:text-2xl font-bold">${q.question}</p>
                         </div>
                        <div class="bg-slate-700/60 rounded-lg p-4 flex-1 overflow-auto">
                        <p class="text-sm text-slate-300 mb-3">Choisissez une réponse :</p>
                        <ul class="space-y-3">                                    
                       </ul>
                    </div>

        `;
        app.appendChild(box);

      
        let ul = box.querySelector("ul");

      
        q.reponses.forEach((rep , rIndex) => {
            //  console.log(rep.correct);
            let li = document.createElement("li");
            li.className = "bg-neutral-400 p-3 w-full flex items-center mb-3 rounded-xl";
            li.innerHTML = `
              <label class="inline-flex items-center  gap-5 cursor-pointer w-full">
                    <input type="radio" name="q-${index}" class="sr-only peer" data-bon="${rep.correct}" data-q="${index}" data-r="${rIndex}">
                    <div class="btn w-11 h-6 bg-gray-300 rounded-full relative transition">
                        <div class="switch absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-all"></div>
                    </div>
                    <span class="  text-md text-gray-100">${rep.texte}</span>
                </label>
            `;
            ul.appendChild(li);

        });

        
        
    });
}
afficherQuestion();


// aprs la selection d'une rponse
const radios = app.querySelectorAll('input[type="radio"]');
radios.forEach(radio => {
    radio.addEventListener('change', () => {
        const groupName = radio.name;
        const group = app.querySelectorAll(`input[name="${groupName}"]`);
       
        group.forEach(inp => {
            const li = inp.closest('li');
            console.log(inp);
            const btn = li.querySelector('.btn');
            const sw = li.querySelector('.switch');

            if (inp.checked) {
                // état sélectionné : déplacer le switch et colorer le fond
                btn.classList.remove('bg-gray-300');
                btn.classList.add('bg-indigo-500');
                sw.classList.remove('bg-white');
                sw.classList.add('bg-green-500');
                sw.style.transform = 'translateX(20px)';
            } else {
                // état non sélectionné : remettre à l'état initial
                btn.classList.remove('bg-indigo-500');
                btn.classList.add('bg-gray-300');
                sw.classList.remove('bg-green-500');
                sw.classList.add('bg-white');
                sw.style.transform = 'translateX(0)';
            }
        });
    });
});


 function showPopup(finalScore) {
    const popup = document.getElementById('popup');
    const finalScoreElement = document.getElementById('finalScore');
    finalScoreElement.innerText = finalScore;
    popup.classList.remove('hidden');

    const closePopupBtn = document.getElementById('closePopup');
    closePopupBtn.addEventListener('click', () => {
        popup.classList.add('hidden');
    }); 
}



valider.addEventListener("click", () => {
    const questions = data;

    // Vérifier que chaque question a une réponse sélectionnée
    const answered = app.querySelectorAll('input[type="radio"]:checked').length;
    if (answered < questions.length) {
        alert(`Veuillez répondre à toutes les questions (${answered} / ${questions.length})`);

        return;
    }

    let bonnes = 0;

    questions.forEach((q, index) => {
        const selected = app.querySelector(`input[name="q-${index}"]:checked`);
        // Marquer toutes les bonnes réponses pour la question
        const inputsQ = app.querySelectorAll(`input[name="q-${index}"]`);
        inputsQ.forEach(inp => {
            const li = inp.closest('li');
            const sw = li.querySelector('.switch');
            const btn = li.querySelector('.btn');
            const isCorrect = inp.dataset.bon === 'true';
            if (isCorrect) {
                li.classList.remove("bg-neutral-400");
                li.classList.add("bg-green-600", "text-white");
                btn.classList.remove('bg-indigo-500');
                btn.classList.add('bg-white');
                sw.style.transform = "translateX(20px)";
                sw.classList.remove('bg-white');
                sw.classList.add('bg-green-500');
            }
        });

        if (selected) {
            if (selected.dataset.bon === 'true') {
                bonnes++;
            } else {
                // Si mauvaise sélection, la marquer en rouge
                 const liSel = selected.closest('li');
                  const sw = liSel.querySelector('.switch');
                  const btn = liSel.querySelector('.btn');
                liSel.classList.remove("bg-neutral-400");
                liSel.classList.add("bg-red-600", "text-white");
                btn.classList.remove('bg-indigo-500');
                btn.classList.add('bg-white');
                sw.classList.remove('bg-green-500');
                sw.classList.add('bg-red-600');
            }
        }
    });

    // Désactiver les inputs après validation
    const allRadios = app.querySelectorAll('input[type="radio"]');
    allRadios.forEach(r => r.disabled = true);

    // Afficher le score (ex: "3 / 5")
    score.innerText = `${bonnes} / ${questions.length}`;
     showPopup(bonnes);
      valider.classList.remove("bg-green-600");
      valider.classList.remove("text-black");
      valider.classList.remove("hover:bg-green-600");
      valider.classList.remove("hover:bg-indigo-800");
      valider.classList.add("text-white");
      valider.classList.add("bg-indigo-800");

     valider.textContent = "Refaire";
        valider.addEventListener("click", () => {
           
             window.confirm("Voulez-vous vraiment refaire le quiz ?") && window.location.reload();
             
        });

     
});


const slider = document.querySelector('.slider');
if (!slider) throw new Error('Aucun élément .slider trouvé');

// Trouver le conteneur réel des slides : #slides ou .app ou .slides
let slidesContainer = slider.querySelector('#slides') || slider.querySelector('.app') || slider.querySelector('.slides');

if (!slidesContainer) {
    throw new Error('Aucun conteneur de slides (#slides, .app ou .slides) trouvé à l\'intérieur de .slider');


}

// Si le conteneur trouvé est un wrapper qui contient la div .app (cas actuel), utiliser les articles à l'intérieur comme slides
let slides = Array.from(slidesContainer.children);

// Si slidesContainer contient une seule .app qui contient les <article>, on prend ses enfants comme slides
if (slides.length === 1 && slides[0].classList ) {
  const appWrapper = slides[0];
  slides = Array.from(appWrapper.children);
  slidesContainer = appWrapper; // on veut animer directement ce conteneur
}

// Assurer le style nécessaire
slidesContainer.style.display = 'flex';
slidesContainer.style.height = '100%';
slidesContainer.style.transition = 'transform 300ms ease';

// préparer chaque "slide" (chaque <article>)
slides.forEach(s => {
  s.style.minWidth = '100%';
  s.style.boxSizing = 'border-box';
});

// pagination
const pagination = document.getElementById('pagination') || (function(){
  const el = document.createElement('div');
  el.id = 'pagination';
  el.className = 'mt-4 flex justify-center gap-2';
  slider.parentElement.insertBefore(el, slider.nextSibling);
  return el;
})();

let current = 0;

function updatePaginationButtons() {
  const buttons = Array.from(pagination.querySelectorAll('button'));
  buttons.forEach((btn, i) => {
    btn.classList.toggle('bg-green-500', i === current);
    btn.classList.toggle('text-white', i === current);
    btn.classList.toggle('bg-slate-700', i !== current);
    btn.classList.toggle('text-slate-300', i !== current);
  });
};

function goTo(index) {
  if (index < 0) index = 0;
  if (index > slides.length - 1) index = slides.length - 1;
  current = index;
  slidesContainer.style.transform = `translateX(-${current * 100}%)`;
  updatePaginationButtons();
}

// créer boutons numérotés
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


document.addEventListener('change', (e) => {
  const target = e.target;
  if (target && target.matches('input[type="radio"]')) {
    if (current < slides.length - 1) {
      setTimeout(() => goTo(current + 1),700);
    }
  }
});











