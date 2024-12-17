// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract CreateCampaign {
    struct Campaign {
        string title;
        string description;
        uint256 goal; // Target dana (eth)
        uint256 deadline; // Tanggal akhir (timestamp)
        address owner; // Pemilik campaign
        uint256 amountCollected; // Total dana terkumpul
    }

    Campaign[] public campaigns;

    event CampaignCreated(
        uint256 campaignId,
        string title,
        uint256 goal,
        uint256 deadline,
        address indexed owner
    );

    function createCampaign(
        string memory _title,
        string memory _description,
        uint256 _goal,
        uint256 _deadline
    ) public {
        require(_deadline > block.timestamp, "Deadline must be in the future");
        require(_goal > 0, "Goal must be greater than 0");

        campaigns.push(
            Campaign({
                title: _title,
                description: _description,
                goal: _goal,
                deadline: _deadline,
                owner: msg.sender,
                amountCollected: 0
            })
        );

        emit CampaignCreated(campaigns.length - 1, _title, _goal, _deadline, msg.sender);
    }

    function getCampaign(uint256 _campaignId)
        public
        view
        returns (string memory, string memory, uint256, uint256, uint256, address)
    {
        Campaign memory c = campaigns[_campaignId];
        return (c.title, c.description, c.goal, c.amountCollected, c.deadline, c.owner);
    }

    function getCampaignCount() public view returns (uint256) {
        return campaigns.length;
    }
}
