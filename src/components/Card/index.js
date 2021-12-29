import React from "react"
import CardBasic from "./variants/CardBasic"

const Card = ({ data }) => {
  switch (data.variant) {
    case "Basic":
      return <CardBasic data={data} />
  }
}

export default Card
