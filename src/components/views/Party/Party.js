import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { useHistory, useParams } from 'react-router-dom';

import { AppIcon } from '@folio/stripes/core';

import { Pane, Button, Icon } from '@folio/stripes/components';

import PartyInfo from '../../PartySections';
import urls from '../../../util/urls';

const propTypes = {
  onClose: PropTypes.func.isRequired,
  resource: PropTypes.object,
};

const Party = ({ resource: party, onClose }) => {
  const history = useHistory();
  const params = useParams();

  const getSectionProps = (name) => {
    return {
      id: `publication-request-section-${name}`,
      party,
    };
  };

  const handleEdit = () => {
    history.push(`${urls.partyEdit(params?.id)}`);
  };

  return (
    <Pane
      actionMenu={() => (
        <Button
          buttonStyle="dropdownItem"
          id="clickable-dropdown-edit-party"
          onClick={handleEdit}
        >
          <Icon icon="edit">
            <FormattedMessage id="ui-oa.party.edit" />
          </Icon>
        </Button>
      )}
      appIcon={<AppIcon iconKey="app" size="small" />}
      defaultWidth="55%"
      dismissible
      onClose={onClose}
      paneTitle={
        <FormattedMessage
          id="ui-oa.party.familyNameOrdered"
          values={{
            familyName: party?.familyName,
            givenNames: party?.givenNames,
          }}
        />
      }
    >
      <PartyInfo {...getSectionProps('partyInfo')} />
    </Pane>
  );
};

Party.propTypes = propTypes;

export default Party;
