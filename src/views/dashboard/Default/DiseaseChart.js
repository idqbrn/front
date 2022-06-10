import { Chart, ApexCharts } from 'react-apexcharts';
import axios from 'axios';
import stateToInitial from '../../map/LocalLatLng/stateToInitial';
import url from '../../utilities/backendUrl';
import { useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';

export default function DiseaseChart(props) {
    if (props.disease == undefined) return <></>;

    console.log('ENTRAMOS NO ADVANCED-CHART');
    let data = [];
    let options = null;
    // const [data, setData] = useState([]);

    // function maxCases(series) {
    //     const max = 0;
    //     for (let i = 0; i < series.length; i += 1) {
    //         if (series[i].total > max) max = series[i].total;
    //     }
    //     return max;
    // }

    // function generateDayWiseTimeSeries(baseval, count, yrange) {
    //     let i = 0;
    //     const series = [];
    //     while (i < count) {
    //         const x = baseval;
    //         const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

    //         series.push([x, y]);
    //         baseval += 86400000;
    //         i += 1;
    //     }
    //     return series;
    // }

    function generateCharData() {
        // data = [];
        console.log('Disease-' + `${props.disease}`);

        const config = {
            method: 'get',
            // url: `${url}` + '/dashboard/chart/' + `${props.state}` + '/' + `${props.city}`,
            url: `${url}` + '/diseaseStatesSum/' + `${props.disease}`,
            headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log('response.data');
            console.log(response.data);
            console.log(response.data.length);
            for (let i = 0; i < response.data.length; i += 1) {
                // console.log('dentro do for [' + i + ']');
                data.push({ x: response.data[i].state, y: parseInt(response.data[i].sum) });
            }
            console.log('SERIES (dentro): ');
            console.log(data);
            console.log('DATA-TOTAL');
        });
        console.log('SERIES (fora): ' + data);
        ApexCharts?.exec('double-chart-id', 'updateOptions', {
            ...options,
            series: [
                {
                    name: 'Casos',
                    data: data
                }
            ]
        });
        return data;
    }

    console.log('props.disease=' + props.disease);

    if (props.disease != undefined) {
        console.log('beforeSetData IF');
        data = generateCharData();
    } else {
        console.log('beforeSetData Else');
        data = generateDayWiseTimeSeries(new Date('22 Apr 2017').getTime(), 3, {
            min: 0,
            max: 0
        });
    }

    options = {
        chart: {
            id: 'double-chart-id',
            type: 'bar',
            height: 230,
            foreColor: '#ccc',
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: true
            }
        },
        colors: ['#00BAEA'],
        stroke: {
            width: 3
        },
        grid: {
            borderColor: '#555',
            clipMarkers: false,
            yaxis: {
                lines: {
                    show: false
                }
            }
        },
        dataLabels: {
            enabled: true
        },
        fill: {
            gradient: {
                enabled: true,
                opacityFrom: 0.15,
                opacityTo: 0
            }
        },
        // markers: {
        //     size: 5,
        //     colors: ['#000524'],
        //     strokeColor: '#00BAEC',
        //     strokeWidth: 3
        // },
        series: [
            {
                data
            }
        ],
        tooltip: {
            theme: 'dark'
        },
        xaxis: {
            type: 'category',
            tickPlacement: 'on',
            title: {
                text: 'Estados'
            }
        },
        yaxis: {
            min: 0,
            tickAmount: 4
        }
    };

    return <Chart options={options} series={options.series} height="100%" width="100%" style={{ backgroundColor: 'green' }} />;
}
