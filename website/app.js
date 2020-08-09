/* Global Variable */
let app = {
    api_key : "98bf2f70d6152c256797eded99bd67d0",
    api_url : "https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather",
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

let populateEntry = (data) => {
    app.temp_holder.innerHTML = `Temp: ${data.temp}`;
    app.content_holder.innerHTML = `Content: ${data.content}`;
    app.date_holder.innerHTML = `Date: ${data.date}`;
}


//----------------------------------------------------------------------------------------------------------------
// save, get, show data
//----------------------------------------------------------------------------------------------------------------
let showData = () => {
    const url = 'http://localhost:8000/feeling',
        method = 'GET';
    sendRequest(url, method)
        .then((resVal) => {
            populateEntry(resVal.data);
            makeFieldsNull([app.feelings, app.zip_code]);
            print("Data added successfully.")
        })
        .catch((err) => {
            print(err);
        })
}


let saveData = (temp) => {
    const url = 'http://localhost:8000/feeling',
        method = 'POST',
        data = {
            date : getDate(),
            content : app.feelings.value,
            temp: temp
        };
    sendRequest(url, method, data)
        .then((_) => showData())
        .catch((err) => {
            print(err);
        })
}

let getData = async (zip_code) => {
    const url = `${app.api_url}?zip=${zip_code}&appid=${app.api_key}`,
        method = 'GET';
    let result = await sendRequest(url, method);
    try {
        return saveData(result.main.temp)
    }
    catch (err) {
        alert("Zip code is not correct!");
    }
}

let addNewFeelings = (e) => {
    e.preventDefault();
    return getData(app.zip_code.value);
}

app.form.addEventListener('submit', addNewFeelings)