import { AccountInstance, TxHistoryModel, TxHistoryModelParam } from 'incognito-js/build/web/browser';
import { PrivacyToken } from 'incognito-js/build/web/browser/src/walletInstance/token';
import React from 'react';
import { useSelector } from 'react-redux';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { defaultAccountSelector } from 'src/module/Account';
import { bridgeTokensSelector, chainTokensSelector, ISelectedPrivacy, selectedPrivacySelector } from 'src/module/Token';
import { useHistory } from 'react-router-dom';
import { route as routeConfirmTx } from 'src/module/Send/features/ConfirmTx';
import toString from 'lodash/toString';
import { sendDataSelector, userFeesSelector } from './Send.selector';
import { ISendData, IUserFeesData } from './Send.interface';
import { getHistoryCacheDetailSelector } from '../History';

interface IProps {}

export interface TInnerUnshield {
    handleUnShieldCrypto: () => any;
}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const {
        isUseTokenFee,
        isUsedPRVFee,
        incognitoAmount,
        requestedAmount,
        paymentAddress,
        memo,
        userFeeSelection,
        userFeeLevel,
        userFee,
        privacyFee,
        nativeFee,
        originalFee,
        feeSymbol,
        symbol,
        amountFormatedNoClip,
        totalFeeFormatedNoClip,
    }: ISendData = useSelector(sendDataSelector);
    const getHistoryCacheDetail = useSelector(getHistoryCacheDetailSelector);
    const selectedPrivacy: ISelectedPrivacy = useSelector(selectedPrivacySelector);
    const { data }: { data: IUserFeesData } = useSelector(userFeesSelector);
    const { isDecentralized, tokenId } = selectedPrivacy;
    const account: AccountInstance = useSelector(defaultAccountSelector);
    const bridgeTokens = useSelector(bridgeTokensSelector);
    const chainTokens = useSelector(chainTokensSelector);
    const history = useHistory();
    const handleCentralizedWithdraw = async (token: PrivacyToken) => {
        const { FeeAddress: masterAddress, Address: tempAddress } = data;
        if (!tempAddress) {
            throw new Error(`Can't not get temp address`);
        }
        if (!masterAddress) {
            throw new Error(`Can't not get master address`);
        }
        let paymentInfoList = [
            {
                paymentAddressStr: masterAddress,
                amount: userFee,
                message: '',
            },
            {
                paymentAddressStr: tempAddress,
                amount: toString(originalFee),
                message: '',
            },
        ];
        let privacyPaymentInfoList = [
            {
                paymentAddressStr: tempAddress,
                amount: toString(incognitoAmount),
                message: '',
            },
        ];
        isUseTokenFee ? (privacyPaymentInfoList = [...privacyPaymentInfoList, ...paymentInfoList]) : false;
        const burnTx: TxHistoryModel = await token.bridgeBurningCentralized({
            nativeFee,
            privacyFee,
            privacyPaymentInfoList,
            nativePaymentInfoList: isUsedPRVFee ? [...paymentInfoList] : [],
            memo,
        });
        const burningTxId = burnTx.txId;
        if (!burningTxId) {
            throw new Error(`Burned token, but doesnt have txID, please check it`);
        }
        await token.bridgeWithdrawCentralized({
            burningTxId,
            userFeeLevel,
            userFeeSelection,
            tempAddress,
            privacyFee,
            nativeFee,
        });
        const hc = getHistoryCacheDetail(burnTx);
        history.push(routeConfirmTx, {
            confirmTx: {
                txId: burningTxId,
                paymentAddress,
                time: hc.timeFormated,
                amount: amountFormatedNoClip,
                symbol,
                fee: totalFeeFormatedNoClip,
                feeSymbol,
            },
        });
    };
    const handleDecentralizedWithdraw = async (token: PrivacyToken) => {
        const { FeeAddress: masterAddress, ID: userFeeId } = data;
        if (!masterAddress) {
            throw new Error(`Can't not get master address`);
        }
        let burningTxId = '';
        const decentralizedWithdrawData = {
            incognitoAmount,
            requestedAmount,
            paymentAddress,
            userFeeId,
            userFeeSelection,
            userFeeLevel,
            burningTxId: '',
        };
        const burnTx: TxHistoryModelParam = await token.bridgeBurningDecentralized({
            outchainAddress: paymentAddress,
            burningAmount: incognitoAmount,
            nativeFee,
            privacyFee,
            privacyPaymentInfoList: isUseTokenFee
                ? [
                      {
                          paymentAddressStr: masterAddress,
                          amount: userFee,
                          message: '',
                      },
                  ]
                : [],
            nativePaymentInfoList: isUsedPRVFee
                ? [
                      {
                          paymentAddressStr: masterAddress,
                          amount: userFee,
                          message: '',
                      },
                  ]
                : [],
            memo,
        });
        burningTxId = burnTx.txId;
        decentralizedWithdrawData.burningTxId = burningTxId;
        if (!burningTxId) {
            throw new Error(`Burned token, but doesnt have txID, please check it`);
        }
        await token.bridgeWithdrawDecentralized(decentralizedWithdrawData);
        const hc = getHistoryCacheDetail(burnTx);
        history.push(routeConfirmTx, {
            confirmTx: {
                txId: burningTxId,
                paymentAddress,
                time: hc.timeFormated,
                amount: amountFormatedNoClip,
                symbol,
                fee: totalFeeFormatedNoClip,
                feeSymbol,
            },
        });
    };
    const handleUnShieldCrypto = async () => {
        try {
            const token = await account.getPrivacyTokenById(tokenId, bridgeTokens, chainTokens);
            if (isDecentralized) {
                await handleDecentralizedWithdraw(token);
            } else {
                await handleCentralizedWithdraw(token);
            }
        } catch (error) {
            throw error;
        }
    };
    return (
        <ErrorBoundary>
            <WrappedComponent {...{ ...props, handleUnShieldCrypto }} />
        </ErrorBoundary>
    );
};

export default enhance;