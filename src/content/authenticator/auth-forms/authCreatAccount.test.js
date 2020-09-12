import React from 'react';
import AuthCreateAccountDialog from './AuthCreateAccountDialog';
import {shallow, mount, configure} from 'enzyme'
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe("<AuthCreateAccount /> unit test", () => {
    const mockFn = jest.fn();
    const props = {
        a: "a",
        onClick: mockFn,
    };
    it("Should render Account Create Dialog", () => {
        const component = shallow(<AuthCreateAccountDialog />);
        expect(component).toHaveLength(1);
    })
})