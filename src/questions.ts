import { Question, Badge } from './types';
import { GK_5_7_QUESTIONS } from './gk_5_7';
import { GK_8_13_QUESTIONS } from './gk_8_13';
import { GK_13_PLUS_QUESTIONS } from './gk_13_plus';
import { STORIES_QUESTIONS } from './stories';

export const BADGES: Badge[] = [
  {
    id: 'first-step',
    titleEn: 'First Step',
    titleHe: 'צעד ראשון',
    descriptionEn: 'Completed your very first quiz!',
    descriptionHe: 'השלמת את החידון הראשון שלך!',
    icon: '🚀',
    color: 'bg-blue-500 text-white border-blue-700'
  },
  {
    id: 'geography-master',
    titleEn: 'Globe Trotter',
    titleHe: 'מגלה ארצות',
    descriptionEn: 'Scored 100% on a Geography quiz!',
    descriptionHe: 'קיבלת 100% בחידון גאוגרפיה!',
    icon: '🌍',
    color: 'bg-emerald-500 text-white border-emerald-700'
  },
  {
    id: 'animals-expert',
    titleEn: 'Zoo Explorer',
    titleHe: 'חוקר חיות',
    descriptionEn: 'Scored 100% on an Animals quiz!',
    descriptionHe: 'קיבלת 100% בחידון בעלי חיים!',
    icon: '🦁',
    color: 'bg-amber-500 text-white border-amber-700'
  },
  {
    id: 'math-wizard',
    titleEn: 'Number Ninja',
    titleHe: 'נינג׳ת מספרים',
    descriptionEn: 'Scored 100% on a Math quiz!',
    descriptionHe: 'קיבלת 100% בחידון חשבון!',
    icon: '🔢',
    color: 'bg-indigo-500 text-white border-indigo-700'
  },
  {
    id: 'history-hero',
    titleEn: 'Time Traveler',
    titleHe: 'נוסע בזמן',
    descriptionEn: 'Scored 100% on a History quiz!',
    descriptionHe: 'קיבלת 100% בחידון היסטוריה!',
    icon: '⏳',
    color: 'bg-rose-500 text-white border-rose-700'
  },
  {
    id: 'perfect-score',
    titleEn: 'Star Scholar',
    titleHe: 'מלומד כוכב',
    descriptionEn: 'Achieved a perfect score on any quiz!',
    descriptionHe: 'השגת ציון מושלם בכל חידון שהוא!',
    icon: '🏆',
    color: 'bg-purple-500 text-white border-purple-700'
  },
  {
    id: 'halfway',
    titleEn: 'Super Brain',
    titleHe: 'סופר מוח',
    descriptionEn: 'Played 5 or more quizzes!',
    descriptionHe: 'שיחקת ב-5 חידונים או יותר!',
    icon: '🧠',
    color: 'bg-cyan-500 text-white border-cyan-700'
  },
  {
    id: 'science-genius',
    titleEn: 'Super Scientist',
    titleHe: 'מדען על',
    descriptionEn: 'Scored 100% on a Science quiz!',
    descriptionHe: 'קיבלת 100% בחידון מדע!',
    icon: '🧪',
    color: 'bg-teal-500 text-white border-teal-700'
  },
  {
    id: 'space-ranger',
    titleEn: 'Space Explorer',
    titleHe: 'אסטרונאוט',
    descriptionEn: 'Scored 100% on a Space quiz!',
    descriptionHe: 'קיבלת 100% בחידון חלל!',
    icon: '👨‍🚀',
    color: 'bg-purple-600 text-white border-purple-800'
  },
  {
    id: 'general-knowledge-master',
    titleEn: 'Ultimate Genius',
    titleHe: 'גאון הדור',
    descriptionEn: 'Scored 100% on a General Knowledge quiz!',
    descriptionHe: 'קיבלת 100% בחידון ידע כללי!',
    icon: '💡',
    color: 'bg-amber-600 text-white border-amber-800'
  },
  {
    id: 'stories-master',
    titleEn: 'Storyteller',
    titleHe: 'מספר סיפורים',
    descriptionEn: 'Scored 100% on a Stories & Fairytales quiz!',
    descriptionHe: 'קיבלת 100% בחידון סיפורים ואגדות!',
    icon: '🏰',
    color: 'bg-pink-500 text-white border-pink-700'
  }
];

