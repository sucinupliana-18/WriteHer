from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from google import genai
import os

load_dotenv()

app = Flask(__name__)
CORS(app)

api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

@app.route("/")
def home():
    return "Backend WriteHer berhasil berjalan!"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()
    pesan_user = data.get("message", "")

    prompt = f"""
Kamu adalah WriteHer AI.

Tugasmu membantu perempuan mengenal dunia kepenulisan digital.

Gunakan Bahasa Indonesia yang sederhana, ramah, dan mudah dipahami.
Jangan memakai bahasa yang terlalu teknis.
Jawablah seperti teman belajar yang memberi semangat.

Berikan jawaban yang singkat, praktis, dan membantu.

Pertanyaan pengguna:
{pesan_user}
"""

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-lite",
            contents=prompt
        )

        jawaban = response.text

        return jsonify({
            "reply": jawaban
        })

    except Exception as e:
        print("ERROR GEMINI:")
        print(e)

        return jsonify({
            "reply": f"ERROR: {e}"
        })

if __name__ == "__main__":
    app.run(debug=True)