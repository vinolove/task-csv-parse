import React from 'react';
import Dropzone from 'react-dropzone';
import styled from 'styled-components';
import { Text } from './text';

const InputLayout = styled.div`
    width: 500px;
    height: 300px;
    border: dashed 2px #b5b7ba;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    outline: none;
`

const Spacer = styled.div`
    height: 5px;
`

export const InputFile = ({accept, onDrop}) =>{
    return(
        <Dropzone accept={accept} onDrop={onDrop}>
        {({getRootProps, getInputProps}) => (
            <section>
            <InputLayout {...getRootProps()}>
                <input {...getInputProps()} />
                <Text>
                    Drag & Drop
                </Text>
                <Spacer />
                <Text>
                    OR
                </Text>
                <Spacer/>
                <Text>
                    Browse file here 
                </Text>
            </InputLayout>
            </section>
        )}
        </Dropzone>
    )
}