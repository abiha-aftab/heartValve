import React from "react"
import HeroLarge from "./variants/HeroLarge"
import HeroSmall from "./variants/HeroSmall"

const Hero = ({ data }) => {
  switch (data.variant) {
    case "Large":
      return <HeroLarge data={data} />
    case "Small":
      return <HeroSmall data={data} />
  }
}

export default Hero
