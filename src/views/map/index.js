// material-ui
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState } from 'react';
import brStates from './brStates';
import { deseases, desease1 } from './deseases/desease1';
import JsonLatLng from './LocalLatLng/states_latitudes_flat_name.json';
import { /* vecNumCityState, */ vecPosCityState } from './LocalLatLng/vecCityState';

// ==============================|| MAP PAGE ||============================== //

function LatLngToCenter(local) {
    return { lat: local.latitude, lng: local.longitude };
}

function Map() {
    const containerStyle = {
        width: '500px',
        height: '500px'
    };

    const [centerOption, setCenter] = useState(brStates[0].center);

    const [stateOption, setState] = useState(0);

    const [cityOption, setCity] = useState(0);

    const [citiesState, setCities] = useState([]);

    const [deseaseOption, setDesease] = useState(deseases[0].value);

    const [zoomMap] = useState(1);

    const [libraries] = useState(['visualization']);

    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: 'AIzaSyASHNbe6Qnit7i2NowcVkyaYF89flBmNbw',
            libraries
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
        // console.log(fakeData[0]);

        heatmap.setData(fakeData);
        heatmap.setOptions({ radius: 8, map, data: fakeData });
        setHeatmap(heatmap);
    });

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Typography variant="body2">
                            Centro {centerOption.lat} e {centerOption.lng}
                        </Typography>
                    </div>
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Autocomplete
                            id="center_select"
                            options={brStates}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Local" />}
                            sx={{ width: 300 }}
                            value={brStates.find(
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === centerOption
                            )}
                            onChange={async (option) => {
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                setState(op);
                                const local = brStates[op];
                                console.log('op: ', op);

                                map.setZoom(brStates[0].zoom);

                                await sleep(1000);
                                setCenter(local.center);
                                map.panTo(local.center);

                                if (local.zoom > brStates[0].zoom) map.setZoom(local.zoom);

                                const cities = [];

                                // eslint-disable-next-line no-plusplus
                                for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);

                                console.log('cities: ', cities);
                                setCities(cities);
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Autocomplete
                            id="city_select"
                            options={citiesState}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Cidade" />}
                            sx={{ width: 300 }}
                            value={brStates.find(
                                (option) => brStates[option.nativeEvent?.path[0].getAttribute('data-option-index')]?.center === cityOption
                            )}
                            onChange={async (option) => {
                                console.log('CITYoption: ', option);
                                const op = option.nativeEvent.path[0].getAttribute('data-option-index');
                                console.log('value: ', document.getElementById('city_select').option);
                                console.log('op: ', op);
                                console.log('stateOption: ', stateOption);
                                console.log('vecPosCityState[stateOption]: ', vecPosCityState[stateOption]);

                                const cityNum = parseInt(op, 10) + parseInt(vecPosCityState[stateOption], 10);

                                console.log('cityNum: ', cityNum);

                                setCity(cityNum);

                                const local = JsonLatLng[cityNum];

                                console.log('JsonLatLng.UF: ', local.UF);
                                console.log('JsonLatLng[', cityNum, ']: ', JsonLatLng[cityNum]);

                                map.setZoom(brStates[stateOption].zoom);

                                await sleep(1000);

                                const localCenter = LatLngToCenter(local);
                                setCenter(localCenter);
                                map.panTo(localCenter);

                                map.setZoom(8);
                                // if (brStates[stateOption].zoom > brStates[0].zoom) map.setZoom(local.zoom);
                                // console.log('heatmap.getData()=');
                                // console.log(heatmap.getData());
                            }}
                        />
                    </div>
                    <div style={{ display: 'flex', padding: 10 }}>
                        <Autocomplete
                            id="desease_select"
                            options={deseases}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            sx={{ width: 300 }}
                            value={deseases.find((option) => option.currentTarget?.getAttribute('data-option-index') === deseaseOption)}
                            onChange={async (option) => {
                                console.log('deseases');
                                const op = option.currentTarget.getAttribute('data-option-index');
                                console.log('option: ', op);

                                if (op !== deseaseOption) {
                                    setDesease(op);
                                    console.log('deseaseOption: ', deseaseOption);
                                    heatmap.setMap(null);

                                    if (typeof heatmap === 'object') heatmap.setData([]);

                                    heatmap.setMap(map);

                                    for (let i = 0; i < 100; i += 1) {
                                        fakeData?.push(new window.google.maps.LatLng(desease1[op][i].lat, desease1[op][i].lng));
                                    }

                                    heatmap.setData(fakeData);
                                    heatmap.setOptions({ radius: 9, map, data: fakeData });
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
