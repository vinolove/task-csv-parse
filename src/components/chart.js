import React, { Component } from 'react';
import { LineChart, PieChart } from '../charts';
import { Text } from './text';
import styled from 'styled-components';

const Spacer = styled.div`
    width: 40px;
`

export class Chart extends Component {
    state = {
        dummyData: [
            {
                id: 1,
                name: "vinoth",
                mark1: 44,
                mark2: 66,
            },
            {
                id: 2,
                name: "hello",
                mark1: 44,
                mark2: 99,
            },
            {
                id: 3,
                name: "yaser",
                mark1: 99,
                mark3: 89
            },
            {
                id: 4,
                name: "ram",
                mark1: 88,
                mark4: 89
            }
        ],
        graphType:'pieChart'
    }

    handleDropdownChange = (e,field) =>{
        this.setState({
            [field]: e.target.value
        })
    }

    render() {
        const { xAxis, yAxis, graphType } = this.state;
        const { fields, data } = this.props || [];
        const axisList = fields.map((data,i)=>{
            return <option key={i} value={data}>{data}</option>
        })
        return (
            <div>
                <div style={{display: 'flex'}}>
                    <div>
                        <Text>Select Graph</Text>
                        <select onChange={(e)=>this.handleDropdownChange(e,"graphType")}>
                            <option value="pieChart">Pie Chart</option>
                            <option value="barChart">Bar Chart</option>
                        </select>
                    </div>
                    <Spacer />
                    <div>
                        <Text>x-axis</Text>
                        <select onChange={(e)=>this.handleDropdownChange(e,"xAxis")}>
                            { axisList }
                        </select>
                    </div>
                    <Spacer />
                    <div>
                        <Text>y-axis</Text>
                        <select onChange={(e)=>this.handleDropdownChange(e,"yAxis")}>
                            { axisList }
                        </select>
                    </div>
                </div>
                <div>
                {
                    graphType === 'pieChart'
                    ?
                    <div><PieChart xAxis={xAxis} xAxis={xAxis} yAxis={yAxis} parsedData={data} /></div>
                    :
                    <div><LineChart data={data} xAxis={xAxis} yAxis={yAxis} /></div>
                }
  
                </div>
            </div>
        )
    }
}
