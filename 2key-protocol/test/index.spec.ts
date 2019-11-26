require('es6-promise').polyfill();
require('isomorphic-fetch');
require('isomorphic-form-data');

import {expect} from 'chai';
import 'mocha';
import {TwoKeyProtocol} from '../src';
import singletons from '../src/contracts/singletons';
import createWeb3, { generatePlasmaFromMnemonic } from './_web3';
import registerUserFromBackend, { IRegistryData } from './_registerUserFromBackend';
import {promisify} from '../src/utils/promisify';
import {IPrivateMetaInformation} from "../src/acquisition/interfaces";

const {env} = process;

const rpcUrl = env.RPC_URL;
const eventsNetUrl = env.PLASMA_RPC_URL;
const mainNetId = env.MAIN_NET_ID;
const syncTwoKeyNetId = env.SYNC_NET_ID;
console.log(mainNetId);
const addressRegex = /^0x[a-fA-F0-9]{40}$/;
const maxConverterBonusPercent = 15;
const pricePerUnitInETHOrUSD = 0.095;
const maxReferralRewardPercent = 20;
const minContributionETHorUSD = 5;
const maxContributionETHorUSD = 1000000;
const campaignStartTime = 0;
const campaignEndTime = 9884748832;
const twoKeyEconomy = singletons.TwoKeyEconomy.networks[mainNetId].address;
const twoKeyAdmin = singletons.TwoKeyAdmin.networks[mainNetId].address;
let isKYCRequired = true;
let isFiatConversionAutomaticallyApproved = true;
let isFiatOnly = false;
let incentiveModel = "MANUAL";
let amount = 0; //1000 tokens fiat inventory
let vestingAmount = 'BONUS';
let campaignInventory = 1234000;

console.log(rpcUrl);
console.log(mainNetId);
console.log(syncTwoKeyNetId);
console.log(singletons.TwoKeyEventSource.networks[mainNetId].address);
console.log(singletons.TwoKeyEconomy.networks[mainNetId].address);

const progressCallback = (name: string, mined: boolean, transactionResult: string): void => {
    console.log(`Contract ${name} ${mined ? `deployed with address ${transactionResult}` : `placed to EVM. Hash ${transactionResult}`}`);
};

const web3switcher = {
    deployer: () => createWeb3(env.MNEMONIC_DEPLOYER, rpcUrl),
    aydnep: () => createWeb3(env.MNEMONIC_AYDNEP, rpcUrl),
    gmail: () => createWeb3(env.MNEMONIC_GMAIL, rpcUrl),
    test4: () => createWeb3(env.MNEMONIC_TEST4, rpcUrl),
    renata: () => createWeb3(env.MNEMONIC_RENATA, rpcUrl),
    uport: () => createWeb3(env.MNEMONIC_UPORT, rpcUrl),
    gmail2: () => createWeb3(env.MNEMONIC_GMAIL2, rpcUrl),
    aydnep2: () => createWeb3(env.MNEMONIC_AYDNEP2, rpcUrl),
    test: () => createWeb3(env.MNEMONIC_TEST, rpcUrl),
    guest: () => createWeb3('mnemonic words should be here but for some reason they are missing', rpcUrl),
    buyer: () => createWeb3(env.MNEMONIC_BUYER, rpcUrl)
};

const links: any = {};

const users = {
        'deployer': {
            name: 'DEPLOYER',
            email: 'support@2key.network',
            fullname:  'deployer account',
            walletname: 'DEPLOYER-wallet',
        },
        'aydnep': {
            name: 'Aydnep',
            email: 'aydnep@gmail.com',
            fullname:  'aydnep account',
            walletname: 'Aydnep-wallet',
        },
        'nikola': {
            name: 'Nikola',
            email: 'nikola@2key.co',
            fullname: 'Nikola Madjarevic',
            walletname: 'Nikola-wallet',
        },
        'andrii': {
            name: 'Andrii',
            email: 'andrii@2key.co',
            fullname: 'Andrii Pindiura',
            walletname: 'Andrii-wallet',

        },
        'Kiki': {
            name: 'Kiki',
            email: 'kiki@2key.co',
            fullname: 'Erez Ben Kiki',
            walletname: 'Kiki-wallet',
        },
        'gmail': {
            name: 'gmail',
            email: 'aydnep@gmail.com',
            fullname: 'gmail account',
            walletname: 'gmail-wallet',
        },
        'test4': {
            name: 'test4',
            email: 'test4@mailinator.com',
            fullname: 'test4 account',
            walletname: 'test4-wallet',
        },
        'renata': {
            name: 'renata',
            email: 'renata.pindiura@gmail.com',
            fullname: 'renata account',
            walletname: 'renata-wallet',
        },
        'uport': {
            name: 'uport',
            email: 'aydnep_uport@gmail.com',
            fullname: 'uport account',
            walletname: 'uport-wallet',
        },
        'gmail2': {
            name: 'gmail2',
            email: 'aydnep+2@gmail.com',
            fullname: 'gmail2 account',
            walletname: 'gmail2-wallet',
        },
        'aydnep2': {
            name: 'aydnep2',
            email: 'aydnep+2@aydnep.com.ua',
            fullname: 'aydnep2 account',
            walletname: 'aydnep2-wallet',
        },
        'test': {
            name: 'test',
            email: 'test@gmail.com',
            fullname: 'test account',
            walletname: 'test-wallet',
        },
        'buyer': {
            name: 'buyer',
            email: 'buyer@gmail.com',
            fullname: 'buyer account',
            walletname: 'buyer-wallet',
        }
};

const addresses = [env.AYDNEP_ADDRESS, env.GMAIL_ADDRESS, env.TEST4_ADDRESS, env.RENATA_ADDRESS, env.UPORT_ADDRESS, env.GMAIL2_ADDRESS, env.AYDNEP2_ADDRESS, env.TEST_ADDRESS];
const acquisitionCurrency = 'USD';
let twoKeyProtocol: TwoKeyProtocol;

