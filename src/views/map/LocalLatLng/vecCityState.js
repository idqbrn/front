import JsonLatLng from './states_latitudes_flat_name.json';

const vecNumCityState = [0, 0, 22, 102, 62];

const vecPosCityState = [0, 0, 22, 124, 186];

function CitiesFromState(op) {
    const cities = [];

    // eslint-disable-next-line no-plusplus
    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);
    return cities;
}

export { vecNumCityState, vecPosCityState, CitiesFromState };
