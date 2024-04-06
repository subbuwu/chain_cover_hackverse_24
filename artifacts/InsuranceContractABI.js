export const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "getPolicies",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "policyName",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "premiumPaid",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "coverageAmount",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "address",
						"name": "from",
						"type": "address"
					}
				],
				"internalType": "struct Insurance.Policy[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "policyName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "coverageAmount",
				"type": "string"
			}
		],
		"name": "purchasePolicy",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	}
]