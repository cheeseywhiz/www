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


class PrefixMiddleware:
    def __init__(self, wsgi_app, prefix):
        self.wsgi_app = wsgi_app
        self.prefix = prefix

    def __call__(self, environ, start_response):
        if environ['PATH_INFO'].startswith(self.prefix):
            environ['PATH_INFO'] = environ['PATH_INFO'][len(self.prefix):]
            environ['SCRIPT_NAME'] = self.prefix
            return self.wsgi_app(environ, start_response)
        else:
            start_response('404', [('Content-Type', 'text/plain')])
            return [b'This url does not belong to the app.']


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
        with app.open_instance_resource('secret_key') as f:
            secret_key = f.read()

    app.config.from_mapping(
        APPLICATION_ROOT='/api',
        SECRET_KEY=secret_key,
    )
    auth.init_app(app)
    app.wsgi_app = PrefixMiddleware(app.wsgi_app,
                                    app.config['APPLICATION_ROOT'])
    return app
