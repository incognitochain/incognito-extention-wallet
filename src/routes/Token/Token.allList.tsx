import React from 'react';
import { Checkbox } from 'src/components/Core';
import ListToken from './Token.list';
import { FONT_SIZES } from 'src/styles';
import styled from 'styled-components';
import { IAllListTokenInner } from './Token.interface';

const Styled = styled.div`
  .hook {
    flex-direction: 'row';
    align-items: 'center';
    margin-top: 35px;
  }
  .hookText {
    font-weight: 200;
    font-size: ${FONT_SIZES.regular};
    line-height: ${FONT_SIZES.regular + 5};
    margin-left: 5px;
  }
`;

const ListAllToken = (props: IAllListTokenInner) => {
  const {
    tokensFactories,
    onToggleUnVerifiedTokens,
    toggleUnVerified,
    renderItem,
  } = props;
  return (
    <Styled>
      <ListToken {...tokensFactories[0]} renderItem={renderItem} />
      <Checkbox
        onHandleChecked={onToggleUnVerifiedTokens}
        checked={toggleUnVerified}
        label={`Show unverified coins`}
      />
      <ListToken {...tokensFactories[1]} renderItem={renderItem} />
    </Styled>
  );
};

ListAllToken.propTypes = {};

export default React.memo(ListAllToken);