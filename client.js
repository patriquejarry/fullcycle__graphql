const axios = require('axios');

const execute = async function (data) {
    try {
        const response = await axios({
            url: 'http://localhost:4001',
            method: 'post',
            data
        });
        const result = response.data;
        console.log(JSON.stringify(result, undefined, ' '));

    } catch (error) {
        console.log(error.response.data);

    }
};

// Mutation single parameter return
function executeMutation() {
    execute({
        query: `
            mutation {
                saveChannel(channel: { name: "RocketSeat" }) {
                    name
                }
            }`
    });
}

// Mutation multi parameters return
function executeMutationWithIdChannel() {
    execute({
        query: `
            mutation {
                saveChannel(channel: { idChannel: 4, name: "Fabricio Veronez" }) {
                    name
                    idChannel
                }
            }`
    });
}

// Mutation With Variables
function executeMutationWithVariables() {
    execute({
        query: `
            mutation ($xchannel: ChannelInput) {
                saveChannel(channel: $xchannel) {
                    name
                    idChannel
                }
            }`,
        variables: {
            xchannel: {
                idChannel: 4,
                name: "Fabricio Veronez xV"
            }
        }
    });
}


// Get channel 2
function executeQueryGetChannel2() {
    execute({
        query: `
            query {
                channels(idChannel: 2) {
                    idChannel
                    name
                    playlists {
                        description
                        videos {
                            title
                        }
                    }
                }
            }`
    });
}

// Get All
function executeQueryGetAll() {
    execute({
        query: `
            query {
                channels {
                    idChannel
                    name
                    playlists {
                        description
                        videos {
                            title
                        }
                    }
                }
            }`
    });
}

(async function () {
    executeMutation();
    executeMutationWithIdChannel();
    executeMutationWithVariables();
    executeQueryGetChannel2();
    executeQueryGetAll();
})();
