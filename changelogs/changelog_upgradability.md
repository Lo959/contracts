### Changelog after introducing Upgradability 

### Plasma
- Added few more plasma contracts, so the functions stored on them are a bit modified.

#### TwoKeyPlasmaEvents
##### Added:
- getNumberOfVisitsAndJoinsAndForwarders
- getVisitedFrom
- getJoinedFrom
- getVisitsListTimestamps

##### Removed:
- visits
- visited_from
- joined_from
- visited_from_time
- visits_list
- visits_list_timestamps
- visited_sig
- notes
- isMaintainer
- add_plasma2ethereum (Moved to TwoKeyPlasmaEventsRegistry)
- recover
- campaign2numberOfJoins
- campaign2numberOfVisits
- campaign2numberOfForwarders
- public_link_key
- influencer2cut
- plasma2ethereum
- ethereum2plasma
- linkUsernameAndAddress (Moved to TwoKeyPlasmaEventsRegistry)
- Events Plasma2Ethereum & Plasma2Handle


#### TwoKeyPlasmaRegistry
##### Added:
- linkUsernameAndAddress
- add_plasma2ethereum
- plasma2ethereum
- ethereum2plasma
- recover

#### TwoKeyPlasmaMaintainersRegistry
##### Added:
- function onlyMaintainer(address _sender) public view returns (bool);
- function addMaintainers(address [] _maintainers) public;
- function removeMaintainers(address [] _maintainers) public;
- function getAllMaintainers () public view returns (address[]);



### Regular contracts

#### TwoKeyAdmin
- No interface changes

#### TwoKeyCampaignValidator
- No interface changes

#### TwoKeyEventSource
- No interface changes

#### TwoKeyExchangeRateChanges
##### Removed:
- currencyName2rate
- struct ExchangeRate
- getFiatCurrencyDetails

#### TwoKeyFactory
- No interface changes

#### TwoKeyMaintainersRegistry 
- Completely new contract
- function getAllMaintainers () public view returns (address[]);

##### Added:
- `function onlyMaintainer(address _sender) public view returns (bool)`
- `function addMaintainers(address [] _maintainers) public`
- `function removeMaintainers(address [] _maintainers) public`

#### TwoKeyRegistry
##### Temp removed:
- `function deleteUser`

##### TwoKeyUpgradableExchange
- No interface changes