// material-ui
import { Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { GoogleMap, HeatmapLayer, useJsApiLoader, google } from '@react-google-maps/api';
import Select from 'react-select';
import React, { useState } from 'react';

// ==============================|| SAMPLE PAGE ||============================== //

function Map() {
    const options = [
        { value: 'rj', label: 'Rio de Janeiro', center: { lat: -22.906847, lng: -43.172897 } },
        { value: 'sp', label: 'São Paulo', center: { lat: -23.55052, lng: -46.633308 } },
        { value: 'am', label: 'Amazonas', center: { lat: -3.416843, lng: -65.856064 } }
    ];

    const containerStyle = {
        width: '80%',
        height: '500px'
    };

    const [centerOption, setCenter] = useState(options[0].center);

    const [zoomMap, setZoom] = useState(3);

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyASHNbe6Qnit7i2NowcVkyaYF89flBmNbw'
    });

    const [map, setMap] = React.useState(null);

    const [heatmap, setHeatmap] = useState(null);

    const onLoad = React.useCallback((map, heatmap) => {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map);
        map.setCenter(centerOption);
    }, []);

    const onUnmount = React.useCallback((map) => {
        setMap(null);
    }, []);

    return isLoaded ? (
        <MainCard title="Map">
            <Typography variant="body2">
                Centro {centerOption.lat} e {centerOption.lng}
            </Typography>

            <Select
                name="center_select"
                options={options}
                value={options.find((item) => item.value === centerOption)}
                onChange={(option) => setCenter(option.center)}
            />

            <GoogleMap mapContainerStyle={containerStyle} center={centerOption} zoom={zoomMap} onLoad={onLoad} onUnmount={onUnmount} />
        </MainCard>
    ) : (
        <></>
    );
}

export default Map;
