import Chart from 'react-apexcharts';
import axios from 'axios';
import stateToInitial from '../../map/LocalLatLng/stateToInitial';
import url from '../../utilities/backendUrl';
import { useState } from 'react';

export default function DoubleChart(props) {
    console.log('ENTRAMOS NO ADVANCED-CHART');
    let data = [];
    let options1 = null;
    let options2 = null;

    // const [data, setData] = useState([]);

    // function maxCases(series) {
    //     const max = 0;
    //     for (let i = 0; i < series.length; i += 1) {
    //         if (series[i].total > max) max = series[i].total;
    //     }
    //     return max;
    // }

    function generateDayWiseTimeSeries(baseval, count, yrange) {
        let i = 0;
        const series = [];
        while (i < count) {
            const x = baseval;
            const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;

            series.push([x, y]);
            baseval += 86400000;
            i += 1;
        }
        return series;
    }

    function generateCharData() {
        console.log('COE-' + `${props.state}` + '-' + `${props.city}`);

        const config = {
            method: 'get',
            url: `${url}` + '/dashboard/chart/' + `${props.state}` + '/' + `${props.city}`
            // headers: { 'Access-Control-Allow-Origin': '*' }
        };
        axios(config).then((response) => {
            console.log('response.data');
            console.log(response.data);
            console.log(response.data.length);
            for (let i = 0; i < response.data.length; i += 1) {
                // console.log('dentro do for [' + i + ']');
                data.push({ x: response.data[i].disease_id, y: response.data[i].total });
            }
            console.log('SERIES (dentro): ');
            console.log(data);
            console.log('DATA-TOTAL');
        });
        console.log('SERIES (fora): ' + data);
        return data;
    }

    console.log('props.state=' + props.state);
    console.log('props.city=' + props.city);

    if (props.state != undefined && props.city != undefined) {
        console.log('beforeSetData IF');
        data = generateCharData();
    } else {
        console.log('beforeSetData Else');
        data = generateDayWiseTimeSeries(new Date('22 Apr 2017').getTime(), 3, {
            min: 0,
            max: 0
        });
    }

    options1 = {
        chart: {
            id: 'chart2',
            type: 'area',
            height: 230,
            foreColor: '#ccc',
            toolbar: {
                autoSelected: 'pan',
                show: false
            }
        },
        colors: ['#00BAEC'],
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
                opacityFrom: 0.55,
                opacityTo: 0
            }
        },
        markers: {
            size: 5,
            colors: ['#000524'],
            strokeColor: '#00BAEC',
            strokeWidth: 3
        },
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
                text: 'Doenças'
            }
        },
        yaxis: {
            min: 0,
            tickAmount: 4
        }
    };

    // const chart1 = new ApexCharts(document.querySelector('#chart-area'), options1);

    // chart1.render();

    options2 = {
        chart: {
            id: 'chart1',
            height: 130,
            type: 'bar',
            foreColor: '#ccc',
            brush: {
                target: 'chart2',
                enabled: true
            },
            selection: {
                enabled: true,
                fill: {
                    color: '#fff',
                    opacity: 0.4
                },
                xaxis: {
                    min: 10,
                    max: 100
                }
            }
        },
        colors: ['#FF0080'],
        series: [
            {
                data
            }
        ],
        stroke: {
            width: 2
        },
        grid: {
            borderColor: '#444'
        },
        markers: {
            size: 0
        },
        xaxis: {
            type: 'category',
            tooltip: {
                enabled: false
            },
            tickPlacement: 'on'
        },
        yaxis: {
            tickAmount: 2
        }
    };

    // const chart2 = new ApexCharts(document.querySelector('#chart-bar'), options2);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <Chart options={options1} series={options1.series} height={200} width="100%" type="area" />
            <Chart options={options2} series={options2.series} height={100} width="100%" />
        </div>
    );
}
