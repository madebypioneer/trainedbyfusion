const metaData = require('./metadata.js')
const AssetCache = require("@11ty/eleventy-cache-assets");

async function fetchPages() {
    urlToCache = metaData.apiUrl + '/pages?_fields=id,title,slug,yoast_head,template,acf&per_page=100&exclude=13,17';
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

function randomNumber(min, max) {  
  return Math.random() * (max - min) + min; 
}

async function processPages(wpages) {
    return Promise.all(
        wpages.map(async (wpage) => {
            if (wpage.template == "templates/thank-you.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero_section.title,
                    heroParagraph: wpage.acf.hero_section.paragraph,
                    heroButtonText: wpage.acf.hero_section.button.text,
                    heroButtonLink: wpage.acf.hero_section.button.link
                };
            } else if (wpage.template == "templates/about.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroImg: wpage.acf.hero.image.url,
                    heroImgAlt: wpage.acf.hero.image.alt,
                    heroTitle: wpage.acf.hero.title,
                    heroParagraph: wpage.acf.hero.paragraph,
                    historyTitle: wpage.acf.history_section.title,
                    historyParagraph: wpage.acf.history_section.paragraph,
                    valuesList: wpage.acf.values_list.value,
                    afterValuesBoxes: wpage.acf.after_values_boxes.boxes
                };
            } else if (wpage.template == "templates/members.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroImg: wpage.acf.hero.image.url,
                    heroImgAlt: wpage.acf.hero.image.alt,
                    heroParagraph: wpage.acf.hero.paragraph,
                    resourcesButtons: wpage.acf.resource_button
                };
            } else if (wpage.template == "templates/single-program.php") {
                if (wpage.acf.listing_weight) {
                    return await {
                        id: wpage.id,
                        title: wpage.title.rendered,
                        slug: wpage.slug,
                        yoast: wpage.yoast_head,
                        template: wpage.template,
                        homePageSliderImg: wpage.acf.homepage_slider_content.image.url,
                        homePageSliderImgAlt: wpage.acf.homepage_slider_content.image.alt,
                        homePageSliderTitle: wpage.acf.homepage_slider_content.title,
                        homePageSliderParagraph: wpage.acf.homepage_slider_content.paragraph,
                        homePageSliderButtonText: wpage.acf.homepage_slider_content.button.text,
                        homePageSliderButtonLink: wpage.acf.homepage_slider_content.button.link,
                        listingPageImg: wpage.acf.listing_page_content.image.url,
                        listingPageImgAlt: wpage.acf.listing_page_content.image.alt,
                        listingPageTitle: wpage.acf.listing_page_content.title,
                        listingPageParagraph: wpage.acf.listing_page_content.paragraph,
                        listingPageButtonText: wpage.acf.listing_page_content.button.text,
                        listingPageButtonLink: wpage.acf.listing_page_content.button.link,
                        singlePageHeroImg: wpage.acf.single_page_content.hero.image.url,
                        singlePageHeroImgAlt: wpage.acf.single_page_content.hero.image.alt,
                        singlePageHeroTitle: wpage.acf.single_page_content.hero.title,
                        singlePageHeroParagraph: wpage.acf.single_page_content.hero.paragraph,
                        singlePageHeroFilledButtonText: wpage.acf.single_page_content.hero.buttons.filled.text,
                        singlePageHeroFilledButtonLink: wpage.acf.single_page_content.hero.buttons.filled.link,
                        singlePageHeroTextButtonText: wpage.acf.single_page_content.hero.buttons.text_button.text,
                        singlePageHeroTextButtonLink: wpage.acf.single_page_content.hero.buttons.text_button.link,
                        singlePageActivityImgs: wpage.acf.single_page_content.activity_photos,
                        weight: wpage.acf.listing_weight,
                    };
                } else {
                    return await {
                        id: wpage.id,
                        title: wpage.title.rendered,
                        slug: wpage.slug,
                        yoast: wpage.yoast_head,
                        template: wpage.template,
                        homePageSliderImg: wpage.acf.homepage_slider_content.image.url,
                        homePageSliderImgAlt: wpage.acf.homepage_slider_content.image.alt,
                        homePageSliderTitle: wpage.acf.homepage_slider_content.title,
                        homePageSliderParagraph: wpage.acf.homepage_slider_content.paragraph,
                        homePageSliderButtonText: wpage.acf.homepage_slider_content.button.text,
                        homePageSliderButtonLink: wpage.acf.homepage_slider_content.button.link,
                        listingPageImg: wpage.acf.listing_page_content.image.url,
                        listingPageImgAlt: wpage.acf.listing_page_content.image.alt,
                        listingPageTitle: wpage.acf.listing_page_content.title,
                        listingPageParagraph: wpage.acf.listing_page_content.paragraph,
                        listingPageButtonText: wpage.acf.listing_page_content.button.text,
                        listingPageButtonLink: wpage.acf.listing_page_content.button.link,
                        singlePageHeroImg: wpage.acf.single_page_content.hero.image.url,
                        singlePageHeroImgAlt: wpage.acf.single_page_content.hero.image.alt,
                        singlePageHeroTitle: wpage.acf.single_page_content.hero.title,
                        singlePageHeroParagraph: wpage.acf.single_page_content.hero.paragraph,
                        singlePageHeroFilledButtonText: wpage.acf.single_page_content.hero.buttons.filled.text,
                        singlePageHeroFilledButtonLink: wpage.acf.single_page_content.hero.buttons.filled.link,
                        singlePageHeroTextButtonText: wpage.acf.single_page_content.hero.buttons.text_button.text,
                        singlePageHeroTextButtonLink: wpage.acf.single_page_content.hero.buttons.text_button.link,
                        singlePageActivityImgs: wpage.acf.single_page_content.activity_photos,
                        weight: randomNumber(999, 99999),
                    };
                }
            } else if (wpage.template == "templates/programs.php") {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                    heroTitle: wpage.acf.hero.title,
                    heroParagraph: wpage.acf.hero.paragraph,
                    heroButtonText: wpage.acf.hero.button.text,
                    heroButtonLink: wpage.acf.hero.button.link,
                };
            } else {
                return await {
                    id: wpage.id,
                    title: wpage.title.rendered,
                    slug: wpage.slug,
                    yoast: wpage.yoast_head,
                    template: wpage.template,
                };
            }
        })
    );
}

module.exports = async () => {
    const wpages = await fetchPages();
    const processedWPages = await processPages(wpages);
    return processedWPages;
};