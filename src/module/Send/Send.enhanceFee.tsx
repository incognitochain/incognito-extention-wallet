import debounce from 'lodash/debounce';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actionToggleToast, TOAST_CONFIGS } from 'src/components';
import ErrorBoundary from 'src/components/ErrorBoundary';
import { actionFetchFee } from './Send.actions';
import { ISendData } from './Send.interface';
import { sendDataSelector } from './Send.selector';

export interface Tinner {}

const enhance = (WrappedComponent: React.FunctionComponent) => (props: any) => {
    const dispatch = useDispatch();
    const { inputAddress, inputAmount, inputMemo, isIncognitoAddress, isExternalAddress }: ISendData = useSelector(
        sendDataSelector,
    );
    const handleChangeForm = async ({
        address,
        amount,
        memo,
        isExternalAddress,
        isIncognitoAddress,
    }: {
        address: string;
        amount: string;
        memo: string;
        isExternalAddress: boolean;
        isIncognitoAddress: boolean;
    }) => {
        try {
            if (!amount || !address) {
                return;
            }
            let defaultScreen = 'Send';
            if (isExternalAddress) {
                defaultScreen = 'UnShield';
            } else if (isIncognitoAddress) {
                defaultScreen = 'Send';
            }
            await dispatch(
                actionFetchFee({
                    amount,
                    address,
                    screen: defaultScreen,
                    memo,
                }),
            );
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        }
    };

    const deHandleChangeForm = React.useRef(debounce(handleChangeForm, 500));

    React.useEffect(() => {
        deHandleChangeForm.current({
            address: inputAddress,
            amount: inputAmount,
            memo: inputMemo,
            isExternalAddress,
            isIncognitoAddress,
        });
    }, [inputAddress, inputAmount, inputMemo, isExternalAddress, isIncognitoAddress]);
    return (
        <ErrorBoundary>
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};

export default enhance;
