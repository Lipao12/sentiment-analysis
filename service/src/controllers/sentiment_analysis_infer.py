import uuid

class SentimentAnalysisInfer:
    def __init__(self, sentiment_analysis_repository) -> None:
        self.sentiment_analysis_repository = sentiment_analysis_repository
    def inferir_one(self, text:str):
        try:
            result = self.sentiment_analysis_repository.analyse_sentiment(text)
            return{
                    'body': {"sentiment": result, "text": text, "id": str(uuid.uuid4())},
                    'status_code': 201
                }
        
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }