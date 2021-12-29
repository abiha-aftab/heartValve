// Offline fixture content for the YourHeartValve Kontent project.
//
// The content types mirror what the site's GraphQL queries expect. The copy is
// written for demos and tests: it is not fetched from, or synced with, the
// production Kontent project.
const fs = require('fs')
const path = require('path')
const { toDeliveryItem, toDeliveryType } = require('./delivery')

const ROOT = path.resolve(__dirname, '../..')

const contentTypes = {
  home_template: {
    title: 'text',
    slug: 'url_slug',
    page_banner: 'modular_content',
    patient_information: 'modular_content',
    heart_anatomy: 'modular_content',
  },
  page_template: {
    title: 'text',
    slug: 'url_slug',
    topics: 'taxonomy',
    image: 'modular_content',
    aside_menu: 'modular_content',
    body: 'rich_text',
    accordions: 'modular_content',
    modal: 'modular_content',
    marketo_form: 'modular_content',
    dropdown: 'modular_content',
  },
  header: {
    logo: 'modular_content',
    menu: 'modular_content',
    language_selector: 'text',
    head_scripts: 'text',
    body_scripts: 'text',
  },
  footer: { text: 'rich_text', menu: 'modular_content' },
  link: { title: 'text', url: 'text' },
  menu_items: { title: 'text', slug: 'text', links: 'modular_content' },
  menu_group: { title: 'text', menu_items: 'modular_content' },
  image: { alt: 'text', asset: 'asset' },
  anchor: { name: 'text', url: 'text', aria_label: 'text' },
  card: {
    name: 'text',
    description: 'text',
    image: 'modular_content',
    anchor: 'modular_content',
  },
  section: {
    body: 'rich_text',
    cards: 'modular_content',
    anchors: 'modular_content',
    images: 'modular_content',
  },
  accordion: { accordion_items: 'modular_content' },
  accordion_item: { title: 'text', description: 'rich_text' },
  modal: { toggle_text: 'text', title: 'text', body: 'rich_text' },
  marketo_form: {
    id: 'text',
    url: 'text',
    success_message: 'text',
    error_message: 'text',
    footnotes: 'rich_text',
  },
  dropdown: { title: 'text', items: 'modular_content' },
  dropdown_item: { title: 'text', url: 'text' },
  summaries: { rich_text: 'modular_content' },
  summary: { rich_text: 'rich_text' },
}

// Files copied to /kontent-fixtures/ by the kontent-offline plugin.
const assetFiles = {
  'banner-home.jpeg': {
    source: 'src/assets/images/banner-home.jpeg',
    width: 1536,
    height: 1024,
  },
  'page-banner.jpeg': {
    source: 'src/assets/images/page-banner.jpeg',
    width: 2000,
    height: 300,
  },
  'patient-doctor.jpeg': {
    source: 'src/assets/images/yhv-patient-doctor.jpeg',
    width: 540,
    height: 360,
  },
  'icon-heart.svg': {
    source: 'fixtures/kontent/assets/icon-heart.svg',
    width: 110,
    height: 92,
  },
  'icon-treatment.svg': {
    source: 'fixtures/kontent/assets/icon-treatment.svg',
    width: 110,
    height: 92,
  },
}

const asset = (file, description) => {
  const { source, width, height } = assetFiles[file]
  return {
    file,
    description,
    width,
    height,
    size: fs.statSync(path.join(ROOT, source)).size,
    mime: file.endsWith('.svg') ? 'image/svg+xml' : 'image/jpeg',
  }
}

const component = (codename) =>
  `<object type="application/kenticocloud" data-type="item" data-rel="component" data-codename="${codename}"></object>`

const DISCLAIMER =
  'Much of the information on this website relates to products and services offered by Edwards Lifesciences. The material on this website is for general information only and cannot replace the relationship you have with your doctor. Always talk to your doctor for diagnosis and treatment.'

