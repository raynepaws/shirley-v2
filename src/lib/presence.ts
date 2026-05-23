import { ActivitiesOptions, ActivityType, PresenceStatusData } from "discord.js";
import { client } from "./client.js";

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

export const setPresence = () => {
  let presence: Presence;
  let matchesCriteria;
  do {
    presence = presences[Math.floor(Math.random() * presences.length)];
    matchesCriteria = typeof presence === "string" || !presence.criteria || presence.criteria();
  } while (!matchesCriteria)
  let activities = typeof presence === "string" ? [] : presence.activities ?? [];
  if (typeof presence === "string" || (typeof presence === "object" && presence.content)) activities.push({
    name: typeof presence === "string" ? presence : typeof presence.content === "function" ? presence.content() : presence.content!,
    type: ActivityType.Custom
  });
  client.user?.setPresence({
    activities,
    status: typeof presence === "string" ? "online" : presence.status ?? "online"
  })
};
