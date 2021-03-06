import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import {
    ACTION_ADD_STORAGE_DATA_DECENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_DECENTRALIZED,
    ACTION_ADD_STORAGE_DATA_CENTRALIZED,
    ACTION_REMOVE_STORAGE_DATA_CENTRALIZED,
    ACTION_ADD_STORAGE_RAW_DATA_DECENTRALIZED,
    ACTION_REMOVE_STORAGE_RAW_DATA_DECENTRALIZED,
    ACTION_ADD_STORAGE_RAW_DATA_CENTRALIZED,
    ACTION_REMOVE_STORAGE_RAW_DATA_CENTRALIZED,
} from './UnShield.constant';
import { IUnshieldReducer } from './UnShield.interface';

const initialState: IUnshieldReducer = {
    storage: {
        decentralized: {
            txs: [],
        },
        centralized: {
            txs: [],
        },
        decentralizedRawTxs: {
            txs: [],
        },
        centralizedRawTxs: {
            txs: [],
        },
    },
};

const unShieldReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_ADD_STORAGE_DATA_DECENTRALIZED: {
            const { tx } = action.payload;
            const { storage } = state;
            const { txs } = storage.decentralized;
            if (!tx.burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    decentralized: {
                        ...storage.decentralized,
                        txs: [...txs, tx],
                    },
                },
            };
        }
        case ACTION_REMOVE_STORAGE_DATA_DECENTRALIZED: {
            const { burningTxId } = action.payload;
            const { storage } = state;
            const { txs } = storage.decentralized;
            if (!burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    decentralized: {
                        ...storage.decentralized,
                        txs: [...txs.filter((tx: any) => tx?.burningTxId !== burningTxId)],
                    },
                },
            };
        }
        case ACTION_ADD_STORAGE_DATA_CENTRALIZED: {
            const { tx } = action.payload;
            const { storage } = state;
            const { txs } = storage.centralized;
            if (!tx.burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    centralized: {
                        ...storage.centralized,
                        txs: [...txs, tx],
                    },
                },
            };
        }
        case ACTION_REMOVE_STORAGE_DATA_CENTRALIZED: {
            const { burningTxId } = action.payload;
            const { storage } = state;
            const { txs } = storage.centralized;
            if (!burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    centralized: {
                        ...storage.centralized,
                        txs: [...txs.filter((tx: any) => tx?.burningTxId !== burningTxId)],
                    },
                },
            };
        }
        // raw data
        case ACTION_ADD_STORAGE_RAW_DATA_DECENTRALIZED: {
            const { tx } = action.payload;
            const { storage } = state;
            const { txs } = storage.decentralizedRawTxs;
            if (!tx.burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    decentralizedRawTxs: {
                        ...storage.decentralizedRawTxs,
                        txs: [...txs, tx],
                    },
                },
            };
        }
        case ACTION_REMOVE_STORAGE_RAW_DATA_DECENTRALIZED: {
            const { burningTxId } = action.payload;
            const { storage } = state;
            const { txs } = storage.decentralizedRawTxs;
            if (!burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    decentralizedRawTxs: {
                        ...storage.decentralizedRawTxs,
                        txs: [...txs.filter((tx: any) => tx?.burningTxId !== burningTxId)],
                    },
                },
            };
        }
        case ACTION_ADD_STORAGE_RAW_DATA_CENTRALIZED: {
            const { tx } = action.payload;
            const { storage } = state;
            const { txs } = storage.centralizedRawTxs;
            if (!tx.burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    centralizedRawTxs: {
                        ...storage.centralizedRawTxs,
                        txs: [...txs, tx],
                    },
                },
            };
        }
        case ACTION_REMOVE_STORAGE_RAW_DATA_CENTRALIZED: {
            const { burningTxId } = action.payload;
            const { storage } = state;
            const { txs } = storage.centralizedRawTxs;
            if (!burningTxId) {
                return state;
            }
            return {
                ...state,
                storage: {
                    ...storage,
                    centralizedRawTxs: {
                        ...storage.centralizedRawTxs,
                        txs: [...txs.filter((tx: any) => tx?.burningTxId !== burningTxId)],
                    },
                },
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'unShield',
    storage,
    whitelist: ['storage'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, unShieldReducer);
