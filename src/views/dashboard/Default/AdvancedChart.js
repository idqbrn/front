import Chart from 'react-apexcharts';

export default function AdvancedChart() {
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

    const data = generateDayWiseTimeSeries(new Date('22 Apr 2017').getTime(), 115, {
        min: 30,
        max: 90
    });

    const options1 = {
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
            enabled: false
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
            type: 'datetime'
        },
        yaxis: {
            min: 0,
            tickAmount: 4
        }
    };

    // const chart1 = new ApexCharts(document.querySelector('#chart-area'), options1);

    // chart1.render();

    const options2 = {
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
                    min: new Date('27 Jul 2017 10:00:00').getTime(),
                    max: new Date('14 Aug 2017 10:00:00').getTime()
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
            type: 'datetime',
            tooltip: {
                enabled: false
            }
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
