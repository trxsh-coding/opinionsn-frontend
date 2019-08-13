import { Api, JsonRpc, RpcError } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';

const defaultPrivateKey = "5JRJmrSBxmVW6MyFsqDeQB5pXzDdjXk7KvbM8p51xrMfpNQR7sS";
const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);

const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


export const illegalmint = async () => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'illegalmint',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'userId': 35,
                'value': 1000
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const createForecast = async (pollId, pollName, funds, ownerId) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'addpoll',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'pollName': pollName,
                'funds': funds,
                'ownerId': ownerId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'toforecast',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const createPoll = async (pollName, funds, ownerId) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'addpoll',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': '1',
                'pollName': pollName,
                'funds': funds,
                'ownerId': ownerId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const createLimitedPoll = async (pollName, funds, ownerId, maxUsers) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'addpoll',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': UID,
                'pollName': pollName,
                'funds': funds,
                'ownerId': ownerId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'setlimit',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': UID,
                'maxUsers': maxUsers
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const addCourt = async (pollId, maxJudges, funds) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'addcourt',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'maxJudges': maxJudges,
                'funds': funds
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const finishEvent = async pollId => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'setfinished',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const userVote = async (pollId, userId, optionId) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'uservote',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'userId': userId,
                'optionId': optionId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const addjudge = async (pollId, userId) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'addjudge',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'active'
            }],
            data: {
                'pollId': pollId,
                'userId': userId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

export const judgevote = async (pollId, userId, optionId) => {
    await api.transact({
        actions: [{
            account: 'opinionbetha',
            name: 'judgevote',
            authorization: [{
                actor: 'opinionbetha',
                permission: 'aactive'
            }],
            data: {
                'pollId': pollId,
                'userId': userId,
                'optionId': optionId
            },
        }]
    }, {
        blocksBehind: 3,
        expireSeconds: 30
    });
};

