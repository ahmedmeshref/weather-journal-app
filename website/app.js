/* Global Variable */
let app = {
    api_key : "98bf2f70d6152c256797eded99bd67d0",
    api_url : "http://api.openweathermap.org/data/2.5/weather?zip=",
    form : document.getElementById("generate"),
    zip_code : document.getElementById("zip"),
    feelings : document.getElementById("feelings"),
    date_holder : document.getElementById("date"),
    temp_holder : document.getElementById("temp"),
    content_holder : document.getElementById("content")
}


//----------------------------------------------------------------------------------------------------------------
// Utils
//----------------------------------------------------------------------------------------------------------------
// Create a new date instance dynamically with JS
let getDate = () => {
    let d = new Date();
    let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
    return newDate;
}

// send a fetch rquest
let sendRequest = async (url, method, body=undefined) => {
    let response = await fetch(url, {
        method: method,
        headers: {
            'Content-type': 'application/json'
        },
        credentials: 'same-origin',
        body: body? JSON.stringify(body): body
    })
    return response.json();
}

// Make value of html elements null
let makeFieldsNull = (ls_fields) => {
    ls_fields.forEach((field => {
        field.value = null;
    }))
}

let print = (txt) => {
    console.log(txt);
}

// populate the entry holder with the given data
let populateEntry = (data) => {
    try {
        app.temp_holder.innerHTML = `Temp: ${data.temp}`;
        app.content_holder.innerHTML = `Content: ${data.content}`;
        app.date_holder.innerHTML = `Date: ${data.date}`;
    } catch (e) {
        alert("Data is missing.");
    }

}


//----------------------------------------------------------------------------------------------------------------
// save, get, show data
//----------------------------------------------------------------------------------------------------------------
/**
 * Send get request to the last saved record and render it to the user.
 */
let showData = () => {
    const url = 'http://localhost:8000/feeling',
        method = 'GET';
    sendRequest(url, method)
        .then((resVal) => {
            try {
                populateEntry(resVal.data);
                makeFieldsNull([app.feelings, app.zip_code]);
            } catch (e) {
                alert("No data found!");
            }
        })
        .catch((err) => {
            print(err);
        })
}

/**
 * Send post request to save given data.
 * @param temp {int}
 * @param feelings {string}
 * @return showData {function}
 */
let saveData = (temp, feelings) => {
    const url = 'http://localhost:8000/feeling',
        method = 'POST',
        data = {
            date : getDate(),
            content : feelings,
            temp: temp
        };
    sendRequest(url, method, data)
        .then((_) => showData())
        .catch((err) => {
            print(err);
        })
}

/**
 * Get data from OpenWeatherMap API.
 * @param baseURL {string}
 * @param apiKey {string}
 * @param zipCode {int}
 * @returns saveData {function}
 */
let getData = async (baseURL, zipCode, apiKey) => {
    const response  = await fetch(baseURL + zipCode + '&appid=' + apiKey + '&units=imperial'),
        resVal = await response.json();
    try {
        return saveData(resVal.main.temp, app.feelings.value);
    }
    catch (err) {
        alert("Zip code is not correct!");
    }
}

let listenToSubmit = (e) => {
    e.preventDefault();
    return getData(app.api_url, app.zip_code.value, app.api_key);
}

app.form.addEventListener('submit', listenToSubmit);