const typingtext = document.querySelector(".typing-text p");
const include = document.querySelector(".include");
const mistakes = document.querySelector(".mistake span");
const time = document.querySelector(".time span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const try_again_button = document.querySelector("button");

let char_index = 0;
let mistake = 0;
let timer;
let max_time = 60;
let time_left = max_time;
let is_typing = 0;

function random_paragraph(){
    let random_index = Math.floor(Math.random() * paragraph.length);
    // // paragraph[random_index].split("").forEach(span => {
    // //     let span_tag = `<span>${span}</span>`;
    // //     typing_text.innerHTML += span_tag;
    // });
    typingtext.innerHTML = "";
    let desprate = paragraph[random_index].split("");
    desprate.forEach(span => {
        let span_tag = `<span>${span}</span>`;
        typingtext.innerHTML += span_tag;
    });
    typingtext.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => include.focus());
    typingtext.addEventListener("click", () => include.focus());
}


function type_according(){
    const characters = typingtext.querySelectorAll("span");
    let typed_char = include.value.split("")[char_index];
    if(char_index < characters.length - 1 && time_left > 0){
        if(!is_typing){
            timer = setInterval(init_timer, 1000);
            is_typing = true;
        }
        
        if(typed_char == null){
            char_index--;
            if(characters[char_index].classList.contains("wrong")){
                mistake--;
            }
            characters[char_index].classList.remove("right", "wrong");
        } else{
            if(characters[char_index].innerText === typed_char){
                characters[char_index].classList.add("right");
            } else{
                mistake++;
                characters[char_index].classList.add("wrong");
            }
            char_index++;
        }
        
        characters.forEach(span => span.classList.remove("active"));
        characters[char_index].classList.add("active");
    
        let wpm_count = Math.round((((char_index - mistake) / 5) / (max_time - time_left)) * 60);
        wpm_count = wpm_count < 0 || !wpm_count || wpm_count === Infinity ? 0 : wpm_count;
    
        wpm.innerText = wpm_count;
        mistakes.innerText = mistake;
        cpm.innerText = char_index - mistake; 
    }
    else {
        include.value = "";
        clearInterval(timer); 
    }
}

function init_timer(){
    if(time_left > 0){
        time_left--;
        time.innerText = time_left;
    } else{
        clearInterval(timer);
    }
}

function play(){
    random_paragraph();
    include.value = "";
    clearInterval(timer); 
    max_time = 60;
    time_left = max_time;
    is_typing = 0;
    char_index = 0;
    time.innerText = time_left;
    mistakes.innerText = 0;
    cpm.innerText = 0; 
    wpm.innerText = 0;
}

random_paragraph();
include.addEventListener("input", type_according);
try_again_button.addEventListener("click", play);