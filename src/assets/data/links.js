import React from 'react'
import { FaHeartbeat, FaUserMd } from 'react-icons/fa'

export const navLinks = [
  {
    name: 'Home',
    url: '/',
    links: [],
  },
  {
    name: 'Heart Basics',
    url: '/heart-basics/',
    links: [
      {
        name: 'Heart Basics',
        url: '/heart-basics/',
      },
      {
        name: 'Heart anatomy',
        url: '/heart-basics/heart-anatomy/',
      },
      {
        name: 'Heart valves',
        url: '/heart-basics/heart-valves/',
      },
      {
        name: 'Valve diseases',
        url: '/heart-basics/valve-diseases/',
      },
      {
        name: 'Disease diagnosis',
        url: '/heart-basics/disease-diagnosis/',
      },
      {
        name: 'Your medical team',
        url: '/heart-basics/your-medical-team/',
      },
      {
        name: 'FAQs',
        url: '/heart-basics/faqs/',
      },
    ],
  },
  {
    name: 'Treatment Options',
    url: '/treatment-options/',
    links: [
      {
        name: 'Treatment Options',
        url: '/treatment-options/',
      },
      {
        name: 'With medication',
        url: '/treatment-options/with-medication/',
      },
      {
        name: 'Open chest',
        url: '/treatment-options/open-chest/',
      },
      {
        name: 'Minimal incision',
        url: '/treatment-options/minimal-incision/',
      },
      {
        name: 'Trancatheter approach (TAVR)',
        url: 'https://newheartvalve.com/understand-aortic-stenosis/treatment-options/',
      },
    ],
  },
]

export const cardLinks = [
  {
    title: 'Heart Basics',
    icon: <FaHeartbeat className="icon" color="#c8102e" size="100" />,
    description:
      'What you should know about your heart and heart valve diseases',
    cta_text: 'Learn more',
    cta_link: '/',
    variant: 'Basic',
  },
  {
    title: 'Treament Options',
    icon: <FaUserMd className="icon" color="#c8102e" size="100" />,
    description: 'Treatment options for heart valve disease',
    cta_text: 'Learn more',
    cta_link: '/',
    variant: 'Basic',
  },
]

export const homeHero = {
  title: 'Stay Healthy and Well Informed',
  description:
    'Welcome to YourHeartValve.com, the heart valve patient’s comprehensive resource for information from Edwards Lifesciences',
  cta_text_1: 'How do heart valves work?',
  cta_text_2: 'Treament options?',
}

export const footerLinks = [
  {
    title: 'Heart Basics',
    url: '/heart-basics/',
    links: [
      { title: 'Heart anatomy', url: '/heart-basics/heart-anatomy/' },
      { title: 'Heart valves', url: '/heart-basics/heart-valves/' },
      { title: 'Valve diseases', url: '/heart-basics/valve-diseases/' },
      { title: 'Disease diagnosis', url: '/heart-basics/disease-diagnosis/' },
      { title: 'Your medical team', url: '/heart-basics/your-medical-team/' },
      { title: 'FAQs', url: '/heart-basics/faqs/' },
    ],
  },
  {
    title: 'Treatment Options',
    url: '/',
    links: [
      { title: 'With medication', url: '/' },
      { title: 'Open chest', url: '/' },
      { title: 'Minimal incision', url: '/' },
      { title: 'Transcatheter approach (TAVR) on NewHeartValve.com', url: '/' },
    ],
  },
  {
    title: 'Privacy Policy',
    url: '/privacy-policy/',
    links: [
      {
        title: 'On-line information',
        url: '/privacy-policy/on-line-information/',
      },
      {
        title: 'Disclosure of information',
        url: '/privacy-policy/disclosure-of-information/',
      },
      { title: 'Cookies', url: '/privacy-policy/cookies/' },
      { title: 'Children under 13', url: '/privacy-policy/children-under-13/' },
      { title: 'Security', url: '/privacy-policy/security/' },
      { title: 'Policy change', url: '/privacy-policy/policy-change/' },
    ],
  },
  {
    title: 'Important Links',
    url: '/',
    links: [
      { title: 'Contact us', url: '/contact-us/' },
      { title: 'Legal Terms', url: '/legal-terms/' },
      { title: 'Site Map', url: '/' },
      {
        title: 'Do not sell my information',
        url: 'https://www.edwards.com/legal/CCPA-online-privacy-policy-form',
      },
    ],
  },
]

