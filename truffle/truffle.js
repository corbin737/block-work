module.exports = {
    networks: {
        development: {
            host: 'localhost',
            port: 7545,
            network_id: '*',
            gas: 5000000
        }
    },
    contracts_build_directory: '../reactapp/src/contract'
};
