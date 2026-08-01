export type Language = 'en' | 'he';
export type AgeGroup = '5-7' | '8-13' | '13+';
export type Category = 'Geography' | 'Animals' | 'Math' | 'History' | 'Science' | 'Space' | 'GeneralKnowledge' | 'Stories';

export interface Player {
  id: string;
  name: string;
  avatar: string; // Emoji or preset character
  profilePic: string | null; // Base64 image from camera
  ageGroup: AgeGroup;
  score: number;
  gamesPlayed: number;
  badges: string[]; // List of badge IDs
  lastPlayed: string; // Timestamp ISO string
  xp: number; // Experience points
  level: number; // Player level
  answeredQuestions?: string[]; // IDs of questions answered to prevent repeats
}

export interface Question {
  id: string;
  category: Category;
  ageGroup: AgeGroup;
  questionEn: string;
  questionHe: string;
  optionsEn: string[];
  optionsHe: string[];
  answerIndex: number;
  explanationEn: string;
  explanationHe: string;
  hintEn?: string;
  hintHe?: string;
  visualType?: 'stop-sign' | 'yield-sign' | 'no-entry-sign' | 'pedestrian-sign' | 'traffic-light-sign' | 'bicycle-sign' | 'puzzle-piece' | 'count-shapes' | 'odd-one-out' | 'pattern-complete' | 'shadow-match' | 'speed-limit-50-sign' | 'no-u-turn-sign' | 'roundabout-sign' | 'slippery-road-sign' | 'train-crossing-sign' | 'parking-sign' | 'school-zone-sign' | 'no-parking-sign' | 'one-way-sign';
}

export interface Badge {
  id: string;
  titleEn: string;
  titleHe: string;
  descriptionEn: string;
  descriptionHe: string;
  icon: string; // Lucide icon name or emoji
  color: string; // Tailwind class color
}

export interface QuizState {
  category: Category | 'All';
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  answers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
  isFinished: boolean;
}
