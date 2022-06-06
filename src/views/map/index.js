// material-ui
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import brStates from './brStates';
import { diseases, disease1 } from './diseases/disease1';
/* import JsonLatLng from './LocalLatLng/states_latitudes_flat_name.json';
import { vecNumCityState,  vecPosCityState, CitiesFromState } from './LocalLatLng/vecCityState'; */

import brazilBorders from './LocalLatLng/brazil_borders.json';

// ==============================|| MAP PAGE ||============================== //

/* function LatLngToCenter(local) {
    return { lat: local?.latitude, lng: local?.longitude };
} */

function Map() {
    const containerStyle = {
        width: '100%',
        height: '500px'
    };

    const [centerOption, setCenter] = useState(brStates[0].center);

    /* const [stateOption, setState] = useState(0);

    const [cityOption, setCity] = useState(0);

    const [citiesState, setCities] = useState([]); */

    const [diseaseOption, setDesease] = useState(diseases[0].value);

    const [zoomMap] = useState(1);

    const [libraries] = useState(['visualization', 'places']);

    const { isLoaded } = useJsApiLoader(
        {
            id: 'google-map-script',
            googleMapsApiKey: 'AIzaSyDgcpo50Ah0iKbSA2CfE7ExdaBHh1hBDUM',
            libraries
        },
        []
    );

    const [brazilBordersLatLng] = useState([]);

    useEffect(() => {
        // Should not ever set state during rendering, so do this in useEffect instead.
        let i = 0;
        let coord = 0;
        for (coord = brazilBorders[0].coordinates.length - 1; coord < brazilBorders[0].coordinates.length; coord += 1) {
            for (i = 0; i < brazilBorders[0].coordinates[coord][0].length; i += 1) {
                /* setBrazilBorders((oldArray) => [ ...oldArray, { lat, lng } ]); */
                brazilBordersLatLng.push({
                    lat: brazilBorders[0].coordinates[coord][0][i][1],
                    lng: brazilBorders[0].coordinates[coord][0][i][0]
                });
            }
        }
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
        map.setOptions({ streetViewControl: false, zoom: 1 });
        setMap(map);

        heatmap = new window.google.maps.visualization.HeatmapLayer();

        heatmap.setData(fakeData);
        heatmap.setOptions({ radius: 8, map, data: fakeData });
        setHeatmap(heatmap);

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

        const autocompleteOptions = {
            componentRestrictions: { country: 'br' }
        };

        // This code gets the Search Input Text and rearrange the map to it's location
        const input = document.getElementById('searchTextField');
        const autocomplete = new window.google.maps.places.Autocomplete(input, autocompleteOptions);

        window.google.maps.event.addListener(autocomplete, 'place_changed', () => {
            const place = autocomplete.getPlace();
            // Checks if it's a valid location
            if (place.geometry) {
                document.getElementById('local').value = place.name;
                const lat = place.geometry.location.lat();
                document.getElementById('localLat').value = lat;
                const lng = place.geometry.location.lng();
                document.getElementById('localLng').value = lng;
                setCenter({ lat, lng });
                document.getElementById('viewport').value = place.geometry.viewport;
                console.log('place.geometry.viewport: ', place.geometry.viewport);
                map.fitBounds(place.geometry.viewport);
            }
        });

        // Set the diseases options
    });

    const onUnmount = React.useCallback(() => {
        setMap(null);
    }, []);

    const [heatData, setHeatData] = useState([]);

    function requestDiseasePoints(disease) {
        console.log('TAMO NO USEEFFECT');
        axios.get('https://58fb-2804-14d-5cd1-9d27-9d3c-4768-3552-a0df.sa.ngrok.io/' + `${disease}`).then((response) => {
            console.log(response.data);
            setHeatData(response.data);
            console.log('DATA-TOTAL');
            heatmap.setMap(null);
            heatmap.setData([]);
            const dataVector = [];
            for (let i = 0; i < 100; i += 1) {
                dataVector.setData(new window.google.maps.MVCObject(response.data[i].lat, response.data[i].lng, response.data[i].count));
            }
            heatmap.setData(dataVector);
            heatmap.setOptions({ radius: 10, map, data: dataVector });
            setHeatmap(heatmap);
            heatmap.setMap(map);
        });
    }

    // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

    return isLoaded ? (
        <MainCard title="Map">
            <div>
                <div style={{ flexDirection: 'row', display: 'flex' }}>
                    <div style={{ display: 'flex', padding: 8 }}>
                        <input id="searchTextField" type="text" size="50" placeholder="Entre com um local" autoComplete="on" />
                        <input type="hidden" id="local" name="local" />
                        <input type="hidden" id="localLat" name="localLat" />
                        <input type="hidden" id="localLng" name="localLng" />
                        <input type="hidden" id="viewport" name="viewport" />
                    </div>
                    <div style={{ display: 'flex', padding: 8 }}>
                        <Autocomplete
                            id="disease_select"
                            options={diseases}
                            autoComplete
                            includeInputInList
                            renderInput={(params) => <TextField {...params} label="Doença" />}
                            sx={{ width: 300 }}
                            value={diseases.find((option) => option?.currentTarget?.getAttribute('data-option-index') === diseaseOption)}
                            onChange={async (option) => {
                                const op = parseInt(option?.currentTarget?.getAttribute('data-option-index'), 10);
                                setDesease(op);
                                heatmap.setMap(null);

                                if (typeof heatmap === 'object') heatmap.setData([]);

                                heatmap.setMap(map);
                                console.log('op:', op);

                                console.log('op....: ', option?.currentTarget);

                                const op2 = option?.currentTarget.textContent;
                                console.log('op2222:   ', op2);

                                requestDiseasePoints(op2);

                                if (!Number.isNaN(op)) {
                                    for (let i = 0; i < 100; i += 1) {
                                        fakeData?.push(new window.google.maps.LatLng(disease1[op][i].lat, disease1[op][i].lng));
                                    }
                                }

                                heatmap.setData(fakeData);
                                heatmap.setOptions({ radius: 10, map, data: fakeData });
                                setHeatmap(heatmap);
                            }}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex' }}>
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={centerOption}
                        zoom={zoomMap}
                        onLoad={onLoad}
                        onUnmount={onUnmount}
                    />
                </div>
            </div>
        </MainCard>
    ) : (
        <></>
    );
}

export default Map;
