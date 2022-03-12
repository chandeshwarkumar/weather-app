console.log('client side js is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.getElementById('message-1')
const messageTwo = document.getElementById('message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    messageOne.textContent = 'Loading...'
    const location = search.value;
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return messageOne.textContent = data.error
            }
            messageOne.textContent = 'Location: ' + data.location
            messageTwo.textContent = 'Temperature: ' + data.temperature
        })
    })
})