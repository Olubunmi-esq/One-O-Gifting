export interface CuteMessage {
  id: string
  category: 'Christmas & December' | 'Birthday' | 'Love & Romance' | 'Appreciation & Thanks' | 'Big Wins & Success' | 'Sweet & Everyday'
  title: string
  text: string
  tag: string
}

export const CUTE_GIFT_MESSAGES: CuteMessage[] = [
  // Christmas & December Holiday
  {
    id: 'xmas-1',
    category: 'Christmas & December',
    title: 'Blessed December & Warm Holidays',
    text: 'Wishing you a December filled with warmth, peace, and endless reasons to smile. May your new year shine as bright as gold! Merry Christmas! 🎄✨',
    tag: 'Festive & Joyful'
  },
  {
    id: 'xmas-2',
    category: 'Christmas & December',
    title: 'Thank You for Being a Blessing',
    text: 'Looking back at this year, having you in my life has been one of the biggest blessings. Enjoy this special season and rest well! ❤️',
    tag: 'Heartfelt'
  },
  {
    id: 'xmas-3',
    category: 'Christmas & December',
    title: 'Joy, Laughter & Good Food',
    text: 'May your home be filled with good food, sweet laughter, and answered prayers this festive season. Happy Holidays! 🌟',
    tag: 'Warm Family'
  },

  // Birthday
  {
    id: 'bday-1',
    category: 'Birthday',
    title: 'My Favorite Person in the World',
    text: 'Happy Birthday to my favorite human! You make life so much brighter and sweeter. Today is all about celebrating you! 🎂🎉',
    tag: 'Super Sweet'
  },
  {
    id: 'bday-2',
    category: 'Birthday',
    title: 'Keep Shining Like Pure Gold',
    text: 'Another year bolder, wiser, and more gorgeous. May your new age unlock doors of favor, peace, and pure joy. Happy Birthday! 💖',
    tag: 'Inspirational'
  },
  {
    id: 'bday-3',
    category: 'Birthday',
    title: 'Birthday Pampering & Love',
    text: 'A little handmade gift to remind you how deeply loved and cherished you are today and every single day. Have the best birthday! 🌸',
    tag: 'Pampering'
  },

  // Love & Romance
  {
    id: 'love-1',
    category: 'Love & Romance',
    title: 'To My Forever Person',
    text: 'Loving you is the easiest and sweetest decision I make every day. Thank you for being my peace, my partner, and my heart. Forever yours. 💍❤️',
    tag: 'Deep Romance'
  },
  {
    id: 'love-2',
    category: 'Love & Romance',
    title: 'Happy Anniversary, My Soulmate',
    text: 'Through every chapter, every laugh, and every dream, doing life with you is my greatest gift. Happy Anniversary, my darling! ✨',
    tag: 'Anniversary'
  },
  {
    id: 'love-3',
    category: 'Love & Romance',
    title: 'You Have My Whole Heart',
    text: 'Just a little reminder that no matter where the day takes you, you are always on my mind and forever in my heart. I love you! 🥰',
    tag: 'Cute & Tender'
  },

  // Appreciation & Thanks
  {
    id: 'thanks-1',
    category: 'Appreciation & Thanks',
    title: 'More Grateful Than Words Can Say',
    text: 'Thank you for your tireless sacrifice, guidance, and huge heart. People like you make the world a warmer place. God bless you! 🙏✨',
    tag: 'Pastor & Mentor'
  },
  {
    id: 'thanks-2',
    category: 'Appreciation & Thanks',
    title: 'For Always Being in My Corner',
    text: 'Thank you for believing in me, pushing me forward, and always cheering me on. I truly appreciate you from the bottom of my heart! 🌟',
    tag: 'Gratitude'
  },
  {
    id: 'thanks-3',
    category: 'Appreciation & Thanks',
    title: 'A Little Token of Big Thanks',
    text: 'Words alone cannot repay your kindness. Please accept this thoughtful handmade gift as my heartfelt thank you. 🙏💐',
    tag: 'Gentle Thanks'
  },

  // Big Wins & Success
  {
    id: 'wins-1',
    category: 'Big Wins & Success',
    title: 'So Incredibly Proud of You!',
    text: 'You worked hard, stayed consistent, and now the win is here! So proud of your new milestone. Keep shining and breaking boundaries! 🚀🏆',
    tag: 'Promotion / Call to Bar'
  },
  {
    id: 'wins-2',
    category: 'Big Wins & Success',
    title: 'New House, Endless Blessings',
    text: 'Congratulations on your beautiful new space! May this home be filled with laughter, peace, divine protection, and sweet memories. 🏡💫',
    tag: 'New House'
  },

  // Sweet & Everyday
  {
    id: 'sweet-1',
    category: 'Sweet & Everyday',
    title: 'Just Because You Deserve Nice Things',
    text: 'No special reason, just wanted to put a big smile on your face and remind you how special you are to me! Have a wonderful day! 🌸✨',
    tag: 'Surprise'
  },
  {
    id: 'sweet-2',
    category: 'Sweet & Everyday',
    title: 'A Melody in My Heart',
    text: 'May your hands never lose their melody and may every chord you strike lift spirits and inspire hearts. Keep making wonderful music! 🎸🎵',
    tag: 'Musician'
  }
]
