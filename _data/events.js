const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var eventArray = [];

async function fetchEvents() {
  baseUrl = metaData.apiUrl + '/events?',
  restFields = '&_fields=id,title,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    eventArray = [].concat(...response)
    return eventArray;
  } catch (error) {
    console.log(error);
  }
};

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
}

async function processEvents(events) {
    return Promise.all(
        events.map(async (event) => {
          if (event.code !== "rest_post_invalid_page_number" && event.acf.weight) {
            return await {
              id: event.id,
              title: event.title.rendered,
              img: event.acf.image.url,
              imgAlt: event.acf.image.alt,
              name: event.acf.event_name,
              description: event.acf.short_description,
              buttonText: event.acf.button.text,
              buttonLink: event.acf.button.link,
              weight: event.acf.weight
            };
          } else if (event.code !== "rest_post_invalid_page_number") {
            return await {
              id: event.id,
              title: event.title.rendered,
              img: event.acf.image.url,
              imgAlt: event.acf.image.alt,
              name: event.acf.event_name,
              description: event.acf.short_description,
              buttonText: event.acf.button.text,
              buttonLink: event.acf.button.link,
              weight: randomNumber(999, 99999),
            };
          } else {
            return await {
                disabled: true,
            };
          }
        })
    );
}

module.exports = async () => {
    const events = await fetchEvents();
    const processedEvents = await processEvents(events);
    return processedEvents;
};