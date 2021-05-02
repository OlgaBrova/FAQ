
// BUG - koga izleguvaat novi kopcinja gi snemuva tie od prethodnoto prashanje (dokolku imalo)
// I don't understand this, please be more precise. - na kraj na kod


let userInput = document.getElementById("userInput");
let chatHistory = document.getElementById("chatHistory");
let buttonsDiv = document.getElementById("buttonsDiv");
let sendBtn = document.getElementById("sendBtn");
let inputGroup = document.getElementById("inputGroup");


sendBtn.addEventListener("click", () => {

    let input = userInput.value;

    if (userInput.value !== '') {
        postUserInput();
        getAnswers(input);
    }  
})


inputGroup.addEventListener("keyup", (e) => {
    if(e.keyCode === 13){
        let input = userInput.value;

        if (userInput.value !== '') {
            postUserInput();
            getAnswers(input);
        }  
    }
})


let postUserInput = () => {
    chatHistory.innerHTML +=`<div class="chatBubblesUser">${userInput.value}</div>`;
    chatHistory.scrollIntoView({block: 'end', behavior: 'smooth'});
    buttonsDiv.scrollIntoView({block: 'end', behavior: 'smooth'});
    userInput.value = '';
}


let getAnswers = (input) => {
    fetch("https://raw.githubusercontent.com/OlgaBrova/FAQ-json/main/FAQ.json")
        .then(response => response.json())
        .then(questions => {
            //console.log(questions);
            return searchAnswersInDB(input, questions);
        })
        .catch(error => {
            console.log(error);
        });
}


let searchAnswersInDB = (input, questions) => {

    buttonsDiv.innerHTML = ""; 

    for (let question of questions) {
        if (question.keywords.some( a => input.toLowerCase().includes(a.toLowerCase()))) {

            chatHistory.innerHTML +=`<div class="chatBubblesBot">${question.answer}</div>`;

            if(question.links) {

                for (let link of question.links) {

                    buttonsDiv.innerHTML += `  <form action="${link.link}" target="_blank">
                        <button type="submit" class = "chatBotBtns"  >${link.name}</button>
                        </form>`;
                }
            }
            chatHistory.scrollIntoView({block: 'end', behavior: 'smooth'});
            buttonsDiv.scrollIntoView({block: 'end', behavior: 'smooth'});
                console.log(question);
            return question;

        } else if (question.keywords.some( a => input.toLowerCase().includes(a.toLowerCase())) === {}) {

            chatHistory.innerHTML +=`<div class="chatBubblesBot">I don't understand this, please be more precise.</div>`;
        } 
        
    }  
 
}