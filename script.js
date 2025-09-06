

const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(json => displayLessons(json.data)); 
};

const loadLevelWord = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayLevelWord(data.data))
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
       
       `
    }


//     "id": 4,
// "level": 5,
// "word": "Diligent",
// "meaning": "পরিশ্রমী",
// "pronunciation": "ডিলিজেন্ট"

    words.forEach(word => {
        const wordDiv = document.createElement("div")
        wordDiv.innerHTML = `

          <div class="bg-white text-center py-10 px-5 rounded-lg space-y-4 h-[100%]">
        <h2 class="text-[32px] font-bold">${word.word ? word.word : "Word not found"}</h2>
        <p class="text-[20px] font-medium">Meaning /Pronounciation</p>
        <div class="text-[32px] font-semibold text-[#18181B] font-bangla ">"${word.meaning ? word.meaning : "Meaning not found"} / ${word.pronunciation ? word.pronunciation : "Pronunciation not found"}"</div>
        <div class="flex justify-between">
            <button class="px-4 py-3 bg-[#1A91FF10] cursor-pointer rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-circle-info"></i></button>
            <button class="px-4 py-3 bg-[#1A91FF10] cursor-pointer rounded-lg hover:bg-[#1A91FF80]"><i class="fa-solid fa-volume-high"></i></button>
        </div>
    </div>
      
        
        `
        wordContainer.appendChild(wordDiv)
    })
}




const displayLessons = (lessons) => {
    const levelContainer = document.getElementById("level-container")
    levelContainer.innerHTML = "";

   lessons.forEach(lesson => {
    // console.log(lesson)
    const btnDiv = document.createElement("div");
    btnDiv.innerHTML = `

    <button onclick = "loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson-${lesson.level_no}</button>

    `
    levelContainer.appendChild(btnDiv)
   })
    
};

loadLessons();
