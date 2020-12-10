import memoize from 'lodash/memoize';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { COINS } from 'src/constants';
import { IRootState } from 'src/redux/interface';
import {
  IFollowedToken,
  IPCustomToken,
  IPCustomTokenFromApi,
  IPToken,
  IPTokenFromApi,
  ISelectedPrivacy,
  ITotalShielded,
} from './Token.interface';
import { ITokenReducer } from './Token.reducer';
import SelectedPrivacy from './Token.model';
import { getFormatAmountByUSD, getPrice } from './Token.utils';
import uniqBy from 'lodash/uniqBy';
import {
  decimalSeparatorSelector,
  groupSeparatorSelector,
  preloadSelector,
} from '../Preload';
import { accountBalanceSelector, defaultAccountSelector } from '../Account';
import { AccountInstance } from 'incognito-js/build/web/browser';
import * as format from 'src/utils/format';
import convert from 'src/utils/convert';
import { compact, reverse } from 'lodash';
import BigNumber from 'bignumber.js';

export const tokenSelector = createSelector(
  (state: IRootState) => state.token,
  (token: ITokenReducer) => token
);

export const pTokensSelector = createSelector(
  tokenSelector,
  (token) =>
    token.pTokens.map((token: IPTokenFromApi) => {
      const pairPrv = token.CurrentPrvPool !== 0;
      let _token: IPToken = {
        id: token.ID,
        tokenId: token.TokenID,
        symbol: token.Symbol,
        pSymbol: token.PSymbol,
        decimals: token.Decimals,
        pDecimals: token.PDecimals,
        currencyType: token.CurrencyType,
        type: token.Type,
        name: token.Name,
        contractId: token.ContractID,
        verified: token.Verified,
        pricePrv: token.PricePrv,
        priceUsd: token.PriceUsd,
        pairPrv,
        change: pairPrv ? token?.PercentChangePrv1h : token?.PercentChange1h,
      };
      return _token;
    }) || []
);

export const pCustomTokensSelector = createSelector(
  tokenSelector,
  (token) =>
    token.pCustomTokens.map((token: IPCustomTokenFromApi) => {
      let _token: IPCustomToken = {
        id: token.ID,
        tokenId: token.TokenID,
        symbol: token.Symbol,
        name: token.Name,
        totalSupply: token.Amount,
        verified: token.Verified,
        image: token.Image,
      };
      return _token;
    }) || []
);

export const followedTokensIdsSelector = createSelector(
  defaultAccountSelector,
  (defaultAccount: AccountInstance) => (excludePRV = true) => {
    if (!defaultAccount) {
      return [];
    }
    const privacyTokenIds = reverse([...defaultAccount.privacyTokenIds]);
    return excludePRV ? privacyTokenIds : [COINS.PRV.id, ...privacyTokenIds];
  }
);

export const findPTokenBySymbolSelector = createSelector(
  pTokensSelector,
  (pTokens: IPToken[]) => (symbol: string) => {
    const token = pTokens.find((token) => token.symbol === symbol);
    return token?.tokenId;
  }
);

export const followedTokensSelect = createSelector(
  tokenSelector,
  (token) => token.followed || []
);
export const popularCoinIdsSeletor = createSelector(
  preloadSelector,
  (preload) => {
    const { mainnet } = preload.configs;
    if (mainnet) {
      return {
        BTC: 'b832e5d3b1f01a4f0623f7fe91d6673461e1f5d37d91fe78c5c2e6183ff39696',
        ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e912ad79875f4373070b59392b1756c8f',
        USDT:
          '716fd1009e2a1669caacc36891e707bfdf02590f96ebd897548e8963c95ebac0',
        BNB: 'b2655152784e8639fa19521a7035f331eea1f1e911b2f3200a507ebb4554387b',
        XMR: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
      };
    }
    return {
      BTC: '4584d5e9b2fc0337dfb17f4b5bb025e5b82c38cfa4f54e8a3d4fcdd03954ff82',
      ETH: 'ffd8d42dc40a8d166ea4848baf8b5f6e9fe0e9c30d60062eb7d44a8df9e00854',
      USDT: '4946b16a08a9d4afbdf416edf52ef15073db0fc4a63e78eb9de80f94f6c0852a',
      BNB: '9fca0a0947f4393994145ef50eecd2da2aa15da2483b310c2c0650301c59b17d',
      XMR: 'c01e7dc1d1aba995c19b257412340b057f8ad1482ccb6a9bb0adce61afbf05d4',
    };
  }
);

