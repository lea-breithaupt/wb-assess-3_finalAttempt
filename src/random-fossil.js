import axios from "axios"

const randomFossilButton = document.querySelector("#get-random-fossil")

randomFossilButton.addEventListener("click", async () => {
    const response = await axios.get('/random-fossil.json')

    const { name, img } = response.data

    const randomFossilImage = document.querySelector('#random-fossil-image')
    randomFossilImage.setAttribute('src', img)
    console.log(randomFossilImage)

    const randomFossilName = document.querySelector('#random-fossil-name')
    randomFossilName.innerText = name
    
})