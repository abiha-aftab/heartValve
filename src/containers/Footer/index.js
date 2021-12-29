import React from 'react'
import FooterDefault from './variants/FooterDefault'
import FooterRegional from './variants/FooterRegional'

const Hero = ({ data }) => {
  switch (data.variant) {
    case 'Default':
      return <FooterDefault data={data} />
    case 'Regional':
      return <FooterRegional data={data} />
  }
}

export default Hero