export const getPrivacyDataByTokenIDSelector = createSelector(
  pCustomTokensSelector,
  pTokensSelector,
  followedTokensIdsSelector,
  followedTokensSelect,
  accountBalanceSelector,
  popularCoinIdsSeletor,
  preloadSelector,
  (
    pCustomTokens,
    pTokens,
    followedTokensIds,
    followed,
    accountBalance,
    coins,
    preloadState
  ) =>
    memoize((tokenID: string) => {
      try {
        const { decimalSeparator, groupSeparator } = preloadState;
        const followedIds = followedTokensIds();
        const pTokenData = pTokens?.find(
          (token: IPToken) => token?.tokenId === tokenID
        );
        const pCustomTokenData = pCustomTokens?.find(
          (token) =>
            token?.tokenId === tokenID && token?.tokenId !== pTokenData?.tokenId
        );
        if (!pCustomTokenData && !pTokenData && tokenID !== COINS.PRV.id) {
          throw new Error(`Can not find coin with id ${tokenID}`);
        }
        const token = new SelectedPrivacy(pCustomTokenData, pTokenData);
        const amount = token.isNativeToken
          ? accountBalance
          : followed.find((token: IFollowedToken) => token?.tokenId === tokenID)
              ?.amount || 0;
        const isFollowed = followedIds.some(
          (tokenId: string) => tokenId === tokenID
        );
        const tokenUSDT = pTokens.find(
          (token) => token?.tokenId === coins.USDT
        );
        const price = getPrice({ token, tokenUSDT });
        const formatAmount = format.formatAmount({
          originalAmount: amount,
          decimals: token.pDecimals,
          decimalSeparator,
          groupSeparator,
        });
        const formatPriceByUsd = getFormatAmountByUSD({
          amount: 1,
          priceUsd: price.priceUsd,
          decimalSeparator,
          groupSeparator,
          decimals: tokenUSDT?.pDecimals,
        });
        const formatBalanceByUsd = getFormatAmountByUSD({
          amount: convert.toHumanAmount({
            originalAmount: amount,
            decimals: token.pDecimals,
          }),
          priceUsd: price.priceUsd,
          decimalSeparator,
          groupSeparator,
          decimals: tokenUSDT?.pDecimals,
        });
        const data = {
          ...token,
          ...price,
          isFollowed,
          amount,
          formatAmount,
          formatPriceByUsd,
          formatBalanceByUsd,
        };
        return data;
      } catch (e) {
        throw e;
      }
    })
);

export const availableTokensSelector = createSelector(
  pTokensSelector,
  pCustomTokensSelector,
  getPrivacyDataByTokenIDSelector,
  (pTokens, pCustomTokens, getPrivacyDataByTokenID) => {
    let pTokensIds = pTokens.map((token: IPToken) => token.tokenId);
    let pCustomTokensIds = pCustomTokens
      .filter(
        (token: IPCustomToken) =>
          !isEmpty(token?.name) && !isEmpty(token?.symbol)
      )
      .filter((token) => !pTokensIds.includes(token?.tokenId))
      .map((token) => token?.tokenId);
    const allTokenIds = [...pTokensIds, ...pCustomTokensIds];
    let tokens: ISelectedPrivacy[] = allTokenIds
      .map((tokenId: string) => getPrivacyDataByTokenID(tokenId))
      .filter((token) => token?.name && token?.symbol && token.tokenId);
    return uniqBy(tokens, 'tokenId') || [];
  }
);

export const pUSDTSelector = createSelector(
  popularCoinIdsSeletor,
  getPrivacyDataByTokenIDSelector,
  (coins, getPrivacyDataByTokenID) => getPrivacyDataByTokenID(coins.USDT)
);

export const selectedTokenIdSelector = createSelector(
  tokenSelector,
  (token) => token.selectedTokenId || COINS.PRV.id
);

export const selectedPrivacySelector = createSelector(
  getPrivacyDataByTokenIDSelector,
  selectedTokenIdSelector,
  (getPrivacyDataByTokenID, tokenId) => getPrivacyDataByTokenID(tokenId)
);

export const bridgeTokensSelector = createSelector(
  tokenSelector,
  (token) => token.pTokens
);

export const chainTokensSelector = createSelector(
  tokenSelector,
  (token) => token.pCustomTokens
);

export const totalShieldedTokensSelector = createSelector(
  getPrivacyDataByTokenIDSelector,
  followedTokensIdsSelector,
  decimalSeparatorSelector,
  groupSeparatorSelector,
  pUSDTSelector,
  (
    getPrivacyDataByTokenID,
    followedIds,
    decimalSeparator,
    groupSeparator,
    USDT
  ) => {
    const followed = followedIds(false);
    const tokens = followed.map((tokenId) => getPrivacyDataByTokenID(tokenId));
    const totalShieldedTokens = compact([...tokens]).reduce(
      (
        prevValue: {
          totalShieldByPRV: number;
          totalShieldByUSD: number;
        },
        currentValue: ISelectedPrivacy
      ) => {
        const totalShieldByPRV = new BigNumber(prevValue.totalShieldByPRV);
        const totalShieldByUSD = new BigNumber(prevValue.totalShieldByUSD);
        const pricePrv = new BigNumber(currentValue?.pricePrv || 0);
        const priceUsd = new BigNumber(currentValue?.priceUsd || 0);
        const humanAmount = convert.toHumanAmount({
          originalAmount: currentValue.amount,
          decimals: currentValue.pDecimals,
        });
        let _currentPrvValue = pricePrv.multipliedBy(humanAmount);
        if (_currentPrvValue.isNaN()) {
          _currentPrvValue = totalShieldByPRV;
        }
        let _currentUsdValue = priceUsd.multipliedBy(humanAmount);
        if (_currentUsdValue.isNaN()) {
          _currentUsdValue = totalShieldByUSD;
        }
        return {
          totalShieldByPRV: totalShieldByPRV.plus(_currentPrvValue).toNumber(),
          totalShieldByUSD: totalShieldByUSD.plus(_currentUsdValue).toNumber(),
        };
      },
      {
        totalShieldByPRV: 0,
        totalShieldByUSD: 0,
      }
    );
    const { totalShieldByPRV, totalShieldByUSD } = totalShieldedTokens;
    const formatTotalAmountPRV = format.formatAmount({
      humanAmount: totalShieldByPRV,
      decimalSeparator,
      decimals: COINS.PRV.pDecimals,
      groupSeparator,
    });
    const formatTotalAmountUSD = format.formatAmount({
      humanAmount: totalShieldByUSD,
      decimalSeparator,
      decimals: USDT.pDecimals,
      groupSeparator,
    });
    return {
      formatTotalAmountPRV,
      formatTotalAmountUSD,
    };
  }
);