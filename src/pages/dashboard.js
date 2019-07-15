import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Header, Table, Spacer, HeadingText, Chart } from '../components';
import { addData } from '../actions/actionCreator';

const DashboardLayout = styled.div`
    max-width: 1400px;
    margin: auto;
    height: 100%;
`

class Dashboard extends Component {
    handleSetState = (list) =>{
        const { addData } = this.props;
        addData(list)
    }

    render() {
        const { parsedData } = this.props;
        if( parsedData.length === 0  ){
            return <Redirect to="/upload-file" />
        }
        let fields = []
        for( let data in parsedData[0]){
            fields.push(data)
        }

        return (
            <div style={{height: '100vh'}}>
                <Header />
                <Spacer />
                <DashboardLayout>
                    <HeadingText>Dashboard</HeadingText>
                    <Spacer />
                    <Table 
                        rowNames={fields} 
                        parsedData={parsedData} 
                        setNewState={this.handleSetState}
                    />
                    <Spacer />
                    <HeadingText>Chart</HeadingText>
                    <Spacer />
                    <Chart data={parsedData} fields={fields} />
                </DashboardLayout>
            </div>
        )
    }
}

const mapStateToProps = state =>{
    return {
        parsedData: state.parsedData.parsedData
    }
}


export default connect(mapStateToProps,{addData})(Dashboard)
