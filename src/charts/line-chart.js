import React, { Component } from 'react';
import * as d3 from 'd3';

export class LineChart extends Component {

    state={
        data: [
            {name: "vinoth kumar", mark1: 80},
            {name: "yaser", mark1: 78},
            {name: "dada", mark1: 20},
            {name: "hh", mark1: 20},
            {name: "yy", mark1: 20},
            {name: "gg", mark1: 20},
            {name: "ee", mark1: 20},
          ]
    }

    componentDidMount(){
        this.plotGraph();
    }

    componentDidUpdate(){
        this.plotGraph()
    }

    plotGraph = () =>{
        d3.selectAll("svg > *").remove();
        // let { data } = this.state;
        let { xAxis, yAxis, data } = this.props || [];
        const margin = 60;
        const width = 800 - 2 * margin;
        const height = 600 - 2 * margin;
        const svg = d3.select('svg');
        const chart = svg.append('g')
        .attr('transform', `translate(${margin}, ${margin})`);

        const yScale = d3.scaleLinear()
        .range([height, 0])
        .domain([0, 100]) 

        chart.append('g')
        .call(d3.axisLeft(yScale));

        const xScale = d3.scaleBand()
        .range([0, width])
        .domain(data && data.map((d) => d[xAxis]))
        .padding(0.2)


        chart.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(d3.axisBottom(xScale));

        chart.selectAll()
        .data(data)
        .enter()
        .append('g')
        .append('rect')
        .attr('x', (s) => xScale(s[xAxis]))
        .attr('y', (s) => yScale(s[yAxis]))
        .attr('height', (s) => height - yScale(s[yAxis]))
        .attr('width', xScale.bandwidth())

        svg
        .append('text')
        .attr('x', -(height / 2) - margin)
        .attr('y', margin / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text('Love meter (%)')

        svg.append('text')
        .attr('x', width / 2 + margin)
        .attr('y', height + margin * 1.7)
        .attr('text-anchor', 'middle')
        .text('Languages')
    }
    render() {
        return (
            <div >
                <svg height="100vh" width="100vw" />
            </div>
        )
    }
}
