import React, { useRef } from 'react';
import styled from 'styled-components';
import { SettingIcon } from 'src/components/Icons';
import QrCode from 'src/components/QrCodeLink';
import { BtnSelectAccount } from 'src/module/Account/features/SelectAccount';
import { route as receiveRoute } from 'src/module/Account/features/Receive';
import ConnectStatus from 'src/components/Icons/ConnectStatus';
import { useDispatch, useSelector } from 'react-redux';
import { ITheme } from 'src/styles';
import { delay } from 'src/utils';
import ErrorBoundary from 'src/components/ErrorBoundary';
import Refresh from 'src/components/Refresh';
import { actionRemoveTooltip, actionShowTooltip } from 'src/module/Tooltip/Tooltip.actions';
import { IWalletLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { actionSetRefreshPage } from './Header.actions';
import { refreshHeaderSelector } from './Header.selector';

const Styled = styled.div`
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 24px;
    .menu {
        display: flex;
        align-items: center;
    }
    .menu .btn-select-account {
        margin-left: 10px;
    }
    .menu .refresh-container {
        margin-left: 15px;
    }
    .refresh-icon {
        -webkit-filter: ${(props: { theme: ITheme }) => props.theme.text};
        -webkit-filter: brightness(0%);
    }
`;

interface IProps {
    showConnectStatus?: boolean;
    showReloadBalance?: boolean;
    handleRefresh: () => any;
}

const idRefresh = 'tooltip-refresh';
const HeaderApp = React.memo((props: IProps & any) => {
    const { showConnectStatus, showReloadBalance, handleRefresh } = props;
    const translate: IWalletLanguage = useSelector(translateByFieldSelector)('wallet');
    const dispatch = useDispatch();
    const refreshing = useSelector(refreshHeaderSelector);
    const iconRefreshRef: any = useRef(null);
    const showTooltipRefresh = () => {
        dispatch(
            actionShowTooltip({
                id: idRefresh,
                text: translate.tooltip.refresh,
                ref: iconRefreshRef ? iconRefreshRef.current : null,
                timeout: 0,
            }),
        );
    };
    const removeTooltipRefresh = () => {
        dispatch(actionRemoveTooltip(idRefresh));
    };
    const onClickRefresh = () => {
        removeTooltipRefresh();
        handleRefresh && handleRefresh();
    };
    return (
        <Styled>
            <div className="menu">
                <SettingIcon />
                {!!showReloadBalance && (
                    <Refresh
                        ref={iconRefreshRef}
                        handleRefresh={onClickRefresh}
                        refreshing={refreshing}
                        onMouseOver={showTooltipRefresh}
                        onMouseOut={removeTooltipRefresh}
                    />
                )}
                {!!showConnectStatus && <ConnectStatus />}
            </div>
            <div className="menu">
                <QrCode route={receiveRoute} />
                <BtnSelectAccount />
            </div>
        </Styled>
    );
});

const enhanceHeaderApp = (WrappedComponent: React.FunctionComponent) => (props: IProps & any) => {
    const { showConnectStatus, showReloadBalance, handleRefresh } = props;
    const dispatch = useDispatch();
    const onHandleRefresh = async () => {
        if (typeof handleRefresh === 'function') {
            try {
                await dispatch(actionSetRefreshPage(true));
                await Promise.all([handleRefresh(true), delay()]);
            } catch (error) {
                throw error;
            } finally {
                dispatch(actionSetRefreshPage(false));
            }
        }
    };
    return (
        <ErrorBoundary>
            <HeaderApp
                handleRefresh={onHandleRefresh}
                showConnectStatus={showConnectStatus}
                showReloadBalance={showReloadBalance}
            />
            <WrappedComponent {...props} />
        </ErrorBoundary>
    );
};
export default enhanceHeaderApp;
