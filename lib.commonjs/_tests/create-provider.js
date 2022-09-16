"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connect = exports.getProvider = exports.getProviderNetworks = exports.providerNames = void 0;
const index_js_1 = require("../index.js");
;
const ethNetworks = ["default", "homestead", "rinkeby", "ropsten", "goerli"];
//const maticNetworks = [ "matic", "maticmum" ];
const ProviderCreators = [
    {
        name: "AlchemyProvider",
        networks: ethNetworks,
        create: function (network) {
            return new index_js_1.AlchemyProvider(network, "YrPw6SWb20vJDRFkhWq8aKnTQ8JRNRHM");
        }
    },
    {
        name: "AnkrProvider",
        networks: ethNetworks.concat(["matic", "arbitrum"]),
        create: function (network) {
            return new index_js_1.AnkrProvider(network);
        }
    },
    {
        name: "CloudflareProvider",
        networks: ["default", "homestead"],
        create: function (network) {
            return new index_js_1.CloudflareProvider(network);
        }
    },
    {
        name: "EtherscanProvider",
        networks: ethNetworks,
        create: function (network) {
            return new index_js_1.EtherscanProvider(network, "FPFGK6JSW2UHJJ2666FG93KP7WC999MNW7");
        }
    },
    {
        name: "InfuraProvider",
        networks: ethNetworks,
        create: function (network) {
            return new index_js_1.InfuraProvider(network, "49a0efa3aaee4fd99797bfa94d8ce2f1");
        }
    },
    /*
    {
        name: "PocketProvider",
        networks: ethNetworks,
        create: function(network: string) {
            const apiKeys: Record<string, string> = {
                homestead: "6004bcd10040261633ade990",
                ropsten: "6004bd4d0040261633ade991",
                rinkeby: "6004bda20040261633ade994",
                goerli: "6004bd860040261633ade992",
            };
            return new PocketProvider(network, apiKeys[network]);
        }
    },
    */
    {
        name: "FallbackProvider",
        networks: ethNetworks,
        create: function (network) {
            const providers = [];
            for (const creator of ProviderCreators) {
                if (creator.name === "FallbackProvider") {
                    continue;
                }
                if (creator.networks.indexOf(network) >= 0) {
                    const provider = creator.create(network);
                    if (provider) {
                        providers.push(provider);
                    }
                }
            }
            return new index_js_1.FallbackProvider(providers);
        }
    },
];
exports.providerNames = Object.freeze(ProviderCreators.map((c) => (c.name)));
function getCreator(provider) {
    const creators = ProviderCreators.filter((c) => (c.name === provider));
    if (creators.length === 1) {
        return creators[0];
    }
    return null;
}
function getProviderNetworks(provider) {
    const creator = getCreator(provider);
    if (creator) {
        return creator.networks;
    }
    return [];
}
exports.getProviderNetworks = getProviderNetworks;
function getProvider(provider, network) {
    const creator = getCreator(provider);
    if (creator) {
        return creator.create(network);
    }
    return null;
}
exports.getProvider = getProvider;
function connect(network) {
    const provider = getProvider("InfuraProvider", network);
    if (provider == null) {
        throw new Error(`could not connect to ${network}`);
    }
    return provider;
}
exports.connect = connect;
//# sourceMappingURL=create-provider.js.map