import uuid

class SentimentAnalysisInfer:
    def __init__(self, sentiment_analysis_repository) -> None:
        self.sentiment_analysis_repository = sentiment_analysis_repository
    def infer_one(self, text:str):
        try:
            result = self.sentiment_analysis_repository.analyse_sentiment(text)
            result["text"] = text['text']
            result["id"] = str(uuid.uuid4())
            return{
                    'body': {"sentiment": result},
                    'status_code': 201
                }
        
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
    
    def infer_many(self, texts):
        try:
            result = self.sentiment_analysis_repository.analyse_many_sentiment(texts)
            print("Resultado encontrado: ", result)

            if isinstance(result, dict) and 'status_code' in result:
                return result

            return{
                    'body': {"sentiment": result ,"id": str(uuid.uuid4())},
                    'status_code': 201
                }
        
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }
