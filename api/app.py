import flask
import dataclasses
import os
from root import root
import auth


class DataclassJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)


class App(flask.Flask):
    json_encoder = DataclassJSONEncoder


def create_app():
    app = App(__name__, instance_relative_config=True)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    app.register_blueprint(root)
    app.register_blueprint(auth.auth)
    secret_key = os.getenv('APP_SECRET_KEY')

    if app.env == 'development':
        secret_key = 'development'
    elif secret_key is None:
        raise RuntimeError('Environment variable APP_SECRET_KEY not set')

    app.config.from_mapping(
        SECRET_KEY=secret_key,
    )
    auth.init_app(app)
    return app
