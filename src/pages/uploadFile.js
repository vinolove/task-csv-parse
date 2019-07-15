import React, { Component } from 'react';
import * as parse from 'csv-parse';
import { InputFile, Text, Button, Spacer } from '../components';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { addData } from '../actions/actionCreator';
import { Redirect } from 'react-router-dom';

const OuterContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

class UploadFile extends Component {

    state={
        fileName: undefined,
        fileList: [],
    }
    
    handleOnChange = async(files) =>{
        if( files && files.length > 0 ){
            this.setState({
                fileName: files[0].name,
                fileList: files
            })
        }  
    }

    handleSubmit = () =>{
        const { fileList } = this.state;
        const { addData } = this.props;
        var reader = new FileReader();
        reader.onload = async() =>{
            //Working with parsing
            const parserOptons = {
                delimiter: ',',
                trim: true,
                columns: true,
              };
            parse(reader.result, parserOptons,(err, data)=>{
                if(err){
                    alert("Error in parsing")
                }
                addData(data)
            })
           
        }
        reader.readAsBinaryString(fileList[0])
    }
    render() {
        const { fileName } = this.state;
        const { parsedData } = this.props;
        if( parsedData.length > 0 ){
            return <Redirect to="/dashboard" />
        }
        return (
            <OuterContainer>
                <InputFile accept=".csv" onDrop={this.handleOnChange} />
                <Spacer />
                <Text>
                    {
                        fileName
                    }
                </Text>
                <Spacer />
                {
                    fileName && <Button onClick={this.handleSubmit}>Submit</Button>
                }
            </OuterContainer>
        )
    }
}

const mapStateToProps = state =>{
    return {
        parsedData: state.parsedData.parsedData
    }
}


export default connect(mapStateToProps, { addData })(UploadFile)