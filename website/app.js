/* Global Variable */
let app = {
    api_key : "98bf2f70d6152c256797eded99bd67d0",
    api_url : "http://api.openweathermap.org/data/2.5/weather?zip=94040&appid="
}


//----------------------------------------------------------------------------------------------------------------
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();




console.log(newDate)

fetch(app.api_url + app.api_key)
    .then(res => res.json())
    .then(resV => {
        console.log(resV)
    })