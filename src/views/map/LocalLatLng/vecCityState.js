import JsonLatLng from './states_latitudes_flat_name.json';

const vecNumCityState = [
    0, 0, 22, 102, 62, 17, 417, 184, 1, 78, 246, 217, 853, 79, 141, 144, 223, 185, 224, 399, 92, 167, 52, 15, 497, 295, 75, 645, 139
];

const vecPosCityState = [
    0, 0, 22, 124, 186, 203, 620, 804, 805, 883, 1129, 1346, 2199, 2278, 2419, 2563, 2786, 2971, 3195, 3594, 3686, 3853, 3905, 3920, 4417,
    4712, 4787, 5432, 5571
];

function CitiesFromState(op) {
    const cities = [];

    // eslint-disable-next-line no-plusplus
    for (let i = vecPosCityState[op]; i < vecPosCityState[op + 1]; i++) cities.push(JsonLatLng[i].nome);
    return cities;
}

export { vecNumCityState, vecPosCityState, CitiesFromState };
