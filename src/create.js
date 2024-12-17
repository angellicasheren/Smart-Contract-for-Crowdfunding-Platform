let web3;
let accounts;
let createCampaignContract;

// ABI dan alamat kontrak (gunakan ABI dan alamat setelah deploy di Ganache)
const createCampaignABI = [
  {
    "inputs": [
      {"internalType": "string", "name": "_title", "type": "string"},
      {"internalType": "string", "name": "_description", "type": "string"},
      {"internalType": "uint256", "name": "_goal", "type": "uint256"},
      {"internalType": "uint256", "name": "_deadline", "type": "uint256"}
    ],
    "name": "createCampaign",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

// Ganti dengan alamat kontrak setelah deploy
const createCampaignAddress = "0xYourContractAddressHere";

// Fungsi untuk menghubungkan MetaMask
async function connectMetaMask() {
    if (window.ethereum) {
        try {
            // Inisialisasi Web3
            web3 = new Web3(window.ethereum);
            await window.ethereum.request({ method: "eth_requestAccounts" });
            accounts = await web3.eth.getAccounts();

            // Inisialisasi kontrak
            createCampaignContract = new web3.eth.Contract(createCampaignABI, createCampaignAddress);

            document.getElementById("connectStatus").textContent = `Connected: ${accounts[0]}`;
            console.log("MetaMask Connected:", accounts[0]);
        } catch (error) {
            console.error("MetaMask connection failed:", error);
            alert("Please allow MetaMask connection to continue.");
        }
    } else {
        alert("MetaMask not detected. Please install MetaMask.");
    }
}

// Fungsi untuk membuat campaign baru
document.getElementById("campaignForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const goal = web3.utils.toWei(document.getElementById("goal").value, "ether"); // Konversi ETH ke Wei
    const deadline = Math.floor(new Date(document.getElementById("deadline").value).getTime() / 1000); // Timestamp

    if (!createCampaignContract) {
        alert("Please connect MetaMask first.");
        return;
    }

    try {
        // Kirim transaksi ke smart contract
        await createCampaignContract.methods.createCampaign(title, description, goal, deadline).send({
            from: accounts[0],
            gas: 3000000
        });

        document.getElementById("successMessage").textContent = "Campaign successfully deployed!";
        console.log("Campaign created successfully!");
    } catch (error) {
        console.error("Error creating campaign:", error);
        alert("Failed to create campaign. Check console for details.");
    }
});

// Panggil koneksi MetaMask saat halaman dimuat
window.addEventListener("load", connectMetaMask);
