
class Constants{

    get chatCompletionUrl(){
        return 'https://api.openai.com/v1/chat/completions';
    }

    get timeoutMillis(){
        return 20000;
    }


}

module.exports = new Constants();