import React, { Component } from 'react';
import styled from 'styled-components';
import { Text } from './text';
import arrowUp from '../icons/arrow-up.svg';
import arrowDown from '../icons/arrow-down.svg';

const Row = styled.div`
    height: 100%;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Column = styled.div`
    height: 40px;
    display: flex;
    background: ${props => props.isOdd ? '#fff' : '#f2f4f7' } ;
    cursor: pointer;
`

export  class Table extends Component {

    state = {
        dummyData: [
            {
                id: 1,
                name: "vinoth kumar",
                mark1: 44
            },
            {
                id: 2,
                name: "hello",
                mark1: 44
            },
            {
                id: 3,
                name: "yaser",
                mark1: 99
            },
            {
                id: 4,
                name: "ram",
                mark1: 88
            }
        ]
    }

    handleDragStart = (e, data) =>{
        e.dataTransfer.setData("name", JSON.stringify(data));
    }

    handleOnDrop = (e, currentData, dropPosition) =>{
        let data = e.dataTransfer.getData("name");
        const { setNewState, parsedData } = this.props;
        data = JSON.parse(data)
        if( data.id !== currentData.id ){
            let newData = parsedData.filter(a => a.id !== data.id )
            newData.splice(dropPosition,0, data)
            setNewState(newData)
        }
    }

    handleSort = (field, order) =>{
        const { parsedData, setNewState } = this.props;
        let newData;
        if( order === 'asc' ){
            newData = parsedData.sort((a,b)=>{
                var field1= a[field], field2 = b[field]
                if( field1 < field2)
                 return -1
                if( field1 > field2 )
                 return 1
                return 0
            })
        }else{
            newData = parsedData.sort((a,b)=>{
                var field1= a[field], field2 = b[field]
                if( field1 > field2)
                 return -1
                if( field1 < field2 )
                 return 1
                return 0
            })
        }
        setNewState([...newData])
    }

    render() {
        const { rowNames, parsedData } = this.props || [];
        const rowList = rowNames.map((title,i)=>{
            return(
                <Row key={i}>
                        <Text> {title} </Text>
                        <div>
                        <div onClick={()=>this.handleSort(title, 'desc')}> <img src={arrowUp} alt="arrow-up" /> </div>
                         <div onClick={()=>this.handleSort(title, 'asc')}> <img src={arrowDown} alt="arrow-down" /> </div>
                        </div>
                </Row>
            ) 
        })

        const dataList = parsedData.map((data, i)=>{
            const isOdd = i%2 === 0 ? true : false
            return(
                <Column 
                    onDragOver={(e)=>e.preventDefault()} 
                    draggable 
                    onDragStart={(e)=>this.handleDragStart(e,data)} 
                    isOdd={isOdd}
                    onDrop={(e)=>this.handleOnDrop(e,data,i)}
                    key={data.id}
                >
                    {
                        rowNames.map((name,i) => {
                            return (
                                <Row key={i}>
                                    <Text>{data[name]}</Text>
                                </Row>
                            )
                        })
                    }
                </Column>
            )
        })
        return (
            <div>
                <Column>
                    {
                        rowList
                    }
                </Column>
                <div>
                    {
                        dataList
                    }
                </div>
            </div>
        )
    }
}
