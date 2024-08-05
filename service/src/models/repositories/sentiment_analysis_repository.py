from transformers import pipeline
 
sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/sentiment-model-portuguese-distilbert-pos-neg")
#sentiment_model = pipeline(task="sentiment-analysis", model="lipaoMai/finetuning-sentiment-model-3500-samples")

class SentimentAnalysisRepo:
    def __init__(self) -> None:
        pass
    def analyse_sentiment(self, text:str)->None:
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

