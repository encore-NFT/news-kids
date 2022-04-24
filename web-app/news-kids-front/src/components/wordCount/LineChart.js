import { useState, useEffect } from 'react';
import Chart from 'react-apexcharts';

function LineChart({ word, wordHistory }) {
    const options = {
        chart: {
            id: 'apex-chart example',
            height: 350,
            type: 'line',
            zoom: {
                enabled: false
            }
        },
        noData: {
            text: 'No Data',
            align: 'center',
            verticalAlign: 'middle'
        },
        xaxis: {
            categories: wordHistory.categories,
        }
    }

    const series = [{
        name: word,
        data: wordHistory.series,
    }]

    return (
        <>
            <Chart options={options} series={series} type="line" height={350} />
        </>
    );
};

export default LineChart;