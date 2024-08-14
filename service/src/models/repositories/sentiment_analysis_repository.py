from transformers import pipeline
import uuid
 
sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/BERT-sentiment-analysis-portuguese-with-undersampling-v2")
#sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/sentiment-model-portuguese-distilbert-pos-neg")
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
                "LABEL_2": "neutral"
                }
            prediction['label'] = map_label.get(prediction['label'], 'unknown')
            print("Pred: ", prediction)
            return prediction
        
        return {'label': 'unknown', 'score': 0.0}
    
    def analyse_many_sentiment(self, texts):
        predictions=[]
        texts = texts['text']
        counts = {}
        for text in texts:
            try:
                prediction = sentiment_model(text.lower())
                if prediction:
                    map_label = {
                        "LABEL_0": "negative",
                        "LABEL_1": "positive",
                        "LABEL_2": "neutral"
                        }
                    prediction[0]['label'] = map_label.get(prediction[0]['label'], 'unknown')
                    prediction[0]['text'] = text
                    prediction[0]['id'] = str(uuid.uuid4())
                    predictions.append(prediction[0])
                    if prediction[0]["label"] in counts:
                        counts[prediction[0]["label"]] = counts[prediction[0]["label"]] +1
                    else:
                        counts[prediction[0]["label"]] = 1
                else:
                    predictions.append({'label': 'unknown', 'score': 0.0, 'text': text, 'id': str(uuid.uuid4())})
            except Exception as exception:
                return{
                    "body":{"error":"Fail to infer the sentence", "message":str(exception)},
                    "status_code":400
                }
                

        if predictions:
            return predictions, counts
        
        return {
                "body": {"error": "Fail to infer all the sentences", "message": "No predictions made"},
                "status_code": 400
            }
    
    def analyse_instagram_comments(self, comments):
        predictions=[]
        texts = comments['text']
        counts = {}
        map_label = {
                "LABEL_0": "negative",
                "LABEL_1": "positive",
                "LABEL_2": "neutral"
                        }
        for text in texts:
            try:
                prediction = sentiment_model(text.lower())
                if prediction:
                    prediction[0]['label'] = map_label.get(prediction[0]['label'], 'unknown')
                    prediction[0]['text'] = text
                    prediction[0]['id'] = str(uuid.uuid4())
                    predictions.append(prediction[0])

                    if prediction[0]["label"] in counts:
                        counts[prediction[0]["label"]] = counts[prediction[0]["label"]] +1
                    else:
                        counts[prediction[0]["label"]] = 1
                else:
                    predictions.append({'label': 'unknown', 'score': 0.0, 'text': text, 'id': str(uuid.uuid4())})
            except Exception as exception:
                return{
                    "body":{"error":"Fail to infer the sentence", "message":str(exception)},
                    "status_code":400
                }
                

        if predictions:
            return predictions, counts
        
        return {
                "body": {"error": "Fail to infer all the sentences", "message": "No predictions made"},
                "status_code": 400
            }
