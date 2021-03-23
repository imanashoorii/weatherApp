
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const messageOne = document.querySelector('.first-p')
const messageTwo = document.querySelector('.second-p')


// messageOne.textContent = 'From Java'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading ... '
    messageTwo.textContent = ''

    const location = search.value

    fetch(`http://127.0.0.1:3000/weather?search=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = data.error
            } else {
                console.log(data)
                messageOne.textContent = data.result
            }
        })
    })


})