import { AccountInstance } from 'incognito-js/build/web/browser';
import { defaultAccountSelector, listAccountSelector } from 'src/module/Account/Account.selector';
import { createSelector } from 'reselect';
import { IRootState } from 'src/redux/interface';
import { isMainnetSelector } from 'src/module/Preload/Preload.selector';

export const addressBookSelector = createSelector(
    (state: IRootState) => state.addressBook,
    (addressBook) => addressBook,
);

export const incognitoAddrSelector = createSelector(
    addressBookSelector,
    (addressBook) => addressBook.incognitoAddress || [],
);
export const externalAddrSelector = createSelector(
    addressBookSelector,
    (addressBook) => addressBook.externalAddress || [],
);

export const keychainAddrSelector = createSelector(
    listAccountSelector,
    defaultAccountSelector,
    isMainnetSelector,
    (accounts, defaultAccount, mainnet) =>
        (accounts &&
            defaultAccount &&
            accounts
                .filter(
                    (account: AccountInstance) =>
                        account.key.keySet.paymentAddressKeySerialized !==
                        defaultAccount.key.keySet.paymentAddressKeySerialized,
                )
                .map((account: AccountInstance) => ({
                    name: account.name,
                    address: account.key.keySet.paymentAddressKeySerialized,
                    type: 1,
                    mainnet,
                }))) ||
        [],
);
