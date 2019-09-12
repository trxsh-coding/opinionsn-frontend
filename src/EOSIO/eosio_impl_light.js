import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import {user} from "../store/modules/user";

const defaultPrivateKey = "5JRJmrSBxmVW6MyFsqDeQB5pXzDdjXk7KvbM8p51xrMfpNQR7sS";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


export const createForecast = async (pollId, ownerId, pollName, options) => {
    await api.transact({
        actions: [{
            account: 'opinionblock',
            name: 'initforecast',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'ownerId': ownerId,
                'pollName': pollName,
                'pollOptions': options
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const addCourt = async (pollId, maxJudges) => {
    await api.transact({
        actions: [{
            account: 'opinionblock',
            name: 'initcourt',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'baseForecastId': pollId,
                'maxJudges': maxJudges
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const userVote = async (pollId, userId, option) => {
    await api.transact({
        actions: [{
            account: 'opinionblock',
            name: 'uservote',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'userId': userId,
                'option': option
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const judgeVote = async (pollId, userId, option) => {
    await api.transact({
        actions: [{
            account: 'opinionblock',
            name: 'judgevote',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'courtId': pollId,
                'judgeId' : userId,
                'option' : option
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

