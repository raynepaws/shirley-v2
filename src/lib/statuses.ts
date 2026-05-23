import { ActivitiesOptions, PresenceStatusData } from "discord.js";

export type Presence = string | {
  content?: string | (() => string),
  criteria?: () => boolean,
  activities?: ActivitiesOptions[],
  status?: PresenceStatusData
};

export const presences: Presence[] = [
  "dancing in the rain",
  ":3",
  ">w<",
  "meow",
  "hehe",
  "blep",
  {
    content: "yawn",
    criteria: () => {
      const hours = new Date().getHours();
      return hours > 5 && hours < 8
    }
  },
  {
    content: "good morning",
    criteria: () => {
      const hours = new Date().getHours();
      return hours > 5 && hours < 8
    }
  },
  {
    content: "eeping",
    criteria: () => {
      const hours = new Date().getHours();
      return hours <= 5 || hours > 22
    },
    status: "dnd"
  },
  {
    content: () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      if (hours === 0) return `it's 12:${minutes} am`;
      if (hours < 13) return `it's ${hours}:${minutes} am`;
      return `it's ${hours - 12}:${minutes} pm`;
    }
  },
  "yes beans",
  "flan is yummy",
  "hai",
  "hawwo",
  "nya",
  "mreow",
  "meow meow",
  "mrrr",
  "mrrp"
];
