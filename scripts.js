const APIURL = 'https://api.github.com/users/'


const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
async function getUser(user) {
    const resp = await fetch(APIURL + user);
    const respData = await resp.json(); 

    // TODO: Create User Card 
    createUserCard(respData)
}


function usingFor (created_at) {
    let past = created_at.slice(0, 10); 
    let current = new Date(); 
    let created = new Date(past); 


    let seconds = (current - created)/1000;
    let minutes = Math.floor(seconds/60); 
    let hours = Math.floor(minutes/60); 
    let days = Math.floor(hours/24);
    let months = Math.floor(days/30); 

    seconds = Math.floor(seconds - minutes*60);

    minutes = minutes - hours*60; 

    hours = hours - days*24;

    days = days - months*30; 

    return `${months} months ${days} days ${hours} hours`

}

function handleNull(text) {
    if(text === null){
        return `Not available`
    } else {
        return text;
    }
}


function createUserCard(user) {
    console.log(user.message)
    if(user.message == "Not Found") {
        main.innerHTML = `
            <p>Sorry the user doesn't exist. Please check the spelling and try again</p>
        `
        return
    }


    let time_spent = usingFor(user.created_at); 

    const cardHTML = `
    <div class="card">
        <div class="image-side">
            <img src="${user.avatar_url}" alt="Your Cute Picture"/> 
        </div>
        <div class="bio-side">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>
            
            <ul class="info">
                <li>Public Repositories:- ${handleNull(user.public_repos)}</li>
                <li>Followers:- ${handleNull(user.followers)}</li>
                <li>Following:- ${handleNull(user.following)}</li>
                <li>Using Github for ${time_spent}</li>
            </ul>
        </div>
    </div>
    `

    main.innerHTML = cardHTML;

}

form.addEventListener('submit', e => {
    e.preventDefault(); 
    const user = search.value;

    if(user){
        getUser(user); 

        search.value = "";
        search.placeholder = "Search again" 
    }
}
)

