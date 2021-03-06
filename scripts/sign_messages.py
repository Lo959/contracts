# This is a sample Python script.

# Press ⌃R to execute it or replace it with your code.
# Press Double ⇧ to search everywhere for classes, files, tool windows, actions, and settings.
"""
 In order to test this script, in the same directory create ".env-sign" named file, and
 make sure it is following structure:
 ------
 RPC = <RPC>
 PK = <SIGNATORY_PK>
 ------

 Also, make sure to have installed "environs"
 (pip3 install environs)
"""

from web3 import Web3
from eth_account import messages, Account
from environs import Env

import os


def remove_0x(message):
    return message[2:]


def add_leading_0(message):
    while (len(message) < 64):
        message = '0' + message
    return message


def build_messages(user_address, total_rewards_pending_wei, w3):
    message_1 = 'bytes binding user rewards'
    hexed_rewards = str(w3.toHex(total_rewards_pending_wei))
    message_2 = user_address + add_leading_0(remove_0x(hexed_rewards))
    return message_1, message_2


def hash_messages(message1, message2, w3):
    hash1 = w3.solidityKeccak(['string'], [message1])
    hash2 = w3.solidityKeccak(['bytes'], [message2])

    final_hash = w3.solidityKeccak(
        ['bytes32', 'bytes32'],
        [w3.toHex(hash1), w3.toHex(hash2)]
    )

    return remove_0x(str(w3.toHex(final_hash)))


def build_signature(user_address, total_rewards_pending_wei, private_key_signatory, w3):
    message1, message2 = build_messages(user_address, total_rewards_pending_wei, w3)
    final_hash = hash_messages(message1, message2, w3)
    message_to_sign = messages.encode_defunct(hexstr=final_hash)
    signed_message = Account.sign_message(message_to_sign, private_key=private_key_signatory)
    finalize_signature(signed_message.signature.hex())

def finalize_signature(signature):
    n = len(signature)
    ### Take last 2 parts of sig
    v = hex(int(signature[n-2:],16) + 32)
    signature = signature[:n-2] + remove_0x(str(v))
    print("signature =", signature)


if __name__ == '__main__':
    env = Env()
    env.read_env('.env-sign')
    RPC = env('RPC')
    SIGNATORY_PK = env('PK')
    w3 = Web3(Web3.HTTPProvider(RPC))
    build_signature('0x98a206fedc0e0ab0a45cb82a315c94087a79aed7', 24136582388247820000,
                    SIGNATORY_PK, w3)
