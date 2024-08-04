from flask import jsonify, Blueprint, request

routes_bp = Blueprint("routes", __name__)

# Importação de Controllers
from src.controllers.sentiment_analysis_infer import SentimentAnalysisInfer

# Importação de Repositorios
from src.models.repositories.sentiment_analysis_repository import SentimentAnalysisRepo

@routes_bp.route("/analyse", methods=["POST"])
def analyse_sentence():
    sentimentRepo = SentimentAnalysisRepo()
    controller = SentimentAnalysisInfer(sentimentRepo)

    response = controller.inferir_one(request.json)

    return jsonify(response['body']), response['status_code']