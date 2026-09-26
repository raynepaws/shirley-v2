import { ActivitiesOptions, ActivityType, PresenceStatusData } from "discord.js";
import { client } from "./index.js";

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
  "blep",
  {
    content: "yawn",
    criteria: () => {
      const hours = new Date().getHours();
      return hours > 5 && hours < 8
    },
    status: "idle"
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
  "mrrr",
  "what's updog",
  "woof",
  "channeling my inner cloud",
  "bark arf ruff",
  "shocking",
  {
    criteria: () => Math.random() > 0.9999,
    content: "super rare"
  },
  "choo choo chaos",
  "unicorns and rainbows",
  "nitrobolt",
  "warp",
  "why do they call it oven when you of in the cold food of out hot eat the food",
  ":rayne_wag:",
  "oatmeal",
  "what's joe",
  "aDo not nelon that",
  "do j",
  "goganon",
  "youre a calibri knockoff",
  "do your eyes support jpg export?",
  "watch .3. y-y-yo tonye :3 mf",
  "shut up before i open a nature valley bar on your bed",
  "that's it rayne",
  "keeping it quirktastic",
  "MOV?? No",
  "Are you keeping it skibidi and rizztastic",
  "I didn't know you were freaky like that rayne",
  "bouncy balls that give money on impact against the floor incremental",
  "shimp",
  "the forbidden granola",
  "no more toe",
  "all the a",
  "hai eiza",
  "Warning: Supplying \"ephemeral\" for interaction response options is deprecated. Utilize flags instead.",
  "naahhhh what's mystery Michael doing???? 💀☠️☠️☠️☠️☠️☠️",
  "I'm not a number so",
  "bet that's mod-furry-roleplay",
  "command received, shooting mater. 🔫 splish splash",
  "CEO | Scratch Coders® 👑",
  "it's not MaterArc without the usual out of context mistakes!",
  "holy lols i say lol a lot lol",
  "I just need to debug the debugger",
  "Fifth place: with one vote",
  "This week, 0 people chatted, and 0 people were active. Altogether, people gained 0 XP this week.",
  "<function=text2img{\"prompt\": \"a Scrubby robot with a broken brain\", \"size\": \"landscape_16_9\"}</function>",
  "I like icecream because if i didnt then i wouldnt Ate it"
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
