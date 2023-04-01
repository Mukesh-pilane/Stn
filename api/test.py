# from app import create_app
from flask import session, Flask
# app = create_app()
app = Flask(__name__)

app.secret_key = "abcgfgg"
@app.route('/test1', methods=['GET'])
def test1():
    session["test"]=65
    print(session["test"])
    return "test1"

@app.route('/test2', methods=['GET'])
def test2():
    print(session["test"])
    print(session)
    return "test2"


if __name__ == '__main__':
    app.run(debug=True)
