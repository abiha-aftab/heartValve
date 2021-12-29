import React, { useState, useEffect } from 'react'

const marketoScriptId = 'mktoForms'

export default function FormBasic({ id }) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!document.getElementById(marketoScriptId)) {
      loadScript()
    } else {
      setIsLoaded(true)
    }
  }, [])

  useEffect(() => {
    isLoaded &&
      window.MktoForms2.loadForm('//info.edwards.com', '769-NOZ-917', id)
  }, [isLoaded, id])

  const loadScript = () => {
    let s = document.createElement('script')
    s.id = marketoScriptId
    s.type = 'text/javascript'
    s.async = true
    s.src = '//info.edwards.com/js/forms2/js/forms2.min.js'
    s.onreadystatechange = function () {
      if (this.readyState === 'complete' || this.readyState === 'loaded') {
        setIsLoaded(true)
      }
    }
    s.onload = () => setIsLoaded(true)
    document.getElementsByTagName('head')[0].appendChild(s)
  }

  return <form id={`mktoForm_${id}`}></form>
}
