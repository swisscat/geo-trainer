import mockData from './mock';

export default (params) => {
    var module = {};

    params.mock = params.mock || false;

    const apiCall = (api) => {
        if (params.mock) {
            return new Promise((resolve, reject) => {
                if (typeof mockData[api] !== "undefined")
                    resolve(mockData[api]);
                else
                    reject('No mock for ' + api);
            });
        } else {
            fetch(api)
                .then(res => res.json())
        }
    };

    module.getCountries = () => {
        return apiCall("https://restcountries.eu/rest/v2/all")
            .then((countries) => {
                return countries.map((country) => {
                    country.names = [country.name].concat(country.altSpellings.filter(name => name.length > 2));

                    return country;
                });
            });
    };

    return module;
};