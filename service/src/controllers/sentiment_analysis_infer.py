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
            print(texts)
            result, counts = self.sentiment_analysis_repository.analyse_many_sentiment(texts)
            if isinstance(result, dict) and 'status_code' in result:
                return result

            return{
                    'body': {"sentiment": result ,"id": str(uuid.uuid4()), "counts": counts},
                    'status_code': 201
                }
        
        except Exception as exception:
            return{
                "body":{"error":"Bad Request", "message":str(exception)},
                "status_code":400
            }

    def infer_insta_comments(self, url_post: str):
        import requests
        import os
        from dotenv import load_dotenv
        load_dotenv()

        print("Enviado coment: ", url_post)
        ACCESS_TOKEN = os.getenv('INSTAGRAM_ACCESS_TOKEN')
        POST_ID = url_post["url_post"].split("/p/")[1].strip().split("/")[0].strip()
        print(POST_ID)
        url = f'https://graph.instagram.com/{POST_ID}/comments'
        response = requests.get(url)
        if response.status_code == 200:
            predictions, counts = self.sentiment_analysis_repository.analyse_instagram_comments(response.json())
            if isinstance(predictions, dict) and 'status_code' in predictions:
                return predictions

            return{
                    'body': {"sentiment": predictions ,"id": str(uuid.uuid4()), "counts": counts},
                    'status_code': 201
                }
        else:
            return {
                "body": {"error": "Fail to find post", "message": "No predictions made"},
                "status_code": 400
            }