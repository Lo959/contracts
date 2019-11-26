---
id: 2key_singleton-contracts_TwoKeyPlasmaEvents
title: TwoKeyPlasmaEvents
---

<div class="contract-doc"><div class="contract"><h2 class="contract-header"><span class="contract-kind">contract</span> TwoKeyPlasmaEvents</h2><p class="base-contracts"><span>is</span> <a href="2key_upgradability_Upgradeable.html">Upgradeable</a></p><div class="source">Source: <a href="https://github.com/2keynet/web3-alpha/blob/v0.0.3/contracts/2key/singleton-contracts/TwoKeyPlasmaEvents.sol" target="_blank">contracts/2key/singleton-contracts/TwoKeyPlasmaEvents.sol</a></div></div><div class="index"><h2>Index</h2><ul><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#Plasma2Ethereum">Plasma2Ethereum</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#Plasma2Handle">Plasma2Handle</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#Visited">Visited</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#cutOf">cutOf</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#emitPlasma2EthereumEvent">emitPlasma2EthereumEvent</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#emitPlasma2HandleEvent">emitPlasma2HandleEvent</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#ethereumOf">ethereumOf</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getAddressFromTwoKeySingletonRegistry">getAddressFromTwoKeySingletonRegistry</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getCampaignToReferrerToCounted">getCampaignToReferrerToCounted</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getJoinedFrom">getJoinedFrom</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getNumberOfVisitsAndJoinsAndForwarders">getNumberOfVisitsAndJoinsAndForwarders</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getVisitedFrom">getVisitedFrom</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getVisits">getVisits</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getVisitsList">getVisitsList</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#getVisitsListTimestamps">getVisitsListTimestamps</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#incrementNumberOfVisitsPerCampaign">incrementNumberOfVisitsPerCampaign</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#joinCampaign">joinCampaign</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#notes">notes</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#onlyMaintainer">onlyMaintainer</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#onlyTwoKeyPlasmaRegistry">onlyTwoKeyPlasmaRegistry</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#plasmaOf">plasmaOf</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#publicLinkKeyOf">publicLinkKeyOf</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setCampaignToReferrerToCounted">setCampaignToReferrerToCounted</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setCut">setCut</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setCutOf">setCutOf</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setInitialParams">setInitialParams</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setJoinedFrom">setJoinedFrom</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setNoteByUser">setNoteByUser</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setPublicLinkKey">setPublicLinkKey</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisitedFrom">setVisitedFrom</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisitedFromTime">setVisitedFromTime</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisitedSig">setVisitedSig</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisits">setVisits</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisitsList">setVisitsList</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#setVisitsListTimestamps">setVisitsListTimestamps</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#visited">visited</a></li><li><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#visitsListEx">visitsListEx</a></li></ul></div><div class="reference"><h2>Reference</h2><div class="events"><h3>Events</h3><ul><li><div class="item event"><span id="Plasma2Ethereum" class="anchor-marker"></span><h4 class="name">Plasma2Ethereum</h4><div class="body"><code class="signature">event <strong>Plasma2Ethereum</strong><span>(address plasma, address eth) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>plasma</code> - address</div><div><code>eth</code> - address</div></dd></dl></div></div></li><li><div class="item event"><span id="Plasma2Handle" class="anchor-marker"></span><h4 class="name">Plasma2Handle</h4><div class="body"><code class="signature">event <strong>Plasma2Handle</strong><span>(address plasma, string handle) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>plasma</code> - address</div><div><code>handle</code> - string</div></dd></dl></div></div></li><li><div class="item event"><span id="Visited" class="anchor-marker"></span><h4 class="name">Visited</h4><div class="body"><code class="signature">event <strong>Visited</strong><span>(address to, address c, address contractor, address from) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>to</code> - address</div><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>from</code> - address</div></dd></dl></div></div></li></ul></div><div class="modifiers"><h3>Modifiers</h3><ul><li><div class="item modifier"><span id="onlyTwoKeyPlasmaRegistry" class="anchor-marker"></span><h4 class="name">onlyTwoKeyPlasmaRegistry</h4><div class="body"><code class="signature">modifier <strong>onlyTwoKeyPlasmaRegistry</strong><span>() </span></code><hr/></div></div></li></ul></div><div class="functions"><h3>Functions</h3><ul><li><div class="item function"><span id="cutOf" class="anchor-marker"></span><h4 class="name">cutOf</h4><div class="body"><code class="signature">function <strong>cutOf</strong><span>(address c, address contractor, address me) </span><span>public </span><span>view </span><span>returns  (uint256) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>me</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint256</dd></dl></div></div></li><li><div class="item function"><span id="emitPlasma2EthereumEvent" class="anchor-marker"></span><h4 class="name">emitPlasma2EthereumEvent</h4><div class="body"><code class="signature">function <strong>emitPlasma2EthereumEvent</strong><span>(address _plasma, address _ethereum) </span><span>public </span></code><hr/><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#onlyTwoKeyPlasmaRegistry">onlyTwoKeyPlasmaRegistry </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_plasma</code> - address</div><div><code>_ethereum</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="emitPlasma2HandleEvent" class="anchor-marker"></span><h4 class="name">emitPlasma2HandleEvent</h4><div class="body"><code class="signature">function <strong>emitPlasma2HandleEvent</strong><span>(address _plasma, string _handle) </span><span>public </span></code><hr/><dl><dt><span class="label-modifiers">Modifiers:</span></dt><dd><a href="2key_singleton-contracts_TwoKeyPlasmaEvents.html#onlyTwoKeyPlasmaRegistry">onlyTwoKeyPlasmaRegistry </a></dd><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_plasma</code> - address</div><div><code>_handle</code> - string</div></dd></dl></div></div></li><li><div class="item function"><span id="ethereumOf" class="anchor-marker"></span><h4 class="name">ethereumOf</h4><div class="body"><code class="signature">function <strong>ethereumOf</strong><span>(address me) </span><span>internal </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>me</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="getAddressFromTwoKeySingletonRegistry" class="anchor-marker"></span><h4 class="name">getAddressFromTwoKeySingletonRegistry</h4><div class="body"><code class="signature">function <strong>getAddressFromTwoKeySingletonRegistry</strong><span>(string contractName) </span><span>internal </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>contractName</code> - string</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="getCampaignToReferrerToCounted" class="anchor-marker"></span><h4 class="name">getCampaignToReferrerToCounted</h4><div class="body"><code class="signature">function <strong>getCampaignToReferrerToCounted</strong><span>(address campaign, address influencer) </span><span>internal </span><span>view </span><span>returns  (bool) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div><div><code>influencer</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bool</dd></dl></div></div></li><li><div class="item function"><span id="getJoinedFrom" class="anchor-marker"></span><h4 class="name">getJoinedFrom</h4><div class="body"><code class="signature">function <strong>getJoinedFrom</strong><span>(address _c, address _contractor, address _address) </span><span>public </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_address</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="getNumberOfVisitsAndJoinsAndForwarders" class="anchor-marker"></span><h4 class="name">getNumberOfVisitsAndJoinsAndForwarders</h4><div class="body"><code class="signature">function <strong>getNumberOfVisitsAndJoinsAndForwarders</strong><span>(address campaignAddress) </span><span>public </span><span>view </span><span>returns  (uint, uint, uint) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaignAddress</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint</dd><dd>uint</dd><dd>uint</dd></dl></div></div></li><li><div class="item function"><span id="getVisitedFrom" class="anchor-marker"></span><h4 class="name">getVisitedFrom</h4><div class="body"><code class="signature">function <strong>getVisitedFrom</strong><span>(address c, address contractor, address _address) </span><span>public </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>_address</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="getVisits" class="anchor-marker"></span><h4 class="name">getVisits</h4><div class="body"><code class="signature">function <strong>getVisits</strong><span>(address campaign, address contractor, address old_address, address new_address) </span><span>internal </span><span>view </span><span>returns  (bool) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div><div><code>contractor</code> - address</div><div><code>old_address</code> - address</div><div><code>new_address</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bool</dd></dl></div></div></li><li><div class="item function"><span id="getVisitsList" class="anchor-marker"></span><h4 class="name">getVisitsList</h4><div class="body"><code class="signature">function <strong>getVisitsList</strong><span>(address _c, address _contractor, address _referrer) </span><span>internal </span><span>view </span><span>returns  (address[]) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_referrer</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address[]</dd></dl></div></div></li><li><div class="item function"><span id="getVisitsListTimestamps" class="anchor-marker"></span><h4 class="name">getVisitsListTimestamps</h4><div class="body"><code class="signature">function <strong>getVisitsListTimestamps</strong><span>(address _c, address _contractor, address _referrer) </span><span>public </span><span>view </span><span>returns  (uint[]) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_referrer</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>uint[]</dd></dl></div></div></li><li><div class="item function"><span id="incrementNumberOfVisitsPerCampaign" class="anchor-marker"></span><h4 class="name">incrementNumberOfVisitsPerCampaign</h4><div class="body"><code class="signature">function <strong>incrementNumberOfVisitsPerCampaign</strong><span>(address campaign) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="joinCampaign" class="anchor-marker"></span><h4 class="name">joinCampaign</h4><div class="body"><code class="signature">function <strong>joinCampaign</strong><span>(address campaignAddress, address contractor, bytes sig) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaignAddress</code> - address</div><div><code>contractor</code> - address</div><div><code>sig</code> - bytes</div></dd></dl></div></div></li><li><div class="item function"><span id="notes" class="anchor-marker"></span><h4 class="name">notes</h4><div class="body"><code class="signature">function <strong>notes</strong><span>(address c, address _plasma) </span><span>public </span><span>view </span><span>returns  (bytes) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>_plasma</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>bytes</dd></dl></div></div></li><li><div class="item function"><span id="onlyMaintainer" class="anchor-marker"></span><h4 class="name">onlyMaintainer</h4><div class="body"><code class="signature">function <strong>onlyMaintainer</strong><span>() </span><span>internal </span><span>view </span><span>returns  (bool) </span></code><hr/><dl><dt><span class="label-return">Returns:</span></dt><dd>bool</dd></dl></div></div></li><li><div class="item function"><span id="plasmaOf" class="anchor-marker"></span><h4 class="name">plasmaOf</h4><div class="body"><code class="signature">function <strong>plasmaOf</strong><span>(address me) </span><span>internal </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>me</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="publicLinkKeyOf" class="anchor-marker"></span><h4 class="name">publicLinkKeyOf</h4><div class="body"><code class="signature">function <strong>publicLinkKeyOf</strong><span>(address c, address contractor, address me) </span><span>public </span><span>view </span><span>returns  (address) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>me</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address</dd></dl></div></div></li><li><div class="item function"><span id="setCampaignToReferrerToCounted" class="anchor-marker"></span><h4 class="name">setCampaignToReferrerToCounted</h4><div class="body"><code class="signature">function <strong>setCampaignToReferrerToCounted</strong><span>(address campaign, address influencer) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div><div><code>influencer</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setCut" class="anchor-marker"></span><h4 class="name">setCut</h4><div class="body"><code class="signature">function <strong>setCut</strong><span>(address c, address contractor, uint256 cut) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>cut</code> - uint256</div></dd></dl></div></div></li><li><div class="item function"><span id="setCutOf" class="anchor-marker"></span><h4 class="name">setCutOf</h4><div class="body"><code class="signature">function <strong>setCutOf</strong><span>(address c, address contractor, address me, uint256 cut) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>me</code> - address</div><div><code>cut</code> - uint256</div></dd></dl></div></div></li><li><div class="item function"><span id="setInitialParams" class="anchor-marker"></span><h4 class="name">setInitialParams</h4><div class="body"><code class="signature">function <strong>setInitialParams</strong><span>(address _twoKeyPlasmaSingletonRegistry, address _proxyStorage) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_twoKeyPlasmaSingletonRegistry</code> - address</div><div><code>_proxyStorage</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setJoinedFrom" class="anchor-marker"></span><h4 class="name">setJoinedFrom</h4><div class="body"><code class="signature">function <strong>setJoinedFrom</strong><span>(address _c, address _contractor, address _old_address, address _new_address) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_old_address</code> - address</div><div><code>_new_address</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setNoteByUser" class="anchor-marker"></span><h4 class="name">setNoteByUser</h4><div class="body"><code class="signature">function <strong>setNoteByUser</strong><span>(address c, bytes note) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>note</code> - bytes</div></dd></dl></div></div></li><li><div class="item function"><span id="setPublicLinkKey" class="anchor-marker"></span><h4 class="name">setPublicLinkKey</h4><div class="body"><code class="signature">function <strong>setPublicLinkKey</strong><span>(address c, address contractor, address new_public_key) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>new_public_key</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisitedFrom" class="anchor-marker"></span><h4 class="name">setVisitedFrom</h4><div class="body"><code class="signature">function <strong>setVisitedFrom</strong><span>(address c, address contractor, address _oldAddress, address _newAddress) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>_oldAddress</code> - address</div><div><code>_newAddress</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisitedFromTime" class="anchor-marker"></span><h4 class="name">setVisitedFromTime</h4><div class="body"><code class="signature">function <strong>setVisitedFromTime</strong><span>(address campaign, address contractor, address new_address, address old_address) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div><div><code>contractor</code> - address</div><div><code>new_address</code> - address</div><div><code>old_address</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisitedSig" class="anchor-marker"></span><h4 class="name">setVisitedSig</h4><div class="body"><code class="signature">function <strong>setVisitedSig</strong><span>(address _campaign, address _contractor, address _last_address, bytes _sig) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_campaign</code> - address</div><div><code>_contractor</code> - address</div><div><code>_last_address</code> - address</div><div><code>_sig</code> - bytes</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisits" class="anchor-marker"></span><h4 class="name">setVisits</h4><div class="body"><code class="signature">function <strong>setVisits</strong><span>(address campaign, address contractor, address old_address, address new_address) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>campaign</code> - address</div><div><code>contractor</code> - address</div><div><code>old_address</code> - address</div><div><code>new_address</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisitsList" class="anchor-marker"></span><h4 class="name">setVisitsList</h4><div class="body"><code class="signature">function <strong>setVisitsList</strong><span>(address _c, address _contractor, address _referrer, address _visitor) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_referrer</code> - address</div><div><code>_visitor</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="setVisitsListTimestamps" class="anchor-marker"></span><h4 class="name">setVisitsListTimestamps</h4><div class="body"><code class="signature">function <strong>setVisitsListTimestamps</strong><span>(address _c, address _contractor, address _referrer) </span><span>internal </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>_c</code> - address</div><div><code>_contractor</code> - address</div><div><code>_referrer</code> - address</div></dd></dl></div></div></li><li><div class="item function"><span id="visited" class="anchor-marker"></span><h4 class="name">visited</h4><div class="body"><code class="signature">function <strong>visited</strong><span>(address c, address contractor, bytes sig) </span><span>public </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>sig</code> - bytes</div></dd></dl></div></div></li><li><div class="item function"><span id="visitsListEx" class="anchor-marker"></span><h4 class="name">visitsListEx</h4><div class="body"><code class="signature">function <strong>visitsListEx</strong><span>(address c, address contractor, address from) </span><span>public </span><span>view </span><span>returns  (address[], uint[]) </span></code><hr/><dl><dt><span class="label-parameters">Parameters:</span></dt><dd><div><code>c</code> - address</div><div><code>contractor</code> - address</div><div><code>from</code> - address</div></dd><dt><span class="label-return">Returns:</span></dt><dd>address[]</dd><dd>uint[]</dd></dl></div></div></li></ul></div></div></div>