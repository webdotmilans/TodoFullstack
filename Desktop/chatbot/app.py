
from flask import Flask, render_template, request, jsonify
import openai

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    data = request.json
    message = data['message']
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Ensure you're using a chat model
            messages=[{"role": "user", "content": message}]
        )
        reply = response.choices[0].message['content'].strip()
    except Exception as e:
        reply = f"An error occurred: {str(e)}"
    
    return jsonify({"reply": reply})

if __name__ == '__main__':
    app.run(debug=True)
