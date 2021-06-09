const metaData = require('./metadata.js')
const fetch = require("node-fetch");

var teamArray = [];

async function fetchTeamMembers() {
  baseUrl = metaData.apiUrl + '/team-members?',
  restFields = '&_fields=id,acf&';
  try {
    const response = await Promise.all([
        fetch(baseUrl + 'page=1' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=2' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=3' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=4' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=5' + restFields).then((response) => response.json()),
        fetch(baseUrl + 'page=6' + restFields).then((response) => response.json()),
    ]);
    teamArray = [].concat(...response)
    return teamArray;
  } catch (error) {
    console.log(error);
  }
};

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
}

async function processTeamMembers(teamMembers) {
    return Promise.all(
        teamMembers.map(async (teamMember) => {
          if (teamMember.code !== "rest_post_invalid_page_number" && teamMember.acf.weight) {
            return await {
              id: teamMember.id,
              name: teamMember.acf.name,
              position: teamMember.acf.position,
              headshotImg: teamMember.acf.headshot.url,
              headshotAlt: teamMember.acf.headshot.alt,
              certifications: teamMember.acf.certifications,
              bio: teamMember.acf.bio,
              weight: teamMember.acf.weight
            };
          } else if (teamMember.code !== "rest_post_invalid_page_number") {
            return await {
              id: teamMember.id,
              position: teamMember.acf.position,
              headshotImg: teamMember.acf.headshot.url,
              headshotAlt: teamMember.acf.headshot.alt,
              certifications: teamMember.acf.certifications,
              bio: teamMember.acf.bio,
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
    const teamMembers = await fetchTeamMembers();
    const processedTeamMembers = await processTeamMembers(teamMembers);
    return processedTeamMembers;
};