// Each entry: [type, codename, values] or [type, codename, values, language].
const entries = [
  // Shared images, anchors and menus
  ['image', 'img_banner_home', {
    alt: 'Smiling man in a cowboy hat standing in front of a snowy barn',
    asset: [asset('banner-home.jpeg')],
  }],
  ['image', 'img_page_banner', {
    alt: '',
    asset: [asset('page-banner.jpeg')],
  }],
  ['image', 'img_patient_doctor', {
    alt: 'A patient talking with her doctor',
    asset: [asset('patient-doctor.jpeg')],
  }],
  ['image', 'img_icon_heart', { alt: '', asset: [asset('icon-heart.svg')] }],
  ['image', 'img_icon_treatment', { alt: '', asset: [asset('icon-treatment.svg')] }],

  ['link', 'tavr_link', {
    title: 'Transcatheter approach (TAVR)',
    url: 'https://newheartvalve.com/understand-aortic-stenosis/treatment-options/',
  }],
  ['menu_items', 'heart_basics_menu', {
    title: 'Heart Basics',
    slug: 'heart-basics',
    links: ['heart_basics', 'heart_anatomy', 'heart_valves'],
  }],
  ['menu_items', 'treatment_menu', {
    title: 'Treatment Options',
    slug: 'treatment-options',
    links: ['treatment_options', 'with_medication', 'minimal_incision', 'tavr_link'],
  }],
  ['menu_group', 'treatment_group', {
    title: 'Treatment options',
    menu_items: ['treatment_menu'],
  }],
  ['menu_items', 'important_links_menu', {
    title: 'Important links',
    slug: '',
    links: ['contact_us', 'site_map'],
  }],

  ['header', 'header', {
    logo: [],
    menu: ['home', 'heart_basics_menu', 'treatment_menu'],
    language_selector: 'Countries',
  }],
  ['footer', 'footer', {
    text: `<p>${DISCLAIMER}</p><p>Offline fixture content for development and screenshots.</p>`,
    menu: ['heart_basics_menu', 'treatment_menu', 'important_links_menu'],
  }],

  // Home page
  ['anchor', 'anchor_how_valves_work', {
    name: 'How do heart valves work?',
    url: '/heart-basics/heart-valves',
  }],
  ['anchor', 'anchor_treatments', {
    name: 'Treatment options',
    url: '/treatment-options',
  }],
  ['section', 'home_banner', {
    body: '<h1>Stay healthy and well informed</h1><p>Welcome to YourHeartValve, the heart valve patient’s resource for information from Edwards Lifesciences.</p>',
    anchors: ['anchor_how_valves_work', 'anchor_treatments'],
    images: ['img_banner_home'],
  }],
  ['anchor', 'anchor_card_heart_basics', {
    name: 'Learn more',
    url: '/heart-basics',
    aria_label: 'Learn more about heart basics',
  }],
  ['anchor', 'anchor_card_treatments', {
    name: 'Learn more',
    url: '/treatment-options',
    aria_label: 'Learn more about treatment options',
  }],
  ['card', 'card_heart_basics', {
    name: 'Heart Basics',
    description: 'What you should know about your heart and heart valve disease.',
    image: ['img_icon_heart'],
    anchor: ['anchor_card_heart_basics'],
  }],
  ['card', 'card_treatments', {
    name: 'Treatment Options',
    description: 'How heart valve disease is treated, from medication to surgery.',
    image: ['img_icon_treatment'],
    anchor: ['anchor_card_treatments'],
  }],
  ['section', 'patient_information', {
    body: '<p>A patient information resource from Edwards Lifesciences, the leader in heart valve therapy.</p>',
    cards: ['card_heart_basics', 'card_treatments'],
  }],
  ['anchor', 'anchor_heart_anatomy', {
    name: 'Explore heart anatomy',
    url: '/heart-basics/heart-anatomy',
  }],
  ['section', 'heart_anatomy_intro', {
    body: '<h2>How your heart works</h2><p>Your heart has four valves. Each one opens and closes with every heartbeat so that blood flows in one direction through the heart’s four chambers.</p>',
    anchors: ['anchor_heart_anatomy'],
    images: ['img_patient_doctor'],
  }],
  ['home_template', 'home', {
    title: 'Home',
    slug: '/',
    page_banner: ['home_banner'],
    patient_information: ['patient_information'],
    heart_anatomy: ['heart_anatomy_intro'],
  }],

  // Heart basics
  ['modal', 'disclaimer_modal', {
    toggle_text: 'This information is not a substitute for talking with your doctor.',
    title: 'Disclaimer',
    body: `<p>${DISCLAIMER}</p><p>Rx only. See instructions for use for full prescribing information.</p>`,
  }],
  ['accordion_item', 'faq_what_is_a_valve', {
    title: 'What is a heart valve?',
    description: '<p>Your heart has four valves: the mitral and aortic valves on the left side, and the tricuspid and pulmonic valves on the right. Their leaflets close to stop blood flowing backwards between the heart’s chambers.</p>',
  }],
  ['accordion_item', 'faq_open_close', {
    title: 'When do the heart valves open and close?',
    description: '<p>The “lubb-dubb” of a heartbeat is the sound of the valves closing: first the mitral and tricuspid valves, then the aortic and pulmonic valves.</p>',
  }],
  ['accordion_item', 'faq_how_often', {
    title: 'How often do my heart valves open and close?',
    description: '<p>The average heart beats about 100,000 times a day, which is more than 2.5 billion beats over 70 years.</p>',
  }],
  ['accordion', 'heart_faq', {
    accordion_items: ['faq_what_is_a_valve', 'faq_open_close', 'faq_how_often'],
  }],
  ['summary', 'valves_left', {
    rich_text: '<h3>Left side</h3><p>The <strong>mitral valve</strong> and the <strong>aortic valve</strong> control blood leaving the lungs and going out to the body.</p>',
  }],
  ['summary', 'valves_right', {
    rich_text: '<h3>Right side</h3><p>The <strong>tricuspid valve</strong> and the <strong>pulmonic valve</strong> control blood returning from the body and going to the lungs.</p>',
  }],
  ['summaries', 'valves_columns', { rich_text: ['valves_left', 'valves_right'] }],

  ['page_template', 'heart_basics', {
    title: 'Heart Basics',
    slug: 'heart-basics',
    topics: ['Heart Basics'],
    image: ['img_page_banner'],
    aside_menu: ['heart_basics_menu'],
    body: '<p>This section covers the anatomy of the heart, how heart valve disease develops, and the treatment options you may discuss with your doctor.</p><p>Regular check-ups with a heart specialist are essential. Always consult your doctor when you have questions about your health.</p>',
  }],
  ['page_template', 'heart_anatomy', {
    title: 'Heart anatomy',
    slug: 'heart-anatomy',
    topics: ['Heart Basics'],
    image: ['img_page_banner'],
    aside_menu: ['heart_basics_menu'],
    body: '<p>Your heart is a muscle about the size of two clasped hands. It pumps blood through four chambers, and four valves keep that blood moving in the right direction.</p>',
    accordions: ['heart_faq'],
    modal: ['disclaimer_modal'],
  }],
  ['page_template', 'heart_valves', {
    title: 'Heart valves',
    slug: 'heart-valves',
    topics: ['Heart Basics'],
    aside_menu: ['heart_basics_menu'],
    body: `<p>Each valve has flaps of tissue, called leaflets, that open and close once per heartbeat.</p>${component('valves_columns')}`,
    modal: ['disclaimer_modal'],
  }],

  // Treatment options
  ['dropdown_item', 'dropdown_with_medication', {
    title: 'With medication',
    url: 'with-medication',
  }],
  ['dropdown_item', 'dropdown_minimal_incision', {
    title: 'Minimal incision',
    url: 'minimal-incision',
  }],
  ['dropdown', 'treatment_dropdown', {
    title: 'Explore treatments',
    items: ['dropdown_with_medication', 'dropdown_minimal_incision'],
  }],
  ['page_template', 'treatment_options', {
    title: 'Treatment Options',
    slug: 'treatment-options',
    topics: ['Treatment Options'],
    image: ['img_page_banner'],
    aside_menu: ['treatment_group'],
    body: '<p>Your doctor will recommend a treatment based on which valve is affected, how severe the disease is, and your overall health.</p>',
    dropdown: ['treatment_dropdown'],
  }],
  ['page_template', 'with_medication', {
    title: 'With medication',
    slug: 'with-medication',
    topics: ['Treatment Options'],
    aside_menu: ['treatment_group'],
    body: '<p>Medication can ease symptoms of heart valve disease, but it cannot repair a damaged valve.</p>',
    modal: ['disclaimer_modal'],
  }],
  ['page_template', 'minimal_incision', {
    title: 'Minimal incision',
    slug: 'minimal-incision',
    topics: ['Treatment Options'],
    aside_menu: ['treatment_group'],
    body: '<p>Some valve operations can be done through a smaller incision than traditional open-chest surgery, which may shorten recovery.</p>',
    modal: ['disclaimer_modal'],
  }],

  // Utility pages
  ['page_template', 'contact_us', {
    title: 'Contact us',
    slug: 'contact-us',
    topics: ['Contact us'],
    aside_menu: ['important_links_menu'],
    body: '<p>For questions about Edwards Lifesciences products, contact Edwards Lifesciences customer service.</p>',
  }],
  ['page_template', 'site_map', {
    title: 'Site map',
    slug: 'site-map',
    image: ['img_page_banner'],
  }],

  // German regional variants
  ['header', 'header', {
    logo: [],
    menu: ['de_home', 'de_heart_valves'],
    language_selector: 'Länder',
  }, 'de'],
  ['menu_items', 'de_footer_menu', {
    title: 'Links',
    slug: 'de',
    links: ['de_heart_valves', 'site_map'],
  }, 'de'],
  ['footer', 'footer', {
    text: '<p>Die Informationen auf dieser Website ersetzen nicht das Gespräch mit Ihrem Arzt.</p><p>Offline-Testinhalte für Entwicklung und Screenshots.</p>',
    menu: ['de_footer_menu'],
  }, 'de'],
  ['menu_items', 'de_aside_menu', {
    title: 'Herzklappen',
    slug: 'regional-aside-menu',
    links: ['de_home', 'de_heart_valves'],
  }, 'de'],
  ['page_template', 'de_home', {
    title: 'Startseite',
    slug: 'home',
    topics: ['Regional'],
    image: ['img_page_banner'],
    aside_menu: ['de_aside_menu'],
    body: '<p>Willkommen bei YourHeartValve, der Informationsquelle für Patientinnen und Patienten mit Herzklappenerkrankungen.</p>',
  }, 'de'],
  ['page_template', 'de_heart_valves', {
    title: 'Herzklappen',
    slug: 'herzklappen',
    topics: ['Regional'],
    aside_menu: ['de_aside_menu'],
    body: '<p>Ihr Herz hat vier Klappen, die sich bei jedem Herzschlag öffnen und schließen.</p>',
  }, 'de'],
  ['page_template', 'site_map', {
    title: 'Sitemap',
    slug: 'site-map',
    image: ['img_page_banner'],
  }, 'de'],
]

const variants = entries.map(([type, codename, values, language = 'default']) =>
  toDeliveryItem(contentTypes, { type, codename, values, language })
)

// Mirrors the Delivery API's language fallback: an item without a variant in
// the requested language is returned in the default language.
const itemsForLanguage = (language) => {
  const own = variants.filter((item) => item.system.language === language)
  const ownCodenames = new Set(own.map((item) => item.system.codename))
  const fallback = variants.filter(
    (item) =>
      item.system.language === 'default' &&
      !ownCodenames.has(item.system.codename)
  )
  return language === 'default' ? own : [...own, ...fallback]
}

const deliveryTypes = Object.entries(contentTypes).map(([codename, elements]) =>
  toDeliveryType(codename, elements)
)

module.exports = { assetFiles, contentTypes, deliveryTypes, itemsForLanguage }
