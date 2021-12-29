import React from 'react'

const HeartBasicContent = ({ item }) => {
  return (
    <section>
      <h3>{item.name}</h3>

      <p>
        This section offers important information for people with heart valve
        disease. You’ll find an overview of the anatomy of the heart and its
        functions, as well as information about heart valve disease, possible
        treatment and surgical options and approaches.
      </p>
      <p>
        Please remember this information is not intended to tell you everything
        you need to know about heart valve disease, artificial heart valves and
        repair products, or surgical options and approaches. Regular check ups
        by a heart specialist are essential. Always consult your doctor when you
        have questions or concerns about your health.
      </p>
    </section>
  )
}

export default HeartBasicContent
