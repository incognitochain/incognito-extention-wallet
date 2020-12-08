import { persistReducer } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { TxHistoryModel } from 'incognito-js/build/web/browser';
import {
  IHistoryReceiveToken,
  IHistoryToken,
  IPCustomToken,
  IPToken,
  IFollowedToken,
} from './Token.interface';
import {
  ACTION_FETCHED_PTOKEN_LIST,
  ACTION_FETCHED_PCUSTOMTOKEN_LIST,
  ACTION_FOLLOWED_POPULAR_TOKEN,
  ACTION_SET_FOLLOWED_TOKENS,
  ACTION_GET_BALANCE_TOKEN_FETCHING,
  ACTION_GET_BALANCE_TOKEN_FETCHED,
  ACTION_SET_SELECTED_TOKEN,
} from './Token.constant';
import { uniq, uniqBy } from 'lodash';
import {
  ACTION_FETCHED_TX_HISTORIES,
  ACTION_FETCHING_TX_HISTORIES,
} from './features/History/History.constant';

export const LIMIT_RECEIVE_HISTORY_ITEM = 20;
export const MAX_LIMIT_RECEIVE_HISTORY_ITEM = 50;

export interface IEnvToken {
  followedPopularIds: boolean;
}

export interface ITokenReducer {
  followed: IFollowedToken[];
  pTokens: IPToken[];
  pCustomTokens: IPCustomToken[];
  gettingBalance: any[];
  following: any[];
  toggleUnVerified: boolean;
  history: IHistoryToken;
  receiveHistory: IHistoryReceiveToken;
  mainnet: IEnvToken;
  testnet: IEnvToken;
  selectedTokenId: string;
}

const initialState: ITokenReducer = {
  followed: [],
  pTokens: [],
  pCustomTokens: [],
  gettingBalance: [],
  following: [],
  toggleUnVerified: false,
  history: {
    fetching: false,
    histories: [],
    refreshing: true,
  },
  receiveHistory: {
    isFetching: false,
    isFetched: false,
    data: [],
    oversize: false,
    page: 0,
    limit: LIMIT_RECEIVE_HISTORY_ITEM,
    refreshing: true,
    tokenId: '',
    notEnoughData: false,
  },
  mainnet: {
    followedPopularIds: false,
  },
  testnet: {
    followedPopularIds: false,
  },
  selectedTokenId: '',
};

const tokenReducer = (
  state = initialState,
  action: {
    type: string;
    payload: any;
  }
) => {
  switch (action.type) {
    case ACTION_FETCHED_PTOKEN_LIST: {
      return {
        ...state,
        pTokens: action.payload,
      };
    }
    case ACTION_FETCHED_PCUSTOMTOKEN_LIST: {
      return {
        ...state,
        pCustomTokens: action.payload,
      };
    }
    case ACTION_FOLLOWED_POPULAR_TOKEN: {
      const { mainnet } = action.payload;
      const field = mainnet ? 'mainnet' : 'testnet';
      const stateField: IEnvToken = state[field];
      return {
        ...state,
        [field]: {
          ...stateField,
          followedPopularIds: true,
        },
      };
    }
    case ACTION_SET_FOLLOWED_TOKENS: {
      return {
        ...state,
        followed: [...action.payload?.followed] || [],
      };
    }
    case ACTION_GET_BALANCE_TOKEN_FETCHING: {
      const { tokenId } = action.payload;
      return {
        ...state,
        gettingBalance: uniq([...state.gettingBalance, tokenId]),
      };
    }
    case ACTION_GET_BALANCE_TOKEN_FETCHED: {
      const token: IFollowedToken = action.payload;
      return {
        ...state,
        followed: uniqBy([...state.followed, token], (token) => token?.tokenId),
        gettingBalance: [...state.gettingBalance].filter(
          (tokenId: string) => tokenId !== token?.tokenId
        ),
      };
    }
    case ACTION_SET_SELECTED_TOKEN: {
      return { ...state, selectedTokenId: action.payload };
    }
    case ACTION_FETCHING_TX_HISTORIES: {
      return {
        ...state,
        history: {
          ...state.history,
          fetching: true,
        },
      };
    }
    case ACTION_FETCHED_TX_HISTORIES: {
      const {
        histories,
      }: {
        histories: TxHistoryModel[];
      } = action.payload;
      return {
        ...state,
        history: {
          ...state.history,
          fetching: false,
          histories,
        },
      };
    }
    default:
      return state;
  }
};

const persistConfig = {
  key: 'token',
  storage,
  whitelist: ['mainnet', 'testnet'],
  stateReconciler: autoMergeLevel2,
};

export default persistReducer(persistConfig, tokenReducer);
