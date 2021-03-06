import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IWelcomeLanguage } from 'src/i18n';
import styled from 'styled-components';
import { translateByFieldSelector } from 'src/module/Configs';
import { AppIcon, Button, Header } from 'src/components';
import { Field, reset } from 'redux-form';
import { InputField, validator } from 'src/components/ReduxForm';
import { INPUT_FIELD } from 'src/components/ReduxForm/InputField';
import { ACTION_TYPES } from 'src/module/HDWallet';
import { useValidator } from 'src/hooks';
import withNewUser, { IMergeProps } from './NewUser.enhance';
import { FORM_CONFIGS } from './NewUser.constant';

const Styled = styled.div`
    .subtitle {
        margin-top: 15px;
    }
    .input-wrapper {
        margin: 30px 0;
        > .input-password:first-child {
            margin-bottom: 15px;
        }
    }
    .actions {
        button:first-child {
            margin-right: 2px;
        }
        button:last-child {
            margin-left: 2px;
        }
    }
    .error {
        margin-top: 10px;
    }
`;

const NewUser = (props: IMergeProps & any) => {
    const dispatch = useDispatch();
    const { isReset, disabled, onBack, handleSubmitForm, error }: IMergeProps = props;
    const { forgotPass, error: errorTs, newUser }: IWelcomeLanguage = useSelector(translateByFieldSelector)('welcome');
    const dictionary = isReset ? forgotPass : newUser;
    const [validatePassword] = useValidator({
        validator: [
            validator.required,
            validator.minLength(10, errorTs.passwordLength),
            validator.maxLength(32, errorTs.passwordLength),
        ],
    });
    const [validateCfmPassword] = useValidator({
        validator: [
            validator.required,
            validator.minLength(10, errorTs.passwordLength),
            validator.maxLength(32, errorTs.passwordLength),
        ],
    });
    React.useEffect(() => {
        dispatch(reset(FORM_CONFIGS.formName));
    }, []);
    return (
        <Styled className="scroll-view">
            <Header title=" " onGoBack={onBack} />
            <AppIcon />
            <p className="fs-medium fw-bold">{dictionary.title1}</p>
            <p className="sub-text subtitle">{dictionary.title2}</p>
            <form className="input-wrapper">
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.password}
                    componentProps={{
                        placeholder: dictionary.createPass,
                        maxLength: 33,
                    }}
                    inputType={INPUT_FIELD.password}
                    validate={[...validatePassword]}
                />
                <Field
                    component={InputField}
                    name={FORM_CONFIGS.confirmPassword}
                    componentProps={{
                        placeholder: dictionary.confirmCreatePass,
                        maxLength: 33,
                    }}
                    inputType={INPUT_FIELD.password}
                    validate={[...validateCfmPassword]}
                    errorCustom={error}
                />
            </form>
            <div className="actions flex">
                <Button
                    disabled={disabled}
                    onClick={() => handleSubmitForm(ACTION_TYPES.IMPORT)}
                    title={dictionary.importKey}
                />
                <Button
                    disabled={disabled}
                    onClick={() => handleSubmitForm(ACTION_TYPES.CREATE)}
                    title={dictionary.createKey}
                />
            </div>
        </Styled>
    );
};

export default withNewUser(React.memo(NewUser));
