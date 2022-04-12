// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import Select from 'react-select';
import React, { useState } from 'react';
import brStates from './brStates';
import { deseases, desease1 } from './deseases/desease1';

// ==============================|| MAP PAGE ||============================== //

function Map() {
    const containerStyle = {
        width: '500px',
        height: '500px'
    };

    const [centerOption, setCenter] = useState(brStates[0].center);

    const [deseaseOption, setDesease] = useState(deseases[0].value);

    const [zoomMap] = useState(1);

    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: 'AIzaSyASHNbe6Qnit7i2NowcVkyaYF89flBmNbw',
            libraries: ['visualization']
        },
        []
    );

    const fakeData = [];

    const [map, setMap] = React.useState(null);

    const [heatmap, setHeatmap] = React.useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onLoad = React.useCallback((map, heatmap) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        map.panTo(brStates[0].center);
        map.setMapTypeId('hybrid');
        map.setZoom(zoomMap);
        setMap(map);

        heatmap = new window.google.maps.visualization.HeatmapLayer();
        heatmap.setMap(map);

        for (let i = 0; i < 100; i += 1) {
            fakeData?.push(new window.google.maps.LatLng(desease1[deseaseOption][i].lat, desease1[deseaseOption][i].lng));
        }
        console.log(fakeData[0]);

        heatmap.setData(fakeData);
        heatmap.setOptions({ radius: 8, map, data: fakeData });
        setHeatmap(heatmap);
    });

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    console.log(isLoaded);

    return isLoaded ? (
        <MainCard title="Map">
            <div style={{ flexDirection: 'row', display: 'flex' }}>
                <div style={{ display: 'flex' }}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centerOption}
                        zoom={zoomMap}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    />
                </div>
                <div style={{ flexDirection: 'column', display: 'flex' }}>
                    <div style={{ display: 'flex' }}>
                        <Typography variant="body2">
                            Centro {centerOption.lat} e {centerOption.lng}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Select
                            name="center_select"
                            options={brStates}
                            value={brStates.find((option) => option.value === centerOption)}
                            onChange={async (option) => {
                                console.log('brStates');
                                map.setZoom(brStates[0].zoom);
                                await sleep(1000);
                                setCenter(option.center);
                                map.panTo(option.center);
                                if (option.zoom > brStates[0].zoom) map.setZoom(option.zoom);
                                // console.log('heatmap.getData()=');
                                // console.log(heatmap.getData());
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex' }}>
                        <Select
                            name="desease_select"
                            options={deseases}
                            value={deseases.find((option) => option.value === deseaseOption)}
                            onChange={async (option) => {
                                console.log('deseases');
                                console.log('option: ', option.value);

                                if (option.value !== deseaseOption) {
                                    setDesease(option.value);
                                    console.log('deseaseOption: ', deseaseOption);
                                    heatmap.setMap(null);

                                    if (typeof heatmap === 'object') heatmap.setData([]);

                                    heatmap.setMap(map);

                                    for (let i = 0; i < 100; i += 1) {
                                        fakeData?.push(
                                            new window.google.maps.LatLng(desease1[option.value][i].lat, desease1[option.value][i].lng)
                                        );
                                    }

                                    heatmap.setData(fakeData);
                                    heatmap.setOptions({ radius: 8, map, data: fakeData });
                                    setHeatmap(heatmap);
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </MainCard>
    ) : (
        <></>
    );
}

export default Map;
