const { ApolloServer } = require('apollo-server');

/**
 * Database mock
 */
const channels = [
    { idChannel: 1, name: 'Rodrigo Branas' },
    { idChannel: 2, name: 'FullCycle' }
];

const playlists = [
    { idPlaylist: 1, idChannel: 1, description: 'JavaScript' },
    { idPlaylist: 2, idChannel: 1, description: 'Node.js' },
    { idPlaylist: 3, idChannel: 2, description: 'Software Architecture' }
];

const videos = [
    { idVideo: 1, idPlaylist: 1, title: 'Introduction to JavaScript' },
    { idVideo: 2, idPlaylist: 1, title: 'Data Types' },
    { idVideo: 3, idPlaylist: 3, title: 'DDD' },
];
//  Database mock - END


const typeDefs = `
    
    input ChannelInput {
        idChannel: Int
        name: String
    }
    type Mutation {
        saveChannel(channel: ChannelInput): Channel
    }
    # type Mutation {
    #     saveChannel(name: String): Channel
    # }
        
    type Query {
        channels(idChannel: Int): [Channel]
    }

    type Channel {
        idChannel: Int
        name: String
        playlists: [Playlist]
    }

    type Playlist {
        idPlaylist: Int
        idChannel: Int
        description: String
        videos: [Video]
    }

    type Video {
        idVideo: Int
        title: String
    }
`;

const resolvers = {
    Mutation: {
        saveChannel(obj, args) {
            console.log('Mutation::saveChannel[', 'obj=', obj, 'args=', args, ']');
            const channel = args.channel;
            if (channel) {
                channel.idChannel = channel.idChannel ? channel.idChannel : channels.length + 1;
                channels.push(channel);
            }
            return channel;
        }
    },
    Query: {
        channels(obj, args) {
            console.log('Query::channels[', 'obj=', obj, 'args=', args, ']');
            return channels.filter((channel) => !args.idChannel || channel.idChannel == args.idChannel);
        }
    },
    Channel: {
        playlists(obj, args) {
            console.log('Channel::playlists[', 'obj=', obj, 'args=', args, ']');
            return playlists.filter((playlist) => playlist.idChannel === obj.idChannel);
        }
    },
    Playlist: {
        videos(obj, args) {
            console.log('Playlist::videos[', 'obj=', obj, 'args=', args, ']');
            return videos.filter((video) => video.idPlaylist === obj.idPlaylist);
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen(4001);
