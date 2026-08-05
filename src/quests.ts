import { AgeGroup } from './types';

export type QuestType = 'color' | 'expression' | 'letter-number' | 'object';

export interface CameraQuest {
  id: string;
  type: QuestType;
  ageGroups: AgeGroup[];
  promptEn: string;
  promptHe: string;
  points: number;
}

export const CAMERA_QUESTS: CameraQuest[] = [
  // --- COLORS ---
  {
    id: 'color-red',
    type: 'color',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find something red!',
    promptHe: 'מצאו משהו בצבע אדום!',
    points: 50
  },
  {
    id: 'color-blue',
    type: 'color',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find something blue!',
    promptHe: 'מצאו משהו בצבע כחול!',
    points: 50
  },
  {
    id: 'color-green',
    type: 'color',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find something green!',
    promptHe: 'מצאו משהו בצבע ירוק!',
    points: 50
  },
  {
    id: 'color-yellow',
    type: 'color',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find something yellow!',
    promptHe: 'מצאו משהו בצבע צהוב!',
    points: 50
  },
  {
    id: 'color-orange',
    type: 'color',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find something orange!',
    promptHe: 'מצאו משהו בצבע כתום!',
    points: 60
  },
  {
    id: 'color-purple',
    type: 'color',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find something purple!',
    promptHe: 'מצאו משהו בצבע סגול!',
    points: 60
  },

  // --- EXPRESSIONS (SELFIES) ---
  {
    id: 'selfie-happy',
    type: 'expression',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Take a selfie showing a big happy smile! 😄',
    promptHe: 'צלמו סלפי של פרצוף שמח עם חיוך רחב! 😄',
    points: 80
  },
  {
    id: 'selfie-surprised',
    type: 'expression',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Take a selfie with a surprised look! 😮',
    promptHe: 'צלמו סלפי של פרצוף מופתע מאוד! 😮',
    points: 80
  },
  {
    id: 'selfie-funny',
    type: 'expression',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Take a selfie making a funny silly face! 😜',
    promptHe: 'צלמו סלפי של פרצוף מצחיק ומשעשע! 😜',
    points: 80
  },
  {
    id: 'selfie-wink',
    type: 'expression',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Take a selfie showing a cool winking face! 😉',
    promptHe: 'צלמו סלפי של פרצוף קורץ בצורה מגניבה! 😉',
    points: 90
  },

  // --- LETTERS AND NUMBERS ---
  {
    id: 'find-letter-a',
    type: 'letter-number',
    ageGroups: ['8-13', '13+'],
    promptEn: "Find the letter 'A' or 'א'!",
    promptHe: "מצאו את האות א' או את האות A!",
    points: 100
  },
  {
    id: 'find-letter-m',
    type: 'letter-number',
    ageGroups: ['8-13', '13+'],
    promptEn: "Find the letter 'M' or 'מ'!",
    promptHe: "מצאו את האות מ' או את האות M!",
    points: 100
  },
  {
    id: 'find-number-5',
    type: 'letter-number',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: "Find the number '5'!",
    promptHe: "מצאו את הספרה 5!",
    points: 100
  },
  {
    id: 'find-number-8',
    type: 'letter-number',
    ageGroups: ['8-13', '13+'],
    promptEn: "Find the number '8'!",
    promptHe: "מצאו את הספרה 8!",
    points: 100
  },

  // --- OBJECTS ---
  {
    id: 'find-book',
    type: 'object',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find a book! 📖',
    promptHe: 'מצאו ספר קריאה או לימוד! 📖',
    points: 70
  },
  {
    id: 'find-cup',
    type: 'object',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find a cup or a glass! 🥛',
    promptHe: 'מצאו כוס או ספל! 🥛',
    points: 70
  },
  {
    id: 'find-toy',
    type: 'object',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find a toy or a doll! 🧸',
    promptHe: 'מצאו צעצוע או בובה! 🧸',
    points: 70
  },
  {
    id: 'find-shoe',
    type: 'object',
    ageGroups: ['5-7', '8-13', '13+'],
    promptEn: 'Find a shoe or a slipper! 👟',
    promptHe: 'מצאו נעל או נעל בית! 👟',
    points: 70
  },
  {
    id: 'find-spoon',
    type: 'object',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find a spoon or a fork! 🥄',
    promptHe: 'מצאו כפית, כף או מזלג! 🥄',
    points: 80
  },
  {
    id: 'find-key',
    type: 'object',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find a key! 🔑',
    promptHe: 'מצאו מפתח! 🔑',
    points: 90
  },
  {
    id: 'find-plant',
    type: 'object',
    ageGroups: ['8-13', '13+'],
    promptEn: 'Find a plant or a flower! 🌸',
    promptHe: 'מצאו עציץ, צמח או פרח! 🌸',
    points: 80
  }
];
