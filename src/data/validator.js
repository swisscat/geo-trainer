import { stringSimilarity } from 'string-similarity-js';

export default (params) => {
    let module = {};

    const similarityThresholds = params.similarityThresholds || {
        name: 0.9,
        population: 0.9,
        capital: 0.9,
        currency: 0.2,
        language: 0.2,
    };

    module.validateAnswer = (countryData, questionType, answer) => {
        let possibilities = [countryData[questionType]];

        let threshold = similarityThresholds[questionType];

        switch (questionType) {
            case 'name':
                possibilities = countryData.names;
                break;

            case 'population':
                return Math.abs((answer - countryData.population) / countryData.population) < threshold;

            case 'capital':
                break;

            case 'currency':
                possibilities = countryData.currency;
                break;

            case 'language':
                possibilities = countryData.language;
                break;

            default:
                return false;
        }

        return possibilities.some((item) => {
            return stringSimilarity(item, answer) > threshold;
        });
    };

    return module;
};