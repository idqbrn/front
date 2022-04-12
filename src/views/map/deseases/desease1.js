const deseases = [
    { value: 0, label: 'Covid' },
    { value: 1, label: 'Dengue' }
];

const desease1 = [
    [
        { lat: -10, lng: -53 },
        { lat: -9.937209480470687, lng: -52.99802672842827 },
        { lat: -9.874666766435695, lng: -52.99211470131448 },
        { lat: -9.812618685414275, lng: -52.98228725072869 },
        { lat: -9.751310112835146, lng: -52.968583161128635 },
        { lat: -9.690983005625053, lng: -52.951056516295154 },
        { lat: -9.631875447315322, lng: -52.929776485888254 },
        { lat: -9.574220708434927, lng: -52.90482705246602 },
        { lat: -9.518246325898284, lng: -52.87630668004386 },
        { lat: -9.464173205021003, lng: -52.844327925502014 },
        { lat: -9.412214747707527, lng: -52.80901699437495 },
        { lat: -9.36257601025131, lng: -52.77051324277579 },
        { lat: -9.315452894071312, lng: -52.72896862742141 },
        { lat: -9.27103137257859, lng: -52.68454710592869 },
        { lat: -9.22948675722421, lng: -52.63742398974869 },
        { lat: -9.190983005625053, lng: -52.58778525229247 },
        { lat: -9.155672074497986, lng: -52.535826794978995 },
        { lat: -9.123693319956136, lng: -52.48175367410172 },
        { lat: -9.09517294753398, lng: -52.42577929156507 },
        { lat: -9.070223514111749, lng: -52.36812455268468 },
        { lat: -9.048943483704846, lng: -52.30901699437495 },
        { lat: -9.031416838871369, lng: -52.24868988716486 },
        { lat: -9.017712749271311, lng: -52.18738131458572 },
        { lat: -9.007885298685522, lng: -52.125333233564305 },
        { lat: -9.001973271571728, lng: -52.062790519529315 },
        { lat: -9, lng: -52 },
        { lat: -9.001973271571728, lng: -51.937209480470685 },
        { lat: -9.007885298685522, lng: -51.874666766435695 },
        { lat: -9.017712749271311, lng: -51.81261868541428 },
        { lat: -9.031416838871369, lng: -51.75131011283514 },
        { lat: -9.048943483704846, lng: -51.69098300562505 },
        { lat: -9.070223514111749, lng: -51.63187544731532 },
        { lat: -9.09517294753398, lng: -51.57422070843493 },
        { lat: -9.123693319956136, lng: -51.51824632589828 },
        { lat: -9.155672074497986, lng: -51.464173205021005 },
        { lat: -9.190983005625053, lng: -51.41221474770753 },
        { lat: -9.22948675722421, lng: -51.36257601025131 },
        { lat: -9.27103137257859, lng: -51.31545289407131 },
        { lat: -9.315452894071312, lng: -51.27103137257859 },
        { lat: -9.36257601025131, lng: -51.22948675722421 },
        { lat: -9.412214747707527, lng: -51.19098300562505 },
        { lat: -9.464173205021003, lng: -51.155672074497986 },
        { lat: -9.518246325898286, lng: -51.12369331995614 },
        { lat: -9.574220708434927, lng: -51.09517294753398 },
        { lat: -9.631875447315322, lng: -51.070223514111746 },
        { lat: -9.690983005625052, lng: -51.048943483704846 },
        { lat: -9.751310112835144, lng: -51.03141683887137 },
        { lat: -9.812618685414275, lng: -51.01771274927131 },
        { lat: -9.874666766435695, lng: -51.00788529868552 },
        { lat: -9.937209480470687, lng: -51.00197327157173 },
        { lat: -10, lng: -51 },
        { lat: -10.062790519529313, lng: -51.00197327157173 },
        { lat: -10.125333233564305, lng: -51.00788529868552 },
        { lat: -10.187381314585725, lng: -51.01771274927131 },
        { lat: -10.248689887164854, lng: -51.031416838871365 },
        { lat: -10.309016994374947, lng: -51.048943483704846 },
        { lat: -10.368124552684678, lng: -51.070223514111746 },
        { lat: -10.425779291565073, lng: -51.09517294753398 },
        { lat: -10.481753674101716, lng: -51.12369331995614 },
        { lat: -10.535826794978997, lng: -51.155672074497986 },
        { lat: -10.587785252292473, lng: -51.19098300562505 },
        { lat: -10.63742398974869, lng: -51.22948675722421 },
        { lat: -10.684547105928688, lng: -51.27103137257859 },
        { lat: -10.72896862742141, lng: -51.31545289407131 },
        { lat: -10.77051324277579, lng: -51.36257601025131 },
        { lat: -10.809016994374947, lng: -51.41221474770753 },
        { lat: -10.844327925502014, lng: -51.464173205021005 },
        { lat: -10.876306680043864, lng: -51.51824632589828 },
        { lat: -10.90482705246602, lng: -51.57422070843493 },
        { lat: -10.929776485888251, lng: -51.63187544731532 },
        { lat: -10.951056516295154, lng: -51.69098300562505 },
        { lat: -10.968583161128631, lng: -51.75131011283514 },
        { lat: -10.982287250728689, lng: -51.81261868541428 },
        { lat: -10.992114701314478, lng: -51.874666766435695 },
        { lat: -10.998026728428272, lng: -51.937209480470685 },
        { lat: -11, lng: -52 },
        { lat: -10.998026728428272, lng: -52.062790519529315 },
        { lat: -10.992114701314478, lng: -52.125333233564305 },
        { lat: -10.982287250728689, lng: -52.18738131458572 },
        { lat: -10.968583161128631, lng: -52.24868988716486 },
        { lat: -10.951056516295154, lng: -52.30901699437495 },
        { lat: -10.929776485888251, lng: -52.36812455268468 },
        { lat: -10.90482705246602, lng: -52.42577929156507 },
        { lat: -10.876306680043863, lng: -52.48175367410172 },
        { lat: -10.844327925502014, lng: -52.535826794978995 },
        { lat: -10.809016994374948, lng: -52.58778525229247 },
        { lat: -10.77051324277579, lng: -52.63742398974869 },
        { lat: -10.728968627421413, lng: -52.68454710592869 },
        { lat: -10.684547105928688, lng: -52.72896862742141 },
        { lat: -10.63742398974869, lng: -52.77051324277579 },
        { lat: -10.587785252292473, lng: -52.80901699437495 },
        { lat: -10.535826794978997, lng: -52.844327925502014 },
        { lat: -10.481753674101716, lng: -52.87630668004386 },
        { lat: -10.425779291565073, lng: -52.90482705246602 },
        { lat: -10.368124552684678, lng: -52.929776485888254 },
        { lat: -10.309016994374948, lng: -52.951056516295154 },
        { lat: -10.248689887164856, lng: -52.96858316112863 },
        { lat: -10.187381314585725, lng: -52.98228725072869 },
        { lat: -10.125333233564305, lng: -52.99211470131448 },
        { lat: -10.062790519529313, lng: -52.99802672842827 }
    ],

    [
        { lat: -15, lng: -40 },
        { lat: -15.1, lng: -40.001 },
        { lat: -15.2, lng: -40.004 },
        { lat: -15.3, lng: -40.009 },
        { lat: -15.4, lng: -40.016 },
        { lat: -15.5, lng: -40.025 },
        { lat: -15.6, lng: -40.036 },
        { lat: -15.7, lng: -40.049 },
        { lat: -15.8, lng: -40.064 },
        { lat: -15.9, lng: -40.081 },
        { lat: -16, lng: -40.1 },
        { lat: -16.1, lng: -40.121 },
        { lat: -16.2, lng: -40.144 },
        { lat: -16.3, lng: -40.169 },
        { lat: -16.4, lng: -40.196 },
        { lat: -16.5, lng: -40.225 },
        { lat: -16.6, lng: -40.256 },
        { lat: -16.7, lng: -40.289 },
        { lat: -16.8, lng: -40.324 },
        { lat: -16.9, lng: -40.361 },
        { lat: -17, lng: -40.4 },
        { lat: -17.1, lng: -40.441 },
        { lat: -17.2, lng: -40.484 },
        { lat: -17.3, lng: -40.529 },
        { lat: -17.4, lng: -40.576 },
        { lat: -17.5, lng: -40.625 },
        { lat: -17.6, lng: -40.676 },
        { lat: -17.7, lng: -40.729 },
        { lat: -17.8, lng: -40.784 },
        { lat: -17.9, lng: -40.841 },
        { lat: -18, lng: -40.9 },
        { lat: -18.1, lng: -40.961 },
        { lat: -18.2, lng: -41.024 },
        { lat: -18.3, lng: -41.089 },
        { lat: -18.4, lng: -41.156 },
        { lat: -18.5, lng: -41.225 },
        { lat: -18.6, lng: -41.296 },
        { lat: -18.7, lng: -41.369 },
        { lat: -18.8, lng: -41.444 },
        { lat: -18.9, lng: -41.521 },
        { lat: -19, lng: -41.6 },
        { lat: -19.1, lng: -41.681 },
        { lat: -19.2, lng: -41.764 },
        { lat: -19.3, lng: -41.849 },
        { lat: -19.4, lng: -41.936 },
        { lat: -19.5, lng: -42.025 },
        { lat: -19.6, lng: -42.116 },
        { lat: -19.7, lng: -42.209 },
        { lat: -19.8, lng: -42.304 },
        { lat: -19.9, lng: -42.401 },
        { lat: -20, lng: -42.5 },
        { lat: -20.1, lng: -42.601 },
        { lat: -20.2, lng: -42.704 },
        { lat: -20.3, lng: -42.809 },
        { lat: -20.4, lng: -42.916 },
        { lat: -20.5, lng: -43.025 },
        { lat: -20.6, lng: -43.136 },
        { lat: -20.7, lng: -43.249 },
        { lat: -20.8, lng: -43.364 },
        { lat: -20.9, lng: -43.481 },
        { lat: -21, lng: -43.6 },
        { lat: -21.1, lng: -43.721000000000004 },
        { lat: -21.2, lng: -43.844 },
        { lat: -21.3, lng: -43.969 },
        { lat: -21.4, lng: -44.096000000000004 },
        { lat: -21.5, lng: -44.225 },
        { lat: -21.6, lng: -44.356 },
        { lat: -21.7, lng: -44.489 },
        { lat: -21.8, lng: -44.624 },
        { lat: -21.9, lng: -44.761 },
        { lat: -22, lng: -44.9 },
        { lat: -22.1, lng: -45.041 },
        { lat: -22.2, lng: -45.184 },
        { lat: -22.3, lng: -45.329 },
        { lat: -22.4, lng: -45.476 },
        { lat: -22.5, lng: -45.625 },
        { lat: -22.6, lng: -45.775999999999996 },
        { lat: -22.7, lng: -45.929 },
        { lat: -22.8, lng: -46.084 },
        { lat: -22.9, lng: -46.241 },
        { lat: -23, lng: -46.4 },
        { lat: -23.1, lng: -46.561 },
        { lat: -23.200000000000003, lng: -46.724000000000004 },
        { lat: -23.3, lng: -46.889 },
        { lat: -23.4, lng: -47.056 },
        { lat: -23.5, lng: -47.225 },
        { lat: -23.6, lng: -47.396 },
        { lat: -23.700000000000003, lng: -47.569 },
        { lat: -23.8, lng: -47.744 },
        { lat: -23.9, lng: -47.921 },
        { lat: -24, lng: -48.1 },
        { lat: -24.1, lng: -48.281 },
        { lat: -24.200000000000003, lng: -48.464 },
        { lat: -24.3, lng: -48.649 },
        { lat: -24.4, lng: -48.836 },
        { lat: -24.5, lng: -49.025 },
        { lat: -24.6, lng: -49.216 },
        { lat: -24.700000000000003, lng: -49.409 },
        { lat: -24.8, lng: -49.604 },
        { lat: -24.9, lng: -49.801 }
    ]
];

export { deseases, desease1 };