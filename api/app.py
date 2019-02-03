import flask
import dataclasses
from api import api


class DataclassJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)


app = flask.Flask(__name__)
app.json_encoder = DataclassJSONEncoder
app.register_blueprint(api)
