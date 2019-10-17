import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import { user } from "../store/modules/user";

const defaultPrivateKey = "5JRJmrSBxmVW6MyFsqDeQB5pXzDdjXk7KvbM8p51xrMfpNQR7sS";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('https://jungle2.cryptolions.io:443', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


export const createForecast = async (pollId, ownerId, pollName, options) => {
    await api.transact({
        actions: [{
            account: 'opinionblock',
            name: 'pollcreate',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'from': ownerId,
                'to': ownerId,
                'pollType': "Прогноз",
                'pollName' : pollName,
                'option': options
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
                'from': userId,
                'to': pollId,
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
                'from': userId,
                'to' : pollId,
                'option' : option
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

