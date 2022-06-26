import JsonLatLng from './states_latitudes_flat_name.json';

const vecNumCityState = [
    0, 0, 22, 102, 16, 62, 417, 184, 1, 78, 246, 217, 141, 79, 853, 144, 223, 399, 185, 224, 92, 167, 497, 52, 15, 295, 645, 75, 139
];

const vecPosCityState = [
    0, 0, 22, 124, 140, 202, 619, 803, 804, 882, 1128, 1345, 1486, 1565, 2418, 2562, 2785, 3184, 3369, 3593, 3685, 3852, 4349, 4401, 4416,
    4711, 5356, 5431, 5570
];

function CitiesFromState(op) {
    const cities = [];

    // eslint-disable-next-line no-plusplus
    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);
    return cities;
}

export { vecNumCityState, vecPosCityState, CitiesFromState };
