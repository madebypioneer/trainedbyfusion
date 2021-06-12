const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var testimonialArray = [];

async function fetchTestimonials() {
  baseUrl = metaData.apiUrl + '/testimonials?',
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
    testimonialArray = [].concat(...response)
    return testimonialArray;
  } catch (error) {
    console.log(error);
  }
};

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
}

async function processTestimonials(testimonials) {
    return Promise.all(
        testimonials.map(async (testimonial) => {
          if (testimonial.code !== "rest_post_invalid_page_number" && testimonial.acf.weight) {
            return await {
              id: testimonial.id,
              title: testimonial.title.rendered,
              name: testimonial.acf.name,
              excerpt: testimonial.acf.excerpt,
              fullText: testimonial.acf.full_testimonial,
              img: testimonial.acf.image.url,
              imgAlt: testimonial.acf.image.alt,
              weight: testimonial.acf.weight
            };
          } else if (testimonial.code !== "rest_post_invalid_page_number") {
            return await {
              id: testimonial.id,
              title: testimonial.title.rendered,
              name: testimonial.acf.name,
              excerpt: testimonial.acf.excerpt,
              fullText: testimonial.acf.full_testimonial,
              img: testimonial.acf.image.url,
              imgAlt: testimonial.acf.image.alt,
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
    const testimonials = await fetchTestimonials();
    const processedTestimonials = await processTestimonials(testimonials);
    return processedTestimonials;
};