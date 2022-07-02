const AbsModal = require('../modals/AbsModal.jsx');
const request = require('../helpers/SendRequest.js');
const ConfirmationModal = require('../modals/ConfirmModal.jsx');

class Photos extends AbsModal {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true, 
            photos: [],
            isWaitingForConfirmation: false,
            ConfirmCallback: null,
            photoInputs: []
        };

        this.addInput = this.addInput.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    async componentDidMount() {
        let photos = await request('/api/photos');
        this.setState({isLoading: false, photos});
    }

    async deletePicture(photo) {
        this.setState({
            isWaitingForConfirmation: true,
            ConfirmCallback: async () => {
                let {success} = await request('/api/photos', 'DELETE', {photo});
                if(success) {
                    this.setState({photos: this.state.photos.filter(el => el !== photo)});
                    console.log('DELETED', photo);
                }
            } 
        })
    }

    validateForm(data) {
        for(let el of data) {
            if(el.name == '') return false;
        }
        return true;
    }

    async submitHandler(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const dataToUpload = formData.getAll('img');
        
        if(!this.validateForm(dataToUpload)) {
            alert('Залишилось пусте поле для загрузки фото!');
            return;
        }
        
        this.setState({isLoading: true});

        let resp = await fetch('upload_photos', {method: 'POST', body: formData});
        let {isUploaded} = await resp.json();
        
        if(isUploaded) {
            await request(
                '/api/photos', 
                'POST', 
                {photos: dataToUpload.map(el => el.name.split('.')[0] + '.webp')});
            
            let photos = [...this.state.photos];
            for(let el of dataToUpload) {
                photos.push(`location/${el.name.split('.')[0] + '.webp'}`);
            }

            setTimeout(() => {
                this.setState({
                    isLoading: false,
                    photos,
                    photoInputs: [] 
                });
            }, 200) 
        }
    }

    addInput() {
        let inputs = [...this.state.photoInputs];
        inputs.push(<input type="file" name="img" style={{marginBottom: '20px'}} multiple/>);
        this.setState({photoInputs: inputs});
    }

    render() {
        return (
            this.modal_wrapper(
                <button className="round-button" onClick={this.change_state} style={{right: '15%', top: '19.5%'}}>
                    <i className="fa fa-picture-o" style={
                        {
                            padding: '10px', 
                            fontSize: '35px',
                            paddingTop: '16px',
                            paddingBottom: '15px'
                        }
                        }></i>
                </button>,
                <>  
                    {this.state.isLoading ? <div className='flex-container'>
                        <i className="fa fa-spinner fa-pulse fa-3x fa-fw" style={{fontSize: '30px'}}></i>
                        <span className="sr-only">Loading...</span>
                    </div> : 
                    <>
                    {this.state.photos.map(photo => {
                        return <>
                            <div className='flex-container' key={photo}>
                                <img src={photo} alt={photo} className='picture' 
                                    style={{maxWidth: '90%', marginBottom: '10px'}}/>
                                <i className="fa fa-trash" onClick={() => this.deletePicture(photo)} style={{
                                    fontSize: '25px',
                                    marginLeft: '15px'
                                }}></i>
                            </div>
                                </>
                    })}

                    <form onSubmit={this.submitHandler} encType="multipart/form-data"> 
                        <div className='flex-container'>
                            <i className="fa fa-plus-circle" onClick={this.addInput} style={{
                                    fontSize: '40px'
                                }}></i>
                        </div>
                        <div className='flex-container column'>
                            {this.state.photoInputs}
                        </div>
                        {this.state.photoInputs.length > 0 && <button className='green checkout-btn'>ЗАГРУЗИТИ ФОТОГРАФІЇ</button>}
                    </form>
                     
                    <ConfirmationModal
                        isOpen={this.state.isWaitingForConfirmation}
                        setIsOpen={(state) => {this.setState({isWaitingForConfirmation: state})}}
                        afterConfirmCallback={this.state.ConfirmCallback}
                        contains="Видалити фотографію?"/>
                    </>}  
                
                </>
            )
           
        )
    }
}

module.exports = Photos;