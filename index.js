var {GraphQLServer} = require("graphql-yoga");

//Adding an exclamation point after an item makes it automatically required
//Anytime you want something that is an object containing more than one piece of information, you need to name it, just like you would name any object (here we're naming it Link)
//Query and Mutation are the only endpoints we can hit from the frontend. All other things we create here are just used within our code here
const typeDefs = `
    type Query {
        welcome: String!
        links: [Link!]!
    }

    type Mutation {
        addLink(url:String!, description:String):Link!
    }

    type Link {
        url: String!
        id: String!
        description: String!
    }
`;

let articleLinks = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'A resources to learn graphql. Check out the advanced sections for some more in-depth tutorials.'
}, {
    id: 'link-1',
    url: 'news.ycombinator.com',
    description: 'Hacker news is like reddit that doesn\'t suck.  Focused on tech.  Great place to improvey our chameleon skills.'
}, {
    id: 'link-2',
    url: 'https://www.graphqlhub.com/',
    description: 'Some practice APIs to play around with queries'
}]

//resolver values are always functions
//Whatever you return from the resolver is what will get returned to the front end (i.e. you don't every need res.send(). Just whatever you return here will automatically get sent to the front end)
const resolvers = {
    Query: {welcome: function(){
        return "WPR38 is not WPR34"
        },
        links: () => {
            return articleLinks;
        }
    },
    Mutation: {
        addLink: (root, args) => {
            const {url, description} = args;

            const newLink = {
                id: `link-${articleLinks.length}`,
                url,
                description
            }
            articleLinks.push(newLink);
            
            return newLink;
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
});

server.start(() => {console.log("Server up and running!")});