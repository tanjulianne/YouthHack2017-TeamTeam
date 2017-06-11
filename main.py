from flask import Flask
from flask import send_file
from flask import request
from flask import json

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def init():
    return send_file("templates/index.html")


@app.route('/createproposal')
def createProposal():
    return send_file("templates/createproposal.html")


@app.route('/search', methods=['GET', 'POST'])
def parseSearch():
    data = json.loads(request.data.decode())
    search = data["search"]
    print("Searching for: " + search)
    return search


@app.route('/submitProposal', methods=['GET', 'POST'])
def submitProposal():
    data = json.loads(request.data.decode())
    proposalTitle = data["title"]
    proposalDetails = data["details"]
    proposalTags = data["tags"]
    print(proposalTitle)
    print(proposalDetails)
    print(proposalTags)
    return "success"

if __name__ == '__main__':
    app.run()
