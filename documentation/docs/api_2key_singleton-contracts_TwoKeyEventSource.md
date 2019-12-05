---
id: 2key_singleton-contracts_TwoKeyEventSource
title: TwoKeyEventSource
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> TwoKeyEventSource</h2><p class="base-contracts"><span>is</span> <a href="2key_upgradability_Upgradeable.html">Upgradeable</a><span>, </span><a href="2key_singleton-contracts_ITwoKeySingletonUtils.html">ITwoKeySingletonUtils</a></p><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/singleton-contracts/TwoKeyEventSource.sol" target="_blank">contracts/2key/singleton-contracts/TwoKeyEventSource.sol</a></div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#AcquisitionCampaignCreated">AcquisitionCampaignCreated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Cancelled">Cancelled</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Converted">Converted</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ConvertedAcquisition">ConvertedAcquisition</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ConvertedAcquisitionV2">ConvertedAcquisitionV2</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ConvertedDonation">ConvertedDonation</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ConvertedDonationV2">ConvertedDonationV2</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Created">Created</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#DonationCampaignCreated">DonationCampaignCreated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Executed">Executed</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ExecutedV1">ExecutedV1</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Joined">Joined</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#PriceUpdated">PriceUpdated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ReceivedEther">ReceivedEther</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Rejected">Rejected</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#Rewarded">Rewarded</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#UpdatedData">UpdatedData</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#UpdatedPublicMetaHash">UpdatedPublicMetaHash</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#UserRegistered">UserRegistered</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#acquisitionCampaignCreated">acquisitionCampaignCreated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#cancelled">cancelled</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#converted">converted</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#convertedAcquisition">convertedAcquisition</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#convertedAcquisitionV2">convertedAcquisitionV2</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#convertedDonation">convertedDonation</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#convertedDonationV2">convertedDonationV2</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#created">created</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#donationCampaignCreated">donationCampaignCreated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#ethereumOf">ethereumOf</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#executed">executed</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#executedV1">executedV1</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#getTwoKeyDefaultIntegratorFeeFromAdmin">getTwoKeyDefaultIntegratorFeeFromAdmin</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#getTwoKeyDefaultNetworkTaxPercent">getTwoKeyDefaultNetworkTaxPercent</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#isAddressMaintainer">isAddressMaintainer</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#joined">joined</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyTwoKeyCampaignValidator">onlyTwoKeyCampaignValidator</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#plasmaOf">plasmaOf</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#priceUpdated">priceUpdated</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#rejected">rejected</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#rewarded">rewarded</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#setInitialParams">setInitialParams</a></li><li><a href="2key_singleton-contracts_TwoKeyEventSource.html#userRegistered">userRegistered</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="events"><h3>Events</h3><ul><li><div class="item event"><span id="AcquisitionCampaignCreated" class="anchor-marker"></span><h4 class="name">AcquisitionCampaignCreated</h4><div class="body"><code class="signature">event <strong>AcquisitionCampaignCreated</strong><span>(address proxyLogicHandler, address proxyConversionHandler, address proxyAcquisitionCampaign, address proxyPurchasesHandler, address contractor) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyLogicHandler</code> - address</div><div><code>proxyConversionHandler</code> - address</div><div><code>proxyAcquisitionCampaign</code> - address</div><div><code>proxyPurchasesHandler</code> - address</div><div><code>contractor</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="Cancelled" class="anchor-marker"></span><h4 class="name">Cancelled</h4><div class="body"><code class="signature">event <strong>Cancelled</strong><span>(address _campaign, address _converter, uint256 _indexOrAmount) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_indexOrAmount</code> - uint256</div></dd></dl></div></div></li><li><div class="item event"><span id="Converted" class="anchor-marker"></span><h4 class="name">Converted</h4><div class="body"><code class="signature">event <strong>Converted</strong><span>(address _campaign, address _converter, uint256 _amount) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_amount</code> - uint256</div></dd></dl></div></div></li><li><div class="item event"><span id="ConvertedAcquisition" class="anchor-marker"></span><h4 class="name">ConvertedAcquisition</h4><div class="body"><code class="signature">event <strong>ConvertedAcquisition</strong><span>(address _campaign, address _converter, uint256 _baseTokens, uint256 _bonusTokens, uint256 _conversionAmount, bool _isFiatConversion) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_baseTokens</code> - uint256</div><div><code>_bonusTokens</code> - uint256</div><div><code>_conversionAmount</code> - uint256</div><div><code>_isFiatConversion</code> - bool</div></dd></dl></div></div></li><li><div class="item event"><span id="ConvertedAcquisitionV2" class="anchor-marker"></span><h4 class="name">ConvertedAcquisitionV2</h4><div class="body"><code class="signature">event <strong>ConvertedAcquisitionV2</strong><span>(address _campaign, address _converterPlasma, uint256 _baseTokens, uint256 _bonusTokens, uint256 _conversionAmount, bool _isFiatConversion, uint _conversionId) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converterPlasma</code> - address</div><div><code>_baseTokens</code> - uint256</div><div><code>_bonusTokens</code> - uint256</div><div><code>_conversionAmount</code> - uint256</div><div><code>_isFiatConversion</code> - bool</div><div><code>_conversionId</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="ConvertedDonation" class="anchor-marker"></span><h4 class="name">ConvertedDonation</h4><div class="body"><code class="signature">event <strong>ConvertedDonation</strong><span>(address _campaign, address _converter, uint _conversionAmount) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_conversionAmount</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="ConvertedDonationV2" class="anchor-marker"></span><h4 class="name">ConvertedDonationV2</h4><div class="body"><code class="signature">event <strong>ConvertedDonationV2</strong><span>(address _campaign, address _converterPlasma, uint _conversionAmount, uint _conversionId) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converterPlasma</code> - address</div><div><code>_conversionAmount</code> - uint</div><div><code>_conversionId</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="Created" class="anchor-marker"></span><h4 class="name">Created</h4><div class="body"><code class="signature">event <strong>Created</strong><span>(address _campaign, address _owner, address _moderator) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_owner</code> - address</div><div><code>_moderator</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="DonationCampaignCreated" class="anchor-marker"></span><h4 class="name">DonationCampaignCreated</h4><div class="body"><code class="signature">event <strong>DonationCampaignCreated</strong><span>(address proxyDonationCampaign, address proxyDonationConversionHandler, address proxyDonationLogicHandler, address contractor) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyDonationCampaign</code> - address</div><div><code>proxyDonationConversionHandler</code> - address</div><div><code>proxyDonationLogicHandler</code> - address</div><div><code>contractor</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="Executed" class="anchor-marker"></span><h4 class="name">Executed</h4><div class="body"><code class="signature">event <strong>Executed</strong><span>(address campaignAddress, address converterPlasmaAddress, uint conversionId) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaignAddress</code> - address</div><div><code>converterPlasmaAddress</code> - address</div><div><code>conversionId</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="ExecutedV1" class="anchor-marker"></span><h4 class="name">ExecutedV1</h4><div class="body"><code class="signature">event <strong>ExecutedV1</strong><span>(address campaignAddress, address converterPlasmaAddress, uint conversionId, uint tokens) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaignAddress</code> - address</div><div><code>converterPlasmaAddress</code> - address</div><div><code>conversionId</code> - uint</div><div><code>tokens</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="Joined" class="anchor-marker"></span><h4 class="name">Joined</h4><div class="body"><code class="signature">event <strong>Joined</strong><span>(address _campaign, address _from, address _to) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_from</code> - address</div><div><code>_to</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="PriceUpdated" class="anchor-marker"></span><h4 class="name">PriceUpdated</h4><div class="body"><code class="signature">event <strong>PriceUpdated</strong><span>(bytes32 _currency, uint newRate, uint _timestamp, address _updater) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_currency</code> - bytes32</div><div><code>newRate</code> - uint</div><div><code>_timestamp</code> - uint</div><div><code>_updater</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="ReceivedEther" class="anchor-marker"></span><h4 class="name">ReceivedEther</h4><div class="body"><code class="signature">event <strong>ReceivedEther</strong><span>(address _sender, uint value) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_sender</code> - address</div><div><code>value</code> - uint</div></dd></dl></div></div></li><li><div class="item event"><span id="Rejected" class="anchor-marker"></span><h4 class="name">Rejected</h4><div class="body"><code class="signature">event <strong>Rejected</strong><span>(address _campaign, address _converter) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="Rewarded" class="anchor-marker"></span><h4 class="name">Rewarded</h4><div class="body"><code class="signature">event <strong>Rewarded</strong><span>(address _campaign, address _to, uint256 _amount) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_to</code> - address</div><div><code>_amount</code> - uint256</div></dd></dl></div></div></li><li><div class="item event"><span id="UpdatedData" class="anchor-marker"></span><h4 class="name">UpdatedData</h4><div class="body"><code class="signature">event <strong>UpdatedData</strong><span>(uint timestamp, uint value, string action) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>timestamp</code> - uint</div><div><code>value</code> - uint</div><div><code>action</code> - string</div></dd></dl></div></div></li><li><div class="item event"><span id="UpdatedPublicMetaHash" class="anchor-marker"></span><h4 class="name">UpdatedPublicMetaHash</h4><div class="body"><code class="signature">event <strong>UpdatedPublicMetaHash</strong><span>(uint timestamp, string value) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>timestamp</code> - uint</div><div><code>value</code> - string</div></dd></dl></div></div></li><li><div class="item event"><span id="UserRegistered" class="anchor-marker"></span><h4 class="name">UserRegistered</h4><div class="body"><code class="signature">event <strong>UserRegistered</strong><span>(string _name, address _address, string _fullName, string _email, string _username_walletName) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_name</code> - string</div><div><code>_address</code> - address</div><div><code>_fullName</code> - string</div><div><code>_email</code> - string</div><div><code>_username_walletName</code> - string</div></dd></dl></div></div></li></ul></div><div class="modifiers"><h3>Modifiers</h3><ul><li><div class="item modifier"><span id="onlyAllowedContracts" class="anchor-marker"></span><h4 class="name">onlyAllowedContracts</h4><div class="body"><code class="signature">modifier <strong>onlyAllowedContracts</strong><span>() </span></code><hr/><div class="description"><p>Modifier which will allow only completely verified and validated contracts to call some functions.</p></div></div></div></li><li><div class="item modifier"><span id="onlyTwoKeyCampaignValidator" class="anchor-marker"></span><h4 class="name">onlyTwoKeyCampaignValidator</h4><div class="body"><code class="signature">modifier <strong>onlyTwoKeyCampaignValidator</strong><span>() </span></code><hr/><div class="description"><p>Modifier which will allow only TwoKeyCampaignValidator to make some calls.</p></div></div></div></li></ul></div><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="acquisitionCampaignCreated" class="anchor-marker"></span><h4 class="name">acquisitionCampaignCreated</h4><div class="body"><code class="signature">function <strong>acquisitionCampaignCreated</strong><span>(address proxyLogicHandler, address proxyConversionHandler, address proxyAcquisitionCampaign, address proxyPurchasesHandler, address contractor) </span><span>external </span></code><hr/><div class="description"><p>Function to emit event every time someone starts new Acquisition campaign.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyLogicHandler</code> - is the address of TwoKeyAcquisitionLogicHandler proxy deployed by TwoKeyFactory</div><div><code>proxyConversionHandler</code> - is the address of TwoKeyConversionHandler proxy deployed by TwoKeyFactory</div><div><code>proxyAcquisitionCampaign</code> - is the address of TwoKeyAcquisitionCampaign proxy deployed by TwoKeyFactory</div><div><code>proxyPurchasesHandler</code> - is the address of TwoKeyPurchasesHandler proxy deployed by TwoKeyFactory</div><div><code>contractor</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="cancelled" class="anchor-marker"></span><h4 class="name">cancelled</h4><div class="body"><code class="signature">function <strong>cancelled</strong><span>(address _campaign, address _converter, uint256 _indexOrAmount) </span><span>external </span></code><hr/><div class="description"><p>Function to emit created event every time campaign is cancelled.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of the cancelled campaign</div><div><code>_converter</code> - is the address of the converter</div><div><code>_indexOrAmount</code> - is the amount of campaign</div></dd></dl></div></div></li><li><div class="item function"><span id="converted" class="anchor-marker"></span><h4 class="name">converted</h4><div class="body"><code class="signature">function <strong>converted</strong><span>(address _campaign, address _converter, uint256 _conversionAmount) </span><span>external </span></code><hr/><div class="description"><p>Function to emit converted event.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of main campaign contract</div><div><code>_converter</code> - is the address of converter during the conversion</div><div><code>_conversionAmount</code> - is conversion amount</div></dd></dl></div></div></li><li><div class="item function"><span id="convertedAcquisition" class="anchor-marker"></span><h4 class="name">convertedAcquisition</h4><div class="body"><code class="signature">function <strong>convertedAcquisition</strong><span>(address _campaign, address _converter, uint256 _baseTokens, uint256 _bonusTokens, uint256 _conversionAmount, bool _isFiatConversion) </span><span>external </span></code><hr/><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_baseTokens</code> - uint256</div><div><code>_bonusTokens</code> - uint256</div><div><code>_conversionAmount</code> - uint256</div><div><code>_isFiatConversion</code> - bool</div></dd></dl></div></div></li><li><div class="item function"><span id="convertedAcquisitionV2" class="anchor-marker"></span><h4 class="name">convertedAcquisitionV2</h4><div class="body"><code class="signature">function <strong>convertedAcquisitionV2</strong><span>(address _campaign, address _converterPlasma, uint256 _baseTokens, uint256 _bonusTokens, uint256 _conversionAmount, bool _isFiatConversion, uint _conversionId) </span><span>external </span></code><hr/><div class="description"><p>This function updates values in TwoKeyRegistry contract, Function to emit created event every time conversion happened under AcquisitionCampaign.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of the deployed campaign</div><div><code>_converterPlasma</code> - is the converter address</div><div><code>_baseTokens</code> - is the amount of tokens bought</div><div><code>_bonusTokens</code> - is the amount of bonus tokens received</div><div><code>_conversionAmount</code> - is the amount of conversion</div><div><code>_isFiatConversion</code> - is flag representing if conversion is either FIAT or ETHER</div><div><code>_conversionId</code> - is the id of conversion</div></dd></dl></div></div></li><li><div class="item function"><span id="convertedDonation" class="anchor-marker"></span><h4 class="name">convertedDonation</h4><div class="body"><code class="signature">function <strong>convertedDonation</strong><span>(address _campaign, address _converter, uint256 _conversionAmount) </span><span>external </span></code><hr/><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div><div><code>_conversionAmount</code> - uint256</div></dd></dl></div></div></li><li><div class="item function"><span id="convertedDonationV2" class="anchor-marker"></span><h4 class="name">convertedDonationV2</h4><div class="body"><code class="signature">function <strong>convertedDonationV2</strong><span>(address _campaign, address _converterPlasma, uint256 _conversionAmount, uint256 _conversionId) </span><span>external </span></code><hr/><div class="description"><p>Function to emit created event every time conversion happened under DonationCampaign.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of main campaign contract</div><div><code>_converterPlasma</code> - is the address of the converter</div><div><code>_conversionAmount</code> - is the amount of conversion</div><div><code>_conversionId</code> - is the id of conversion</div></dd></dl></div></div></li><li><div class="item function"><span id="created" class="anchor-marker"></span><h4 class="name">created</h4><div class="body"><code class="signature">function <strong>created</strong><span>(address _campaign, address _owner, address _moderator) </span><span>external </span></code><hr/><div class="description"><p>This function updates values in TwoKeyRegistry contract, Function to emit created event every time campaign is created.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyTwoKeyCampaignValidator">onlyTwoKeyCampaignValidator </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of the deployed campaign</div><div><code>_owner</code> - is the contractor address of the campaign</div><div><code>_moderator</code> - is the address of the moderator in campaign</div></dd></dl></div></div></li><li><div class="item function"><span id="donationCampaignCreated" class="anchor-marker"></span><h4 class="name">donationCampaignCreated</h4><div class="body"><code class="signature">function <strong>donationCampaignCreated</strong><span>(address proxyDonationCampaign, address proxyDonationConversionHandler, address proxyDonationLogicHandler, address contractor) </span><span>external </span></code><hr/><div class="description"><p>Function to emit event every time someone starts new Donation campaign.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyDonationCampaign</code> - is the address of TwoKeyDonationCampaign proxy deployed by TwoKeyFactory</div><div><code>proxyDonationConversionHandler</code> - is the address of TwoKeyDonationConversionHandler proxy deployed by TwoKeyFactory</div><div><code>proxyDonationLogicHandler</code> - is the address of TwoKeyDonationLogicHandler proxy deployed by TwoKeyFactory</div><div><code>contractor</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="ethereumOf" class="anchor-marker"></span><h4 class="name">ethereumOf</h4><div class="body"><code class="signature">function <strong>ethereumOf</strong><span>(address me) </span><span>public </span><span>view </span><span>returns  (address) </span></code><hr/><div class="description"><p>Function to determine ethereum address of plasma address.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>me</code> - is the plasma address of the user</div></dd><dt><span class="label-return">Returns:</span></dt><dd>ethereum address</dd></dl></div></div></li><li><div class="item function"><span id="executed" class="anchor-marker"></span><h4 class="name">executed</h4><div class="body"><code class="signature">function <strong>executed</strong><span>(address _campaignAddress, address _converterPlasmaAddress, uint _conversionId) </span><span>external </span></code><hr/><div class="description"><p>Function to emit event every time conversion gets executed.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaignAddress</code> - is the main campaign contract address</div><div><code>_converterPlasmaAddress</code> - is the address of converter plasma</div><div><code>_conversionId</code> - is the ID of conversion, unique per campaign</div></dd></dl></div></div></li><li><div class="item function"><span id="executedV1" class="anchor-marker"></span><h4 class="name">executedV1</h4><div class="body"><code class="signature">function <strong>executedV1</strong><span>(address _campaignAddress, address _converterPlasmaAddress, uint _conversionId, uint tokens) </span><span>external </span></code><hr/><div class="description"><p>Function to emit event every time conversion gets executed.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaignAddress</code> - is the main campaign contract address</div><div><code>_converterPlasmaAddress</code> - is the address of converter plasma</div><div><code>_conversionId</code> - is the ID of conversion, unique per campaign</div><div><code>tokens</code> - uint</div></dd></dl></div></div></li><li><div class="item function"><span id="getTwoKeyDefaultIntegratorFeeFromAdmin" class="anchor-marker"></span><h4 class="name">getTwoKeyDefaultIntegratorFeeFromAdmin</h4><div class="body"><code class="signature">function <strong>getTwoKeyDefaultIntegratorFeeFromAdmin</strong><span>() </span><span>public </span><span>view </span><span>returns  (uint) </span></code><hr/><div class="description"><p>In default TwoKeyAdmin will be moderator and his fee percentage per conversion is predefined.</p></div><dl><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="getTwoKeyDefaultNetworkTaxPercent" class="anchor-marker"></span><h4 class="name">getTwoKeyDefaultNetworkTaxPercent</h4><div class="body"><code class="signature">function <strong>getTwoKeyDefaultNetworkTaxPercent</strong><span>() </span><span>public </span><span>view </span><span>returns  (uint) </span></code><hr/><div class="description"><p>Function to get default network tax percentage.</p></div><dl><dt><span class="label-return">Returns:</span></dt><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="isAddressMaintainer" class="anchor-marker"></span><h4 class="name">isAddressMaintainer</h4><div class="body"><code class="signature">function <strong>isAddressMaintainer</strong><span>(address _maintainer) </span><span>public </span><span>view </span><span>returns  (bool) </span></code><hr/><div class="description"><p>Address to check if an address is maintainer in TwoKeyMaintainersRegistry.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_maintainer</code> - is the address we&#x27;re checking this for</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bool</dd></dl></div></div></li><li><div class="item function"><span id="joined" class="anchor-marker"></span><h4 class="name">joined</h4><div class="body"><code class="signature">function <strong>joined</strong><span>(address _campaign, address _from, address _to) </span><span>external </span></code><hr/><div class="description"><p>This function updates values in TwoKeyRegistry contract, Function to emit created event every time someone has joined to campaign.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of the deployed campaign</div><div><code>_from</code> - is the address of the referrer</div><div><code>_to</code> - is the address of person who has joined</div></dd></dl></div></div></li><li><div class="item function"><span id="plasmaOf" class="anchor-marker"></span><h4 class="name">plasmaOf</h4><div class="body"><code class="signature">function <strong>plasmaOf</strong><span>(address me) </span><span>public </span><span>view </span><span>returns  (address) </span></code><hr/><div class="description"><p>Function to check adequate plasma address for submitted eth address.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>me</code> - is the ethereum address we request corresponding plasma address for</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="priceUpdated" class="anchor-marker"></span><h4 class="name">priceUpdated</h4><div class="body"><code class="signature">function <strong>priceUpdated</strong><span>(bytes32 _currency, uint _newRate, uint _timestamp, address _updater) </span><span>external </span></code><hr/><div class="description"><p>Function which will emit event PriceUpdated every time that happens under TwoKeyExchangeRateContract.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_currency</code> - is the hexed string of currency name</div><div><code>_newRate</code> - is the new rate</div><div><code>_timestamp</code> - is the time of updating</div><div><code>_updater</code> - is the maintainer address which performed this call</div></dd></dl></div></div></li><li><div class="item function"><span id="rejected" class="anchor-marker"></span><h4 class="name">rejected</h4><div class="body"><code class="signature">function <strong>rejected</strong><span>(address _campaign, address _converter) </span><span>external </span></code><hr/><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_converter</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="rewarded" class="anchor-marker"></span><h4 class="name">rewarded</h4><div class="body"><code class="signature">function <strong>rewarded</strong><span>(address _campaign, address _to, uint256 _amount) </span><span>external </span></code><hr/><div class="description"><p>Function to emit created event every time bounty is distributed between influencers.</p></div><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyEventSource.html#onlyAllowedContracts">onlyAllowedContracts </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - is the address of the deployed campaign</div><div><code>_to</code> - is the reward receiver</div><div><code>_amount</code> - is the reward amount</div></dd></dl></div></div></li><li><div class="item function"><span id="setInitialParams" class="anchor-marker"></span><h4 class="name">setInitialParams</h4><div class="body"><code class="signature">function <strong>setInitialParams</strong><span>(address _twoKeySingletonesRegistry, address _proxyStorage) </span><span>external </span></code><hr/><div class="description"><p>Function to set initial params in the contract.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_twoKeySingletonesRegistry</code> - is the address of TWO_KEY_SINGLETON_REGISTRY contract</div><div><code>_proxyStorage</code> - is the address of proxy of storage contract</div></dd></dl></div></div></li><li><div class="item function"><span id="userRegistered" class="anchor-marker"></span><h4 class="name">userRegistered</h4><div class="body"><code class="signature">function <strong>userRegistered</strong><span>(string _name, address _address, string _fullName, string _email, string _username_walletName) </span><span>external </span></code><hr/><div class="description"><p>Function to emit event every time user is registered.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_name</code> - is the name of the user</div><div><code>_address</code> - is the address of the user</div><div><code>_fullName</code> - is the full user name</div><div><code>_email</code> - is users email</div><div><code>_username_walletName</code> - is = concat(username,&#x27;_&#x27;,walletName)</div></dd></dl></div></div></li></ul></div></div></div>