import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInstance } from 'incognito-js/build/web/browser';
import styled from 'styled-components';
import { actionToggleToast, Header, TOAST_CONFIGS } from 'src/components';
import { IAccountLanguage } from 'src/i18n';
import { translateByFieldSelector } from 'src/module/Configs';
import { useMasterKeyWithKeychains } from 'src/hooks/useMasterKeyWithKeychains';
import MasterKeyItem from 'src/module/HDWallet/features/MasterKeyItem';
import { actionHandleSwitchAccount } from 'src/module/Account/Account.actions';
import { isAccountSelectedSelector } from 'src/module/Account/Account.selector';
import { useHistory } from 'react-router';
import { actionToggleModal } from 'src/components/Modal';
import Loading from 'src/components/Icons/Loading';

const Styled = styled.div``;

const SelectAccount = React.memo(() => {
    const tsAccount: IAccountLanguage = useSelector(translateByFieldSelector)('account');
    const dispatch = useDispatch();
    const [listMasterKeyWithKeychains] = useMasterKeyWithKeychains();
    const isAccountSelected = useSelector(isAccountSelectedSelector);
    const history = useHistory();
    const factories = listMasterKeyWithKeychains.map((item) => {
        const result = {
            masterKeyId: item.walletId,
            masterKeyName: item.walletName,
            listAccount: item.listAccount.map((account: AccountInstance) => {
                return {
                    ...account,
                    name: account.name,
                    address: account.key.keySet.paymentAddressKeySerialized,
                    isSelected: isAccountSelected(account),
                };
            }),
        };
        return result;
    });
    const handleSelectAccount = async (account: AccountInstance, walletId: number) => {
        try {
            await dispatch(actionToggleModal({ isLoadingModal: true, data: <Loading center /> }));
            await dispatch(actionHandleSwitchAccount(account, walletId));
            history.goBack();
        } catch (error) {
            dispatch(
                actionToggleToast({
                    toggle: true,
                    value: error,
                    type: TOAST_CONFIGS.error,
                }),
            );
        } finally {
            await dispatch(actionToggleModal({}));
        }
    };
    return (
        <Styled>
            <Header title={tsAccount.selectAccount.headerTitle} canSearch />
            <div className="scroll-view">
                {factories.map((item) => (
                    <MasterKeyItem
                        key={item.masterKeyName}
                        data={{ masterKeyName: item.masterKeyName, listAccount: item.listAccount }}
                        onSelectedItem={(account: AccountInstance) => handleSelectAccount(account, item.masterKeyId)}
                    />
                ))}
            </div>
        </Styled>
    );
});

export default SelectAccount;