export const heartBasicsSidebar = [
  {
    name: 'Heart anatomy',

    url: '/heart-basics/heart-anatomy/',
  },

  {
    name: 'Heart valves',

    url: '/heart-basics/heart-valves/',
  },

  {
    name: 'Valve diseases',

    url: '/heart-basics/valve-diseases/',
  },

  {
    name: 'Disease diagnosis',

    url: '/heart-basics/disease-diagnosis/',
  },

  {
    name: 'Your medical team',

    url: '/heart-basics/your-medical-team/',
  },

  {
    name: 'FAQs',

    url: '/heart-basics/faqs/',
  },
]

export const treatmentOptionsSidebar = [
  {
    name: 'Current treatments',
    url: '/',
  },
  {
    name: 'With medication',
    url: '/treatment-options/with-medication/',
  },
  {
    name: 'Open chest',
    url: '/treatment-options/open-chest/',
  },
  {
    name: 'Minimal incision',
    url: '/treatment-options/minimal-incision/',
  },
  {
    name: 'Trancatheter approach (TAVR) on NewHeartValve.com',
    url: 'https://newheartvalve.com/understand-aortic-stenosis/treatment-options/',
  },
]

export const sidebarLinks = {
  'heart-basics': [
    { name: 'Heart Basics', url: '/heart-basics/' },
    { name: 'Heart anatomy', url: '/heart-basics/heart-anatomy/' },
    { name: 'Heart valves', url: '/heart-basics/heart-valves/' },
    { name: 'Valve diseases', url: '/heart-basics/valve-diseases/' },
    { name: 'Disease diagnosis', url: '/heart-basics/disease-diagnosis/' },
    { name: 'Your medical team', url: '/heart-basics/your-medical-team/' },
    { name: 'FAQs', url: '/heart-basics/faqs/' },
  ],
  'treatment-options': [
    { name: 'Current treatments', url: '/' },
    { name: 'With medication', url: '/treatment-options/with-medication/' },
    { name: 'Open chest', url: '/treatment-options/open-chest/' },
    { name: 'Minimal incision', url: '/treatment-options/minimal-incision/' },
    {
      name: 'Trancatheter approach (TAVR) on NewHeartValve.com',
      url: 'https://newheartvalve.com/understand-aortic-stenosis/treatment-options/',
    },
  ],
  'privacy-policy': [
    { name: 'Privacy Policy', url: '/privacy-policy/' },
    {
      name: 'On-line information',
      url: '/privacy-policy/on-line-information/',
    },
    {
      name: 'Disclosure of information',
      url: '/privacy-policy/disclosure-of-information/',
    },
    { name: 'Cookies', url: '/privacy-policy/cookies/' },
    { name: 'Children under 13', url: '/privacy-policy/children-under-13/' },
    { name: 'Security', url: '/privacy-policy/security/' },
    { name: 'Policy change', url: '/privacy-policy/policy-change/' },
  ],
  'legal-terms': [
    { name: 'Legal Terms', url: '/legal-terms/' },
    {
      name: 'Copyrights / Trademarks',
      url: '/legal-terms/copyright-trademarks/',
    },
    { name: 'Disclaimers', url: '/legal-terms/disclaimers/' },
    { name: 'Third-party links', url: '/legal-terms/third-party-links/' },
    { name: 'Submissions', url: '/legal-terms/submissions/' },
    { name: 'Forward statements', url: '/legal-terms/forward-statements/' },
    { name: 'Applicable laws', url: '/legal-terms/applicable-laws/' },
    { name: 'IP Infringement', url: '/legal-terms/ip-infringement/' },
    { name: 'Posted content', url: '/legal-terms/posted-content/' },
    { name: 'Miscellaneous', url: '/legal-terms/miscellaneous/' },
  ],
  'contact-us': [
    {
      name: 'Contact us',
      url: '/contact-us/',
    },
    {
      name: 'Healthcare Professionals',
      url: '/contact-us/healthcare-professionals/',
    },
    {
      name: 'Patients & Caregivers',
      url: '/contact-us/patients-and-caregivers/',
    },
    {
      name: 'General Contact Inquiries',
      url: '/contact-us/general-contact-inquiries/',
    },
    {
      name: 'Customer Service',
      url: '/contact-us/customer-service/',
    },
    {
      name: 'Media',
      url: '/contact-us/media/',
    },
    {
      name: 'Investor',
      url: '/contact-us/investor/',
    },
    {
      name: 'Technical Support',
      url: '/contact-us/technical-support/',
    },
    {
      name: 'Global Locations',
      url: '/contact-us/global-locations/',
    },
  ],
}