export const QUESTIONS: Question[] = [
  ...GK_5_7_QUESTIONS,
  ...GK_8_13_QUESTIONS,
  ...GK_13_PLUS_QUESTIONS,
  ...STORIES_QUESTIONS,
  // ==================== GEOGRAPHY ====================
  // 5-7
  {
    id: 'geo-5-1',
    category: 'Geography',
    ageGroup: '5-7',
    questionEn: 'What color is the sky on a sunny, clear day?',
    questionHe: 'בְּאֵיזֶה צֶבֶע הַשָּׁמַיִם בְּיוֹם שֶׁמֶשׁ בָּהִיר?',
    optionsEn: ['Blue', 'Green', 'Yellow', 'Red'],
    optionsHe: ['כָּחֹל', 'יָרֹק', 'צָהֹב', 'אָדֹם'],
    answerIndex: 0,
    explanationEn: 'The sky looks blue because the air scatters blue sunlight more than other colors.',
    explanationHe: 'הַשָּׁמַיִם נִרְאִים כְּחֻלִּים מִכֵּיוָן שֶׁהָאֲוִיר מְפַזֵּר אֶת הָאוֹר הַכָּחֹל שֶׁל הַשֶּׁמֶשׁ יוֹתֵר מִשְּׁאָר הַצְּבָעִים.'
  },
  {
    id: 'geo-5-2',
    category: 'Geography',
    ageGroup: '5-7',
    questionEn: 'Which is very hot and gives light to the Earth during the day?',
    questionHe: 'מַהוּ הַדָּבָר הַחַם מְאֹד שֶׁנּוֹתֵן אוֹר לְכַדּוּר הָאָרֶץ בְּמַהֲלַךְ הַיּוֹם?',
    optionsEn: ['The Moon', 'The Sun', 'A Cloud', 'A Star'],
    optionsHe: ['הַיָּרֵחַ', 'הַשֶּׁמֶשׁ', 'עָנָן', 'כּוֹכָב'],
    answerIndex: 1,
    explanationEn: 'The Sun is a giant star that keeps us warm and gives us light!',
    explanationHe: 'הַשֶּׁמֶשׁ הִיא כּוֹכָב עָנָק שֶׁשּׁוֹמֵר עָלֵינוּ חֲמִימִים וְנוֹתֵן לָנוּ אוֹר!'
  },
  {
    id: 'geo-5-3',
    category: 'Geography',
    ageGroup: '5-7',
    questionEn: 'Where do fish live and swim?',
    questionHe: 'אֵיפֹה דָּגִים חַיִּים וְשׂוֹחִים?',
    optionsEn: ['In the Water', 'In the Desert', 'On Trees', 'In the Sky'],
    optionsHe: ['בַּמַּיִם', 'בַּמִּדְבָּר', 'עַל עֵצִים', 'בַּשָּׁמַיִם'],
    answerIndex: 0,
    explanationEn: 'Fish use gills to breathe underwater, which is why they live in lakes, rivers, and oceans!',
    explanationHe: 'דָּגִים מִשְׁתַּמְּשִׁים בְּזִימִים כְּדֵי לִנְשֹׁם מִתַּחַת לַמַּיִם, וְלָכֵן הֵם חַיִּים בַּאֲגַמִּים, נְהָרוֹת וְאוֹקְיָנוּסִים!'
  },
  // 8-13
  {
    id: 'geo-8-1',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'What is the largest ocean on Earth?',
    questionHe: 'מַהוּ הָאוֹקְיָנוּס הַגָּדוֹל בְּיוֹתֵר בְּכַדּוּר הָאָרֶץ?',
    optionsEn: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    optionsHe: ['הָאוֹקְיָנוּס הָאַטְלַנְטִי', 'הָאוֹקְיָנוּס הַהוֹדִי', 'הָאוֹקְיָנוּס הַשָּׁקֵט', 'אוֹקְיָנוּס הַקֶּרַח הַצְּפוֹנִי'],
    answerIndex: 2,
    explanationEn: 'The Pacific Ocean is the largest, covering more than 30% of the Earth’s surface.',
    explanationHe: 'הָאוֹקְיָנוּס הַשָּׁקֵט הוּא הַגָּדוֹל בְּיוֹתֵר, וּמְכַסֶּה יוֹתֵר מִ-30% מִשֶּׁטַח כַּדּוּר הָאָרֶץ.'
  },
  {
    id: 'geo-8-2',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'Which is the tallest mountain peak in the world?',
    questionHe: 'מַהִי פִּסְגַּת הָהָר הַגְּבוֹהָה בְּיוֹתֵר בָּעוֹלָם?',
    optionsEn: ['Mount Everest', 'K2', 'Mount Kilimanjaro', 'Mont Blanc'],
    optionsHe: ['הַר אֶוֶרֶסְט', 'K2', 'הַר קִילִימַנְגָ׳רוֹ', 'מוֹן בְּלָאן'],
    answerIndex: 0,
    explanationEn: 'Mount Everest reaches an altitude of 8,848 meters in the Himalayas!',
    explanationHe: 'הַר אֶוֶרֶסְט מַגִּיעַ לְגֹבַהּ שֶׁל 8,848 מֶטְרִים בְּרֶכֶס הָרֵי הַהִימָלָאיָה!'
  },
  {
    id: 'geo-8-3',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'Which river is known as the longest river in the world?',
    questionHe: 'אֵיזֶה נָהָר יָדוּעַ כַּנָּהָר הָאָרֹךְ בְּיוֹתֵר בָּעוֹלָם?',
    optionsEn: ['Amazon River', 'Nile River', 'Mississippi River', 'Yangtze River'],
    optionsHe: ['נְהַר הָאָמָזוֹנָס', 'נְהַר הַנִּילוּס', 'נְהַר הַמִּיסִיסִיפִּי', 'נְהַר הַיָּאנְגְצֶה'],
    answerIndex: 1,
    explanationEn: 'The Nile River in Africa is traditionally considered the longest river, spanning 6,650 kilometers.',
    explanationHe: 'נְהַר הַנִּילוּס בְּאַפְרִיקָה נֶחְשָׁב בְּאֹפֶן מָסָרְתִּי לַנָּהָר הָאָרֹךְ בְּיוֹתֵר, בְּאֹרֶךְ שֶׁל כִּ-6,650 קִילוֹמֶטְרִים.'
  },
  // 13+
  {
    id: 'geo-13-1',
    category: 'Geography',
    ageGroup: '13+',
    questionEn: 'Which country is home to the Great Barrier Reef?',
    questionHe: 'בְּאֵיזוֹ מְדִינָה נִמְצֵאת שׁוּנִית הַמַּחְסוֹם הַגְּדוֹלָה?',
    optionsEn: ['Australia', 'Brazil', 'Indonesia', 'South Africa'],
    optionsHe: ['אוֹסְטְרַלְיָה', 'בְּרָזִיל', 'אִינְדּוֹנֶזְיָה', 'דְּרוֹם אַפְרִיקָה'],
    answerIndex: 0,
    explanationEn: 'The Great Barrier Reef is the world’s largest coral reef system, located in Queensland, Australia.',
    explanationHe: 'שׁוּנִית הַמַּחְסוֹם הַגְּדוֹלָה הִיא מַעֲרֶכֶת שׁוּנִיּוֹת הָאַלְמוֹגִים הַגְּדוֹלָה בָּעוֹלָם, הַמְּמֻקֶּמֶת בִּקְוִוינְסְלֶנְד, אוֹסְטְרַלְיָה.'
  },
  {
    id: 'geo-13-2',
    category: 'Geography',
    ageGroup: '13+',
    questionEn: 'What is the capital city of Japan?',
    questionHe: 'מַהִי עִיר הַבִּירָה שֶׁל יַפָּן?',
    optionsEn: ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'],
    optionsHe: ['קִיוֹטוֹ', 'אוֹסָקָה', 'טוֹקְיוֹ', 'הִירוֹשִׁימָה'],
    answerIndex: 2,
    explanationEn: 'Tokyo is the bustling capital of Japan and the most populous metropolitan area in the world.',
    explanationHe: 'טוֹקְיוֹ הִיא בִּירָתָהּ הַשּׁוֹקֶקֶת שֶׁל יַפָּן וְהָאֵזוֹר הַמֶּטְרוֹפּוֹלִיטָנִי הַמְּאֻכְלָס בְּיוֹתֵר בָּעוֹלָם.'
  },

  // ==================== ANIMALS ====================
  // 5-7
  {
    id: 'ani-5-1',
    category: 'Animals',
    ageGroup: '5-7',
    questionEn: 'Which of these animals says "Woof woof"?',
    questionHe: 'אֵיזֶה מִבַּעֲלֵי הַחַיִּים הָאֵלֶּה אוֹמֵר "הַב הַב"?',
    optionsEn: ['Dog', 'Cat', 'Lion', 'Frog'],
    optionsHe: ['כֶּלֶב', 'חָתוּל', 'אַרְיֵה', 'צְפַרְדֵּעַ'],
    answerIndex: 0,
    explanationEn: 'Dogs bark to communicate, make friends, and protect their families!',
    explanationHe: 'כְּלָבִים נוֹבְחִים כְּדֵי לְתַקְשֵׁר, לְהַכִּיר חֲבֵרִים חֲדָשִׁים וּלְהָגֵן על הַמִּשְׁפָּחָה שֶׁלָּהֶם!'
  },
  {
    id: 'ani-5-2',
    category: 'Animals',
    ageGroup: '5-7',
    questionEn: 'What is the tallest animal in the world, with a super long neck?',
    questionHe: 'מַהוּ הַחַיָּה הַגְּבוֹהָה בְּיוֹתֵר בָּעוֹלָם, עִם צַוָּאר אָרֹךְ בִּמְיֻחָד?',
    optionsEn: ['Elephant', 'Giraffe', 'Hippo', 'Monkey'],
    optionsHe: ['פִּיל', 'גִ׳ירָפָה', 'הִיפּוֹפּוֹטָם', 'קוֹף'],
    answerIndex: 1,
    explanationEn: 'Giraffes have very long necks to reach delicious green leaves high up in the acacia trees.',
    explanationHe: 'לַגִּ׳ירָפוֹת יֵשׁ צַוָּאר אָרֹךְ מְאֹד כְּדֵי לְהַגִּיעַ לְעָלִים יְרֻקִּים וּטְעִימִים בְּצַמָּרוֹת עֲצֵי הַשִּׁטָּה.'
  },
  {
    id: 'ani-5-3',
    category: 'Animals',
    ageGroup: '5-7',
    questionEn: 'Which animal hops and carries its baby in a built-in pouch?',
    questionHe: 'אֵיזוֹ חַיָּה מְקַפֶּצֶת וְנוֹשֵׂאת אֶת הַגּוּר שֶׁלָּהּ בְּתוֹךְ כִּיס מֻבְנֶה?',
    optionsEn: ['Kangaroo', 'Koala', 'Rabbit', 'Squirrel'],
    optionsHe: ['קֶנְגּוּרוּ', 'קוֹאָלָה', 'אַרְנָב', 'סְנַאי'],
    answerIndex: 0,
    explanationEn: 'Baby kangaroos are called "joeys" and they love staying safe inside their mother\'s warm pouch.',
    explanationHe: 'גּוּרֵי הַקֶּנְגּוּרוּ אוֹהֲבִים לְהִשָּׁאֵר מוּגָנִים וּבְטוּחִים בְּתוֹךְ הַכִּיס הַחֲמִים שֶׁל אִמָּא שֶׁלָּהֶם.'
  },
  // 8-13
  {
    id: 'ani-8-1',
    category: 'Animals',
    ageGroup: '8-13',
    questionEn: 'What is the only mammal capable of true, sustained flight?',
    questionHe: 'מַהוּ הַיּוֹנֵק הַיָּחִיד שֶׁמִּסֻּגָּל לָעוּף תְּעוּפָה אֲמִתִּית וּמְמֻשֶּׁכֶת?',
    optionsEn: ['Flying Squirrel', 'Bat', 'Eagle', 'Owl'],
    optionsHe: ['סְנַאי מְעוֹפֵף', 'עֲטַלֵּף', 'עַיִט', 'יַנְשׁוּף'],
    answerIndex: 1,
    explanationEn: 'Bats have webbed wing structures that make them the only group of mammals that can fly.',
    explanationHe: 'לַעֲטַלֵּפִים יֵשׁ כַּנְפֵי עוֹר הַמְּאַפְשְׁרוֹת לָהֶם לִהְיוֹת קְבוּצַת הַיּוֹנְקִים הַיְּחִידָה שֶׁמִּסֻּגָּלָה לָעוּף.'
  },
  {
    id: 'ani-8-2',
    category: 'Animals',
    ageGroup: '8-13',
    questionEn: 'What is the largest living mammal on Earth?',
    questionHe: 'מַהוּ הַיּוֹנֵק הַחַי הַגָּדוֹל בְּיוֹתֵר עַל פְּנֵי כַּדּוּר הָאָרֶץ?',
    optionsEn: ['African Elephant', 'Blue Whale', 'Colossal Squid', 'Giraffe'],
    optionsHe: ['פִּיל אַפְרִיקָאִי', 'לִוְיָתָן כָּחֹל', 'דְּיוֹנוּן עָצוּם', 'גִ׳ירָפָה'],
    answerIndex: 1,
    explanationEn: 'The Blue Whale is the largest animal ever known, reaching up to 30 meters and 180 tons.',
    explanationHe: 'הַלִּוְיָתָן הַכָּחֹל הוּא בַּעַל הַחַיִּים הַגָּדוֹל בְּיוֹתֵר שֶׁחַי אֵי פַעַם, וּמַגִּיעַ לְאֹרֶךְ שֶׁל עַד 30 מֶטְרִים וּלְמִשְׁקָל שֶׁל 180 טוֹן.'
  },
  // 13+
  {
    id: 'ani-13-1',
    category: 'Animals',
    ageGroup: '13+',
    questionEn: 'How many hearts does an octopus have?',
    questionHe: 'כַּמָּה לְבָבוֹת יֵשׁ לַתְּמָנוּן?',
    optionsEn: ['One', 'Two', 'Three', 'Four'],
    optionsHe: ['אֶחָד', 'שְׁנַיִם', 'שְׁלֹשָׁה', 'אַרְבָּעָה'],
    answerIndex: 2,
    explanationEn: 'An octopus has 3 hearts: two pump blood to the gills, and one pumps it to the rest of the body.',
    explanationHe: 'לַתְּמָנוּן יֵשׁ 3 לְבָבוֹת: שְׁנַיִם מַזְרִימִים דָּם לַזִּימִים, וְאֶחָד מַזְרִים דָּם לִשְׁאָר חֶלְקֵי הַגּוּף.'
  },
  {
    id: 'ani-13-2',
    category: 'Animals',
    ageGroup: '13+',
    questionEn: 'What is a group of lions called?',
    questionHe: 'אֵיךְ נִקְרֵאת קְבוּצָה שֶׁל אֲרָיוֹת?',
    optionsEn: ['Pack', 'Herd', 'Pride', 'School'],
    optionsHe: ['לַהֲקָה', 'עֵדֶר', 'לַהֲקַת אֲרָיוֹת (פְּרַיְד)', 'נְחִיל'],
    answerIndex: 2,
    explanationEn: 'A social group of lions is called a pride, typically consisting of related females and offspring.',
    explanationHe: 'לַהֲקָה חֶבְרָתִית שֶׁל אֲרָיוֹת נִקְרֵאת "פְּרַיְד" (Pride), וְהִיא מֻרְכֶּבֶת בְּעִקָּר מִלְּבִיאוֹת קְרוֹבוֹת מִשְׁפָּחָה וְגוּרִים.'
  },

  // ==================== MATH ====================
  // 5-7
  {
    id: 'mat-5-1',
    category: 'Math',
    ageGroup: '5-7',
    questionEn: 'What is 2 + 3?',
    questionHe: 'כַּמָּה זֶה 2 וְעוֹד 3?',
    optionsEn: ['4', '5', '6', '7'],
    optionsHe: ['4', '5', '6', '7'],
    answerIndex: 1,
    explanationEn: 'If you have 2 apples and get 3 more, you can count them up to get 5!',
    explanationHe: 'אִם יֵשׁ לְךָ 2 תַּפּוּחִים וּמְקַבְּלִים עוֹד 3, סוֹפְרִים אֶת כֻּלָּם בְּיַחַד וּמְקַבְּלִים 5!'
  },
  {
    id: 'mat-5-2',
    category: 'Math',
    ageGroup: '5-7',
    questionEn: 'If you have 4 candies and eat 1, how many are left?',
    questionHe: 'אִם יֵשׁ לְךָ 4 סֻכָּרִיּוֹת וְאָכַלְתָּ 1, כַּמָּה סֻכָּרִיּוֹת נִשְׁאֲרוּ?',
    optionsEn: ['2', '3', '4', '5'],
    optionsHe: ['2', '3', '4', '5'],
    answerIndex: 1,
    explanationEn: 'Taking 1 candy away from 4 leaves you with 3 yummy candies.',
    explanationHe: 'אִם מוֹרִידִים סֻכָּרִיָּה אַחַת מִתּוֹך 4, נִשְׁאָרוֹת 3 סֻכָּרִיּוֹת טְעִימוֹת.'
  },
  {
    id: 'mat-5-3',
    category: 'Math',
    ageGroup: '5-7',
    questionEn: 'How many sides does a triangle have?',
    questionHe: 'כַּמָּה צְלָעוֹת יֵשׁ לַמְּשֻׁלָּשׁ?',
    optionsEn: ['3', '4', '5', '2'],
    optionsHe: ['3', '4', '5', '2'],
    answerIndex: 0,
    explanationEn: 'Tri means three! A triangle always has 3 straight sides and 3 corners.',
    explanationHe: 'הַשֵּׁם מְשֻׁלָּשׁ מַגִּיעַ מֵהַמִּלָּה שָׁלוֹשׁ! לַמְּשֻׁלָּשׁ יֵשׁ תָּמִיד 3 צְלָעוֹת וְ-3 פִּינוֹת.'
  },
  // 8-13
  {
    id: 'mat-8-1',
    category: 'Math',
    ageGroup: '8-13',
    questionEn: 'What is 12 multiplied by 8?',
    questionHe: 'כַּמָּה זֶה 12 כָּפוּל 8?',
    optionsEn: ['86', '92', '96', '104'],
    optionsHe: ['86', '92', '96', '104'],
    answerIndex: 2,
    explanationEn: '12 times 8 is 96. You can think of it as 10 times 8 (80) plus 2 times 8 (16) equals 96.',
    explanationHe: '12 כָּפוּל 8 שָׁוֶה 96. אֶפְשָׁר לְחַשֵּׁב זֹאת כְּ-10 כָּפוּל 8 (80) וְעוֹד 2 כָּפוּל 8 (16) שֶׁזֶּה 96.'
  },
  {
    id: 'mat-8-2',
    category: 'Math',
    ageGroup: '8-13',
    questionEn: 'What is the next number in this sequence: 2, 4, 8, 16, ...?',
    questionHe: 'מַהוּ הַמִּסְפָּר הַבָּא בַּסִּדְרָה: 2, 4, 8, 16, ...?',
    optionsEn: ['20', '24', '32', '64'],
    optionsHe: ['20', '24', '32', '64'],
    answerIndex: 2,
    explanationEn: 'Each number is multiplied by 2. 16 times 2 is 32!',
    explanationHe: 'כָּל מִסְפָּר מוּכְפָּל בְּ-2. 16 כָּפוּל 2 שָׁוֶה 32!'
  },
  // 13+
  {
    id: 'mat-13-1',
    category: 'Math',
    ageGroup: '13+',
    questionEn: 'What is the square root of 144?',
    questionHe: 'מַהוּ הַשֹּׁרֶשׁ הָרִיבּוּעִי שֶׁל 144?',
    optionsEn: ['10', '12', '14', '16'],
    optionsHe: ['10', '12', '14', '16'],
    answerIndex: 1,
    explanationEn: '12 multiplied by itself (12 x 12) equals 144, so the square root of 144 is 12.',
    explanationHe: '12 כָּפוּל עַצְמוֹ (12 כָּפוּל 12) שָׁוֶה לְ-144, וְלָכֵן הַשֹּׁרֶשׁ הָרִיבּוּעִי שֶׁל 144 הוּא 12.'
  },
  {
    id: 'mat-13-2',
    category: 'Math',
    ageGroup: '13+',
    questionEn: 'Solve for x: 3x - 7 = 14',
    questionHe: 'פְּתֹר עֲבוּר x אֶת הַמִּשׁוָאָה: 3x - 7 = 14',
    optionsEn: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    optionsHe: ['x = 5', 'x = 6', 'x = 7', 'x = 8'],
    answerIndex: 2,
    explanationEn: 'Add 7 to both sides: 3x = 21. Divide by 3: x = 7.',
    explanationHe: 'נוֹסִיף 7 לִשְׁנֵי הָאֲגַפִּים: 3x = 21. נְחַלֵּק בְּ-3 וּנְקַבֵּל x = 7.'
  },

  // ==================== HISTORY ====================
  // 5-7
  {
    id: 'his-5-1',
    category: 'History',
    ageGroup: '5-7',
    questionEn: 'Who was the first person to step on the Moon?',
    questionHe: 'מִי הָיָה הָאָדָם הָרִאשׁוֹן שֶׁדָּרַךְ עַל הַיָּרֵחַ?',
    optionsEn: ['Neil Armstrong', 'Buzz Lightyear', 'Albert Einstein', 'Santa Claus'],
    optionsHe: ['נִיל אַרְמְסְטְרוֹנְג', 'בָּאז שְׁנוֹת-אוֹר', 'אַלְבֶּרְט אַיְינְשְׁטַיְין', 'סַנְטָה קְלָאוּס'],
    answerIndex: 0,
    explanationEn: 'Neil Armstrong stepped on the Moon in 1969 and said, "That\'s one small step for man, one giant leap for mankind."',
    explanationHe: 'נִיל אַרְמְסְטְרוֹנְג דָּרַךְ עַל הַיָּרֵחַ בִּשְׁנַת 1969 וְאָמַר אֶת הַמִּשְׁפָּט הַמְּפֻרְסָם: "זֶהוּ צַעַד קָטָן לָאָדָם, צַעַד עָנָק לָאֱנוֹשׁוּת."'
  },
  {
    id: 'his-5-2',
    category: 'History',
    ageGroup: '5-7',
    questionEn: 'What giant, scaly animals ruled the Earth a very, very long time ago?',
    questionHe: 'אִלּוּ חַיּוֹת קַשְׂקַשִּׁיּוֹת עֲנָקִיּוֹת שָׁלְטוּ בְּכַדּוּר הָאָרֶץ לִפְנֵי זְמַן רַב מְאֹד?',
    optionsEn: ['Elephants', 'Dinosaurs', 'Tigers', 'Lions'],
    optionsHe: ['פִּילִים', 'דִּינוֹזָאוּרִים', 'טִיגְרִיסִים', 'אֲרָיוֹת'],
    answerIndex: 1,
    explanationEn: 'Dinosaurs lived millions of years ago, long before the first humans walked the Earth!',
    explanationHe: 'הַדִּינוֹזָאוּרִים חָיוּ לִפְנֵי מִילְיוֹנֵי שָׁנִים, הַרְבֵּה לִפְנֵי שֶׁבְּנֵי הָאָדָם הָרִאשׁוֹנִים הִתְהַלְּכוּ עַל פְּנֵי הָאֲדָמָה!'
  },
  {
    id: 'his-5-3',
    category: 'History',
    ageGroup: '5-7',
    questionEn: 'Where did kings and queens live in fairy tales?',
    questionHe: 'אֵיפֹה מְלָכִים וּמְלָכוֹת חָיוּ בְּסִפּוּרֵי הָאַגָּדוֹת?',
    optionsEn: ['In Castles', 'In Tents', 'In Trees', 'In Cars'],
    optionsHe: ['בְּטִירוֹת', 'בְּאֹהָלִים', 'עַל עֵצִים', 'בִּמְכוֹנִיּוֹת'],
    answerIndex: 0,
    explanationEn: 'Kings and queens lived in large, stone castles built with high towers and deep moats for protection!',
    explanationHe: 'מְלָכִים וּמְלָכוֹת חָיוּ בְּטִירוֹת אֶבֶן גְּדוֹלוֹת שֶׁנִּבְנוּ עִם מִגְדָּלִים גְּבוֹהִים וַחֲפִיר עָמֹק לְהַגָּנָה!'
  },
  // 8-13
  {
    id: 'his-8-1',
    category: 'History',
    ageGroup: '8-13',
    questionEn: 'Which famous ship sank on its maiden voyage in 1912 after hitting an iceberg?',
    questionHe: 'אֵיזוֹ סְפִינָה מְפֻרְסֶמֶת טָבְעָה בְּמַסַּע הַבְּכוֹרָה שֶׁלָּהּ בְּ-1912 לְאַחַר שֶׁפָּגְעָה בְּקַרְחוֹן?',
    optionsEn: ['Santa Maria', 'The Titanic', 'Mayflower', 'HMS Victory'],
    optionsHe: ['סַנְטָה מָרִיָּה', 'הַטִּיטָאנִיק', 'מֵיְפְלָאוּאֶר', 'וִיקְטוֹרִי'],
    answerIndex: 1,
    explanationEn: 'The Titanic was considered unsinkable, but sadly struck an iceberg on April 14, 1912.',
    explanationHe: 'הַטִּיטָאנִיק נֶחְשְׁבָה לִסְפִינָה בִּלְתִּי נִתֶּנֶת לִטְבִיעָה, אַךְ לְמַרְבֵּה הַצַּעַר פָּגְעָה בְּקַרְחוֹן בְּ-14 בְּאַפְּרִיל 1912.'
  },
  {
    id: 'his-8-2',
    category: 'History',
    ageGroup: '8-13',
    questionEn: 'Who invented the light bulb and registered over 1,000 patents?',
    questionHe: 'מִי הִמְצִיא אֶת נוּרַת הַחַשְׁמַל וְרָשַׁם לְמַעְלָה מִ-1,000 פָּטֶנְטִים?',
    optionsEn: ['Albert Einstein', 'Thomas Edison', 'Alexander Graham Bell', 'Nikola Tesla'],
    optionsHe: ['אַלְבֶּרְט אַיְינְשְׁטַיְין', 'תּוֹמָאס אֶדִיסוֹן', 'אַלֶכְסַנְדֶּר גְרָהָם בֶּל', 'נִיקוֹלָה טֶסְלָה'],
    answerIndex: 1,
    explanationEn: 'Thomas Edison developed the first practical incandescent light bulb in 1879.',
    explanationHe: 'תּוֹמָאס אֶדִיסוֹן פִּתַּח אֶת נוּרַת הַלַּהַט הַפְּרַקְטִית הָרִאשׁוֹנָה בִּשְׁנַת 1879.'
  },
  // 13+
  {
    id: 'his-13-1',
    category: 'History',
    ageGroup: '13+',
    questionEn: 'Which ancient civilization built the pyramids of Giza?',
    questionHe: 'אֵיזוֹ צִיוִוילִיזַצְיָה עַתִּיקָה בָּנְתָה אֶת הַפִּירָמִידוֹת שֶׁל גִּיזָה?',
    optionsEn: ['Romans', 'Greeks', 'Egyptians', 'Mesopotamians'],
    optionsHe: ['רוֹמָאיִם', 'יְוָנִים', 'מִצְרִים עַתִּיקִים', 'מְסוֹפּוֹטָמִים'],
    answerIndex: 2,
    explanationEn: 'The ancient Egyptians built the Giza pyramids as tombs for their Pharaohs over 4,500 years ago.',
    explanationHe: 'הַמִּצְרִים הָעַתִּיקִים בָּנוּ אֶת פִּירָמִידוֹת גִּיזָה כִּקְבָרִים עֲבוּר הַפַּרְעוֹנִים שֶׁלָּהֶם לִפנֵי לְמַעְלָה מִ-4,500 שָׁנָה.'
  },
  {
    id: 'his-13-2',
    category: 'History',
    ageGroup: '13+',
    questionEn: 'In which year did World War II end?',
    questionHe: 'בְּאֵיזוֹ שָׁנָה הִסְתַּיְּימָה מִלְחֶמֶת הָעוֹלָם הַשְּׁנִיָּה?',
    optionsEn: ['1918', '1939', '1945', '1950'],
    optionsHe: ['1918', '1939', '1945', '1950'],
    answerIndex: 2,
    explanationEn: 'World War II ended in September 1945 with the formal signing of surrender documents.',
    explanationHe: 'מִלְחֶמֶת הָעוֹלָם הַשְּׁנִיָּה הִסְתַּיְּימָה בְּסֶפְּטֶמְבֶּר 1945 עִם הַחֲתִימָה הָרִשְׁמִית עַל מִסְמְכֵי הַכְּנִיעָה.'
  },

  // ==================== SCIENCE ====================
  // 5-7
  {
    id: 'sci-5-1',
    category: 'Science',
    ageGroup: '5-7',
    questionEn: 'What happens to water if you put it in the freezer?',
    questionHe: 'מָה קוֹרֶה לַמַּיִם כְּשֶׁשָּׂמִים אוֹתָם בַּמַּקְפִּיא?',
    optionsEn: ['It turns into ice', 'It turns into steam', 'It turns into juice', 'It turns blue'],
    optionsHe: ['הֵם הוֹפְכִים לְקֶרַח', 'הֵם הוֹפְכִים לְאֵדִים', 'הֵם הוֹפְכִים לְמִיץ', 'הֵם הוֹפְכִים לִכְחֻלִּים'],
    answerIndex: 0,
    explanationEn: 'Freezing water turns it from a liquid into a solid called ice!',
    explanationHe: 'הַקְפָּאַת מַיִם הוֹפֶכֶת אוֹתָם מִנּוֹזֵל לְמוּצָק שֶׁנִּקְרָא קֶרַח!'
  },
  {
    id: 'sci-5-2',
    category: 'Science',
    ageGroup: '5-7',
    questionEn: 'What part of a plant grows in the soil to drink water?',
    questionHe: 'אֵיזֶה חֵלֶק שֶׁל הַצֶּמַח גָּדֵל בָּאֲדָמָה כְּדֵי לִשְׁתּוֹת מַיִם?',
    optionsEn: ['The Roots', 'The Leaves', 'The Flowers', 'The Stem'],
    optionsHe: ['הַשּׁוֹרָשִׁים', 'הָעָלִים', 'הַScaleפְּרָחִים', 'הַגִּבְעוֹל'],
    answerIndex: 0,
    explanationEn: 'Roots anchor the plant in the soil and absorb water and nutrients.',
    explanationHe: 'הַשּׁוֹרָשִׁים מְעַגְּנִים אֶת הַצֶּמַח בָּאֲדָמָה וְסוֹפְגִים מַיִם וְחוֹמְרֵי מָזוֹן.'
  },
  // 8-13
  {
    id: 'sci-8-1',
    category: 'Science',
    ageGroup: '8-13',
    questionEn: 'What gas do humans breathe in to live?',
    questionHe: 'אֵיזֶה גַּז בְּנֵי אָדָם נוֹשְׁמִים כְּדֵי לִחְיוֹת?',
    optionsEn: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Helium'],
    optionsHe: ['חַמְצָן', 'חַנְקָן', 'דּוּ-פַחְמָן חַמְצָנִי', 'הֶלְיוּם'],
    answerIndex: 0,
    explanationEn: 'Our bodies need oxygen from the air to generate energy and keep us active!',
    explanationHe: 'הגּוּף שֶׁלָּנוּ זָקוּק לְחַמְצָן מֵהָאֲוִיר כְּדֵי לְיַצֵּר אֶנֶרְגִּיָּה וְלִשְׁמֹר עָלֵינוּ פְּעִילִים!'
  },
  {
    id: 'sci-8-2',
    category: 'Science',
    ageGroup: '8-13',
    questionEn: 'What is the force that pulls things down to the ground?',
    questionHe: 'מַהוּ הַכֹּחַ שֶׁמּוֹשֵׁךְ דְּבָרִים לְמַטָּה אֶל הַקַּרְקַע?',
    optionsEn: ['Gravity', 'Magnetism', 'Friction', 'Electricity'],
    optionsHe: ['כֹּחַ הַמְּשִׁיכָה (גְּרָוִויטַצְיָה)', 'מַגְנֵטִיּוּת', 'חִיכּוּךְ', 'חַשְׁמַל'],
    answerIndex: 0,
    explanationEn: 'Gravity is the invisible force that pulls objects toward each other, keeping us on Earth!',
    explanationHe: 'כֹּחַ הַמְּשִׁיכָה הוּא הַכֹּחַ הַבִּלְתִּי נִרְאֶה שֶׁמּוֹשֵׁךְ עֲצָמִים זֶה אֶל זֶה וְשׁוֹמֵר עָלֵינוּ עַל פְּנֵי כַּדּוּר הָאָרֶץ!'
  },
  // 13+
  {
    id: 'sci-13-1',
    category: 'Science',
    ageGroup: '13+',
    questionEn: 'What is the chemical formula for water?',
    questionHe: 'מָהִי הַנֻּסְחָה הַכִּימִית שֶׁל מַיִם?',
    optionsEn: ['H2O', 'CO2', 'NaCl', 'O2'],
    optionsHe: ['H2O', 'CO2', 'NaCl', 'O2'],
    answerIndex: 0,
    explanationEn: 'Water consists of two Hydrogen atoms and one Oxygen atom!',
    explanationHe: 'מַיִם מֻרְכָּבִים מִשְּׁנֵי אַטוֹמֵי מֵימָן וְאַטוֹם חַמְצָן אֶחָד!'
  },
  {
    id: 'sci-13-2',
    category: 'Science',
    ageGroup: '13+',
    questionEn: 'Which organelle is known as the powerhouse of the cell?',
    questionHe: 'אֵיזֶה אֵבְרוֹן בַּתָּא מְכֻנֶּה "תַּחֲנַת הַכֹּחַ שֶׁל הַתָּא"?',
    optionsEn: ['Mitochondria', 'Nucleus', 'Ribosome', 'Lysosome'],
    optionsHe: ['מִיטוֹכוֹנְדְּרִיָּה', 'גַּרְעִין הַתָּא', 'רִיבּוֹזוֹם', 'לִיזוֹזוֹם'],
    answerIndex: 0,
    explanationEn: 'Mitochondria generate most of the chemical energy needed to power the cell\'s chemical reactions.',
    explanationHe: 'הַמִּיטוֹכוֹנְדְּרִיָּה מְיַצֶּרֶת אֶת רֹב הָאֶנֶרְגִּיָּה הַכִּימִית הַדְּרוּשָׁה Lְהַפְעָלַת הַתְּגוּבוֹת הַכִּימִיּוֹת שֶׁל הַתָּא.'
  },

  // ==================== SPACE ====================
  // 5-7
  {
    id: 'spc-5-1',
    category: 'Space',
    ageGroup: '5-7',
    questionEn: 'Which planet do we live on?',
    questionHe: 'עַל אֵיזֶה כּוֹכָב לֶכֶת אֲנַחְנוּ חַיִּים?',
    optionsEn: ['Earth', 'Mars', 'Jupiter', 'Venus'],
    optionsHe: ['כַּדּוּר הָאָרֶץ', 'מַאֲדִים', 'צֶדֶק', 'נוֹגַהּ'],
    answerIndex: 0,
    explanationEn: 'Earth is the third planet from the Sun and the only known planet with life!',
    explanationHe: 'כַּדּוּר הָאָרֶץ הוּא כּוֹכָב הַלֶּכֶת הַשְּׁלִישִׁי מֵהַשֶּׁמֶשׁ וְכוֹכָב הַלֶּכֶת הַיָּחִיד הַיָּדוּעַ שֶׁיֵּשׁ בּוֹ חַיִּים!'
  },
  {
    id: 'spc-5-2',
    category: 'Space',
    ageGroup: '5-7',
    questionEn: 'What shines bright in the night sky and can be full, half, or crescent?',
    questionHe: 'מָה זוֹהֵר בַּלַּיְלָה בַּשָּׁמַיִם וְיָכוֹל לִהְיוֹת מָלֵא, חֲצִי, אוֹ סַהַר?',
    optionsEn: ['The Moon', 'The Sun', 'A Comet', 'A Shooting Star'],
    optionsHe: ['הַיָּרֵחַ', 'הַשֶּׁמֶשׁ', 'שָׁבִיט', 'כּוֹכָב נוֹפֵל'],
    answerIndex: 0,
    explanationEn: 'The Moon orbits Earth and shines because it reflects light from the Sun.',
    explanationHe: 'הַיָּרֵחַ מַקִּיף אֶת כַּדּוּר הָאָרֶץ וּמֵאִיר מִכֵּיוָן שֶׁהוּא מַחְזִיר אֶת אוֹר הַשֶּׁמֶשׁ.'
  },
  // 8-13
  {
    id: 'spc-8-1',
    category: 'Space',
    ageGroup: '8-13',
    questionEn: 'Which is the largest planet in our solar system?',
    questionHe: 'מַהוּ כּוֹכָב הַלֶּכֶת הַגָּדוֹל בְּיוֹתֵר בְּמַעֲרֶכֶת הַשֶּׁמֶשׁ שֶׁלָּנוּ?',
    optionsEn: ['Jupiter', 'Saturn', 'Earth', 'Neptune'],
    optionsHe: ['צֶדֶק (גּ׳וּפִּיטֶר)', 'שַׁבְּתַאי (סָאטוּרְן)', 'כַּדּוּר הָאָרֶץ', 'נֶפְּטוּן'],
    answerIndex: 0,
    explanationEn: 'Jupiter is a giant gas planet so big that all other planets could fit inside it!',
    explanationHe: 'צֶדֶק הוּא כּוֹכָב לֶכֶת גָּזִי עָנָק כָּל כָּךְ גָּדוֹל, שֶׁכָּל שְׁאָר כּוֹכְבֵי הַלֶּכֶת יָכְלוּ לְהִכָּנֵס בְּתוֹכוֹ!'
  },
  {
    id: 'spc-8-2',
    category: 'Space',
    ageGroup: '8-13',
    questionEn: 'How many planets are there in our solar system?',
    questionHe: 'כַּמָּה כּוֹכְבֵי לֶכֶת יֵשׁ בְּמַעֲרֶכֶת הַשֶּׁמֶשׁ שֶׁלָּנוּ?',
    optionsEn: ['8', '7', '9', '10'],
    optionsHe: ['8', '7', '9', '10'],
    answerIndex: 0,
    explanationEn: 'There are eight official planets orbiting the Sun: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune.',
    explanationHe: 'יֵשְׁנָם שְׁמוֹנָה כּוֹכְבֵי לֶכֶת רִשְׁמִיִּים הַמַּקִּיפִים אֶת הַשֶּׁמֶשׁ: כּוֹכַב חַמָּה, נוֹגַהּ, כַּדּוּר הָאָרֶץ, מַאֲדִים, צֶדֶק, שַׁבְּתַאי, אוֹרָנוּס וְנֶפְּטוּן.'
  },
  // 13+
  {
    id: 'spc-13-1',
    category: 'Space',
    ageGroup: '13+',
    questionEn: 'What is the name of the galaxy that contains our Solar System?',
    questionHe: 'מַהוּ שְׁמָהּ שֶׁל הַגָּלַקְסְיָה הַמְּכִילָה אֶת מַעֲרֶכֶת הַשֶּׁמֶשׁ שֶׁלָּנוּ?',
    optionsEn: ['The Milky Way', 'Andromeda', 'Triangulum Galaxy', 'Whirlpool Galaxy'],
    optionsHe: ['שְׁבִיל הַחָלָב', 'אַנְדְּרוֹמֶדָה', 'גָּלַקְסְיַת הַמְּשֻׁלָּשׁ', 'גָּלַקְסְיַת הַמַּעֲרְבֹּלֶת'],
    answerIndex: 0,
    explanationEn: 'Our solar system is located in the Orion Arm of the Milky Way, a barred spiral galaxy.',
    explanationHe: 'מַעֲרֶכֶת הַשֶּׁמֶשׁ שֶׁלָּנוּ מְמֻקֶּמֶת בִּזְרוֹעַ אוֹרְיוֹן שֶׁל גָּלַקְסְיַת שְׁבִיל הַחָלָב, שֶׁהִיא גָּלַקְסְיָה סְפִּירָלִית.'
  },
  {
    id: 'spc-13-2',
    category: 'Space',
    ageGroup: '13+',
    questionEn: 'Which planet is known as the "Red Planet" because of its iron-rich soil?',
    questionHe: 'אֵיזֶה כּוֹכָב לֶכֶת יָדוּעַ בְּתוֹר "כּוֹכָב הַלֶּכֶת הָאָדֹם" בִּגְלַל הָאֲדָמָה עֲשִׁירַת הַבַּרְזֶל שֶׁלּוֹ?',
    optionsEn: ['Mars', 'Venus', 'Mercury', 'Saturn'],
    optionsHe: ['מַאֲדִים', 'נוֹגַהּ', 'כּוֹכַב חַמָּה', 'שַׁבְּתַאי'],
    answerIndex: 0,
    explanationEn: 'Mars is covered in iron oxide (rust), which gives its surface and thin atmosphere a reddish color.',
    explanationHe: 'מַאֲדִים מְכֻסֶּה בְּתַחְמוֹצֶת בַּרְזֶל (חֲלֻדָּה), מָה שֶׁמַּעַנִיק לִפְנֵי הַשֶּׁטַח וְלָאַטְמוֹסְפֵירָה הַדַּקָּה שֶׁלּוֹ גָּוֶון אֲדַמְדָּם.'
  },
  // ==================== QUESTIONS FROM REQUESTED LINKS ====================
  // --- KinderToys & Baba-Mail & AhaSlides (5-7 Age Group) ---
  {
    id: 'link-5-1',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'Which cartoon character has big ears and can fly with them?',
    questionHe: 'מִיהִי הַדְּמוּת הַמְּצֻיֶּרֶת שֶׁיֵּשׁ לָהּ אוֹזְנַיִם גְּדוֹלוֹת וְהִיא יְכוֹלָה לָעוּף בְּעֶזְרָתָן?',
    optionsEn: ['Dumbo', 'Simba', 'Mickey Mouse', 'Bugs Bunny'],
    optionsHe: ['דַּמְבּוֹ', 'סִימְבָּה', 'מִיקִי מָאוּס', 'בַּאגְס בָּאנִי'],
    answerIndex: 0,
    explanationEn: 'Dumbo is a cute little baby elephant who discovers he can fly using his giant ears as wings!',
    explanationHe: 'דמבו הוא פילון חמוד שמגלה שהוא יכול לעוף בעזרת האוזניים הענקיות שלו!',
    hintEn: 'He is a lovable Disney baby elephant.',
    hintHe: 'מדובר בפילון מתוק של דיסני.'
  },
  {
    id: 'link-5-2',
    category: 'Animals',
    ageGroup: '5-7',
    questionEn: 'Which small insect produces sweet honey?',
    questionHe: 'אֵיזֶה חֶרֶק קָטָן מְיַצֵּר דְּבַשׁ מָתוֹק?',
    optionsEn: ['Bee', 'Ant', 'Butterfly', 'Ladybug'],
    optionsHe: ['דְּבוֹרָה', 'נְמָלָה', 'פַּרְפָּר', 'מוֹשִׁית הַשֶּׁמֶשׁ'],
    answerIndex: 0,
    explanationEn: 'Honeybees collect nectar from flowers and turn it into sweet, delicious honey!',
    explanationHe: 'הדבורים אוספות צוף מפרחים והופכות אותו לדבש מתוק וטעים!',
    hintEn: 'It makes a "bzzzzz" sound.',
    hintHe: 'הוא עושה קול של "בזזזזז".'
  },
  {
    id: 'link-5-3',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'Who is the main lion cub character in the Disney movie "The Lion King"?',
    questionHe: 'מִי הָיָה גּוּר הָאֲרָיוֹת, הַדְּמוּת הָרָאשִׁית בְּסֶרֶט דִּיסְנִי "מֶלֶךְ הָאֲרָיוֹת"?',
    optionsEn: ['Mufasa', 'Simba', 'Scar', 'Tarzan'],
    optionsHe: ['מוּפָאסָה', 'סִימְבָּה', 'סְקָאר', 'טַרְזָן'],
    answerIndex: 1,
    explanationEn: 'Simba is the brave little prince lion cub who grows up to become the king of Pride Rock!',
    explanationHe: 'סימבה הוא גור האריות האמיץ שגדל להיות מלך צוק התקווה!',
    hintEn: 'His name starts with an "S" and sounds like "Zimba".',
    hintHe: 'השם שלו מתחיל באות ס\' ומתחרז עם "גימבה".'
  },
  {
    id: 'link-5-4',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'Which poisoned fruit did Snow White eat that made her fall asleep?',
    questionHe: 'אֵיזֶה פְּרִי מֻרְעָל אָכְלָה שִׁלְגִּיָּה שֶׁגָּרַם לָהּ לִשְׁקֹעַ בְּשֵׁנָה עֲמֻקָּה?',
    optionsEn: ['Banana', 'Apple', 'Orange', 'Strawberry'],
    optionsHe: ['בָּנָנָה', 'תַּפּוּחַ', 'תַּפּוּז', 'תּוּת שָׂדֶה'],
    answerIndex: 1,
    explanationEn: 'The Evil Queen disguised herself and fed Snow White a poisoned red apple.',
    explanationHe: 'המלכה המרשעת התחפשה והאכילה את שלגייה בתפוח אדום מורעל.',
    hintEn: 'It is a round red fruit that grows on apple trees.',
    hintHe: 'זהו פרי אדום ועגול שגדל על עץ תפוחים.'
  },
  {
    id: 'link-5-5',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'How many beautiful colors are there in a standard rainbow?',
    questionHe: 'כַּמָּה צְבָעִים מַדְהִימִים יֵשׁ בְּקֶשֶׁת בֶּעָנָן רְגִילָה?',
    optionsEn: ['5', '6', '7', '8'],
    optionsHe: ['5', '6', '7', '8'],
    answerIndex: 2,
    explanationEn: 'A rainbow has exactly 7 colors: Red, Orange, Yellow, Green, Blue, Indigo, and Violet.',
    explanationHe: 'בקשת בענן יש בדיוק 7 צבעים: אדום, כתום, צהוב, ירוק, כחול, אינדיגו וסגול.',
    hintEn: 'It is one more than six, and one less than eight.',
    hintHe: 'זהו מספר המזל שגדול ב-1 מ-6 וקטן ב-1 מ-8.'
  },
  {
    id: 'link-5-6',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'How many hours are there in one complete day?',
    questionHe: 'כַּמָּה שָׁעוֹת יֵשׁ בִּימָמָה אַחַת שְׁלֵמָה?',
    optionsEn: ['12', '24', '48', '60'],
    optionsHe: ['12', '24', '48', '60'],
    answerIndex: 1,
    explanationEn: 'A full day includes day and night, lasting exactly 24 hours as the Earth spins once on its axis.',
    explanationHe: 'יממה שלמה מורכבת מיום ומלילה, ונמשכת בדיוק 24 שעות שזהו הזמן שלוקח לכדור הארץ להסתובב סביב עצמו.',
    hintEn: 'It is double twelve.',
    hintHe: 'פעמיים שתים עשרה.'
  },
  {
    id: 'link-5-7',
    category: 'History',
    ageGroup: '5-7',
    questionEn: 'On which Jewish holiday do we eat flat, crunchy Matzah?',
    questionHe: 'בְּאֵיזֶה חַג יְהוּדִי אוֹכְלִים מַצּוֹת שְׁטוּחוֹת וּפְרִיכוֹת?',
    optionsEn: ['Sukkot', 'Hanukkah', 'Passover', 'Shavuot'],
    optionsHe: ['סֻכּוֹת', 'חֲנֻכָּה', 'פֶּסַח', 'שָׁבוּעוֹת'],
    answerIndex: 2,
    explanationEn: 'During Passover (Pesach), we eat Matzah to remember how the Israelites left Egypt quickly.',
    explanationHe: 'בחג הפסח אוכלים מצה כדי לזכור שבני ישראל יצאו ממצרים בחיפזון והבצק שלהם לא הספיק לתפוח.',
    hintEn: 'It is also known as the Holiday of Spring and Freedom.',
    hintHe: 'חג זה נקרא גם חג האביב וחג החירות.'
  },

  // --- KinderToys & Baba-Mail & AhaSlides (8-13 Age Group) ---
  {
    id: 'link-8-1',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'What is the capital city of France, famous for the Eiffel Tower?',
    questionHe: 'מָהִי עִיר הַבִּירָה שֶׁל צָרְפַת, הַיְּדוּעָה בְּמִגְדַּל הָאייְפֶל שֶׁלָּהּ?',
    optionsEn: ['London', 'Rome', 'Paris', 'Berlin'],
    optionsHe: ['לוֹנְדוֹן', 'רוֹמָא', 'פָּרִיז', 'בֶּרְלִין'],
    answerIndex: 2,
    explanationEn: 'Paris is the capital of France, famous worldwide for art, fashion, and the beautiful Eiffel Tower!',
    explanationHe: 'פריז היא בירת צרפת, המפורסמת בעולם באמנות, אופנה ומגדל האייפל המפורסם!',
    hintEn: "Its name starts with the letter 'P'.",
    hintHe: "השם שלה מתחיל באות פ'."
  },
  {
    id: 'link-8-2',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'On which continent is the country of Egypt located?',
    questionHe: 'בְּאֵיזוֹ יַבָּשֶׁת נִמְצֵאת מְדִינַת מִצְרַיִם?',
    optionsEn: ['Asia', 'Africa', 'Europe', 'South America'],
    optionsHe: ['אַסְיָה', 'אַפְרִיקָה', 'אֵירוֹפָּה', 'אמריקה הדרומית'],
    answerIndex: 1,
    explanationEn: 'Egypt is located in northeastern Africa, famous for the Nile River and ancient Pyramids.',
    explanationHe: 'מצרים נמצאת בצפון-מזרח אפריקה, ומפורסמת בזכות נהר הנילוס והפירמידות העתיקות.',
    hintEn: 'It is the same continent where lions and giraffes roam free.',
    hintHe: 'זו אותה יבשת שבה אריות וג\'ירפות מסתובבים חופשי.'
  },
  {
    id: 'link-8-3',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'What is the capital city of Israel?',
    questionHe: 'מָהִי עִיר הַבִּירָה שֶׁל יִשְׂרָאֵל?',
    optionsEn: ['Tel Aviv', 'Haifa', 'Jerusalem', 'Eilat'],
    optionsHe: ['תֵּל אָבִיב', 'חֵיפָה', 'יְרוּשָׁלַיִם', 'אֵילַת'],
    answerIndex: 2,
    explanationEn: 'Jerusalem is the historical capital of Israel, home to the Western Wall and Knesset.',
    explanationHe: 'ירושלים היא עיר הבירה של ישראל, ובה שוכנים הכותל המערבי והכנסת.',
    hintEn: 'It is known as the city of gold.',
    hintHe: 'היא מוכרת גם כעיר של זהב.'
  },
  {
    id: 'link-8-4',
    category: 'Animals',
    ageGroup: '8-13',
    questionEn: 'What is the fastest land animal in the world, capable of running up to 120 km/h?',
    questionHe: 'מַהוּ בַּעַל הַחַיִּים הַמָּהִיר בְּיוֹתֵר בַּיַּבָּשָׁה, הַמְּסֻגָּל לָרוּץ בִּמְהִירוּת שֶׁל עַד 120 קמ"ש?',
    optionsEn: ['Lion', 'Cheetah', 'Horse', 'Greyhound'],
    optionsHe: ['אַרְיֵה', 'בַּרְדְּלָס (צִ׳יטָה)', 'סוּס', 'כֶּלֶב רוּחַ'],
    answerIndex: 1,
    explanationEn: 'The Cheetah (or Bardelas) is incredibly fast due to its flexible spine, long legs, and lightweight body!',
    explanationHe: 'הברדלס (צ\'יטה) הוא מהיר בטירוף הודות לעמוד השדרה הגמיש והגוף הקל שלו!',
    hintEn: 'It is a big spotted cat with teardrop stripes on its face.',
    hintHe: 'חתול גדול ומנוקד עם פסי דמעות שחורים על הפנים שלו.'
  },
  {
    id: 'link-8-5',
    category: 'GeneralKnowledge',
    ageGroup: '8-13',
    questionEn: 'What beautiful color is the emerald gemstone (Bareket)?',
    questionHe: 'בְּאֵיזֶה צֶבֶע מַדְהִימִים הִיא אֶבֶן הַחֵן בָּרֶקֶת (אִזְמָרַגְדְּ)?',
    optionsEn: ['Red', 'Blue', 'Green', 'Yellow'],
    optionsHe: ['אָדֹם', 'כָּחֹל', 'יָרֹק', 'צָהֹב'],
    answerIndex: 2,
    explanationEn: 'Emeralds are precious gemstones famous for their vibrant green color.',
    explanationHe: 'ברקת (אזמרגד) היא אבן חן יקרה המפורסמת בצבע הירוק העמוק והבוהק שלה.',
    hintEn: 'It is the same color as grass and leaves.',
    hintHe: 'זהו אותו צבע של דשא ועלים.'
  },
  {
    id: 'link-8-6',
    category: 'Science',
    ageGroup: '8-13',
    questionEn: 'Which organ in the human body is responsible for pumping blood to all parts of the body?',
    questionHe: 'אֵיזֶה אֵבָר בְּגוּף הָאָדָם אַחְרָאִי על הַזְרָמַת הַדָּם לְכָל חֶלְקֵי הַגּוּף?',
    optionsEn: ['Brain', 'Lungs', 'Heart', 'Stomach'],
    optionsHe: ['מוֹחַ', 'רֵאוֹת', 'לֵב', 'קֵבָה'],
    answerIndex: 2,
    explanationEn: 'The heart is a strong muscular pump that beats non-stop to keep blood flowing and supply oxygen!',
    explanationHe: 'הלב הוא משאבה שרירית חזקה הפועמת ללא הפסקה כדי להזרים דם וחמצן לכל הגוף!',
    hintEn: 'It is located in your chest and beats like a drum: lub-dub, lub-dub.',
    hintHe: 'הוא נמצא בתוך החזה ופועם כמו תוף.'
  },
  {
    id: 'link-8-7',
    category: 'GeneralKnowledge',
    ageGroup: '8-13',
    questionEn: 'Who wrote the famous series of fantasy books about the wizard Harry Potter?',
    questionHe: 'מִי כָּתְבָה אֶת סִדְרַת סִפְרֵי הַפַנְטַזְיָה הַמְּפֻרְסֶמֶת עַל הַקּוֹסֵם הָארִי פּוֹטֶר?',
    optionsEn: ['J.K. Rowling', 'Roald Dahl', 'C.S. Lewis', 'J.R.R. Tolkien'],
    optionsHe: ['גֵּ׳יי קֵיי רוֹלִינְג', 'רוֹאָלְד דָּאל', 'קְלַיְיב סְטֵיְיפְּלְס לוּאִיס', 'גֵּ׳יי רָאר טוֹלְקִין'],
    answerIndex: 0,
    explanationEn: "J.K. Rowling wrote all seven Harry Potter books, starting with 'Harry Potter and the Philosopher's Stone'.",
    explanationHe: "ג'יי קיי רולינג הבריטית כתבה את כל שבעת ספרי הארי פוטר!",
    hintEn: 'Her initials are J.K.',
    hintHe: 'ראשי התיבות של שמה הם ג\'יי קיי.'
  },
  {
    id: 'link-8-8',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'Which is the southernmost city in Israel, famous for its Red Sea coral reefs?',
    questionHe: 'מָהִי הָעִיר הַדְּרוֹמִית בְּיוֹתֵר בְּיִשְׂרָאֵל, הַמְּפֻרְסֶמֶת בְּחוֹפֵי הַיָּם הָאָדֹם, הַשְּׁנִיּוֹת וְהַשֶּׁמֶשׁ?',
    optionsEn: ['Haifa', 'Tel Aviv', 'Eilat', 'Tiberias'],
    optionsHe: ['חֵיפָה', 'תֵּל אָבִיב', 'אֵילַת', 'טְבֶרְיָה'],
    answerIndex: 2,
    explanationEn: 'Eilat is a gorgeous resort city at the southern tip of Israel, on the coast of the Red Sea.',
    explanationHe: 'אילת היא עיר נופש מהממת בקצה הדרומי של ישראל, השוכנת לחופו של הים האדום.',
    hintEn: "Its name sounds like 'Ay-lat'.",
    hintHe: "השם שלה מתחיל באות א' ומסתיים ב-ת'."
  },
  {
    id: 'link-8-9',
    category: 'Geography',
    ageGroup: '8-13',
    questionEn: 'What is the capital city of Italy, famous for the ancient Colosseum?',
    questionHe: 'מָהִי עִיר הַבִּירָה שֶׁל אִיטַלְיָה, הַמְּפֻרְסֶמֶת בְּקוֹלוֹסֵיאוּם הָעַתִּיק שֶׁלָּהּ?',
    optionsEn: ['Paris', 'Madrid', 'Rome', 'Athens'],
    optionsHe: ['פָּרִיז', 'מַדְרִיד', 'רוֹמָא', 'אַתּוּנָה'],
    answerIndex: 2,
    explanationEn: 'Rome is the capital of Italy, filled with ancient history and delicious food like pizza and pasta.',
    explanationHe: 'רומא היא בירת איטליה, עשירה בהיסטוריה עתיקה ומאכלים טעימים כמו פיצה ופסטה.',
    hintEn: "The name starts with the letter 'R'.",
    hintHe: "השם שלה מתחיל באות ר'."
  },
  // ==================== NEW ROAD SIGN VISUAL QUESTIONS ====================
  // Age Group 5-7
  {
    id: 'visual-5-speed-limit',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'Look at this circular sign with the number 50. What does it mean?',
    questionHe: 'הַבִּיטוּ בַּתַּמְרוּר הָעָגֹל עִם הַמִּסְפָּר 50. מָה מַשְׁמָעוּתוֹ?',
    optionsEn: ['The maximum speed you can drive is 50 km/h', 'You must count to 50', 'There are 50 playgrounds ahead', 'The car must weigh 50 tons'],
    optionsHe: ['הַמְּהִירוּת הַמֵּרַבִּית הַמֻּתֶּרֶת הִיא 50 קמ"ש', 'עֲלֵיכֶם לִסְפֹּר עַד 50', 'יֵשׁ 50 גִּנּוֹת שַׁעֲשׁוּעִים לְפָנֵיכֶם', 'הַמְּכוֹנִית חַיֶּבֶת לִשְׁקֹל 50 טוֹן'],
    answerIndex: 0,
    explanationEn: 'This is a speed limit sign. It tells drivers that the fastest they can legally drive here is 50 kilometers per hour!',
    explanationHe: 'זהו תמרור הגבלת מהירות. הוא מורה לנהגים שהמהירות המרבית המותרת בכביש זה היא 50 קילומטרים לשעה!',
    hintEn: 'It represents a number of speed.',
    hintHe: 'זה קשור למהירות של נסיעה במכונית.',
    visualType: 'speed-limit-50-sign'
  },
  {
    id: 'visual-5-parking',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'What does this blue square sign with a white letter "P" mean?',
    questionHe: 'מָה מַשְׁמָעוּת הַתַּמְרוּר הַמְּרֻבָּע הַכָּחֹל עִם הָאוֹת הַלְּבָנָה P?',
    optionsEn: ['Parking lot - you can park here!', 'Playground - come and play!', 'Pizza shop is close!', 'Police station ahead!'],
    optionsHe: ['מִגְרַשׁ חֲנִיָּה - מֻתָּר לַחֲנוֹת כָּאן!', 'גִּנַּת שָׂחֵק - בּוֹאוּ לְשַׂחֵק!', 'חֲנוּת פִּיצָה קְרוֹבָה!', 'תַּחֲנַת מִשְׁטָרָה לְפָנֵיכֶם!'],
    answerIndex: 0,
    explanationEn: 'The letter "P" stands for Parking! This sign shows drivers where they can safely park their cars.',
    explanationHe: 'האות P מייצגת חנייה (Parking)! תמרור זה מציג לנהגים היכן מותר להם להחנות את המכונית בבטחה.',
    hintEn: 'P is for Parking!',
    hintHe: 'האות פ היא באנגלית ומסמלת חנייה.',
    visualType: 'parking-sign'
  },
  {
    id: 'visual-5-one-way',
    category: 'GeneralKnowledge',
    ageGroup: '5-7',
    questionEn: 'This blue rectangle has a big white arrow pointing up. What is it?',
    questionHe: 'לַתַּמְרוּר הַכָּחֹל הַזֶּה יֵשׁ חֵץ לָבָן גָּדוֹל הַמַּצְבִּיעַ לְמַעְלָה. מָה זֶה?',
    optionsEn: ['A one-way street - only drive in the direction of the arrow!', 'Rocket launch site!', 'Fly up into the sky!', 'The elevator is going up!'],
    optionsHe: ['כְּבִישׁ חַד-סִטְרִי - מֻתָּר לִנְסֹעַ רַק בִּכִּוּוּן הַחֵץ!', 'אֲתָר שִׁגּוּר רָקֵטוֹת!', 'טוּסוּ לְמַעְלָה אֶל הַשָּׁמַיִם!', 'הַמַּעֲלִית עוֹלָה לְמַעְלָה!'],
    answerIndex: 0,
    explanationEn: 'A one-way sign tells drivers that traffic moves only in the direction of the arrow, making it safer for everyone!',
    explanationHe: 'תמרור כביש חד-סטרי מורה לנהגים שהתנועה מותרת אך ורק בכיוון שאליו מצביע החץ, לשמירה על הבטיחות!',
    hintEn: 'Only one direction is allowed.',
    hintHe: 'זהו רחוב שבו נוסעים רק לכיוון אחד.',
    visualType: 'one-way-sign'
  },
  // Age Group 8-13
  {
    id: 'visual-8-no-u-turn',
    category: 'GeneralKnowledge',
    ageGroup: '8-13',
    questionEn: 'What does this circular sign with a crossed-out curved arrow mean?',
    questionHe: 'מָה מַשְׁמָעוּת הַתַּמְרוּר הָעָגֹל עִם הַחֵץ הַמְּעֻקָּל וְהַקַּו הָאָדֹם הַחוֹצֶה אוֹתוֹ?',
    optionsEn: ['U-Turn is forbidden', 'You must turn left', 'Rollercoaster ahead', 'No bikes allowed'],
    optionsHe: ['פְּנִיַּת פַּרְסָה אֲסוּרָה', 'חוֹבָה לִפְנוֹת שְׂמֹאלָה', 'רַכֶּבֶת הָרִים לְפָנֵיכֶם', 'אֵין כְּנִיסָה לְאוֹפַנַּיִם'],
    answerIndex: 0,
    explanationEn: 'The red slash across the curved arrow means U-Turns are dangerous and strictly forbidden at this intersection.',
    explanationHe: 'הקו האדום האלכסוני על גבי החץ המעוקל פירושו שפניית פרסה היא מסוכנת ואסורה בהחלט בצומת זה.',
    hintEn: 'The shape is a U.',
    hintHe: 'זה קשור לפניית פרסה (חזרה לאחור).',
    visualType: 'no-u-turn-sign'
  },
  {
    id: 'visual-8-roundabout',
    category: 'GeneralKnowledge',
    ageGroup: '8-13',
    questionEn: 'What does this blue sign with three circular white arrows mean?',
    questionHe: 'מָה מַשְׁמָעוּת הַתַּמְרוּר הַכָּחֹל עִם שְׁלוֹשָׁה חִצִּים לְבָנִים בְּמַעְגָּל?',
    optionsEn: ['A roundabout (circular intersection) is ahead', 'Recycling center ahead', 'A wind turbine is nearby', 'Tornado warning!'],
    optionsHe: ['מַעְגַּל תְּנוּעָה לְפָנֵיכֶם', 'מֶרְכַּז מִחְזוּר לְפָנֵיכֶם', 'טוּרְבִּינַת רוּחַ קְרוֹבָה', 'אַזְהָרַת סוּפַת טוֹרְנָדוֹ!'],
    answerIndex: 0,
    explanationEn: 'This is a Roundabout sign! It means drivers should slow down and prepare to enter a circular junction, giving priority to vehicles already inside.',
    explanationHe: 'זהו תמרור מעגל תנועה! הוא מסמן לנהגים להאט ולהיערך לכניסה למעגל, תוך מתן זכות קדימה לרכבים שכבר נמצאים בתוכו.',
    hintEn: 'It is a circle of traffic.',
    hintHe: 'זה נקרא לפעמים "כיכר".',
    visualType: 'roundabout-sign'
  },
  {
    id: 'visual-8-school-zone',
    category: 'GeneralKnowledge',
    ageGroup: '8-13',
    questionEn: 'Look at this triangle sign with children walking. What should a driver do?',
    questionHe: 'הַבִּיטוּ בְּתַמְרוּר הַמְּשֻׁלָּשׁ עִם דְּמֻיּוֹת שֶׁל יְלָדִים הוֹלְכִים. מָה עַל הַנָּהָג לַעֲשׂוֹת?',
    optionsEn: ['Slow down and watch closely for children crossing the street', 'Honk the horn very loudly', 'Drive as fast as possible to pass quickly', 'Stop the car and get out'],
    optionsHe: ['לְהָאֵט אֶת הַנְּסִיעָה וּלְחַפֵּשׂ בִּקְפִידָה יְלָדִים הַחוֹצִים אֶת הַכְּבִישׁ', 'לִצְפֹּר בְּקוֹל רָם מְאֹד', 'לִנְסֹעַ מַהֵר כְּכָל הָאֶפְשָׁר כְּדֵי לַעֲבֹר מַהֵר', 'לַעֲצֹר אֶת הַמְּכוֹנִית וְלָצֵאת מִמֶּנָּה'],
    answerIndex: 0,
    explanationEn: 'This warning sign indicates that children are likely to be crossing the road nearby (e.g. near schools or parks). Drivers must slow down and be extremely alert!',
    explanationHe: 'תמרור אזהרה זה מציין כי בסביבה קרובה (כמו ליד בתי ספר או גנים) עשויים לעבור ילדים את הכביש. על הנהגים להאט ולהיות ערניים במיוחד!',
    hintEn: 'Drive safely near schools!',
    hintHe: 'הכי חשוב לשמור על הילדים שבסביבה.',
    visualType: 'school-zone-sign'
  },
  // Age Group 13+
  {
    id: 'visual-13-slippery',
    category: 'GeneralKnowledge',
    ageGroup: '13+',
    questionEn: 'What warning does this triangle sign with a sliding car represent?',
    questionHe: 'אֵיזוֹ אַזְהָרָה מְיַצֵּג תַּמְרוּר הַמְּשֻׁלָּשׁ עִם הַמְּכוֹנִית הַמַּחְלִיקָה?',
    optionsEn: ['The road ahead can be extremely slippery when wet or icy', 'Car stunts area ahead', 'You must drift your car here', 'Car washing station nearby'],
    optionsHe: ['הַכְּבִישׁ לְפָנֵיכֶם עָלוּל לִהְיוֹת חָלָק מְאֹד בִּרְטִיבוּת אוֹ קֶרַח', 'אֵזור פַּעֲלוּלֵי מְכוֹנִיּוֹת לְפָנֵיכֶם', 'עֲלֵיכֶם לְבַצֵּעַ דְרִיפְטִים כָּאן', 'תַּחֲנַת שְׁטִיפַת מְכוֹנִיּוֹת קְרוֹבָה'],
    answerIndex: 0,
    explanationEn: 'This is a Slippery Road warning. Drivers should reduce their speed, avoid sudden braking or sharp steering which could cause loss of control.',
    explanationHe: 'זהו תמרור אזהרה מפני כביש חלק. על הנהגים להפחית מהירות ולהימנע מבלימות פתע או פניות חדות שעלולות לגרום לאובדן שליטה.',
    hintEn: 'Rain or ice can make this road dangerous.',
    hintHe: 'זה קורה כשנוסעים מהר על כביש רטוב או קפוא.',
    visualType: 'slippery-road-sign'
  },
  {
    id: 'visual-13-train-crossing',
    category: 'GeneralKnowledge',
    ageGroup: '13+',
    questionEn: 'What does this warning sign showing an old steam locomotive warn about?',
    questionHe: 'מִפְּנֵי מָה מַזְהִיר תַּמְרוּר מְשֻׁלָּשׁ זֶה הַמַּצִּיג רַכֶּבֶת קִיטוֹר עַתִּיקָה?',
    optionsEn: ['A railway level crossing ahead without gates', 'Steam train museum nearby', 'Coal loading station', 'Toy train ride path'],
    optionsHe: ['מִפְגַּשׁ מְסִילַת בַּרְזֶל לְפָנֵיכֶם (מַחְסוֹם רַכֶּבֶת לְלֹא שַׁעַר)', 'מוּזֵיאוֹן רַכָּבוֹת קִיטוֹר קָרוֹב', 'תַּחֲנַת טְעִינַת פֶּחָם לְפָנֵיכֶם', 'מַסְלוּל רַכֶּבֶת צַעֲצוּעַ'],
    answerIndex: 0,
    explanationEn: 'This sign warns drivers that a railway crossing (level crossing) is ahead without active safety barriers or gates, requiring utmost caution and looking both ways!',
    explanationHe: 'תמרור זה מזהיר נהגים מפני מפגש מסילת ברזל ללא מחסום פיזי קרוב, ומחייב זהירות מרבית, עצירה והסתכלות לשני הכיוונים!',
    hintEn: 'Watch out for heavy cargo and passenger trains!',
    hintHe: 'מקום שבו מסילת הרכבת חוצה את כביש המכוניות.',
    visualType: 'train-crossing-sign'
  },
  {
    id: 'visual-13-no-parking',
    category: 'GeneralKnowledge',
    ageGroup: '13+',
    questionEn: 'Look at this blue circular sign with a red border and a single diagonal red slash. What does it mean?',
    questionHe: 'הַבִּיטוּ בַּתַּמְרוּר הָעָגֹל הַכָּחֹל עִם הַמִּסְגֶּרֶת הָאֲדֻמָּה וְהַקַּו הָאָלְכְּסוֹנִי הָאָדֹם הַיָּחִיד. מָה מַשְׁמָעוּתוֹ?',
    optionsEn: ['No Parking (stopping to load/unload passengers is usually allowed)', 'No Stopping at all', 'One-way traffic only', 'National border crossing'],
    optionsHe: ['אִסּוּר חֲנִיָּה (אַךְ פְרִיקָה וּטְעִינָה מֻתֶּרֶת)', 'אִסּוּר עֲצִירָה מֻחְלָט לְכָל מַטָּרָה', 'תְּנוּעָה חַד-סִטְרִית בִּלְבַד', 'מַעֲבָר גְּבוּל בֵּין-לְאֻמִּי'],
    answerIndex: 0,
    explanationEn: 'This is the No Parking sign. It prohibits leaving your vehicle parked, though brief stops to let passengers in or out are generally permitted.',
    explanationHe: 'זהו תמרור "אין לחנות". הוא אוסר על חניית רכב בצידי הדרך, אך עצירות קצרות להעלאת או הורדת נוסעים לרוב מותרות.',
    hintEn: 'You can drop someone off, but do not leave your car here!',
    hintHe: 'מותר לעצור לרגע קט, אבל אסור להשאיר שם את הרכב לזמן ממושך.',
    visualType: 'no-parking-sign'
  }
];

