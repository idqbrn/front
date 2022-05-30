// como está se comportando cada doença no brasil
// esse request pergunta como está se comportando cada doença no brasil, devemos enviar qual doença queremos saber
// ele retornará latitudes, longitudes e a quantidade de ocorrencias daquela doença em cada cidade
const requestMap = {
    disease: 'dengue'
};

const responseMap = [
    { lat: -17.99889, lng: -40.90909, count: 20 },
    { lat: -20.99889, lng: -30.90909, count: 100 }
];

// Para um dado estado, uma dada cidade e uma dada deonça, dizer as ocorrencias.
// Caso, queiramos saber em todo estado, será enviada cidade como NULL, caso queiramos saber todo BR será enviado estado e cidade como NULL
// Caso queiramos saber para todas as doencas sera enviada cidade e ou estado e doenca como NULL

const requestCrud = {
    disease: 'dengue',
    state: 'RJ',
    city: null
};

const responseCrud = [
    {
        disease: 'dengue',
        state: 'RJ',
        city: 'Rio de Janeiro',
        count: '50'
    },
    {
        disease: 'dengue',
        state: 'RJ',
        city: 'Nova Iguaçu',
        count: '100'
    }
];

// Queremos saber mais detalhes de uma doença
const request = {
    disease: 'dengue'
};

const response = {
    name: 'dengue',
    description: 'blablabla',
    treatments: 'blublublu',
    vector: 'contato'
};
