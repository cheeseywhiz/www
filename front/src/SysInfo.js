import React from 'react';
import {connect} from 'react-redux';
import selectors from './selectors.js';

const mapStateToProps = (state) => ({
    payload: selectors.payload(state),
});

const getHumanReadable = (bytes, n_places = 2) => {
    const prefixes = 'KMGTPEZY';
    const exponent = bytes ? Math.trunc(Math.log(bytes) / Math.log(1024)) : 0;
    const prefix = exponent ? prefixes[exponent - 1] : '';
    const amount = (bytes / Math.pow(1024, exponent)).toFixed(n_places);
    return `${amount} ${prefix}B`;
};

export default connect(mapStateToProps)(
    ({payload}) => {
        const {bufferram, sharedram, freeram, totalram} = payload;
        const usedram = totalram - (bufferram, sharedram, freeram);
        return <ul>
            <li>
                Used RAM
                <ul>
                    <li>{getHumanReadable(usedram)}</li>
                </ul>
            </li>
            <li>
                Buffer RAM
                <ul>
                    <li>{getHumanReadable(bufferram)}</li>
                </ul>
            </li>
            <li>
                Shared RAM
                <ul>
                    <li>{getHumanReadable(sharedram)}</li>
                </ul>
            </li>
            <li>
                Free RAM
                <ul>
                    <li>{getHumanReadable(freeram)}</li>
                </ul>
            </li>
            <li>
                Total RAM
                <ul>
                    <li>{getHumanReadable(totalram)}</li>
                </ul>
            </li>
            <li>
                Free Swap
                <ul>
                    <li>{getHumanReadable(payload.freeswap)}</li>
                </ul>
            </li>
            <li>
                Total Swap
                <ul>
                    <li>{getHumanReadable(payload.totalswap)}</li>
                </ul>
            </li>
            <li>
                Free High
                <ul>
                    <li>{getHumanReadable(payload.freehigh)}</li>
                </ul>
            </li>
            <li>
                Total High
                <ul>
                    <li>{getHumanReadable(payload.totalhigh)}</li>
                </ul>
            </li>
            <li>
                Number of Processes
                <ul>
                    <li>{payload.procs}</li>
                </ul>
            </li>
            <li>
                Load Average
                <ol>
                    <li>
                        1 Minute
                        <ul>
                            <li>{payload.loads[0].toFixed(2)}</li>
                        </ul>
                    </li>
                    <li>
                        5 Minutes
                        <ul>
                            <li>{payload.loads[1].toFixed(2)}</li>
                        </ul>
                    </li>
                    <li>
                        15 Minutes
                        <ul>
                            <li>{payload.loads[2].toFixed(2)}</li>
                        </ul>
                    </li>
                </ol>
            </li>
            <li>
                Uptime
                <ul>
                    <li>
                        Total Seconds
                        <ul>
                            <li>{payload.uptime.total_seconds}</li>
                        </ul>
                    </li>
                    <li>{payload.uptime.years} years</li>
                    <li>{payload.uptime.days} days</li>
                    <li>{payload.uptime.hours} hours</li>
                    <li>{payload.uptime.minutes} minutes</li>
                    <li>{payload.uptime.seconds} seconds</li>
                </ul>
            </li>
        </ul>
    }
);
