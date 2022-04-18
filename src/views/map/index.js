// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import brStates from './brStates';
import { deseases, desease1 } from './deseases/desease1';
import JsonLatLng from './LocalLatLng/states_latitudes_flat_name.json';
import { /* vecNumCityState, */ vecPosCityState } from './LocalLatLng/vecCityState';
import brazilBorders from './LocalLatLng/brazil_borders.json';

// ==============================|| MAP PAGE ||============================== //

function LatLngToCenter(local) {
    return { lat: local?.latitude, lng: local?.longitude };
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

    const [brazilBordersLatLng] = useState([]);

    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        let i = 0;
        let lat = 0;
        let lng = 0;
        let coord = 0;
        let count = 0;
        console.log('entrando');
        for (coord = brazilBorders[0].coordinates.length - 1; coord < brazilBorders[0].coordinates.length; coord += 1) {
            for (i = 0; i < brazilBorders[0].coordinates[coord][0].length; i += 1, count += 1) {
                lat = brazilBorders[0].coordinates[coord][0][i][1];
                lng = brazilBorders[0].coordinates[coord][0][i][0];
                /* setBrazilBorders((oldArray) => [
                    ...oldArray,
                    {
                        lat,
                        lng
                    }
                ]); */

                brazilBordersLatLng.push({ lat, lng });
            }
            console.log('length ', count);
            // if (count >= 100) { break; }
        }
        /*
        brazilBordersLatLng.push({ lat: 89.9999, lng: 89.9999 });
        brazilBordersLatLng.push({ lat: 89.9999, lng: -89.9999 });
        brazilBordersLatLng.push({ lat: -89.9999, lng: -89.9999 });
        brazilBordersLatLng.push({ lat: -89.9999, lng: 89.9999 });

        brazilBordersLatLng.push({ lat: 89.9999, lng: 90.0001 });
        brazilBordersLatLng.push({ lat: 89.9999, lng: -90.0001 });
        brazilBordersLatLng.push({ lat: -89.9999, lng: -90.0001 });
        brazilBordersLatLng.push({ lat: -89.9999, lng: 90.0001 }); */

        console.log('saí');
    }, [brazilBordersLatLng]);

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

        heatmap.setData(fakeData);
        heatmap.setOptions({ radius: 8, map, data: fakeData });
        setHeatmap(heatmap);

        /* const brazilBorderPolygon = new window.google.maps.Polygon({
            paths: brazilBordersLatLng,
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FFFFFF',
            fillOpacity: 0.1
        }); */

        const worldBorderPolygon = new window.google.maps.Polygon({
            paths: [
                [
                    { lat: -89.9999, lng: 179.9999 },
                    { lat: -89.9999, lng: 89.9999 },
                    { lat: -89.9999, lng: -89.9999 },
                    { lat: -89.9999, lng: -179.9999 },
                    { lat: 89.9999, lng: -179.9999 },
                    { lat: 89.9999, lng: -89.9999 },
                    { lat: 89.9999, lng: 89.9999 },
                    { lat: 89.9999, lng: 179.9999 }
                ],
                brazilBordersLatLng
            ],
            strokeColor: '#000000',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#000000',
            fillOpacity: 0.5,
            map
        });
        worldBorderPolygon.setMap(map);
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
                                if (op >= 0) {
                                    const local = brStates[op];

                                    map.setZoom(brStates[0].zoom);

                                    await sleep(1000);
                                    setCenter(local.center);
                                    map.panTo(local.center);

                                    if (local.zoom > brStates[0].zoom) map.setZoom(local.zoom);

                                    const cities = [];

                                    // eslint-disable-next-line no-plusplus
                                    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);

                                    setCities(cities);
                                }
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
                                const op = parseInt(option.nativeEvent.path[0].getAttribute('data-option-index'), 10);
                                if (op >= 0) {
                                    const cityNum = op + vecPosCityState[stateOption];

                                    setCity(cityNum);

                                    const local = JsonLatLng[cityNum];

                                    map.setZoom(brStates[stateOption].zoom);

                                    await sleep(1000);

                                    const localCenter = LatLngToCenter(local);
                                    setCenter(localCenter);
                                    map.panTo(localCenter);

                                    map.setZoom(8);
                                }
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
                                const op = parseInt(option.currentTarget.getAttribute('data-option-index'), 10);
                                setDesease(op);
                                heatmap.setMap(null);

                                if (typeof heatmap === 'object') heatmap.setData([]);

                                heatmap.setMap(map);

                                for (let i = 0; i < 100; i += 1) {
                                    fakeData?.push(new window.google.maps.LatLng(desease1[op][i].lat, desease1[op][i].lng));
                                }

                                heatmap.setData(fakeData);
                                heatmap.setOptions({ radius: 10, map, data: fakeData });
                                setHeatmap(heatmap);
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
