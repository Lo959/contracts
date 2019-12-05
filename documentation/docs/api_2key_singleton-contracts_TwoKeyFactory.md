---
id: 2key_singleton-contracts_TwoKeyFactory
title: TwoKeyFactory
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> TwoKeyFactory</h2><p class="base-contracts"><span>is</span> <a href="2key_upgradability_Upgradeable.html">Upgradeable</a><span>, </span><a href="2key_singleton-contracts_ITwoKeySingletonUtils.html">ITwoKeySingletonUtils</a></p><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/singleton-contracts/TwoKeyFactory.sol" target="_blank">contracts/2key/singleton-contracts/TwoKeyFactory.sol</a></div><div class="author">Author: Nikola Madjarevic</div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_singleton-contracts_TwoKeyFactory.html#ProxyForCampaign">ProxyForCampaign</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#ProxyForDonationCampaign">ProxyForDonationCampaign</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#addressToCampaignType">addressToCampaignType</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#createProxiesForAcquisitions">createProxiesForAcquisitions</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#createProxiesForDonationCampaign">createProxiesForDonationCampaign</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#getLatestContractVersion">getLatestContractVersion</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#plasmaOf">plasmaOf</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#setAddressToCampaignType">setAddressToCampaignType</a></li><li><a href="2key_singleton-contracts_TwoKeyFactory.html#setInitialParams">setInitialParams</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="events"><h3>Events</h3><ul><li><div class="item event"><span id="ProxyForCampaign" class="anchor-marker"></span><h4 class="name">ProxyForCampaign</h4><div class="body"><code class="signature">event <strong>ProxyForCampaign</strong><span>(address proxyLogicHandler, address proxyConversionHandler, address proxyAcquisitionCampaign, address proxyPurchasesHandler, address contractor) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyLogicHandler</code> - address</div><div><code>proxyConversionHandler</code> - address</div><div><code>proxyAcquisitionCampaign</code> - address</div><div><code>proxyPurchasesHandler</code> - address</div><div><code>contractor</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="ProxyForDonationCampaign" class="anchor-marker"></span><h4 class="name">ProxyForDonationCampaign</h4><div class="body"><code class="signature">event <strong>ProxyForDonationCampaign</strong><span>(address proxyDonationCampaign, address proxyDonationConversionHandler, address proxyDonationLogicHandler, address contractor) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>proxyDonationCampaign</code> - address</div><div><code>proxyDonationConversionHandler</code> - address</div><div><code>proxyDonationLogicHandler</code> - address</div><div><code>contractor</code> - address</div></dd></dl></div></div></li></ul></div><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="addressToCampaignType" class="anchor-marker"></span><h4 class="name">addressToCampaignType</h4><div class="body"><code class="signature">function <strong>addressToCampaignType</strong><span>(address _key) </span><span>public </span><span>view </span><span>returns  (string) </span></code><hr/><div class="description"><p>Function working as a getter.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_key</code> - is the address of campaign</div></dd><dt><span class="label-return">Returns:</span></dt><dd>string</dd></dl></div></div></li><li><div class="item function"><span id="createProxiesForAcquisitions" class="anchor-marker"></span><h4 class="name">createProxiesForAcquisitions</h4><div class="body"><code class="signature">function <strong>createProxiesForAcquisitions</strong><span>(address[] addresses, uint[] valuesConversion, uint[] valuesLogicHandler, uint[] values, string _currency, string _nonSingletonHash) </span><span>public </span><span>payable </span></code><hr/><div class="description"><p>This function will handle all necessary actions which should be done on the contract in order to make them ready to work. Also, we&#x27;ve been unfortunately forced to use arrays as arguments since the stack is not deep enough to handle this amount of input information since this method handles kick-start of 3 contracts, Function used to deploy all necessary proxy contracts in order to use the campaign.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>addresses</code> - is array of addresses needed [assetContractERC20,moderator]</div><div><code>valuesConversion</code> - is array containing necessary values to start conversion handler contract</div><div><code>valuesLogicHandler</code> - is array of values necessary to start logic handler contract</div><div><code>values</code> - is array containing values necessary to start campaign contract</div><div><code>_currency</code> - is the main currency token price is set</div><div><code>_nonSingletonHash</code> - is the hash of non-singleton contracts active with responding 2key-protocol version at the moment</div></dd></dl></div></div></li><li><div class="item function"><span id="createProxiesForDonationCampaign" class="anchor-marker"></span><h4 class="name">createProxiesForDonationCampaign</h4><div class="body"><code class="signature">function <strong>createProxiesForDonationCampaign</strong><span>(address _moderator, uint[] numberValues, bool[] booleanValues, string _currency, string tokenName, string tokenSymbol, string nonSingletonHash) </span><span>public </span></code><hr/><div class="description"><p>Function to deploy proxy contracts for donation campaigns.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_moderator</code> - address</div><div><code>numberValues</code> - uint[]</div><div><code>booleanValues</code> - bool[]</div><div><code>_currency</code> - string</div><div><code>tokenName</code> - string</div><div><code>tokenSymbol</code> - string</div><div><code>nonSingletonHash</code> - string</div></dd></dl></div></div></li><li><div class="item function"><span id="getLatestContractVersion" class="anchor-marker"></span><h4 class="name">getLatestContractVersion</h4><div class="body"><code class="signature">function <strong>getLatestContractVersion</strong><span>(string contractName) </span><span>internal </span><span>view </span><span>returns  (string) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>contractName</code> - string</div></dd><dt><span class="label-return">Returns:</span></dt><dd>string</dd></dl></div></div></li><li><div class="item function"><span id="plasmaOf" class="anchor-marker"></span><h4 class="name">plasmaOf</h4><div class="body"><code class="signature">function <strong>plasmaOf</strong><span>(address _address) </span><span>internal </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_address</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="setAddressToCampaignType" class="anchor-marker"></span><h4 class="name">setAddressToCampaignType</h4><div class="body"><code class="signature">function <strong>setAddressToCampaignType</strong><span>(address _campaignAddress, string _campaignType) </span><span>internal </span></code><hr/><div class="description"><p>Internal function to set address to campaign type.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaignAddress</code> - is the address of campaign</div><div><code>_campaignType</code> - is the type of campaign (String)</div></dd></dl></div></div></li><li><div class="item function"><span id="setInitialParams" class="anchor-marker"></span><h4 class="name">setInitialParams</h4><div class="body"><code class="signature">function <strong>setInitialParams</strong><span>(address _twoKeySingletonRegistry, address _proxyStorage) </span><span>public </span></code><hr/><div class="description"><p>Function to set initial parameters for the contract.</p></div><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_twoKeySingletonRegistry</code> - is the address of singleton registry contract</div><div><code>_proxyStorage</code> - address</div></dd></dl></div></div></li></ul></div></div></div>