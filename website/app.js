/* Global Variables */
const App = (function () {
    let d = new Date();
    // let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let newDate = d.toDateString();

    const server  = 'http://127.0.0.1:4000';
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey  = '&appid=0bf63e809b8835825496df62f19ef7ad';


    const fetchWeatherApi = async (zipCode) => {
        try {
            const res  = await fetch(baseURL + zipCode + apiKey + '&units=metric')
            const data = await res.json();
            
            return data
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    const postReq = async function (url = "", info = {}) {
        const res = await fetch(url, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(info)
        });

        try {
            const data = await res.json();
            return data;
        } catch (error) {
            alert(error);
        }// end :: try
    }

    const updateUI = async function () {
        fetch(`${server}/all`)
        .then(res => res.json())
        .then(data => {
            try {
                document.querySelector('#date').innerHTML       = data.newDate;
                document.querySelector('#temp').innerHTML       = data.temp;
                document.querySelector('#content').innerHTML    = data.feelings;
                document.querySelector('#city').innerHTML       = data.city;
            } catch (error) {
                console.log("error", error);
            }
        });
    }

    
    function main () {
        console.log('test start');

        const zip       = document.querySelector('#zip').value;
        const feelings  = document.querySelector('#feelings').value;

        fetchWeatherApi(zip)
        .then(data => {
            if (data) {
                const city = data.name , temp = data.main.temp;
                
                const info = {
                    newDate, temp, feelings, city
                }

                postReq(server + '/add' , info)
                .then(data => {
                    updateUI()
                });
            }
        });

    }
    
    function inite () {
        document.getElementById('generate').addEventListener('click', main);
    }

    return {
        inite : inite
    }
})();


App.inite();
