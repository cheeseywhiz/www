import flask


def jsonify_status(status: int):
    def jsonify(*args, **kwargs):
        response = flask.jsonify(*args, **kwargs)
        response.status_code = status
        return response

    return jsonify
