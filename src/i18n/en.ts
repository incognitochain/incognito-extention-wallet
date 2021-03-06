import { ILanguage } from './interface';

const language: ILanguage = {
    preload: {
        title1: `Entering incognito mode<br />for your crypto...`,
        title2: `Please check your connection or<br />re-install the application<br />(only if you have a backup of your private keys) and try again.`,
        btnRetry: 'Retry',
        openExtension: 'You’re ready to go Incognito.',
        openExtensionSub: 'Just close this window and relaunch the extension.',
    },
    general: {
        copied: 'Copied',
        copy: 'Copy',
        seeKey: 'See keys',
        lostNetwork:
            'Your internet connection is currently<br />unstable. Please check your network<br />settings and try again.',
        btnReload: 'Reload',
        loadingTx: `Please do not navigate away till this<br />window closes.`,
        btnRetry: 'Retry',
        switched: 'Switched',
        removed: 'Removed',
        keys: 'keys',
        readyDesc: 'You’re ready to go Incognito.',
        hasCameraDesc: 'To continue using Incognito, please close this window and reopen the extension.',
        scanQrCode: 'Scan QR Code',
        placeQrCode: 'Place the QR code in front of your camera',
        cameraReadyDesc: 'Scan function enabled.',
        success: 'Success',
        masterKey: 'Master keys',
        masterLess: 'Masterless',
        keychainName: 'Keychain name',
        masterKeyName: 'Master key name',
        privateKey: 'Private key',
        phrase: 'Phrase',
    },
    home: {
        title: 'Incognito Wallet',
    },
    keychain: {
        headerTitle: 'Keychain',
        yourKeychain: 'Your keychains',
        revealPhraseBtn: 'View keys',
        addKeys: {
            title: 'Add keys',
            addKeychain: 'Add a keychain',
            addKeyChainDesc: 'Create new keychain in a master key',
            importKeyChain: 'Import via private key',
            addMasterKey: 'Add a master key',
            createMasterKey: 'Create new master key',
            importMasterKey: 'Import master key',
            addKeychainHeaderTitle: 'Add a keychain',
            importKeychainHeaderTitle: 'Import a keychain',
        },
    },
    wallet: {
        headerTitle: 'Assets',
        addCoin: 'Manage coin list',
        error: {
            walletNotExisted: 'Wallet is not exist',
            walletIdNotFound: 'Can not found wallet id',
            canNotSwitchWallet: 'Can not switch wallet',
            canNotLoadWallet: 'Can not load wallet',
            canNotRemoveWallet: 'Can not remove wallet',
        },
        tooltip: {
            refresh: 'Refresh this page',
        },
        blockShield: {
            totalShielded: 'Shielded Balance',
            btnShield: 'Shield my crypto',
        },
    },
    token: {
        followToken: {
            headerTitle: 'Manage coin list',
            addManually: 'Add manually +',
            dontSeeYourCoin: `Don't see your coin?`,
        },
        addToken: {
            headerTitle: 'Search a coin',
            added: 'Added',
        },
        detail: {
            headerTitle: '',
            btnSend: 'Send',
            btnReceive: 'Receive',
        },
        infoToken: {
            headerTitle: 'Coin info',
        },
        error: {
            tokenIdRequired: 'Token id is required',
        },
        toolTip: {
            coinInfo: 'See coin info',
            txInfo: 'See tx',
        },
        addManually: {
            headerTitle: 'Add manually',
            btnAction: 'Add a new coin to Incognito',
            btnAddManually: 'Add manually',
            bep2Placeholder: 'Search by BEP2 origin symbol',
            erc20Placeholder: 'Search by ERC20 Address',
            selectTokenType: 'Select token type',
            name: 'Name',
            symbol: 'Symbol',
        },
    },
    account: {
        create: {
            title: 'Create keychain',
            desc: 'Create a new keychain',
        },
        import: {
            title: 'Import keychain',
            desc: 'Import an existing keychain',
            subAllMethods:
                'This keychain is not linked to any of your current master keys. Import its master key to restore all associated keychains, or import this keychain only.',
            btnImportMasterKey: 'Import master key',
            btnImportKeychainOnly: 'Import keychain only',
        },
        backup: {
            title: 'Back up',
            desc: 'Backup your private keys',
            headerTitle: 'Backup your private keys',
            copyAll: 'Copy all keys',
            copied: 'Copied',
        },
        accountDetail: {
            title1: 'Incognito address',
            title2: 'Private key',
            title3: 'Public key',
            title4: 'Readonly key',
            title5: 'Validator key',
            title6: 'Bls key',
            title7: 'Device token',
            index: 'Index',
            shard: 'Shard',
            keychain: 'keychain',
            removeKey: 'Remove keychain',
        },
        receive: {
            headerTitle: 'Receive anonymously',
            hook: `This is your address.\nUse it to receive any cryptocurrency\nfrom another Incognito address.`,
        },
        error: {
            create: 'Keychain was not created! Please try again.',
            import: 'Import keychain failed, please try again.',
            keychainNotExisted: 'Keychain is not exist',
            canNotCreate: `Can not create keychain`,
            canNotImport: `Can not import keychain`,
            canNotRemove: `Can not remove keychain`,
            keychainExisted: 'This keychain already exists on this extension.',
            keychainInvalid: 'Please try again with a valid private key.',
        },
        success: {
            create: 'Keychain successfully created.',
            import: 'Import successful.',
            remove: 'Keychain removed.',
        },
        general: {
            placeholderName: 'Enter a name for your keychain',
            placeholderPrivateKey: 'Enter private key ',
        },
        selectAccount: {
            headerTitle: 'Search keychains',
        },
    },
    setting: {
        headerTitle: 'Settings',
        network: {
            title: 'Network',
        },
        dev: {
            title: 'Dev Sections',
            homeConfigs: 'Use staging home configs',
        },
        addressBook: {
            title: 'Address Book',
            desc: 'Manage your saved addresses',
        },
        keychain: {
            title: 'Keychain',
            desc: 'Manage your keychains',
        },
        decimalDigits: {
            title: 'Decimal Digits',
            desc: 'Limit main asset<br />displays to 5 decimal digits',
        },
        darkMode: {
            title: 'Theme',
            desc: 'Use dark mode and light mode',
        },
        logout: {
            title: 'Logout',
        },
    },
    send: {
        headerTitle: 'Send',
        forceSendHeaderTitle: 'Confirm transaction',
        cancel: 'Cancel',
        amount: 'Enter amount',
        toAddress: 'To',
        incognitoAddress: 'Enter address',
        fee: 'Fee',
        speed: 'Speed',
        memo: 'Memo',
        placeholderMemo: 'Add a memo (optional)',
        balance: 'Balance',
        confirm: {
            headerTitle: 'Back',
            txId: 'TxID',
            fee: 'Fee',
            time: 'Time',
            toAddress: 'To address',
            amount: 'Amount',
            sent: 'Sent.',
        },
        placeholderMemoBEP2: `For withdrawals to wallets on exchanges (e.g. Binance, etc.), enter your memo to avoid loss of funds.`,
    },
    history: {
        headerTitle: 'Transaction details',
        id: 'ID',
        fee: 'Fee',
        status: 'Status',
        time: 'Time',
        toAddress: 'To address',
        coin: 'Coin',
        expiredAt: 'Expired at',
        inchainTxId: 'Inchain TxID',
        outchainTxId: 'Outchain TxID',
        shieldingAddress: 'Shielding address',
        memo: 'Memo',
        contract: 'Contract',
        resume: 'Resume',
        cancel: 'Cancel',
        retryCentralizedMsg: 'Your request has been sent, we will process it soon. The history status will be updated',
        retryDecentralizedMsg: 'Your request has been sent, we will process it soon.',
        inchainFee: 'In-chain fee',
        outchainFee: 'Out-chain fee',
        inchainStatus: 'In-chain status',
        outchainStatus: 'Out-chain status',
    },
    addressBook: {
        headerTitle: 'Address book',
        name: 'Name',
        address: 'Address',
        networkName: 'Network',
        btnCreate: 'Create',
        btnEdit: 'Edit',
        btnRemove: 'Remove',
        btnSave: 'Save this address book',
        msgExist: 'Address book is exist!',
        keychains: 'Your keychains',
        incognito: 'Incognito addresses',
        external: 'External addresses',
        headerTitleCreate: 'Create',
        headerTitleEdit: 'Edit',
    },
    shield: {
        headerTitle: 'Search coins',
        placeholder: 'Search coins',
        whyShield: {
            headerTitle: 'Why shield?',
            content: `
            <p class='sub-text'>
                To transact anonymously, first you have to shield your crypto. When
                you send coins to be shielded, an identical – but 100% private –
                version is generated. If you withdraw your coins from the Incognito
                network, this privacy version will be burned, and the original will be
                returned. All original coins are stored safely using the methods
                below:
            </p>
            <p class='main-text fw-medium fs-medium'>Trustless bridge for Ethereum</p>
            <p class='sub-text'>
                For ETH and all ERC20 tokens, your crypto is safely secured in a
                trustless smart contract.
            </p>
            <p class='main-text fw-medium fs-medium'>Portal (upcoming)</p>
            <p class='sub-text'>
                For other coins, your crypto is stored in one of the wallets
                maintained by the Incognito Core team. We’re working on a trustless
                solution for this too, called Portal.
            </p>
        `,
        },
        genShieldAddress: {
            headerTitle: 'Shield',
            title1: `Send to this shielding<br />address <span class='fw-bold'>once only.</span>`,
            title2: `Expires in: `,
            title3: `Minimum: `,
            title4: `Smaller amounts will not be processed.`,
            title5: `If sending from an exchange, please take<br />withdrawal times into account.`,
            title6: `It may be more reliable to use a normal<br />wallet as an intermediary.`,
            error1: `We seem to have hit a snag. Simply<br />tap to try again.`,
            error2: `If that doesn’t work,<br /> please come back in 60 minutes.`,
            tooltip: 'Make sure you have selected the right coin',
        },
    },
    detail: {
        headerTitle: '',
        btnSend: 'Send',
        btnReceive: 'Receive',
    },
    error: {
        tokenIdRequired: 'Token id is required',
        invalidMnemonic: 'That’s not quite right',
        invalidMasterKeyName: 'Master key names must be alphanumeric. Please choose another.',
        invalidPassword: 'That’s not quite right.',
        invalidPasswordLength: 'Please provide a password of at least 10 characters',
    },
    welcome: {
        newUser: {
            title1: 'Encrypt access to your funds.',
            title2:
                'Create a password to protect this wallet and access your transaction history. For your eyes only; no one will be able to help you recover it. Keep it safe.',
            createPass: 'Create password (min. 10 chars)',
            confirmCreatePass: 'Enter the password again',
            createKey: 'Create new key',
            importKey: 'Import phrase',
            getStartedTitle: 'Private is better.',
            getStartedDesc: 'Time to turn on incognito mode for your crypto.',
            getStartedBtn: 'Get started',
        },
        forgotPass: {
            title1: 'Forgot your password?',
            title2:
                'Simply enter a new one. To start fresh, create a new master key. To recover existing funds, import a phrase. Note that existing transaction history cannot be recovered without its original password.',
            createPass: 'Create password (min. 10 chars)',
            confirmCreatePass: 'Enter the password again',
            createKey: 'Create new key',
            importKey: 'Import phrase',
        },
        oldUser: {
            title: 'Hello again.',
            input: 'Enter your password',
            btn: 'Go Incognito',
            forgotPass: 'Forgot your password?',
        },
        error: {
            passwordLength: 'Password must be between 10 and 33 characters long.',
        },
    },
    password: {
        enterPasswordInput: 'Enter your password',
        enterPasswordBtn: 'OK',
    },
    hdWallet: {
        createMasterKeyName: {
            desc1: 'The next screen will contain 12 special words that will allow you to recover your funds.',
            desc2:
                'Be prepared to record them in a safe place.  If anyone gains access to them, they will gain access to your funds.',
            agreeDesc: 'I accept that if I lose these words I will lose access to my funds.',
            btnReady: 'I’m ready',
        },
        createMasterKeyMnemonic: {
            desc1: 'Save these words in the correct order. Never share this phrase with anyone else.',
            btnSave: "I've saved my phrase",
        },
        verifyMasterKeyMnemonic: {
            desc1: 'Click on these words in the correct order. If you make a mistake, click again to undo.',
        },
        importMasterKey: {
            title: 'Import master key',
        },
        info: {
            title: 'View keys',
            revealPhrase: 'Reveal master key phrase',
            viewKeys: 'View keychains',
            keychains: 'Keychains',
            masterlessKeychains: 'Masterless keychains',
            importTitle: 'Import a keychain',
            importDesc: 'Using a private key',
            backupTitle: 'Back up',
            backupDesc: 'Back up all masteriess private keys',
            masterlessDesc1:
                'You will not be able to back up these keychains with a master key phrase. Each keychain is only recoverable using its unique private key, so please keep them all safe.',
            masterlessDesc2:
                'Alternatively, you may wish to transfer funds to keychains that are linked to a master key.',
        },
        general: {
            qrTitle: 'Your secret phase',
            masterKeyNamePlaceholder: 'Enter a name for your master key',
            mnemonicPlaceholder: 'Recover phase',
            createBtn: 'Create',
            importBtn: 'Import',
        },
        error: {
            invalidMnemonic: 'That’s not quite right',
            invalidMasterKeyName: 'Master key names must be alphanumeric. Please choose another.',
            existMasterKeyName: 'You already have a master key with this name. Please try another.',
            existMasterKeyMnemonic: 'Master key mnemonic is exist',
            dupMasterless: 'Please choose another name.',
            canNotCreateMasterKey: 'Master key can be created',
            canNotFoundMasterKey: 'Master key not found',
            canNotRemoveMasterKey: 'Master key can be removed',
        },
        showMnemonic: {
            title: 'Back up',
            newMnemonic: 'Save these words in the correct order. Never share this phrase with anyone else.',
            newMnemonicBtn: "I've saved my phrase",
            hiddenText: `Click to reveal.<br /> Back it up if you haven’t!`,
        },
        success: {
            create: 'Master key successfully created.',
            import: 'Import successful.',
            remove: 'Master key removed.',
        },
    },
    modal: {
        addKeysModal: 'Add keys',
        createKeyModal: 'Create keychain',
    },
    connect: {
        headerTitle: 'Connect to',
    },
    disconnect: {
        headerTitle: 'Manage connections',
        subTitle: 'This app will no longer be able to view the balance of the address you disconnect.',
    },
    keysExplained: {
        header: 'Keys explained',
        desc: 'Different keys enable different access and actions.',
        content: [
            {
                title: 'Master key',
                text:
                    'A master key will allow you to recover all associated keychains and their keys, using a secret 12 word phrase. You <b>must</b> keep the master key phrase safe – it’s the only way to ensure no one but you can access your funds',
            },
            {
                title: 'Keychain',
                text:
                    'Each keychain is comprised of several essential keys, much like your car key or house key. The payment key allows you to receive funds, the validator key allows you to run a Node, and the private key – the most important key in any keychain – allows you to recover all other keys in that keychain.<br/><br/>If you need more than one payment address, or want to run more than one Node, simply generate new keychains',
            },
            {
                title: 'Be safe',
                text:
                    'A private key will restore its keychain, and a master key phrase will restore all its associated keychains. Anyone who gains access to these, gains access to your funds. So keep them safe.',
            },
        ],
    },
};

export default language;
