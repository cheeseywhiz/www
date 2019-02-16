import app
__all__ = 'application'

application = app.create_app().wsgi_app
