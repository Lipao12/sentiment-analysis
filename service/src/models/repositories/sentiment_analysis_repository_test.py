import pytest
from .sentiment_analysis_repository import SentimentAnalysisRepo

@pytest.mark.skip(reason="interacao com o modelo")
def test_analyse_sentence():
    sentiment_repo = SentimentAnalysisRepo()

    text = "I love you"

    result = sentiment_repo.analyse_sentiment(text)
    
    assert result is not None, "Trip ID should not be None after inference"