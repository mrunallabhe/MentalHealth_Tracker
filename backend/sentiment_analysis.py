# sentiment_analysis.py

import sys
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    score = analyzer.polarity_scores(text)
    
    sentiment = "Neutral"
    if score['compound'] >= 0.05:
        sentiment = "Positive"
    elif score['compound'] <= -0.05:
        sentiment = "Negative"
    
    return sentiment, score['compound']

if __name__ == "__main__":
    text = sys.argv[1]  # Get the text from command-line arguments
    sentiment, score = analyze_sentiment(text)
    print(f"Sentiment: {sentiment}, Score: {score}")
