import { assert, expect } from 'chai';
import { SinonStub, stub } from 'sinon';
import Block from '../Block';

interface DummyProps extends StringIndexed {
    id ?: Nullable<string>
    events ?: Nullable<StringIndexed>
}

class Dummy extends Block<DummyProps> {

    constructor(props: DummyProps){
        super({...props})
    }

    render() {
        return this.compile(`<button>Test Text<button>`, {});
    }
}

const block = new Dummy({
    testProp : { key: 'value' }
});

describe('Block', () => {
    it('Must return correct tag name', () => {
        assert.equal(block.element!.tagName, 'BUTTON');
    });

    it('Must return correct content', () => {
        assert.equal(block.element!.textContent, 'Test Text');
    });

    it('Must change it\'s props', () => {
        block.setProps({...block.props, id: 'testId' })
        assert.deepEqual(block.props, { id: 'testId' , testProp : { key: 'value' }});
    });

    it('Must handling events from props', () => {
        const testHandleEvent : SinonStub = stub(); 
        const testEvent = new MouseEvent('click');

        block.setProps({...block.props, events: {
            click: testHandleEvent,
        }});
        block.element!.dispatchEvent(testEvent);

        expect(testHandleEvent.calledOnce).to.be.true; 
    })


});
