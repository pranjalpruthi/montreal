import { QuoteDisplay } from './QuoteDisplay'

const quotes = [
  {
    text: "A temple means a chance for everyone to hear about Krishna.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.2.17, Vrindavan, October 28, 1972",
    category: "Why Visit a Temple"
  },
  {
    text: "Come to the temple, chant Hare Krishna, hear about Krishna, and take prasadam—your life will become perfect.",
    citation: "Lecture on Bhagavad-gītā 4.26, Bombay, April 12, 1974",
    category: "Why Visit a Temple"
  },
  {
    text: "If you simply come to the temple, you will be purified.",
    citation: "Lecture on Śrīmad-Bhāgavatam 3.25.25, Bombay, November 28, 1974",
    category: "Why Visit a Temple"
  },
  {
    text: "Just by visiting a temple, you make spiritual advancement.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.8.20, Los Angeles, April 16, 1973",
    category: "Why Visit a Temple"
  },
  {
    text: "The atmosphere in the temple is spiritual. If you come and stay for some time you will feel the difference.",
    citation: "Morning Walk, Los Angeles, January 13, 1974",
    category: "Why Visit a Temple"
  },
  {
    text: "Wherever we open a center, that place becomes Vaikuṇṭha.",
    citation: "Lecture, London, July 30, 1972",
    category: "Importance of Temples"
  },
  {
    text: "The temple is a place where people get the chance to hear about Krishna. That is our mission.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.2.17, Vrindavan, October 28, 1972",
    category: "Importance of Temples"
  },
  {
    text: "We are opening these temples so that people may take advantage of this movement and make their lives successful.",
    citation: "Lecture on Bhagavad-gītā 4.7, Bombay, March 29, 1974",
    category: "Importance of Temples"
  },
  {
    text: "A temple is a sacred place where the devotees can always remember Krishna and teach others to remember Krishna.",
    citation: "Lecture on Śrīmad-Bhāgavatam 3.25.20, Bombay, November 18, 1974",
    category: "Importance of Temples"
  },
  {
    text: "The temple is the place for getting liberation from material bondage.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.7.6, Vrindavan, September 9, 1976",
    category: "Importance of Temples"
  },
  {
    text: "We are opening centers so that people may become educated in spiritual life.",
    citation: "Lecture on Bhagavad-gītā 3.26, Bombay, December 28, 1972",
    category: "Purpose of Opening Centers"
  },
  {
    text: "This Kṛṣṇa consciousness movement is opening centers everywhere so that people may take advantage and perfect their lives.",
    citation: "Morning Walk, Mayapur, February 3, 1976",
    category: "Purpose of Opening Centers"
  },
  {
    text: "Our temples are not for business. They are places for people to come and learn how to love Krishna.",
    citation: "Room Conversation, Bombay, January 5, 1977",
    category: "Purpose of Opening Centers"
  },
  {
    text: "These centers are meant to give everyone a chance to hear and glorify the Lord.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.6.34, Los Angeles, July 21, 1971",
    category: "Purpose of Opening Centers"
  },
  {
    text: "By associating with devotees in the temple one becomes purified.",
    citation: "Lecture on Śrīmad-Bhāgavatam 3.25.25, Bombay, November 28, 1974",
    category: "Power of Association in the Temple"
  },
  {
    text: "The temple is meant for association with devotees and hearing about Krishna. That is the perfection of life.",
    citation: "Lecture on Śrīmad-Bhāgavatam 1.2.10, Vrindavan, October 23, 1972",
    category: "Power of Association in the Temple"
  },
  {
    text: "Association with devotees is the most valuable asset in the human form of life.",
    citation: "Lecture on Caitanya-caritāmṛta Madhya 22.83, Hyderabad, November 17, 1972",
    category: "Power of Association in the Temple"
  },
  {
    text: "Come to the temple, associate with devotees, chant Hare Krishna, and gradually everything will become clear.",
    citation: "Morning Walk, Los Angeles, December 14, 1973",
    category: "Power of Association in the Temple"
  },
  {
    text: "Chant, dance, take prasadam, and be happy.",
    citation: "Public Lecture, Los Angeles, 1973",
    category: "Short Quotes"
  },
  {
    text: "Krishna consciousness is the joyful process.",
    citation: "Bhagavad-gītā Introduction Lecture, New York, 1966",
    category: "Short Quotes"
  },
  {
    text: "Krishna is your best friend.",
    citation: "Room Conversation, Mayapur, March 6, 1976",
    category: "Short Quotes"
  },
  {
    text: "Human life is meant for understanding God.",
    citation: "Lecture on Bhagavad-gītā 2.13, New York, November 28, 1966",
    category: "Short Quotes"
  }
]

export function PrabhupadaQuotes() {
  return (
    <div className="flex flex-col items-center lg:items-start space-y-8 h-full">
      <div className="text-center lg:text-left space-y-2 max-w-xl">
        <h3 className="text-3xl font-bold tracking-tight">Srila Prabhupāda Speaks</h3>
      </div>

      <div className="w-full h-full flex justify-center lg:justify-start">
        <QuoteDisplay quotes={quotes} />
      </div>
    </div>
  )
}
