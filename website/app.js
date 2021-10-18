/* Global Variables */
const main = (function () {
    let d = new Date();
    // let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
    let newDate = d.toDateString();

    const server  = 'http://127.0.0.1:4000';
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
    const apiKey  = '&appid=0bf63e809b8835825496df62f19ef7ad';


    const getWeatherData = async (zipCode) => {
        try {
            const res  = await fetch(baseURL + zipCode + apiKey + '&units=metric')
            const data = await res.json();
            
            return data
        } catch (err) {
            console.log(err);
            alert(err);
        }
    }

    function getData () {
        console.log('test start');
        const zip       = document.getElementById('zip').value;
        const feelings  = document.getElementById('feelings').value;

        getWeatherData(zip)
        .then(data => {
            if (data) {
                const {
                    main : {temp}, name: city
                } = data;

                const info = {
                    newDate, temp, feelings, city
                }

                updatingUI ();

                postData(server + '/add' , info);


                // document.getElementById('entry').style.opacity = 1;

                // console.log('final :: ', data, temp);
            }
        });

    }

    const postData = async function (url = "", info = {}) {
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

    const updatingUI = async function () {
        const res = await fetch(server + '/all');

        try {
            const saveData = await res.json();

            document.getElementById('date').innerHTML       = saveData.newDate;
            document.getElementById('temp').innerHTML       = saveData.temp;
            document.getElementById('content').innerHTML    = saveData.feelings;
            document.getElementById('city').innerHTML       = saveData.city;
        } catch (error) {
            console.log(error);
        }
    };

    function inite () {
        document.getElementById('generate').addEventListener('click', getData);
    }

    return {
        inite : inite
    }
})();


main.inite();
