const btn = document.getElementById('button')
const field = document.getElementById('api_result')
let data = '';

const elements = [
    {firstClass: 'token_string', secondClass: 'token_operator', uniqueClass: "token_number", title: 'id', body: 1},
    {firstClass: 'token_string', secondClass: 'token_operator', uniqueClass: "token_string", title: 'name', body: "Alexa Perry"},
    {firstClass: 'token_string', secondClass: 'token_operator', uniqueClass: "token_string", title: 'email', body: "alexa.perry@gmail.com"},
    {firstClass: 'token_string', secondClass: 'token_operator', uniqueClass: "token_string", title: 'photo', body: "https://randomuser.me/api/portraits/men/3.jpg"}
];


for (const e of elements) {
    data += `   <span class=${e.firstClass}>${e.title}</span><span class=${e.secondClass}>: </span><span class=${e.uniqueClass}>${e.body}</span>,\n`;
};


btn.addEventListener('click', (e) => {
    e.preventDefault();

    field.innerHTML = `{\n${data}}`;
})




