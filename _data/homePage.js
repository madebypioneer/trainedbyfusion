const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchHomePage() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,modified,slug,yoast_head,template,acf&slug=home';
    cacheInterval = metaData.cacheInterval;
    try {
        return AssetCache(
            urlToCache,
            {
                duration: cacheInterval,
                type: "json"
            }
        );
    } catch (error) {
        console.error(`Error: ${error}`);
        return [];
    }
}

async function processHomePage(homePage) {
    return await {
        id: homePage[0].id,
        title: homePage[0].title.rendered,
        modified: homePage[0].modified,
        slug: homePage[0].slug,
        yoast: homePage[0].yoast_head,
        template: homePage[0].template,
        heroImg: homePage[0].acf.hero.background_image.url,
        heroImgAlt: homePage[0].acf.hero.background_image.alt,
        heroTitle: homePage[0].acf.hero.title,
        heroButtonText: homePage[0].acf.hero.button.text,
        heroButtonLink: homePage[0].acf.hero.button.link,
        ourProgramsTitle: homePage[0].acf.our_programs.title,
        ourProgramsParagraph: homePage[0].acf.our_programs.paragraph,
        ourProgramsButtonText: homePage[0].acf.our_programs.button.text,
        ourProgramsButtonLink: homePage[0].acf.our_programs.button.link,
        aboutFusionTitle: homePage[0].acf.about_fusion_fitness.title,
        aboutFusionBoxes: homePage[0].acf.about_fusion_fitness.boxes,
        worthItTitle: homePage[0].acf.membership_worth_it.title,
        worthItParagraph: homePage[0].acf.membership_worth_it.paragraph,
        worthItIconBoxes: homePage[0].acf.membership_worth_it.icon_boxes,
        worthItFilledButtonText: homePage[0].acf.membership_worth_it.buttons.filled.text,
        worthItFilledButtonLink: homePage[0].acf.membership_worth_it.buttons.filled.link,
        worthItOutlineButtonText: homePage[0].acf.membership_worth_it.buttons.outline.text,
        worthItOutlineButtonLink: homePage[0].acf.membership_worth_it.buttons.outline.link,
    };
}

module.exports = async () => {
    const homePage = await fetchHomePage();
    const processedHomePage = await processHomePage(homePage);
    return processedHomePage;
};