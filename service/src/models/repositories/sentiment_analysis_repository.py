from transformers import AutoTokenizer, AutoModelForSequenceClassification
MODEL_NAME = "distilbert-base-uncased"
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME, num_labels=2)
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)

from transformers import pipeline

class SentimentAnalysisRepo:
    def __init__(self) -> None:
        pass
    def analyse_sentiment(self, text:str)->None:
        sentiment_pipeline = pipeline("sentiment-analysis")
        predic = sentiment_pipeline(text)
        return predic