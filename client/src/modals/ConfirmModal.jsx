const { Button, Icon, Modal } = require('semantic-ui-react');

function ConfirmationModal({isOpen, setIsOpen, afterConfirmCallback, contains}) {
    
    function SubmitHanler() {
        afterConfirmCallback();
        setIsOpen(false);
    }

    return (
        <Modal
            open={isOpen}
            size='mini'
            style={{height: '130px', marginLeft: '35%', marginTop: '20%'}}
            >
            <Modal.Content>
                <p>
                {contains}
                </p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={() => setIsOpen(false)}>
                <Icon name='remove' /> Ні
                </Button>
                <Button color='green' onClick={SubmitHanler}>
                <Icon name='checkmark' /> Так
                </Button>
            </Modal.Actions>
        </Modal>
      )
}

module.exports = ConfirmationModal;