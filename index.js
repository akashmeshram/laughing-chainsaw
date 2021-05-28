const express = require('express')
// const { RevAiApiClient } = require('revai-node-sdk');
// const { getSubtitles } = require('youtube-captions-scraper');

const {vaccineSlotAvailability, covidHelplineContacts, covidSaviours} = require('./functions');

// let accessToken = `027cc_T6iNb5W8SjeAeVs2ViHNyyUpxOJFKOIOruAw5BQWGkWe1foG3lflrQf9oMxJRRP9a7outDHEgXrAKGCczN1ziPY`;
// let client = new RevAiApiClient(accessToken);
const axios = require('axios');

const app = express()
const port = 3000
app.get('/', (req, res) => {
   res.send("API working")
})

app.get('/chatbot', (req, res) => {
    covidSaviours();
    res.json("done")
})

app.get('/vaccine_slot', async (req, res) => {
    // Will take date and pin as param
    console.log(req.query.date, req.query.pin)
    const date = req.query.date || '28-05-2021';
    const pin = req.query.pin || '110001';
    const url = req.query.url || `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${date}`;
    axios.get(url)
        .then(function (response) {
            const {centers} = response.data;
            let data = [];
            if(centers && centers.length > 0) {
                data = centers.map((item) => [item.name, item.address, `from: ${item.from}`, `to: ${item.to}`, ' '].join('\n'));
            } else {
                res.send('')
            }
            res.send(data.join('\n'))
        })
        .catch(function (error) {
            console.log(error);
            const data = 'G.B.Pant Hospital DH SITE 2 \n .L.N Marg, Delhi Gate, New Delhi 110001 \n from: 09:00:00 \n from: 21:00:00'
            res.send(data)
        })
})

app.get('/algolia', async (req, res) => {
    // Will take date and pin as param
    console.log(req.query.q)
    const url = (req.query.q)? `http://localhost:3004/api/v2/search_results?q=${req.query.q}`: 'http://localhost:3004/api/v2/search_results?q=startup';
    axios.get(url)
        .then(function (response) {
            res.json(response.data)
        })
        .catch(function (error) {
            console.log(error);
            const data = 'data'
            res.send(data)
        })
})


// app.get('/transcript', async (req, res) => {
//     try {
//         if(req.query.url) {
//             var job = await client.submitJobUrl(req.query.url);
//             try {
//                 var transcriptObject = await client.getTranscriptObject(job.id);
//                 res.status(200).send(transcriptObject)
//             }
//             catch(e) {
//                 res.send(e);
//             }
//         } else {
//             res.status(200).send("No url added")
//         } 
//     }
//     catch(e) {
//         res.send(e);
//     }
//   })

// app.get('/textobject', async (req, res) => {
//     try {
//         const transcriptObject = await client.getTranscriptObject(req.query.id);
//         res.status(200).json(transcriptObject);
//     }
//     catch(e) {
//         res.send(e);
//     }
//   })

// app.get('/text', async (req, res) => {
//     try {
//         const transcriptText = await client.getTranscriptText(req.query.id);
//         res.status(200).json(transcriptText);
//     }
//     catch(e) {
//         res.send(e);
//     }
//   })

// app.get('/data', async(req, res) => {
//     try {
//         let data = await client.getListOfJobs(10);
//         res.send(data)
//     }
//     catch(e) {
//         res.send(e);
//     }
// })

// app.get('/youtube', async (req, res) => {
//     try {
//         const  transcriptText = await getSubtitles({
//             videoID: `${req.query.id}`
//           })
//         res.status(200).json(transcriptText);
//     }
//     catch(e) {
//         res.send(e);
//     }
// })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})