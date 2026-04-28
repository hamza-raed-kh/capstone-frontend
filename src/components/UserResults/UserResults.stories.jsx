import UserResults from "./UserResults";

/**
 * Storybook configuration for the `userresults` component.
 * This file defines the stories for the `userresults` component, which are used to
 * visualize and test the component in isolation. Each story represents a different
 * state or variation of the component.
 *
 * @type {import('@storybook/react').Meta}
 */
export default {
    title: "Components/UserResults",
    component: UserResults,
}

/**
 * The search variant of the `UserResults` component.
 *
 * @type {import('@storybook/react').StoryObj}
 */
export const Basic = {
  args: {
    userlists: [
        {
          icon: '', 
          title: 'Invited', 
          category: '', 
          userrecords: [
            {
              variant: "invited",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "invited",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "invited",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "invited",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
          ],
        },
        {
          icon: '', 
          title: 'Banned', 
          category: '', 
          userrecords: [
            {
              variant: "banned",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "banned",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "banned",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
            {
              variant: "banned",
              avatar: "https://search.beastfly.win/image_proxy?url=https%3A%2F%2Fimgs.search.brave.com%2FhnQ7lLSxa7xnk1DpWsDAFdSYVQLnjb7yvJoewqqY0A4%2Frs%3Afit%3A500%3A0%3A1%3A0%2Fg%3Ace%2FaHR0cHM6Ly9zaG9w%2FLnJveWFsYXJhYmlh%2FbnMuY29tL2Nkbi9z%2FaG9wL2ZpbGVzL2dh%2FemFsLWFsLXNoYXFh%2FYi0wMS5qcGc_dj0x%2FNzExMTQ0NTIyJndp%2FZHRoPTE5NDY&h=71e621cb5ee255464f3a58550b8e7e77233f06862f8af1687ec1973cda9fd8c4",
              username: "Simon",
            },
          ],
        },
    ]
  },
};