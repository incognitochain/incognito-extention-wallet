import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import {
    ACTION_TOGGLE_HOME_CONFIGS,
    ACTION_TOGGLE_DECIMAL_DIGITS,
    ACTION_TOGGLE_DEV_MODE,
    ACTION_TOGGLE_MODE_SAVE_BURN_TX,
} from './Setting.constant';

export interface ISettingReducer {
    dev: {
        stagingHomeConfigs: boolean;
        toggleSaveBurnTx: boolean;
    };
    isDev: boolean;
    decimalDigits: boolean;
}

const initialState: ISettingReducer = {
    dev: {
        stagingHomeConfigs: false,
        toggleSaveBurnTx: false,
    },
    decimalDigits: true,
    isDev: false,
};

const settingReducer = (
    state = initialState,
    action: {
        type: string;
        payload: any;
    },
) => {
    switch (action.type) {
        case ACTION_TOGGLE_HOME_CONFIGS: {
            return {
                ...state,
                dev: {
                    ...state.dev,
                    stagingHomeConfigs: !state.dev.stagingHomeConfigs,
                },
            };
        }
        case ACTION_TOGGLE_DECIMAL_DIGITS: {
            return {
                ...state,
                decimalDigits: !state?.decimalDigits,
            };
        }
        case ACTION_TOGGLE_DEV_MODE: {
            return {
                ...state,
                isDev: !state.isDev,
            };
        }
        case ACTION_TOGGLE_MODE_SAVE_BURN_TX: {
            return {
                ...state,
                dev: { ...state.dev, toggleSaveBurnTx: !state.dev.toggleSaveBurnTx },
            };
        }
        default:
            return state;
    }
};

const persistConfig = {
    key: 'setting',
    storage,
    whitelist: ['dev', 'decimalDigits'],
    stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, settingReducer);
