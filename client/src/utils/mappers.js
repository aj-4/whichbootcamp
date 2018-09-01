const parseField = (object, fieldName) => {
    object[fieldName] = JSON.parse(object[fieldName]);
}

export const parseBootcampFields = json => {
    json.forEach(bootcamp => {
        parseField(bootcamp, 'languages');
        parseField(bootcamp, 'locations');
        parseField(bootcamp, 'programs');
        })
    return json
}

const replaceYesNoWithBool = data => {
    for (let key in data) {
        if (data[key] === 'YES' || data[key] === 'POSITIVE') {
            data[key] = 1;
        } else if (data[key] === 'NO' || data[key] === 'NEGATIVE') {
            data[key] = 0;
        }
    }
    return data;
};

export const mapStateToSurvey = state => {
    const surveyData = Object.assign({}, state);
    delete surveyData.hasAttended;
    // TODO: create email validation endpoint -- if exists, reject
    console.log('submitting survey data:', surveyData);
    return replaceYesNoWithBool(surveyData);
}