// Inisialisasi Web3 menggunakan MetaMask
async function initializeWeb3() {
    if (window.ethereum) {
        try {
            // Minta izin akses ke akun MetaMask
            await window.ethereum.request({ method: "eth_requestAccounts" });
            window.web3 = new Web3(window.ethereum);
            console.log("MetaMask terhubung.");
        } catch (error) {
            console.error("Akses MetaMask ditolak oleh pengguna:", error);
            alert("Harap izinkan akses MetaMask untuk melanjutkan.");
        }
    } else {
        alert("MetaMask tidak terdeteksi. Silakan instal MetaMask terlebih dahulu.");
    }
}

// Alamat kontrak dan ABI
const contractAddress = "0x1234567890abcdef1234567890abcdef12345678"; // Ganti dengan alamat kontrak yang valid
const abi = [
    {
        "constant": false,
        "inputs": [{ "name": "_campaignId", "type": "uint256" }],
        "name": "donate",
        "outputs": [],
        "payable": true,
        "stateMutability": "payable",
        "type": "function"
    },
    // Tambahkan fungsi lainnya dari ABI di sini
        {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "campaignId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "address",
          "name": "donor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "DonationReceived",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "campaignCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "campaigns",
      "outputs": [
        {
          "internalType": "string",
          "name": "name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "goal",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "totalDonated",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "active",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_name",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_description",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_goal",
          "type": "uint256"
        }
      ],
      "name": "addCampaign",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_campaignId",
          "type": "uint256"
        }
      ],
      "name": "donate",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function",
      "payable": true
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_campaignId",
          "type": "uint256"
        }
      ],
      "name": "getCampaign",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function",
      "constant": true
    }
];

// Inisialisasi kontrak
let contract;
async function loadContract() {
    await initializeWeb3();
    const web3 = window.web3;
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log("Kontrak berhasil dimuat.");
}

// Fungsi untuk mendonasi
async function donateToCampaign(campaignId, inputId) {
    try {
        // Pastikan kontrak telah dimuat
        if (!contract) {
            alert("Kontrak belum dimuat. Harap refresh halaman.");
            return;
        }

        // Ambil jumlah ETH dari input field
        const ethAmount = document.getElementById(inputId).value;
        if (!ethAmount || parseFloat(ethAmount) <= 0) {
            alert("Harap masukkan jumlah ETH yang valid.");
            return;
        }

        // Konversi ETH ke Wei
        const amountToDonate = window.web3.utils.toWei(ethAmount, "ether");

        // Ambil akun MetaMask
        const accounts = await window.ethereum.request({ method: "eth_accounts" });
        const userAccount = accounts[0];

        // Kirim transaksi donasi
        await contract.methods.donate(campaignId).send({
            from: userAccount,
            value: amountToDonate
        });

        alert(`Donasi sebesar ${ethAmount} ETH berhasil!`);
    } catch (error) {
        console.error("Error saat donasi:", error);
        alert("Transaksi gagal. Pastikan saldo mencukupi dan MetaMask terhubung.");
    }
}

// Muat kontrak saat halaman dimuat
window.addEventListener("load", () => {
    loadContract();
});
