
class Constants{
    
    get amadeusBaseUrl(){
        return process.env.AMADEUS_BASE_URL;
    }

    get chatCompletionUrl(){
        return 'https://api.openai.com/v1/chat/completions';
    }

    get timeoutMillis(){
        return 20000;
    }

    get authTokenUrl(){
        return this.amadeusBaseUrl + '/v1/security/oauth2/token';
    }

    get searchCityUrl(){
        return this.amadeusBaseUrl + '/v1/reference-data/locations';
    }


}

module.exports = new Constants();