const printBalances = (done) => {
    Promise.all([
        twoKeyProtocol.getBalance(twoKeyAdmin),
        twoKeyProtocol.getBalance(env.AYDNEP_ADDRESS),
        twoKeyProtocol.getBalance(env.GMAIL_ADDRESS),
        twoKeyProtocol.getBalance(env.TEST4_ADDRESS),
        twoKeyProtocol.getBalance(env.RENATA_ADDRESS),
        twoKeyProtocol.getBalance(env.UPORT_ADDRESS),
        twoKeyProtocol.getBalance(env.GMAIL2_ADDRESS),
        twoKeyProtocol.getBalance(env.AYDNEP2_ADDRESS),
        twoKeyProtocol.getBalance(env.TEST_ADDRESS),
    ]).then(([business, aydnep, gmail, test4, renata, uport, gmail2, aydnep2, test]) => {
        console.log('admin balance', twoKeyProtocol.Utils.balanceFromWeiString(business, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('aydnep balance', twoKeyProtocol.Utils.balanceFromWeiString(aydnep, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('gmail balance', twoKeyProtocol.Utils.balanceFromWeiString(gmail, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('test4 balance', twoKeyProtocol.Utils.balanceFromWeiString(test4, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('renata balance', twoKeyProtocol.Utils.balanceFromWeiString(renata, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('uport balance', twoKeyProtocol.Utils.balanceFromWeiString(uport, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('gmail2 balance', twoKeyProtocol.Utils.balanceFromWeiString(gmail2, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('aydnep2 balance', twoKeyProtocol.Utils.balanceFromWeiString(aydnep2, {
            inWei: true,
            toNum: true
        }).balance);
        console.log('test balance', twoKeyProtocol.Utils.balanceFromWeiString(test, {
            inWei: true,
            toNum: true
        }).balance);
        done();
    });
};
const tryToRegisterUser = async (username, from) => {
    console.log('REGISTERING', username);
    const user = users[username.toLowerCase()];
    const registerData: IRegistryData = {};
    try  {
        registerData.signedUser = await twoKeyProtocol.Registry.signUserData2Registry(from, user.name, user.fullname, user.email)
    } catch {
        console.log('Error in Registry.signUserData');
    }
    try {
        registerData.signedWallet = await twoKeyProtocol.Registry.signWalletData2Registry(from, user.name, user.walletname);
    } catch {
        console.log('Error in Registry.singWalletData');
    }
    try {
        registerData.signedPlasma = await twoKeyProtocol.Registry.signPlasma2Ethereum(from);
    } catch {
        console.log('Error Registry.signPlasma');
    }
    try {
        registerData.signedEthereum = await twoKeyProtocol.PlasmaEvents.signPlasmaToEthereum(from);
    } catch {
        console.log('Error Plasma.signEthereum');
    }
    try {
        registerData.signedUsername = await twoKeyProtocol.PlasmaEvents.signUsernameToPlasma(user.name)
    } catch {
        console.log('Error Plasma.signedUsername');
    }
    let registerReceipts;
    try {
        registerReceipts = await registerUserFromBackend(registerData);
    } catch (e) {
        console.log(e);
    }

    return registerReceipts;
    // console.log('REGISTER RESULT', register);
};


describe('TwoKeyProtocol', () => {
    let from: string;
    before(function () {
        this.timeout(60000);
        return new Promise(async (resolve, reject) => {
            try {
                const {web3, address} = web3switcher.deployer();
                from = address;
                twoKeyProtocol = new TwoKeyProtocol({
                    web3,
                    networks: {
                        mainNetId,
                        syncTwoKeyNetId,
                    },
                    eventsNetUrl,
                    plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_DEPLOYER).privateKey,
                });

                await tryToRegisterUser('Deployer', from);
                const {balance} = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.AYDNEP_ADDRESS), {inWei: true});
                const {balance: adminBalance} = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(singletons.TwoKeyAdmin.networks[mainNetId].address), {inWei: true});
                console.log(adminBalance);
                let numberOfProposals = await twoKeyProtocol.Congress.getNumberOfProposals();
                console.log('Number of proposals is: ' + numberOfProposals);
                resolve(balance['2KEY']);
            } catch (err) {
                reject(err);
            }
        })
    });

    let campaignAddress: string;
    let nonSingletonHash: string;
    let aydnepBalance;
    let txHash;

    it('should return a balance for address', async () => {
        const business = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(twoKeyAdmin), {
            inWei: true,
            toNum: true
        });
        aydnepBalance = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.AYDNEP_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const gmail = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.GMAIL_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const test4 = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.TEST4_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const renata = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.RENATA_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const uport = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.UPORT_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const gmail2 = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.GMAIL2_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const aydnep2 = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.AYDNEP2_ADDRESS), {
            inWei: true,
            toNum: true
        });
        const test = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(env.TEST_ADDRESS), {
            inWei: true,
            toNum: true
        });
        console.log('admin balance', business.balance);
        console.log('aydnep balance', aydnepBalance.balance);
        console.log('gmail balance', gmail.balance);
        console.log('test4 balance', test4.balance);
        console.log('renata balance', renata.balance);
        console.log('uport balance', uport.balance);
        console.log('gmail2 balance', gmail2.balance);
        console.log('aydnep2 balance', aydnep2.balance);
        console.log('test balance', test.balance);
        expect(aydnepBalance).to.exist.to.haveOwnProperty('gasPrice')
    }).timeout(60000);

    it('should get total supply of economy contract' ,async() => {
        console.log("Check total supply on 2key-economy contract");
        let totalSup = await twoKeyProtocol.ERC20.getTotalSupply(twoKeyProtocol.twoKeyEconomy.address);
        console.log(totalSup);
    }).timeout(60000);

    it('should save balance to ipfs', () => {
        return twoKeyProtocol.ipfs.add(aydnepBalance).then((hash) => {
            console.log('IPFS hash', hash);
            expect(hash).to.be.a('string');
        });
    }).timeout(60000);

    it('should read from ipfs', () => {
        return twoKeyProtocol.ipfs.get('QmTiZzUGHaQz6np6WpFwMv5zKqLLgW3uM6a4ow2tht642j').then((data) => {
            console.log('IPFS data', data);
        });
    }).timeout(60000);

    const rnd = Math.floor(Math.random() * 8);
    console.log('Random', rnd, addresses[rnd]);
    const ethDstAddress = addresses[rnd];

    it(`should return estimated gas for transfer ether ${ethDstAddress}`, async () => {
        if (parseInt(mainNetId, 10) > 4) {
            const gas = await twoKeyProtocol.getETHTransferGas(ethDstAddress, twoKeyProtocol.Utils.toWei(10, 'ether'), from);
            console.log('Gas required for ETH transfer', gas);
            expect(gas).to.exist.to.be.greaterThan(0);
        } else {
            expect(true);
        }
    }).timeout(60000);

    it(`should transfer ether to ${ethDstAddress}`, async () => {
        if (parseInt(mainNetId, 10) > 4) {
            txHash = await twoKeyProtocol.transferEther(ethDstAddress, twoKeyProtocol.Utils.toWei(10, 'ether'), from, 6000000000);
            console.log('Transfer Ether', txHash, typeof txHash);
            const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
            const status = receipt && receipt.status;
            expect(status).to.be.equal('0x1');
        } else {
            expect(true);
        }
    }).timeout(60000);

    it('should return a balance for address', async () => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });
        await tryToRegisterUser('Aydnep', from);
        const balance = twoKeyProtocol.Utils.balanceFromWeiString(await twoKeyProtocol.getBalance(from), {inWei: true});
        console.log('SWITCH USER', balance.balance);
        return expect(balance).to.exist
            .to.haveOwnProperty('gasPrice')
        // .to.be.equal(twoKeyProtocol.getGasPrice());
    }).timeout(60000);

    it('should set eth-dolar rate', async() => {
        txHash = await twoKeyProtocol.TwoKeyExchangeContract.setValue('USD', 100000000000000000000, from);
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        let value = await twoKeyProtocol.TwoKeyExchangeContract.getBaseToTargetRate('USD');
        console.log(value);
    }).timeout(60000);

    it('should set dollar dai rate', async() => {
        txHash = await twoKeyProtocol.TwoKeyExchangeContract.setValue('USD/DAI', 99000000000000000, from);
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        let value = await twoKeyProtocol.TwoKeyExchangeContract.getBaseToTargetRate('USD/DAI');
        console.log(value);
    }).timeout(60000);

    it('should show token symbol of economy', async () => {
        const tokenSymbol = await twoKeyProtocol.ERC20.getERC20Symbol(twoKeyEconomy);
        console.log(tokenSymbol);
        expect(tokenSymbol).to.be.equal('2KEY');
    }).timeout(10000);

    let campaignData;

    it('should create a new campaign Acquisition Contract', async () => {
        campaignData = {
            moderator: from,
            campaignStartTime,
            campaignEndTime,
            expiryConversion: 0,
            maxConverterBonusPercentWei: maxConverterBonusPercent,
            pricePerUnitInETHWei: twoKeyProtocol.Utils.toWei(pricePerUnitInETHOrUSD, 'ether'),
            maxReferralRewardPercentWei: maxReferralRewardPercent,
            assetContractERC20: twoKeyEconomy,
            minContributionETHWei: twoKeyProtocol.Utils.toWei(minContributionETHorUSD, 'ether'),
            maxContributionETHWei: twoKeyProtocol.Utils.toWei(maxContributionETHorUSD, 'ether'),
            currency: acquisitionCurrency,
            tokenDistributionDate: 1,
            maxDistributionDateShiftInDays: 180,
            numberOfVestingPortions: 6,
            numberOfDaysBetweenPortions: 1,
            bonusTokensVestingStartShiftInDaysFromDistributionDate: 180,
            isKYCRequired,
            isFiatConversionAutomaticallyApproved,
            incentiveModel,
            isFiatOnly,
            vestingAmount,
            mustConvertToReferr: false,
            campaignHardCapWEI: twoKeyProtocol.Utils.toWei((campaignInventory * pricePerUnitInETHOrUSD), 'ether'),
            campaignSoftCapWEI: twoKeyProtocol.Utils.toWei((campaignInventory * pricePerUnitInETHOrUSD), 'ether'),
            endCampaignWhenHardCapReached: true,
        };

        const campaign = await twoKeyProtocol.AcquisitionCampaign.create(campaignData, campaignData, {} , from, {
            progressCallback,
            gasPrice: 150000000000,
            interval: 500,
            timeout: 600000
        });

        console.log('Campaign address', campaign);
        campaignAddress = campaign.campaignAddress;
        nonSingletonHash = await twoKeyProtocol.CampaignValidator.getCampaignNonSingletonsHash(campaignAddress);
        links.deployer = { link: campaign.campaignPublicLinkKey, fSecret: campaign.fSecret };
        return expect(addressRegex.test(campaignAddress)).to.be.true;
    }).timeout(120000);

    // it('should replace acquisition submodule', async() => {
    //     const src = await twoKeyProtocol.Utils.getSubmodule('bd06b1216ac1af2a09db559590d6ec0a2833b447f410f78574abaef5c5a54cd0', 'acquisition');
    //     expect(src.length).to.be.gte(0);
    // }).timeout(60000);

    it('should reserve amount for fiat conversion rewards', async() => {
        if(amount) {
            let value = parseFloat(twoKeyProtocol.Utils.toWei(1, 'ether').toString());
            let txHash = await twoKeyProtocol.AcquisitionCampaign.specifyFiatConversionRewards(campaignAddress, value, amount, from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        }
    }).timeout(60000);

    it('should proff that campaign is validated and registered properly', async() => {
        let isValidated = await twoKeyProtocol.CampaignValidator.isCampaignValidated(campaignAddress);
        expect(isValidated).to.be.equal(true);
        console.log('Campaign is validated');
    }).timeout(60000);
    //
    it('should proof that non singleton hash is set for the campaign', async() => {
        let nonSingletonHash = await twoKeyProtocol.CampaignValidator.getCampaignNonSingletonsHash(campaignAddress);
        expect(nonSingletonHash).to.be.equal(twoKeyProtocol.AcquisitionCampaign.getNonSingletonsHash());
    }).timeout(60000);

    it('should save campaign to IPFS', async () => {
        // const hash = await twoKeyProtocol.Utils.ipfsAdd(campaignData);
        // console.log('HASH', hash);
        // txHash = await twoKeyProtocol.AcquisitionCampaign.updateOrSetIpfsHashPublicMeta(campaignAddress, hash, from);
        // console.log(txHash);
        // await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        // console.log(`TX ${txHash} mined`);
        const campaignMeta = await twoKeyProtocol.AcquisitionCampaign.getPublicMeta(campaignAddress,from);
        console.log(campaignMeta);
        expect(campaignMeta.meta.assetContractERC20).to.be.equal(campaignData.assetContractERC20);
    }).timeout(120000);
    it('should print balance after campaign created', printBalances).timeout(15000);

    it('should transfer assets to campaign', async () => {
        txHash = await twoKeyProtocol.transfer2KEYTokens(campaignAddress, twoKeyProtocol.Utils.toWei(campaignInventory, 'ether'), from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        const balance = twoKeyProtocol.Utils.fromWei(await twoKeyProtocol.AcquisitionCampaign.checkInventoryBalance(campaignAddress, from)).toString();
        console.log('Campaign Balance', balance);
        expect(parseFloat(balance)).to.be.equal(1234000 - amount);
    }).timeout(600000);


    it('should make campaign active', async() => {
        txHash = await twoKeyProtocol.AcquisitionCampaign.activateCampaign(campaignAddress, from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        let isActivated = await twoKeyProtocol.AcquisitionCampaign.isCampaignActivated(campaignAddress);
        expect(isActivated).to.be.equal(true);
    }).timeout(600000);

    it('should get user public link', async () => {
        try {
            const publicLink = await twoKeyProtocol.AcquisitionCampaign.getPublicLinkKey(campaignAddress, from);
            console.log('User Public Link', publicLink);
            expect(parseInt(publicLink, 16)).to.be.greaterThan(0);
        } catch (e) {
            throw e;
        }
    }).timeout(10000);

    it('should get and decrypt ipfs hash', async() => {
        let data: IPrivateMetaInformation = await twoKeyProtocol.AcquisitionCampaign.getPrivateMetaHash(campaignAddress, from);
        console.log(data);
        expect(data.campaignPublicLinkKey).to.be.equal(links.deployer.link);
    }).timeout(120000);


    it('should visit campaign as guest', async () => {
        const {web3, address} = web3switcher.guest();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic('mnemonic words should be here but for some reason they are missing').privateKey,
        });
        txHash = await twoKeyProtocol.AcquisitionCampaign.visit(campaignAddress, links.deployer.link, links.deployer.fSecret);
        console.log(txHash);
        expect(txHash.length).to.be.gt(0);
    }).timeout(60000);

    it('should create a join link', async () => {
        const {web3, address} = web3switcher.gmail();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_GMAIL).privateKey,
        });
        console.log('Gmail plasma', await promisify(twoKeyProtocol.plasmaWeb3.eth.getAccounts, []));
        await tryToRegisterUser('Gmail', from);
        txHash = await twoKeyProtocol.AcquisitionCampaign.visit(campaignAddress, links.deployer.link, links.deployer.fSecret);
        console.log('isUserJoined', await twoKeyProtocol.AcquisitionCampaign.isAddressJoined(campaignAddress, from));
        const hash = await twoKeyProtocol.AcquisitionCampaign.join(campaignAddress, from, {
            cut: 50,
            referralLink: links.deployer.link,
            fSecret: links.deployer.fSecret,
        });
        console.log('2) gmail offchain REFLINK', hash);
        links.gmail = hash;
        expect(hash.link).to.be.a('string');
    }).timeout(60000);


    it('should show maximum referral reward after ONE referrer', async() => {
        const {web3, address} = web3switcher.test4();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST4).privateKey,
        });
        await tryToRegisterUser('Test4', from);
        txHash = await twoKeyProtocol.AcquisitionCampaign.visit(campaignAddress, links.gmail.link, links.gmail.fSecret);
        // console.log('isUserJoined', await twoKeyProtocol.AcquisitionCampaign.isAddressJoined(campaignAddress, from));
        let maxReward = await twoKeyProtocol.AcquisitionCampaign.getEstimatedMaximumReferralReward(campaignAddress, from, links.gmail.link, links.gmail.fSecret);
        console.log(`TEST4, BEFORE JOIN Estimated maximum referral reward: ${maxReward}%`);
        // expect(maxReward).to.be.gte(7.5);
    }).timeout(60000);

    it('==> should print available amount of tokens before conversion', async() => {
        const availableAmountOfTokens = await twoKeyProtocol.AcquisitionCampaign.getCurrentAvailableAmountOfTokens(campaignAddress,from);
        console.log('Available amount of tokens before conversion is: ' + availableAmountOfTokens);
        expect(availableAmountOfTokens).to.be.equal(1234000 - amount);
    }).timeout(60000);

    it('should buy some tokens', async () => {
        console.log('4) buy from test4 REFLINK', links.gmail);

        txHash = await twoKeyProtocol.AcquisitionCampaign.joinAndConvert(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD, 'ether'), links.gmail.link, from, { fSecret: links.gmail.fSecret });
        console.log(txHash);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);

        // const campaigns = await twoKeyProtocol.getCampaignsWhereConverter(from);
        // console.log(campaigns);
        expect(txHash).to.be.a('string');
    }).timeout(60000);

    it('==> should print available amount of tokens after conversion', async() => {
        const availableAmountOfTokens = await twoKeyProtocol.AcquisitionCampaign.getCurrentAvailableAmountOfTokens(campaignAddress,from);
        const { totalTokens } = await twoKeyProtocol.AcquisitionCampaign.getEstimatedTokenAmount(campaignAddress, false, twoKeyProtocol.Utils.toWei(minContributionETHorUSD, 'ether'));
        console.log('Available amount of tokens before conversion is: ' + availableAmountOfTokens, totalTokens);
        expect(availableAmountOfTokens).to.be.lte(1234000 - amount - totalTokens);
    }).timeout(60000);

    it('should join as test4', async () => {
        // twoKeyProtocol.unsubscribe2KeyEvents();
        // const hash = await twoKeyProtocol.AcquisitionCampaign.joinAndSetPublicLinkWithCut(campaignAddress, from, refLink, {cut: 33});
        const hash = await twoKeyProtocol.AcquisitionCampaign.join(campaignAddress, from, {
            cut: 33,
            referralLink: links.gmail.link,
            fSecret: links.gmail.fSecret
        });
        links.test4 = hash;
        console.log('isUserJoined', await twoKeyProtocol.AcquisitionCampaign.isAddressJoined(campaignAddress, from));
        console.log('3) test4 Cutted REFLINK', links.gmail);
        expect(hash.link).to.be.a('string');
    }).timeout(600000);

    it('should print amount of tokens that user want to buy', async () => {
        const tokens = await twoKeyProtocol.AcquisitionCampaign.getEstimatedTokenAmount(campaignAddress, false, twoKeyProtocol.Utils.toWei(minContributionETHorUSD, 'ether'));
        console.log(tokens);
        expect(tokens.totalTokens).to.gte(0);
    });

    it('should print joined_from', async () => {
        const { contractor } = await twoKeyProtocol.ipfs.get(links.gmail.link, { json: true, compress: true });
        console.log('joined_from test4', await twoKeyProtocol.PlasmaEvents.getJoinedFrom(campaignAddress, contractor, twoKeyProtocol.plasmaAddress));
    }).timeout(60000);


    it('should show maximum referral reward after TWO referrer', async() => {
        const {web3, address} = web3switcher.renata();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_RENATA).privateKey,
        });
        await tryToRegisterUser('Renata', from);
        console.log('isUserJoined', await twoKeyProtocol.AcquisitionCampaign.isAddressJoined(campaignAddress, from));
        txHash = await twoKeyProtocol.AcquisitionCampaign.visit(campaignAddress, links.test4.link, links.test4.fSecret);
        console.log('VISIT', txHash);
        const maxReward = await twoKeyProtocol.AcquisitionCampaign.getEstimatedMaximumReferralReward(campaignAddress, from, links.test4.link, links.test4.fSecret);
        console.log(`RENATA, Estimated maximum referral reward: ${maxReward}%`);

        // expect(maxReward).to.be.gte(5.025);
    }).timeout(60000);

    it('should joinOffchain as Renata', async () => {
        const hash = await twoKeyProtocol.AcquisitionCampaign.join(campaignAddress, from, {
            cut: 20,
            referralLink: links.test4.link,
            fSecret: links.test4.fSecret,
        });
        links.renata = hash;
        // const hash = await twoKeyProtocol.AcquisitionCampaign.joinAndSetPublicLinkWithCut(campaignAddress, refLink, 1);
        console.log('5) Renata offchain REFLINK', links.renata);
        expect(hash.link).to.be.a('string');
    }).timeout(600000);

    it('==> should print available amount of tokens before conversion', async() => {
        const availableAmountOfTokens = await twoKeyProtocol.AcquisitionCampaign.getCurrentAvailableAmountOfTokens(campaignAddress,from);
        console.log('Available amount of tokens before conversion is: ' + availableAmountOfTokens);
    }).timeout(60000);

    it('should register buyer', async() => {
        const {web3, address} = web3switcher.buyer();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_BUYER).privateKey,
        });
        await tryToRegisterUser('Buyer', from);
    }).timeout(60000);


    it('should register gmail', async() => {
        const {web3, address} = web3switcher.gmail2();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_GMAIL2).privateKey,
        });
        await tryToRegisterUser('Gmail2', from);
    }).timeout(60000);


    it('should buy some tokens from uport', async () => {
        const {web3, address} = web3switcher.uport();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_UPORT).privateKey,
        });
        await tryToRegisterUser('Uport', from);
        await twoKeyProtocol.AcquisitionCampaign.visit(campaignAddress, links.renata.link, links.renata.fSecret);

        console.log('6) uport buy from REFLINK', links.renata);
        const txHash = await twoKeyProtocol.AcquisitionCampaign.joinAndConvert(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.5, 'ether'), links.renata.link, from, { fSecret: links.renata.fSecret });
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        console.log(txHash);
        expect(txHash).to.be.a('string');
    }).timeout(60000);

    it('==> should print available amount of tokens after conversion', async() => {
        const availableAmountOfTokens = await twoKeyProtocol.AcquisitionCampaign.getCurrentAvailableAmountOfTokens(campaignAddress,from);
        console.log('Available amount of tokens after conversion is: ' + availableAmountOfTokens);
    }).timeout(60000);

    it('should transfer arcs to gmail2', async () => {
        console.log('7) transfer to gmail2 REFLINK', links.renata);
        txHash = await twoKeyProtocol.AcquisitionCampaign.joinAndShareARC(campaignAddress, from, links.renata.link, env.GMAIL2_ADDRESS, { fSecret: links.renata.fSecret });
        console.log(txHash);
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        const status = receipt && receipt.status;
        expect(status).to.be.equal('0x1');
    }).timeout(60000);

    it('should transfer arcs to buyer', async () => {
        console.log('7) transfer to BUYER REFLINK', links.renata);
        txHash = await twoKeyProtocol.AcquisitionCampaign.joinAndShareARC(campaignAddress, from, links.renata.link, env.BUYER_ADDRESS, { fSecret: links.renata.fSecret });
        console.log(txHash);
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        const status = receipt && receipt.status;
        expect(status).to.be.equal('0x1');
    }).timeout(60000);

    it('should buy some tokens from gmail2', async () => {
        const {web3, address} = web3switcher.gmail2();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_GMAIL2).privateKey,
        });
        await tryToRegisterUser('Gmail2', from);

        const arcs = await twoKeyProtocol.AcquisitionCampaign.getBalanceOfArcs(campaignAddress, from);
        console.log('GMAIL2 ARCS', arcs);
        txHash = await twoKeyProtocol.AcquisitionCampaign.convert(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.1, 'ether'), from);
        // txHash = await twoKeyProtocol.transferEther(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.1, 'ether'), from);
        console.log('HASH', txHash);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);

    it('should buy some tokens from buyer address', async() => {
        const {web3, address} = web3switcher.buyer();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_BUYER).privateKey,
        });

        const arcs = await twoKeyProtocol.AcquisitionCampaign.getBalanceOfArcs(campaignAddress, from);
        console.log('BUYER ARCS', arcs);
        txHash = await twoKeyProtocol.AcquisitionCampaign.convert(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.1, 'ether'), from);
        console.log('HASH', txHash);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);


    it('buyer should cancel his conversion and ask for refund', async() => {
        let conversionIds = await twoKeyProtocol.AcquisitionCampaign.getConverterConversionIds(campaignAddress, env.BUYER_ADDRESS, from);
        console.log('Want to cancel conversion with ID: ' + conversionIds[0]);
        const txHAsh = await twoKeyProtocol.AcquisitionCampaign.converterCancelConversion(campaignAddress, conversionIds[0], from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);


    it('should register test', async() => {
        const {web3, address} = web3switcher.test();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST).privateKey,
        });
        await tryToRegisterUser('Test', from);
    }).timeout(60000);

    it('should transfer arcs from new user to test', async () => {
        const {web3, address} = web3switcher.aydnep2();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP2).privateKey,
        });
        await tryToRegisterUser('Aydnep2', from);

        const refReward = await twoKeyProtocol.AcquisitionCampaign.getEstimatedMaximumReferralReward(campaignAddress, from, links.renata.link, links.renata.fSecret);
        console.log(`Max estimated referral reward: ${refReward}%`);
        txHash = await twoKeyProtocol.AcquisitionCampaign.joinAndShareARC(campaignAddress, from, links.renata.link, env.TEST_ADDRESS, { fSecret: links.renata.fSecret });
        console.log(txHash);
        const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        const status = receipt && receipt.status;
        expect(status).to.be.equal('0x1');
    }).timeout(60000);

    it('should buy some tokens from test', async () => {
        const {web3, address} = web3switcher.test();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST).privateKey,
        });
        await tryToRegisterUser('Test', from);

        // txHash = await twoKeyProtocol.transferEther(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.1, 'ether'), from);
        txHash = await twoKeyProtocol.AcquisitionCampaign.convert(campaignAddress, twoKeyProtocol.Utils.toWei(minContributionETHorUSD * 1.1, 'ether'), from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);

    it('should return all pending converters', async () => {
        console.log("Test where we'll fetch all pending converters");
        const addresses = await twoKeyProtocol.AcquisitionCampaign.getAllPendingConverters(campaignAddress, from);
        console.log(addresses);
    }).timeout(60000);

    it('should return all pending converters from contractor', async () => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });

        const addresses = await twoKeyProtocol.AcquisitionCampaign.getAllPendingConverters(campaignAddress, from);
        console.log("Addresses: " + addresses);
    }).timeout(60000);

    it('should approve converter', async () => {
        console.log('Test where contractor can approve converter to execute lockup');
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });

        if(isKYCRequired) {
            let txHash = await twoKeyProtocol.AcquisitionCampaign.approveConverter(campaignAddress, env.TEST4_ADDRESS, from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
            txHash = await twoKeyProtocol.AcquisitionCampaign.approveConverter(campaignAddress,env.GMAIL2_ADDRESS, from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
            /*
            txHash = await twoKeyProtocol.AcquisitionCampaign.approveConverter(campaignAddress,env.RENATA_ADDRESS, from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
            */
            const allApproved = await twoKeyProtocol.AcquisitionCampaign.getApprovedConverters(campaignAddress, from);
            console.log('Approved addresses: ', allApproved);

            expect(allApproved[0]).to.be.equal(env.TEST4_ADDRESS);
            const allPendingAfterApproved = await twoKeyProtocol.AcquisitionCampaign.getAllPendingConverters(campaignAddress, from);
            console.log('All pending after approval: ' + allPendingAfterApproved);
            expect(allPendingAfterApproved.length).to.be.equal(3);
        }
    }).timeout(60000);

    it('should get converter conversion ids', async() => {
        console.log('Test where we have to print conversion ids for the converter');
        let conversionIds = await twoKeyProtocol.AcquisitionCampaign.getConverterConversionIds(campaignAddress, env.TEST4_ADDRESS, from);
        console.log('For the converter: ' + env.TEST4_ADDRESS + 'conversion ids are:' + conversionIds);
    }).timeout(60000);

    it('should reject converter', async () => {
        console.log("Test where contractor / moderator can reject converter to execute lockup");
        if(isKYCRequired) {
            txHash = await twoKeyProtocol.AcquisitionCampaign.rejectConverter(campaignAddress, env.TEST_ADDRESS, from);
            console.log(txHash);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);

            const allRejected = await twoKeyProtocol.AcquisitionCampaign.getAllRejectedConverters(campaignAddress, from);
            console.log("Rejected addresses: ", allRejected);

            const allPendingAfterRejected = await twoKeyProtocol.AcquisitionCampaign.getAllPendingConverters(campaignAddress, from);
            console.log('All pending after rejection: ', allPendingAfterRejected);
            expect(allRejected[0]).to.be.equal(env.TEST_ADDRESS);
            expect(allPendingAfterRejected.length).to.be.equal(2);
        }
    }).timeout(60000);

    /*
    it('should be executed conversion by contractor' ,async() => {
        let conversionIdsForRenata = await twoKeyProtocol.AcquisitionCampaign.getConverterConversionIds(campaignAddress, env.RENATA_ADDRESS, from);
        console.log('Conversion ids for Renata' + conversionIdsForRenata);
        const txHash = await twoKeyProtocol.AcquisitionCampaign.executeConversion(campaignAddress, conversionIdsForRenata[0], from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);
    */

    // it('Should check that exchangeContract Fiat reserved is 0 before any conversions exceution', async() => {
    //     let upgradableExchangeFiatReserve = await twoKeyProtocol.UpgradableExchange.getUsdStableCoinUnitsReserve(from);
    //     expect(upgradableExchangeFiatReserve).to.be.equal(0);
    // }).timeout(60000);

    it('should be executed conversion by contractor' ,async() => {
        if(isKYCRequired) {
            let conversionIdsForGmail2 = await twoKeyProtocol.AcquisitionCampaign.getConverterConversionIds(campaignAddress, env.GMAIL2_ADDRESS, from);
            console.log('Conversion ids for Gmail2:', conversionIdsForGmail2);
            const txHash = await twoKeyProtocol.AcquisitionCampaign.executeConversion(campaignAddress, conversionIdsForGmail2[0], from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        }
    }).timeout(60000);


    // it('Should check that exchangeContract Fiat reserved is not zero after conversion exceution', async() => {
    //     let upgradableExchangeFiatReserve = await twoKeyProtocol.UpgradableExchange.getUsdStableCoinUnitsReserve(from);
    //     expect(upgradableExchangeFiatReserve).not.to.be.equal(0);
    // }).timeout(60000);

    it('should print campaigns where user converter', async() => {
        const {web3, address} = web3switcher.test4();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST4).privateKey,
        });
        // const campaigns = await twoKeyProtocol.Lockup.getCampaignsWhereConverter(from);
        // console.log(campaigns);
    });

    it('should execute conversion and create purchase', async () => {
        const {web3, address} = web3switcher.test4();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST4).privateKey,
        });
        if(isKYCRequired) {
            const txHash = await twoKeyProtocol.AcquisitionCampaign.executeConversion(campaignAddress, 0, from);
            await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        }
    }).timeout(60000);


    it('should get purchase information', async() => {
        console.log('Getting purchase information');
        let purchase = await twoKeyProtocol.AcquisitionCampaign.getPurchaseInformation(campaignAddress,0,from);
        console.log(purchase);
    }).timeout(60000);

    it('should start hedging some ether', async() => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });
        let approvedMinConversionRate = 1000;
        let upgradableExchangeBalance = await twoKeyProtocol.getBalance(twoKeyProtocol.twoKeyUpgradableExchange.address);
        const hash = await twoKeyProtocol.UpgradableExchange.startHedgingEth(parseFloat(upgradableExchangeBalance.balance.ETH.toString()), approvedMinConversionRate, from);
        console.log(hash);
    }).timeout(50000);

    it('should show campaign summary', async() => {
        const {web3, address} = web3switcher.test4();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST4).privateKey,
        });
        const summary = await twoKeyProtocol.AcquisitionCampaign.getCampaignSummary(campaignAddress, from);
        console.log(summary);
    }).timeout(60000);

    it('should show moderator earnings', async() => {
        let moderatorTotalEarnings = await twoKeyProtocol.AcquisitionCampaign.getModeratorTotalEarnings(campaignAddress, from);
        console.log('Moderator total earnings in 2key-tokens are: ' + moderatorTotalEarnings);
    }).timeout(60000);

    it('should pull down base tokens amount from purchases handler contract', async() => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });
        let txHash = await twoKeyProtocol.AcquisitionCampaign.withdrawTokens(campaignAddress, 0, 0, from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
    }).timeout(60000);

    it('==> should print referrer balance after hedging is done so hedge-rate exists', async() => {
        const referrerBalance = await twoKeyProtocol.AcquisitionCampaign.getAmountReferrerCanWithdraw(campaignAddress, env.GMAIL_ADDRESS, from);
        console.log(referrerBalance);
    }).timeout(60000);

    it('should print balances', printBalances).timeout(15000);

    it('==> should contractor withdraw his earnings', async() => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });

        const isContractor:boolean = await twoKeyProtocol.AcquisitionCampaign.isAddressContractor(campaignAddress,from);
        console.log('Aydnep is contractor: ' + isContractor);
        const balanceOfContract = await twoKeyProtocol.getBalance(campaignAddress);
        console.log('contract balance', twoKeyProtocol.Utils.balanceFromWeiString(balanceOfContract, {
            inWei: true,
            toNum: true
        }).balance);

        const contractorBalance = await twoKeyProtocol.AcquisitionCampaign.getContractorBalance(campaignAddress,from);
        console.log('Contractor balance: ' + contractorBalance.available);

        // const hash = await twoKeyProtocol.AcquisitionCampaign.contractorWithdraw(campaignAddress,from);
        // await twoKeyProtocol.Utils.getTransactionReceiptMined(hash);
    }).timeout(60000);

    it('==> should get address statistics', async() => {
        const {web3, address} = web3switcher.aydnep();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
        });
        let hexedValues = await twoKeyProtocol.AcquisitionCampaign.getAddressStatistic(campaignAddress, env.RENATA_ADDRESS,'0x0000000000000000000000000000000000000000',{from});
        console.log(hexedValues);
    }).timeout(60000);

    it('==> should print moderator address', async() => {
        const moderatorAddress: string = await twoKeyProtocol.AcquisitionCampaign.getModeratorAddress(campaignAddress,from);
        console.log("Moderator address is: " + moderatorAddress);
        expect(moderatorAddress).to.be.equal('0xbae10c2bdfd4e0e67313d1ebaddaa0adc3eea5d7');
    }).timeout(60000);

    it('==> should referrer withdraw his balances in 2key-tokens', async() => {
        const {web3, address} = web3switcher.renata();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_RENATA).privateKey,
        });
        const txHash = await twoKeyProtocol.AcquisitionCampaign.moderatorAndReferrerWithdraw(campaignAddress, false ,from);
        await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        console.log(txHash);
    }).timeout(60000);


    it('should print balances before cancelation', async() => {
        for (let i = 0; i < addresses.length; i++) {
            let addressCurrent = addresses[i].toString();
            let balance = await twoKeyProtocol.ERC20.getERC20Balance(twoKeyEconomy, addressCurrent);
            console.log("Address: " + addressCurrent + " ----- balance: " + balance);
        }
    }).timeout(60000);

    it('should get all whitelisted addresses', async() => {
        const addresses = await twoKeyProtocol.CongressMembersRegistry.getAllMembersForCongress(from);
        // console.log(addresses);
        expect(addresses.length).to.be.equal(4);
    }).timeout(60000);

    it('should get rate from upgradable exchange', async() => {
        const rate = await twoKeyProtocol.UpgradableExchange.get2keySellRate(from);

        console.log('Rate is : ' + rate);
        expect(rate.toString()).to.be.equal("0.06");
    }).timeout(60000);

    it('should print currency', async() => {
        const currency = await twoKeyProtocol.AcquisitionCampaign.getAcquisitionCampaignCurrency(campaignAddress, from);
        expect(currency).to.be.equal(acquisitionCurrency);
        console.log('Currency is: '+ currency);
    }).timeout(60000);

    it('should get moderator total earnings in campaign', async() => {
        const totalEarnings = await twoKeyProtocol.AcquisitionCampaign.getModeratorTotalEarnings(campaignAddress,from);
        console.log('Moderator total earnings: '+ totalEarnings);
    }).timeout(60000);

    it('should get statistics for the address from the contract', async() => {
        const {web3, address} = web3switcher.renata();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_RENATA).privateKey,
        });
        let stats = await twoKeyProtocol.AcquisitionCampaign.getAddressStatistic(campaignAddress,env.RENATA_ADDRESS, '0x0000000000000000000000000000000000000000',{from});
        console.log(stats);
    }).timeout(60000);

    it('should get stats for 1 more referrer', async() => {
        const {web3, address} = web3switcher.gmail();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_GMAIL).privateKey,
        });

        let stats = await twoKeyProtocol.AcquisitionCampaign.getAddressStatistic(campaignAddress, env.GMAIL_ADDRESS, '0x0000000000000000000000000000000000000000',{from});
        console.log(stats);
    }).timeout(60000);


    it('should get converter metrics per campaign', async() => {
        let metrics = await twoKeyProtocol.AcquisitionCampaign.getConverterMetricsPerCampaign(campaignAddress, env.GMAIL2_ADDRESS);
        console.log(metrics);
    }).timeout(60000);

    it('should print balance of left ERC20 on the Acquisition contract', async() => {
        let balance = await twoKeyProtocol.ERC20.getERC20Balance(twoKeyEconomy, campaignAddress);
        console.log(balance);
    }).timeout(60000);

    it('should check the amount of tokens for the offline conversion', async() => {
        console.log('Trying to resolve base and bonus amount of tokens for this kind of conversion');
        let obj = await twoKeyProtocol.AcquisitionCampaign.getEstimatedTokenAmount(campaignAddress,true,twoKeyProtocol.Utils.toWei(50, 'ether'));
        console.log(obj);
    }).timeout(60000);

    if(
        isFiatOnly == true
    ) {

        it('should create an offline(fiat) conversion', async () => {
            const {web3, address} = web3switcher.gmail2();
            from = address;
            twoKeyProtocol.setWeb3({
                web3,
                networks: {
                    mainNetId,
                    syncTwoKeyNetId,
                },
                eventsNetUrl,
                plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_GMAIL2).privateKey,
            });

            console.log(twoKeyProtocol.plasmaAddress);
            let signature = await twoKeyProtocol.AcquisitionCampaign.getSignatureFromLink(links.renata.link, twoKeyProtocol.plasmaAddress, links.renata.fSecret);
            console.log('Trying to perform offline conversion from gmail2');
            let txHash = await twoKeyProtocol.AcquisitionCampaign.convertOffline(campaignAddress, signature, from, from, 50);
            const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
        }).timeout(60000);

        it('should check conversion ids conversion handler after conversion is created', async () => {
            let conversionIds = await twoKeyProtocol.AcquisitionCampaign.getConverterConversionIds(campaignAddress, env.GMAIL2_ADDRESS, from);
            console.log('Conversion ids for the Gmail 2 are: ' + conversionIds);
        }).timeout(60000);


        it('should check conversion object for the created fiat conversion', async () => {
            console.log("Fiat conversion is this: ");
            let conversion = await twoKeyProtocol.AcquisitionCampaign.getConversion(campaignAddress, 4, from);
            console.log(conversion);
        }).timeout(60000);
    }

    it('should check conversion object', async() => {
        const {web3, address} = web3switcher.test4();
        from = address;
        twoKeyProtocol.setWeb3({
            web3,
            networks: {
                mainNetId,
                syncTwoKeyNetId,
            },
            eventsNetUrl,
            plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_TEST4).privateKey,
        });
        console.log('Regular executed conversion is: ');
        let conversion = await twoKeyProtocol.AcquisitionCampaign.getConversion(campaignAddress,0,from);
        console.log(conversion);
    }).timeout(60000);

    if(isFiatOnly == true) {
        it('should execute conversion from contractor', async() => {
            const {web3, address} = web3switcher.aydnep();
            from = address;
            twoKeyProtocol.setWeb3({
                web3,
                networks: {
                    mainNetId,
                    syncTwoKeyNetId,
                },
                eventsNetUrl,
                plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
            });
            if(!(isFiatConversionAutomaticallyApproved == true && isKYCRequired ==false)) {
                console.log('Trying to execute fiat conversion from Contractor');
                let txHash = await twoKeyProtocol.AcquisitionCampaign.executeConversion(campaignAddress,4,from);
                const receipt = await twoKeyProtocol.Utils.getTransactionReceiptMined(txHash);
            }

        }).timeout(60000);
    }


    it('should return number of forwarders for the campaign', async() => {
        let numberOfForwarders = await twoKeyProtocol.PlasmaEvents.getForwardersPerCampaign(campaignAddress);
        console.log('Number of forwarders stored on plasma: ' + numberOfForwarders);
    }).timeout(60000);

    it('should check reputation points for a couple of addresses', async() => {
        console.log('Checking stats for Renata');
        let renataStats = await twoKeyProtocol.BaseReputation.getReputationPointsForAllRolesPerAddress(env.RENATA_ADDRESS);
        console.log(renataStats);

        console.log('Checking stats for Test4');
        let test4Stats = await twoKeyProtocol.BaseReputation.getReputationPointsForAllRolesPerAddress(env.TEST4_ADDRESS);
        console.log(test4Stats);

        console.log('Checking stats for contractor');
        let contractorStats = await twoKeyProtocol.BaseReputation.getReputationPointsForAllRolesPerAddress(env.AYDNEP_ADDRESS);
        console.log(contractorStats);

        console.log('Checking stats for test address');
        let rejectedConverterStats = await twoKeyProtocol.BaseReputation.getReputationPointsForAllRolesPerAddress(env.TEST_ADDRESS);
        console.log(rejectedConverterStats);


    }).timeout(60000);


    it('should get inventory stats', async() => {
        let stats = await twoKeyProtocol.AcquisitionCampaign.getInventoryStatus(campaignAddress);
        console.log(stats);
    }).timeout(60000);


    it('Should get portions release dates', async() => {
        let releaseDates = await twoKeyProtocol.AcquisitionCampaign.getBoughtTokensReleaseDates(campaignAddress);
        console.log(releaseDates);
    }).timeout(60000);

    it('should get required rewards inventory', async() => {
        let hardCap = 95000000; //95M dollars
        let obj = await twoKeyProtocol.AcquisitionCampaign.getRequiredRewardsInventoryAmount(true, false, hardCap, 25);
        console.log('Rewards inventory required' , obj);
    }).timeout(60000);


    it('should get campaign type by address', async() => {
        let campaignType = await twoKeyProtocol.TwoKeyFactory.getCampaignTypeByAddress(campaignAddress);
        expect(campaignType).to.be.equal("TOKEN_SELL");
    }).timeout(60000);

    it('should get all maintainers', async() => {
        let maintainers = await twoKeyProtocol.TwoKeyMaintainersRegistry.getAllMaintainers();
        expect(maintainers.length).to.be.greaterThan(35);
    }).timeout(60000);


    it('should get stats for the contract from upgradable exchange', async() => {
        let stats = await twoKeyProtocol.UpgradableExchange.getStatusForTheContract(campaignAddress, from);
        console.log(stats);
    }).timeout(60000);

    // it('should build refgraph', async() => {
    //     const {web3, address} = web3switcher.gmail();
    //     from = address;
    //     twoKeyProtocol.setWeb3({
    //         web3,
    //         networks: {
    //             mainNetId,
    //             syncTwoKeyNetId,
    //         },
    //         eventsNetUrl,
    //         plasmaPK: generatePlasmaFromMnemonic(env.MNEMONIC_AYDNEP).privateKey,
    //     });
    //     const getReferralLeaves = async (contract, owner) => {
    //         const maxDepth = 99999;
    //         let depth = 0;
    //         const referrals = {};
    //         let currentReferral;
    //         // console.clear();
    //         const firstAddress = twoKeyProtocol.plasmaAddress;
    //
    //         async function getAddressReferrals(address, contractAddress, contractorAddress, from, plasma, timestamp) {
    //             if (from !== currentReferral && !referrals[from]) {
    //                 console.log('New Referral', from, currentReferral);
    //                 currentReferral = from;
    //                 referrals[from] = true;
    //                 depth += 1;
    //             }
    //             console.log('DEPTH', depth, address);
    //             const leaf: any = {
    //                 depth,
    //                 maxDepth,
    //                 _collapsed: depth >= maxDepth,
    //                 contractorAddress,
    //                 contractAddress,
    //                 address,
    //                 timestamp,
    //             };
    //             if (from === address) {
    //                 return null;
    //             }
    //             let hasTokensOrRewards = false;
    //             console.log('GET STATISTICS', plasma);
    //             const signature = await twoKeyProtocol.PlasmaEvents.signReferrerToGetRewards();
    //             const statistics = await twoKeyProtocol.AcquisitionCampaign.getAddressStatistic(contractAddress, address, signature, {plasma});
    //             /*
    //             try {
    //               leaf.userData = await fetchAPI('plasma/user', {
    //                 params: {
    //                   plasma_address: address,
    //                   campaign_web3_address: contractAddress,
    //                 },
    //               });
    //             } catch (e) {
    //               console.log(e);
    //             }
    //             */
    //             if (statistics.isJoined && from) {
    //                 // const joined_from = await promisify(twoKeyPlasmaEvents.getJoinedFrom, [contractAddress, contractorAddress, address]);
    //                 const joined_from = await twoKeyProtocol.PlasmaEvents.getJoinedFrom(contractAddress, contractorAddress, address);
    //                 // const visited_from = await getVisitedFrom(contractAddress, contractorAddress, address);
    //                 /*
    //                 if (joined_from === contractorAddress) {
    //                   console.log('CONTRACTOR call plasmaOf');
    //                   joined_from = await promisify(twoKeyPlasmaEvents.plasmaOf, [joined_from]);
    //                 }
    //                 */
    //                 // const plasmaOf = await promisify(twoKeyPlasmaEvents.plasmaOf, [visited_from]);
    //                 console.log('\r\n');
    //                 console.log('VISITED FROM');
    //                 console.log('CURRENT ADDRESS', address);
    //                 // console.log('VISITED_FROM', visited_from);
    //                 console.log('JOINED_FROM', joined_from);
    //                 // console.log('PLASMA_OF', plasmaOf);
    //                 console.log('FROM', from);
    //                 console.log('STATS', statistics);
    //                 console.log('\r\n');
    //                 /*
    //                 */
    //                 if (parseInt(joined_from, 16) && joined_from !== from) {
    //                     return null;
    //                 }
    //             }
    //             hasTokensOrRewards = Object.values(statistics)
    //                 .reduce((prev, current) => (prev || current.rewards
    //                     || current.amountConverterSpentETH || current.tokensBought), hasTokensOrRewards);
    //             leaf.statistics = statistics;
    //             console.log(address, statistics);
    //             leaf.name = statistics.username || address.replace(/^(0x.{5}).{31}/, '$1...');
    //             leaf.from = from;
    //             leaf.hover = from && {
    //                 name: statistics.username,
    //                 address,
    //                 rewards: statistics.referrerRewards,
    //                 tokensBought: statistics.tokensBought,
    //                 amountConverterSpentETH: statistics.amountConverterSpentETH,
    //                 timestamp: timestamp || Date.now(),
    //             };
    //             leaf.linkClassName =
    //                 (owner === address && 'leaf-contract')
    //                 || (statistics.isReferrer && 'leaf-referrer')
    //                 || (statistics.isConverter && 'leaf-converter')
    //                 || (statistics.isJoined && 'leaf-joined')
    //                 || (statistics.username && 'leaf-plasma');
    //             leaf.nodeSvgShape = {
    //                 shape: 'circle',
    //                 shapeProps: {
    //                     r: 10,
    //                     strokeWidth: 3,
    //                     stroke: (owner === address && '#f00')
    //                     || (statistics.isReferrer && (statistics.isConverter ? 'magenta' : 'darkviolet'))
    //                     || (statistics.isConverter && '#1a936f')
    //                     || (hasTokensOrRewards && '#1a936f')
    //                     || (statistics.isJoined && 'steelblue')
    //                     || (statistics.username && 'orange')
    //                     || '#999',
    //                 },
    //                 links: {
    //                     display: 'none',
    //                 },
    //             };
    //             if (leaf.hover && statistics.fullName) {
    //                 leaf.hover.fullname = statistics.fullName;
    //             }
    //             if (leaf.hover && statistics.email) {
    //                 leaf.hover.email = statistics.email;
    //             }
    //             const referralsObject = {};
    //             // console.log('GET CHILDREN FOR', address);
    //             if (depth <= maxDepth) {
    //                 const { visits, timestamps } = await twoKeyProtocol.PlasmaEvents.getVisitsList(contractAddress, contractorAddress, address);
    //                 console.log('CHILDREN FOR', address, visits);
    //                 if (visits.length) {
    //                     // console.log('CHILDREN FOR', address, referrals);
    //                     for (let i = 0, l = visits.length; i < l; i += 1) {
    //                         if (from !== visits[i]) {
    //                             referralsObject[visits[i]] = timestamps[i];
    //                             // processed[visits[i]] = true;
    //                         }
    //                     }
    //                     const leavePromises = [];
    //                     Object.keys(referralsObject).forEach(key => {
    //                         leavePromises.push(getAddressReferrals(
    //                             key,
    //                             contractAddress,
    //                             contractorAddress,
    //                             address,
    //                             true,
    //                             referralsObject[key]
    //                         ));
    //                     });
    //                     leaf.children = await Promise.all(leavePromises);
    //                 }
    //             }
    //             return { ...leaf, ...statistics, isJoined: statistics.isJoined };
    //         }
    //         // const tree = await getAddressReferrals(firstAddress, contract, owner, this.address !== owner);
    //         const tree = await getAddressReferrals(firstAddress, contract, owner, null, true, null);
    //         console.log(tree);
    //         const removeDeadLeaves = node => {
    //             const result = { ...node };
    //             if (node.children) {
    //                 result.children = node.children.filter(leaf => !!leaf).map(leaf => removeDeadLeaves(leaf));
    //             }
    //             return result;
    //         };
    //         const normalTree = removeDeadLeaves(tree);
    //         console.log('TREE WITHOUT DEAD LEAVES', normalTree);
    //         return { normalTree, isContractor: this.address === owner };
    //     };
    //
    //     let x = await getReferralLeaves(campaignAddress,from);
    //
    //     console.log(x);
    // }).timeout(120000);
});

