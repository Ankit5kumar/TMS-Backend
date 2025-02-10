const Team = require("../models/Team");
const User = require("../models/User");

const TeamCreation = async (req, res) => {
  const { members, manager } = req.body;
  try {
    let team  = await Team.findOne({manager});
     if(team){
      const newMembers = members.filter((member) => !team.members.includes(member));
      console.log("newMembers", newMembers);
      team.members.push(...newMembers);
      await team.save();
      return res.status(200).json({ msg: "Team updated", team });
     }else{
      team = await Team.create({ members, manager });
      return res.status(201).json({ msg: "Team created", team });
     }
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "internal server error", error });
  }
};

const getTeam = async (req, res) => {
  const managerid = req.user.id;
  try {
    const team = await Team.findOne({ manager: managerid });
    
    if (!team) {
      return res.status(404).json({ msg: "Team not found" });
    }

    const members = await User.find({ _id: { $in: team.members } });

    return res.status(200).json({ msg: "This is your Team", team, members });
  } catch (error) {
    console.error("Error fetching team:", error);
    return res.status(500).json({ msg: "Internal server error", error: error.message });
  }
};

module.exports = {
  TeamCreation,
  getTeam,
};
