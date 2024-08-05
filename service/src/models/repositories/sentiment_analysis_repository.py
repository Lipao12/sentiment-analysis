from transformers import pipeline
import uuid
 
sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/sentiment-model-portuguese-distilbert-pos-neg")
#sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/finetuning-sentiment-model-3500-samples")

class SentimentAnalysisRepo:
    def __init__(self) -> None:
        pass
    def analyse_sentiment(self, text:str):
        text_copy= text.copy()
        text_copy['text'] = text_copy['text'].lower()
        prediction = sentiment_model(text_copy)
        if prediction:
            map_label = {
                "LABEL_0": "negative",
                "LABEL_1": "positive",
                }
            prediction['label'] = map_label.get(prediction['label'], 'unknown')
            return prediction
        
        return {'label': 'unknown', 'score': 0.0}
    
    def analyse_many_sentiment(self, texts):
        predictions=[]
        print(len(texts))
        for text in texts:
            try:
                prediction = sentiment_model(text['text'].lower())
                if prediction:
                    map_label = {
                        "LABEL_0": "negative",
                        "LABEL_1": "positive",
                        }
                    prediction[0]['label'] = map_label.get(prediction[0]['label'], 'unknown')
                    prediction[0]['text'] = text['text']
                    prediction[0]['id'] = str(uuid.uuid4())
                    predictions.append(prediction[0])
                else:
                    return {'label': 'unknown', 'score': 0.0}
            except Exception as exception:
                return{
                    "body":{"error":"Fail to infer the sentence", "message":str(exception)},
                    "status_code":400
                }
                

        if predictions:
            return predictions
        
        return{
                    "body":{"error":"Fail to infer all the sentence", "message":str(exception)},
                    "status_code":400
                }
