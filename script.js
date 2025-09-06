


const createElements = (arr) => {
    const htmlElements = arr.map((el) => `<span class="btn">${el}</span>`);
   return (htmlElements.join(" "));
};

const manageSpinner = (status) => {
    if(status === true){
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLessons(json.data)); 
};

const removeActive = () => {
    const lessonButtons = document.querySelectorAll(".lesson-btn")
    lessonButtons.forEach(btn => {
        btn.classList.remove("active");
    })
}


const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
        removeActive();
        const clickBtn = document.getElementById(`lesson-btn-${id}`)
        
        clickBtn.classList.add("active")

        displayLevelWord(data.data)
    })
}

const loadWordDetail = async (id) => {
 const url = `https://openapi.programming-hero.com/api/word/${id}`;
 const res = await fetch(url);
 const details = await res.json();
 displayWordDetails(details.data);

 }

//  ta": {
// "word": "Tranquil",
// "meaning": "শান্ত / নিরিবিলি",
// "pronunciation": "ট্রাঙ্কুইল",
// "level": 6,
// "sentence": "The park was a tranquil place to relax.",
// "points": 4,
// "partsOfSpeech": "adjective",
// "synonyms": [
// "peaceful",
// "calm",
// "serene"
// ],

const displayWordDetails = (word) => {
    console.log(word);
    const detailsBox = document.getElementById("detials-container");
    detailsBox.innerHTML = `
       <div>
        <h2 class="text-2xl font-bold"> ${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})</h2>
      </div>

      <div class="">
        <h2 class="font-bold">Meaning</h2>
        <p class="font-bangla">${word.meaning}</p>
      </div>

       <div class="">
        <h2 class="font-bold">Example</h2>
        <p>${word.sentence}</p>
      </div>

      <div class="">
        <h2 class="font-bold">সমার্থক শব্দ গুলো</h2>
        <div class="">${createElements(word.synonyms)}</div>
      </div>
    
    
    
    `;

    document.getElementById("word_modal").showModal();
    
}

const displayLevelWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    if(words.length === 0){
       wordContainer.innerHTML = `
       <div class="text-center col-span-3 font-bangla py-4 space-y-4">
        <img class="mx-auto" src="assets/alert-error.png" alt="">
        <p class="text-lg text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
        <h2 class="text-4xl">নেক্সট Lesson এ যান</h2>
    </div>
       
       `;
       manageSpinner(false);
       return;
    }

    words.forEach(word => {
        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `

          <div class="bg-white text-center py-10 px-5 rounded-lg space-y-4 h-[100%]">
        <h2 class="text-[32px] font-bold">${word.word ? word.word : "Word not found"}</h2>
        <p class="text-[20px] font-medium">Meaning /Pronounciation</p>
        <div class="text-[32px] font-semibold text-[#18181B] font-bangla ">"${word.meaning ? word.meaning : "Meaning not found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not found"}"</div>
        <div class="flex justify-between">

            <button onclick="loadWordDetail(${word.id})" class="px-4 py-3 bg-[#1A91FF10] cursor-pointer rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>

            <button class="px-4 py-3 bg-[#1A91FF10] cursor-pointer rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
      
        `
        wordContainer.appendChild(wordDiv)
    })

    manageSpinner(false);
}


const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

   lessons.forEach(lesson => {
    // console.log(lesson)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `

    <button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>

    `
    levelContainer.appendChild(btnDiv)
   })
    
};

loadLessons();
