import flask
import time
import os
import pwd
import grp
import ctypes
import struct
import functools
import dataclasses
import typing


class DataclassJSONEncoder(flask.json.JSONEncoder):
    def default(self, obj):
        if dataclasses.is_dataclass(obj):
            return dataclasses.asdict(obj)

        return super().default(obj)


libc = ctypes.CDLL('libc.so.6')
app = flask.Flask(__name__)
app.json_encoder = DataclassJSONEncoder


@app.route('/api/time')
def index():
    return flask.make_response(
        str(int(time.time())),
        {'Cache-Control': 'no-cache'},
    )


@app.route('/api/id')
def id():
    user_data = pwd.getpwuid(os.getuid())
    group_data = grp.getgrgid(os.getgid())
    groups_data = [
        grp.getgrgid(gid)
        for gid in os.getgroups()
    ]
    return flask.jsonify(
        user=(user_data.pw_uid, user_data.pw_name),
        group=(group_data.gr_gid, group_data.gr_name),
        groups=[
            (group.gr_gid, group.gr_name)
            for group in groups_data
        ],
    )


def divide_seconds(seconds, blocks=[1, 60, 60, 24, 365]):
    divisions = []
    remainder = seconds
    block_size_seconds = functools.reduce(lambda x, y: x * y, blocks)

    for block_size in reversed(blocks):
        division = remainder // block_size_seconds
        remainder -= division * block_size_seconds
        divisions.append(division)
        block_size_seconds //= block_size

    divisions.reverse()
    return divisions


@dataclasses.dataclass
class Uptime:
    total_seconds: int
    seconds: int
    minutes: int
    hours: int
    days: int
    years: int

    @classmethod
    def from_total_seconds(cls, total_seconds):
        return cls(total_seconds, *divide_seconds(total_seconds))


@dataclasses.dataclass
class SysInfoBase:
    uptime: Uptime
    loads: typing.Tuple[int, int, int]
    totalram: int
    freeram: int
    sharedram: int
    bufferram: int
    totalswap: int
    freeswap: int
    procs: int


class SysInfo(SysInfoBase):
    def __init__(self):
        fmt = 'l3L6LH22s'
        buf = ctypes.create_string_buffer(struct.calcsize(fmt) + 1)
        libc.sysinfo(buf)
        uptime_seconds, loads_1, loads_5, loads_15, totalram, freeram, \
            sharedram, bufferram, totalswap, freeswap, procs, \
            *padding = struct.unpack_from(fmt, buf.raw)
        uptime = Uptime.from_total_seconds(uptime_seconds)
        super().__init__(
            uptime, (loads_1, loads_5, loads_15), totalram, freeram,
            sharedram, bufferram, totalswap, freeswap, procs,
        )


@app.route('/api/sysinfo')
def sysinfo():
    return flask.jsonify(SysInfo())
