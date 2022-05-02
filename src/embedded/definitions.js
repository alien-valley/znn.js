const Abi = require('../abi');

module.exports = {
    PlasmaABI: new Abi([{
        type: 'function',
        name: 'Fuse',
        inputs: [{
            name: 'address',
            type: 'address'
        }]
    },
        {
            type: 'function',
            name: 'CancelFuse',
            inputs: [{
                name: 'id',
                type: 'hash'
            }]
        }
    ]),
    PillarABI: new Abi([{
        type: "function",
        name: "Register",
        inputs: [{
            name: "name",
            type: "string"
        }, {
            name: "producerAddress",
            type: "address"
        }, {
            name: "rewardAddress",
            type: "address"
        }, {
            name: "giveBlockRewardPercentage",
            type: "uint8"
        }, {
            name: "giveDelegateRewardPercentage",
            type: "uint8"
        }]
    },
        {
            type: "function",
            name: "RegisterLegacy",
            inputs: [{
                name: "name",
                type: "string"
            }, {
                name: "producerAddress",
                type: "address"
            }, {
                name: "rewardAddress",
                type: "address"
            }, {
                name: "giveBlockRewardPercentage",
                type: "uint8"
            }, {
                name: "giveDelegateRewardPercentage",
                type: "uint8"
            }, {
                name: "publicKey",
                type: "string"
            }, {
                name: "signature",
                type: "string"
            }]
        },
        {
            type: "function",
            name: "Revoke",
            inputs: [{
                name: "name",
                type: "string"
            }]
        },
        {
            type: "function",
            name: "UpdatePillar",
            inputs: [{
                name: "name",
                type: "string"
            }, {
                name: "producerAddress",
                type: "address"
            }, {
                name: "rewardAddress",
                type: "address"
            }, {
                name: "giveBlockRewardPercentage",
                type: "uint8"
            }, {
                name: "giveDelegateRewardPercentage",
                type: "uint8"
            }]
        },
        {
            type: "function",
            name: "Delegate",
            inputs: [{
                name: "name",
                type: "string"
            }]
        },
        {
            type: "function",
            name: "Undelegate",
            inputs: []
        }
    ]),
    TokenABI: new Abi([{
        type: "function",
        name: "IssueToken",
        inputs: [{
            name: "tokenName",
            type: "string"
        }, {
            name: "tokenSymbol",
            type: "string"
        }, {
            name: "tokenDomain",
            type: "string"
        }, {
            name: "totalSupply",
            type: "uint256"
        }, {
            name: "maxSupply",
            type: "uint256"
        }, {
            name: "decimals",
            type: "uint8"
        }, {
            name: "isMintable",
            type: "bool"
        }, {
            name: "isBurnable",
            type: "bool"
        }, {
            name: "isUtility",
            type: "bool"
        }]
    },
        {
            type: "function",
            name: "Mint",
            inputs: [{
                name: "tokenStandard",
                type: "tokenStandard"
            }, {
                name: "amount",
                type: "uint256"
            }, {
                name: "receiveAddress",
                type: "address"
            }]
        },
        {
            type: "function",
            name: "Burn",
            inputs: []
        },
        {
            type: "function",
            name: "UpdateToken",
            inputs: [{
                name: "tokenStandard",
                type: "tokenStandard"
            }, {
                name: "owner",
                type: "address"
            }, {
                name: "isMintable",
                type: "bool"
            }, {
                name: "isBurnable",
                type: "bool"
            }]
        }
    ]),
    SentinelABI: new Abi([{
        type: "function",
        name: "Register",
        inputs: []
    },
        {
            type: "function",
            name: "Revoke",
            inputs: []
        }
    ]),
    StakeABI: new Abi([{
        type: "function",
        name: "Stake",
        inputs: [{
            name: "durationInSec",
            type: "int64"
        }]
    },
        {
            type: "function",
            name: "Cancel",
            inputs: [{
                name: "id",
                type: "hash"
            }]
        }
    ]),
    AcceleratorABI: new Abi([{
        type: "function",
        name: "CreateProject",
        inputs: [{
            name: "name",
            type: "string"
        }, {
            name: "description",
            type: "string"
        },
            {
                name: "url",
                type: "string"
            }, {
                name: "znnFundsNeeded",
                type: "uint256"
            }, {
                name: "qsrFundsNeeded",
                type: "uint256"
            }
        ]
    },
        {
            type: "function",
            name: "AddPhase",
            inputs: [{
                name: "id",
                type: "hash"
            }, {
                name: "name",
                type: "string"
            }, {
                name: "description",
                type: "string"
            },
                {
                    name: "url",
                    type: "string"
                }, {
                    name: "znnFundsNeeded",
                    type: "uint256"
                }, {
                    name: "qsrFundsNeeded",
                    type: "uint256"
                }
            ]
        },
        {
            type: "function",
            name: "UpdatePhase",
            inputs: [{
                name: "id",
                type: "hash"
            }, {
                name: "name",
                type: "string"
            }, {
                name: "description",
                type: "string"
            },
                {
                    name: "url",
                    type: "string"
                }, {
                    name: "znnFundsNeeded",
                    type: "uint256"
                }, {
                    name: "qsrFundsNeeded",
                    type: "uint256"
                }
            ]
        },
        {
            type: "function",
            name: "Donate",
            inputs: []
        },
        {
            type: "function",
            name: "VoteByName",
            inputs: [{
                name: "id",
                type: "hash"
            }, {
                name: "name",
                type: "string"
            }, {
                name: "vote",
                type: "uint8"
            }]
        },
        {
            type: "function",
            name: "VoteByProdAddress",
            inputs: [{
                name: "id",
                type: "hash"
            }, {
                name: "vote",
                type: "uint8"
            }]
        }
    ]),
    CommonABI: new Abi([
        {
            type: "function",
            name: "DepositQsr",
            inputs: []
        },
        {
            type: "function",
            name: "WithdrawQsr",
            inputs: []
        },
        {
            type: "function",
            name: "CollectReward",
            inputs: []
        }
    ])
}
