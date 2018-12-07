import flask

app = flask.Flask(__name__, static_folder="../static")


def index():
    return flask.redirect('/static/index.html')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=8080)