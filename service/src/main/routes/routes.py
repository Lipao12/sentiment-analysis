from flask import jsonify, Blueprint, request

routes_bp = Blueprint("routes", __name__)

# Importação de Controllers
from src.controllers.sentiment_analysis_infer import SentimentAnalysisInfer

# Importação de Repositorios
from src.models.repositories.sentiment_analysis_repository import SentimentAnalysisRepo

@routes_bp.route("/analyse_sentence", methods=["POST"])
def analyse_sentence():
    sentimentRepo = SentimentAnalysisRepo()
    controller = SentimentAnalysisInfer(sentimentRepo)

    response = controller.infer_one(request.json)

    return jsonify(response['body']), response['status_code']

@routes_bp.route("/analyse_sentences", methods=["POST"])
def analyse_senteces():
    sentimentRepo = SentimentAnalysisRepo()
    controller = SentimentAnalysisInfer(sentimentRepo)

    response = controller.infer_many(request.json)

    return jsonify(response['body']), response['status_code']