// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Crowdfunding {
    struct Campaign {
        string name;
        string description;
        uint256 goal;
        uint256 totalDonated;
        bool active;
    }

    mapping(uint256 => Campaign) public campaigns;
    uint256 public campaignCount;

    event DonationReceived(uint256 campaignId, address donor, uint256 amount);

    constructor() {
        // Menambahkan kampanye awal
        addCampaign("Pembangunan Sekolah Wilayah XXX", "Membantu membangun sekolah di wilayah yang membutuhkan pendidikan.", 100 ether);
        addCampaign("Pembangunan Tempat Ibadah", "Membangun tempat ibadah untuk komunitas di daerah yang kurang.", 50 ether);
        addCampaign("Donasi Perawatan Teknologi ABC", "Mendukung perawatan dan pembaruan teknologi ABC untuk meningkatkan kualitas hidup.", 30 ether);
    }

    // Fungsi untuk menambah kampanye
    function addCampaign(string memory _name, string memory _description, uint256 _goal) public {
        campaigns[campaignCount] = Campaign({
            name: _name,
            description: _description,
            goal: _goal,
            totalDonated: 0,
            active: true
        });
        campaignCount++;
    }

    // Fungsi untuk mendonasi
    function donate(uint256 _campaignId) public payable {
        require(_campaignId < campaignCount, "Campaign does not exist.");
        require(msg.value > 0, "Donation amount must be greater than zero.");
        require(campaigns[_campaignId].active, "Campaign is not active.");

        campaigns[_campaignId].totalDonated += msg.value;
        emit DonationReceived(_campaignId, msg.sender, msg.value);
    }

    // Fungsi untuk mendapatkan informasi kampanye
    function getCampaign(uint256 _campaignId) public view returns (string memory, string memory, uint256, uint256, bool) {
        require(_campaignId < campaignCount, "Campaign does not exist.");
        Campaign memory campaign = campaigns[_campaignId];
        return (campaign.name, campaign.description, campaign.goal, campaign.totalDonated, campaign.active);
    }
}
