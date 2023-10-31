document.getElementById('result').innerHTML = 'Your total coins: ' + localStorage.getItem('play') + '🪙';
const buyfox = document.querySelector('#buyfox');
const buydog = document.getElementById('buydog');
const memeImage = document.querySelector(".picture .buymeme");

function fox() {
    let result = localStorage.getItem('play');
    if (result <= 9) {
        alert("You can't afford that!");
        return false;
    }
    if (result >= 10) {
        text = "YOU BOUGHT A FOX PICTURE";
        alert(text);
        result -= 10;
        async function buyFox() {
            const res = await fetch('https://randomfox.ca/floof/')
            const resReceived = await res.json();
            showImages(resReceived);
        }

        function showImages(resReceived) {
            buyfox.innerHTML = `<img src=${resReceived.image} alt='fox'>`
        }
        buyFox()
        localStorage.setItem('play', result)
        document.getElementById('result').innerHTML = 'Your total coins: ' + result + '🪙';
    }
}

function dog() {
    let result = localStorage.getItem('play');
    if (result <= 9) {
        alert("You can't afford that!");
        return false;
    }
    if (result >= 10) {
        text = "YOU BOUGHT A DOG PICTURE";
        alert(text);
        result -= 10;

        function getRandomDog() {
            fetch('https://random.dog/woof.json')
                .then(res => res.json())
                .then(data => {
                    if (data.url.includes('.mp4')) {
                        getRandomDog();
                    } else {
                        buydog.innerHTML = `<img src="${data.url}" />`;
                    }
                });
        }
        getRandomDog();
        localStorage.setItem('play', result)
        document.getElementById('result').innerHTML = 'Your total coins: ' + result + '🪙';
    }
}

function meme() {
    let result = localStorage.getItem('play');
    if (result <= 14) {
        alert("You can't afford that!");
        return false;
    }
    if (result >= 15) {
        text = "YOU BOUGHT A MEME";
        alert(text);
        result -= 15;
        const updateDetails = (url) => {
            memeImage.setAttribute("src", url);
        };
        const generateMeme = () => {
            fetch("https://meme-api.com/gimme/wholesomememes")
                .then((response) => response.json())
                .then((data) => {
                    updateDetails(data.url, data.title, data.author);
                });
        };
        generateMeme();
        localStorage.setItem('play', result)
        document.getElementById('result').innerHTML = 'Your total coins: ' + result + '🪙';
    }
}



