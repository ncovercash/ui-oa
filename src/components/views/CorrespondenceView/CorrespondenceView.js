import { FormattedMessage } from 'react-intl';

import {
  Pane,
  Paneset,
  PaneMenu,
  IconButton,
  Row,
  Col,
  KeyValue,
  NoValue,
  Button,
  Icon,
} from '@folio/stripes/components';

import { AppIcon, IfPermission } from '@folio/stripes/core';
import PropTypes from 'prop-types';


const propTypes = {
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  correspondence: PropTypes.object,
};


const CorrespondenceView = ({ onClose, onDelete, correspondence }) => {
  const getActionMenu = () => {
    return (
      <>
        <IfPermission perm="oa.correspondence.edit">
          <Button
            buttonStyle="dropdownItem"
            id="correspondence-edit-button"
          >
            <Icon icon="edit">
              <FormattedMessage id="stripes-smart-components.notes.edit" />
            </Icon>
          </Button>
        </IfPermission>
        <IfPermission perm="oa.correspondence.manage">
          <Button buttonStyle="dropdownItem" id="correspondence-delete-button" onClick={() => onDelete()}>
            <Icon icon="trash">
              <FormattedMessage id="stripes-smart-components.notes.delete" />
            </Icon>
          </Button>
        </IfPermission>
      </>
    );
  };
  const renderFirstMenu = () => {
    return (
      <PaneMenu>
        <FormattedMessage id="ui-oa.publicationRequest.closeForm">
          {([ariaLabel]) => (
            <IconButton
              aria-label={ariaLabel}
              icon="times"
              id="close-correspondence-view-button"
              onClick={() => onClose()}
            />
          )}
        </FormattedMessage>
      </PaneMenu>
    );
  };

  return (
    <Paneset>
      <Pane
        actionMenu={getActionMenu}
        appIcon={<AppIcon app="oa" />}
        centerContent
        defaultWidth="100%"
        firstMenu={renderFirstMenu()}
        id="pane.oa.correspondence.view"
        paneTitle={<FormattedMessage id="ui-oa.correspondence.view" />}
      >
        {/* <ConfirmationModal /> */}
        <Row>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.correspondent" />}>
              {correspondence?.correspondent ?? <NoValue />}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.dateOfCorrespondence" />}>
              {correspondence?.dateOfCorrespondence ?? <NoValue />}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.status" />}>
              {correspondence?.status?.label ?? <NoValue />}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.mode" />}>
              {correspondence?.mode?.label ?? <NoValue />}
            </KeyValue>
          </Col>
          <Col xs={3}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.category" />}>
              {correspondence?.category?.label ?? <NoValue />}
            </KeyValue>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <KeyValue label={<FormattedMessage id="ui-oa.correspondence.description" />}>
              {correspondence?.content ?? <NoValue />}
            </KeyValue>
          </Col>
        </Row>
      </Pane>
    </Paneset>
  );
};

CorrespondenceView.propTypes = propTypes;

export default CorrespondenceView;
