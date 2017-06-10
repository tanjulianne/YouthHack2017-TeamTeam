from flask import Flask
from flask import send_file
from flask import request
from flask import json
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def init():
    return send_file("templates/index.html")


@app.route('/search', methods=['GET', 'POST'])
def parseSearch():
    data = json.loads(request.data.decode())
    search = data["search"]
    print("Searching for: " + search);
    return search;

if __name__ == '__main__':
    app.run()
