const chatform = document.getElementById('chat-form')

const chatmessages = document.querySelector('.chat-messages')

const socket = io()

//emit
socket.on('message', message => {
    console.log(message)

    outputMessage(message)

    //scroll
    chatmessages.scrolltop = chatmessages.scrollHeight
})

chatform.addEventListener('submit', (e) => {
    e.preventDefault();

    //get text message
    const msg = e.target.elements.msg.value

    console.log(msg)

    //emit message to server
    socket.emit('chatmessage', msg)

    e.target.elements.msg.value = ''

    e.target.elements.msg.focus()

})

//put message in dom
function outputMessage(message)
{
    const div = document.createElement('div')

    div.classList.add('message')

    div.innerHTML = `<p class="meta">${message.username} <pan> ${message.time} </span></p>
                        <p class="text">${message.text}</p>`

    document.querySelector('.chat-messages').appendChild(div)
}