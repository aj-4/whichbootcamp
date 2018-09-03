import {parseBootcampFields, mapStateToSurvey} from '../utils/mappers'

export const fetchBootcamps = () => {
    return fetch('/api/bootcamps')
      .then(res => res.json())
      .then(bcJSON => parseBootcampFields(bcJSON))
}

export const submitSurvey = state => {
    const surveyData = mapStateToSurvey(state);
    return fetch('/api/review', {
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        method: 'POST',
        body: JSON.stringify(surveyData)
    }).then(res => {
      return res.json()
    })
      .catch(err => console.log('ERROR IN SUBMIT', err))
}

export const submitFeedback = (feedback, feedbackType) => {
  return fetch('/api/feedback', {
      headers: {
          "Content-Type": "application/json; charset=utf-8",
      },
      method: 'POST',
      body: JSON.stringify({feedback, feedbackType})
  }).then(res => {
    return res.json()
  })
    .catch(err => console.log('ERROR IN SUBMIT', err))
}

export const sendEmail = (name, email, message) => {
    fetch('/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    })
    .then((res) => res.json())
    .then((res) => {
      console.log('here is the response: ', res);
    })
    .catch((err) => {
      console.error('here is the error: ', err);
    })
   }