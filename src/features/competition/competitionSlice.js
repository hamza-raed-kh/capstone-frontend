import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: 1,
  title: "InnovateX Challenge",
  type: "Hackathon",
  banner: "https://picsum.photos/seed/comp1/1200/400",
  host: {
    id: 1,
    name: "Omar Khaled",
    avatar: "https://i.pravatar.cc/150?u=omar",
  },
  status: "open",
  publicity: "public",
  reward: "$5,000 Grand Prize",
  maxParticipants: 100,
  currentParticipants: 47,
  teamSpec: { min: 2, max: 4 },
  location: "",
  description:
    "A premier competition bringing together the brightest minds to solve real-world challenges. Participants will collaborate, innovate, and present their solutions to a panel of industry experts.",
  startDate: "2026-06-01",
  endDate: "2026-08-15",
  tags: ["AI", "Web Dev", "UI/UX", "Mobile"],
  announcements: [
    { date: "2026-05-01", message: "Competition registration is now open! Early bird discounts available until May 15th." },
    { date: "2026-05-10", message: "Workshop schedule has been posted. All participants are encouraged to attend the kickoff webinar on June 1st." },
    { date: "2026-05-20", message: "Judging panel announced: industry experts from Google, Meta, and Microsoft will be evaluating submissions." },
    { date: "2026-06-01", message: "Competition officially starts today! Check your dashboard for your team assignment and initial challenges." },
  ],
  faq: [
    { question: "Who can participate in this competition?", answer: "The competition is open to all university students and recent graduates (within 2 years of graduation). Participants must be at least 18 years old and enrolled in or graduated from an accredited institution." },
    { question: "How are teams formed?", answer: "Participants can register as individuals or as pre-formed teams of 2-4 members. Individual participants will be matched with other individuals based on their skills and preferences during the first week of registration." },
    { question: "What is the time commitment required?", answer: "The competition runs for 10 weeks with an estimated commitment of 10-15 hours per week. This includes weekly workshops, mentorship sessions, and project development time." },
    { question: "How will submissions be evaluated?", answer: "Submissions will be evaluated based on innovation (30%), technical implementation (30%), impact (20%), and presentation (20%). Detailed rubrics will be provided for each phase of the competition." },
    { question: "Are there any prizes for runners-up?", answer: "Yes! In addition to the grand prize, we have prizes for second place ($2,000), third place ($1,000), and category-specific awards including Best Innovation and People's Choice award." },
  ],
  invitedUsers: [
    { username: "Ahmed" },
    { username: "Sara" },
  ],
};

const competitionSlice = createSlice({
  name: "competition",
  initialState,
  reducers: {
    setCompetition: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetCompetition: () => initialState,
    addInvitedUser: (state, action) => {
      if (!state.invitedUsers.find(u => u.username === action.payload.username)) {
        state.invitedUsers.push(action.payload);
      }
    },
    removeInvitedUser: (state, action) => {
      state.invitedUsers = state.invitedUsers.filter(u => u.username !== action.payload);
    },
  },
});

export const { setCompetition, resetCompetition, addInvitedUser, removeInvitedUser } = competitionSlice.actions;

export const selectCompetition = (state) => state.competition;
export const selectCompetitionTitle = (state) => state.competition.title;
export const selectCompetitionBanner = (state) => state.competition.banner;
export const selectCompetitionHost = (state) => state.competition.host;
export const selectCompetitionStatus = (state) => state.competition.status;
export const selectCompetitionPublicity = (state) => state.competition.publicity;
export const selectCompetitionReward = (state) => state.competition.reward;
export const selectCompetitionParticipants = (state) => ({
  current: state.competition.currentParticipants,
  max: state.competition.maxParticipants,
});
export const selectCompetitionTeamSpec = (state) => state.competition.teamSpec;
export const selectCompetitionLocation = (state) => state.competition.location;
export const selectCompetitionDescription = (state) => state.competition.description;
export const selectCompetitionType = (state) => state.competition.type;
export const selectCompetitionDates = (state) => ({
  start: state.competition.startDate,
  end: state.competition.endDate,
});
export const selectCompetitionTags = (state) => state.competition.tags;
export const selectCompetitionAnnouncements = (state) => state.competition.announcements;
export const selectCompetitionFaq = (state) => state.competition.faq;
export const selectInvitedUsers = (state) => state.competition.invitedUsers;

export default competitionSlice.reducer;
