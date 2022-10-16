const btn = document.getElementById('button')
const field = document.getElementById('api_result')

const data = 
`{
    <span class='token_string'>"id"</span><span class="token_operator">:</span> <span class="token_number">1</span>,
    <span class='token_string'>"name"</span><span class="token_operator" >:</span> <span class="token_string">"Alexa Perry"</span>,
    <span class='token_string'>"email"</span><span class="token_operator">:</span> <span class="token_string">"alexa.perry@example.com"</span>,
    <span class='token_string'>"photo"</span><span class="token_operator">:</span> <span class="token_string">"https://randomuser.me/api/portraits/men/3.jpg"</span>
}`


btn.addEventListener('click', (e) => {
    e.preventDefault();

    field.innerHTML = data
})




