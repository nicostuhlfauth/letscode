import React, {Component} from 'react'
import SettingsFrame from '../Base/Frame'
import AccountSettings from "../Settings/AccountSettings";
import GeneralSettings from "../Settings/GeneralSettings";

class Settings extends Component {
    render() {
        return (
            <SettingsFrame>
                <AccountSettings/>
                <GeneralSettings/>
            </SettingsFrame>
        )
    }
}

export default Settings