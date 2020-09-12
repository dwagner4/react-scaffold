import React from 'react';
import AuthPendingDialog from './AuthPendingDialog';
import {shallow, mount, configure} from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { IoT1ClickDevicesService } from 'aws-sdk';

Enzyme.configure({ adapter: new Adapter() });

describe("<AuthPendingDialog /> unit test", () => {
    it("Should render Account Pending Dialog", () => {
        const component = shallow(<AuthPendingDialog />)
        expect(component).toHaveLength(1);
    })
})