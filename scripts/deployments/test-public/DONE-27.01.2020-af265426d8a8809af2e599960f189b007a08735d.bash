#!/usr/bin/env bash

spinner() {
    chars="/-\|"

    for (( j=0; j< $1; j++ )); do
      for (( i=0; i<${#chars}; i++ )); do
        sleep 0.5
        echo -en "${chars:$i:1}" "\r"
      done
    done
}

spinner 2
echo "Generating bytecodes for changes on public network"
echo "Destination for execution: 0xf4797416e6b6835114390591d3ac6a531a061396"
cd ../..

python3 generate_bytecode.py upgradeContract TwoKeyAdmin 1.0.6
python3 generate_bytecode.py upgradeContract TwoKeyEventSource 1.0.6
python3 generate_bytecode.py upgradeContract TwoKeyDeepFreezeTokenPool 1.0.1
python3 generate_bytecode.py approveNewCampaign DONATION 1.0.13
python3 generate_bytecode.py approveNewCampaign TOKEN_SELL 1.0.13
python3 generate_bytecode.py approveNewCampaign CPC_PUBLIC 1.0.16





