const axios = require('axios');


function vaccineSlotAvailability (agent) {
    // Will take date and pin as param
    const date = '28-05-2021';
    const pin = '440008';
    const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`;
    axios.get(url)
        .then(function (response) {
            const {centers} = response.data;
            if(centers && centers.length > 0) {
                centers.map((item) => console.log([item.name, item.address, `from: ${item.from}`, `from: ${item.to}`, ' '].join('\n')));
            } else {
                console.log('Not Available')
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}

function covidHelplineContacts (agent) {
    // Will state data
    const state = 'Karnataka';
    const url = 'https://api.rootnet.in/covid19-in/contacts';
    axios.get(url)
        .then(function (response) {
            const {primary, regional} = response.data.data.contacts;
            let data = Object.keys(primary).map(key => `${key} ${primary[key]}`).join('\n');
            if(state) {
                let stateData = regional.filter((item) => item.loc === state)[0];
                data = `${data} \n${state} local number ${stateData.number}`
            }
            console.log(data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function covidSaviours (agent) {
    const data = ['https://covid-19-tributes.yourstory.com/covid-19-saviours/dr-marcus-ranney-and-dr-raina-ranney',
                'https://covid-19-tributes.yourstory.com/covid-19-saviours/dr-sunil-kumar-hebbi', 
                'https://covid-19-tributes.yourstory.com/covid-19-saviours/vivek-srivastava', 
                'https://covid-19-tributes.yourstory.com/covid-19-saviours/dr-ravi-malik-radix-healthcare-staff-in-new-delhi',
            'For More https://covid-19-tributes.yourstory.com/covid-19-saviours']
            .join('\n')
    agent.add(data);
}

function covidSurvivors (agent) {
    const data = ['https://covid-19-tributes.yourstory.com/covid-19-survivors/abhijit-bhave',
                'https://covid-19-tributes.yourstory.com/covid-19-survivors/family-beats-covid-together', 
                'https://covid-19-tributes.yourstory.com/covid-19-survivors/newborn-baby-in-odisha', 
                'https://covid-19-tributes.yourstory.com/covid-19-survivors/ankit-narang-mother-recovers',
            'For More https://covid-19-tributes.yourstory.com/covid-19-survivors']
            .join('\n')
    agent.add(data);
}

function covidMemorial (agent) {
    const data = ['https://covid-19-tributes.yourstory.com/covid-19-memorial/dr-prithvi-pal-singh',
                'https://covid-19-tributes.yourstory.com/covid-19-memorial/a-sons-ode-to-his-father-shri-madan-mohan-singhal', 
                'https://covid-19-tributes.yourstory.com/covid-19-memorial/a-sons-ode-to-his-father-kabal-singh', 
                'https://covid-19-tributes.yourstory.com/covid-19-memorial/sudesh-vasudev-tv-news-video-editor',
            'For More https://covid-19-tributes.yourstory.com/covid-19-memorial']
            .join('\n')
    agent.add(data);
}

function covidWarriors (agent) {
    const data = ['https://covid-19-tributes.yourstory.com/covid-19-warriors/lawyers-against-covifraud',
                'https://covid-19-tributes.yourstory.com/covid-19-warriors/here-i-am', 
                'https://covid-19-tributes.yourstory.com/covid-19-warriors/volunteers-covihelp', 
                'https://covid-19-tributes.yourstory.com/covid-19-warriors/yogesh-agarwal-cmd-rimjhim-ispat-limited',
            'For More https://covid-19-tributes.yourstory.com/covid-19-warriors']
            .join('\n')
    agent.add(data);
}

module.exports = {
    vaccineSlotAvailability,
    covidHelplineContacts,
    covidSaviours
}