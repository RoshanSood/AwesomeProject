from flask import Flask, jsonify
from datetime import datetime, timedelta
import requests

API_KEY = "pupcjpf46a587dnnnjr2qu6d"  # Replace with your Sportradar API key

app = Flask("NBA Scores")

@app.route('/scores', methods=['GET'])
def get_scores():
    yesterday = datetime.now() - timedelta(days=1)
    today = datetime.now() - timedelta(days=1)
    schedule_url = f"https://api.sportradar.us/nba/trial/v7/en/games/{yesterday.year}/{yesterday.month}/{yesterday.day}/schedule.json?api_key={API_KEY}"

    response = requests.get(schedule_url)
    scores = []

    if response.status_code == 200:
        daily_schedule = response.json()
        games = daily_schedule["games"]

        for game in games:
            game_id = game["id"]
            home_team = game["home"]["name"]
            away_team = game["away"]["name"]
            home_score = game["home_points"]
            away_score = game["away_points"]

            if home_team and away_team and home_score is not None and away_score is not None:
                scores.append({
                    "game_id": game_id,
                    "home_team": home_team,
                    "away_team": away_team,
                    "home_score": home_score,
                    "away_score": away_score
                })

    return jsonify(scores)

if __name__ == '__main__':
    app.run(debug=True)
