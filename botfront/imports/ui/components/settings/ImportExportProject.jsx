import React from 'react';
import PropTypes from 'prop-types';

import { Menu, Tab } from 'semantic-ui-react';

import ImportProject from './ImportProject.jsx';
import ExportProject from './ExportProject.jsx';

class ImportExportProject extends React.Component {
    constructor (props) {
        super(props);
        this.state = { activeMenuItem: 'Import', loading: false };
    }

    renderMenuItem = (itemText, itemKey = itemText) => {
        const { activeMenuItem, loading } = this.state;
        return (
            <Menu.Item
                disabled={loading}
                key={itemKey}
                active={activeMenuItem === itemKey}
                onClick={() => { this.setState({ activeMenuItem: itemKey }); }}
            >
                {itemText}
            </Menu.Item>
        );
    };

    setLoading = (newLoadingState) => {
        this.setState({ loading: newLoadingState });
    }

    getMenuPanes = () => {
        const { loading } = this.state;
        return [
            {
                menuItem: this.renderMenuItem('Import'),
                render: () => <Tab.Pane loading={loading} key='Import'><ImportProject setLoading={this.setLoading} /></Tab.Pane>,
            },
            {
                menuItem: this.renderMenuItem('Export'),
                render: () => <Tab.Pane loading={loading} key='Export'><ExportProject setLoading={this.setLoading} /></Tab.Pane>,
            },
        ];
    }

    render () {
        return (
            <Tab className='import-export-project' menu={{ pointing: true, secondary: true }} panes={this.getMenuPanes()} />
        );
    }
}

export default ImportExportProject;
