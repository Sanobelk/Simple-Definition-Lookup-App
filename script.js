"use strict";

const userSubmission = document.getElementById('userSubmission');
const submit = document.getElementById('submit');


userSubmission.addEventListener('keyup',function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        submit.click();
    }
});


function addEntry(word, definition){
    if(definition != undefined){
    document.getElementById('list').insertAdjacentHTML('beforeend',`<li class="list_entry"><strong>${word}</strong>: ${definition} </li>`);
    }
}


submit.addEventListener('click',async function(){
    let fetchWord = userSubmission.value;
      //wait for the definition to be fetched before moving on.
        let fetchDefinition = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${fetchWord}`)
        .then((response) => response.json())
        .then((data) => {
            return data[0].meanings[0].definitions[0].definition;
        }).catch((error) =>{
            alert(`That word doesn't show up in the database...`);
        });
        userSubmission.value = '';
        addEntry(fetchWord, fetchDefinition);
        let container = document.getElementById('container');
        container.scrollTop = container.scrollHeight;
});