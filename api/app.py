import flask
import dataclasses
from api import api


class DataclassJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)


class App(flask.Flask):
    json_encoder = DataclassJSONEncoder


def create_app():
    app = App(__name__)
    app.register_blueprint(api)
    return app
