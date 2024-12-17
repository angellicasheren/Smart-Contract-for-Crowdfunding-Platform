const Crowdfunding = artifacts.require("Crowdfunding");
const CreateCampaign = artifacts.require("CreateCampaign");

module.exports = async function (deployer) {
  // Deploy Crowdfunding
  await deployer.deploy(Crowdfunding);
  const crowdfunding = await Crowdfunding.deployed();

  // Deploy CreateCampaign
  await deployer.deploy(CreateCampaign);
  const createCampaign = await CreateCampaign.deployed();

  console.log("Crowdfunding deployed at:", crowdfunding.address);
  console.log("CreateCampaign deployed at:", createCampaign.address);
};
