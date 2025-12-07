import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useIsMobile } from '@/hooks/use-mobile';
import { ModernBookCover } from '@/components/cuicui/modern-book-cover';
import { Badge } from '@/components/ui/badge';
import { FlipButton } from '@/components/animate-ui/buttons/flip';
import { LiquidButton } from '@/components/animate-ui/buttons/liquid';
import { BookOpen, Eye, Download, Heart, QuoteIcon } from 'lucide-react';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { InView } from '@/components/motion-primitives/in-view';
import ia77Cover from '@/assets/extra/ia77cover.png';
import wwokCover from '@/assets/extra/wwok.webp';
import usuageCover from '@/assets/extra/usuagecover.webp';
import ia77Pdf from '@/assets/books/IA77.pdf';
import wwokPdf from '@/assets/books/WWOK.pdf';
import usuagePdf from '@/assets/books/Usage of BBT Books – ISKM Position Paper.pdf';
import adReplyCover from '@/assets/extra/ADReplycover.webp';
import adReplyPdf from '@/assets/books/ADReply.pdf';

const springTransition = {
  stiffness: 350,
  damping: 25,
  mass: 0.8,
};

// Function to generate a unique order number
const generateOrderNumber = (prefix: string) => {
  const timestamp = Date.now();
  const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${randomSuffix}`;
};

interface BookDetailData {
  id: string;
  orderIdPrefix: string;
  title: string;
  subtitle: string;
  coverImage: string;
  description: string;
  badges: string[];
  ebookPreviewLink?: string;
  previewPdfPath?: string;
  productLink?: string;
  playlistLink?: string;
  whatsAppNumber: string;
  baseWhatsAppMessageTemplate: string;
  price: React.ReactNode;
  shippingNote?: string;
  quote?: {
    text: string;
    source: string;
  };

  color?: string;
}

const gitaJayantiBookDetails: BookDetailData = {
  id: "gita-jayanti",
  orderIdPrefix: "GITA",
  title: "Bhagavad-gītā As It Is",
  subtitle: "Gītā Jayantī Special Edition",
  coverImage: "/thumbnails/bg-fr-cover.jpg",
  description: "Sponsor or purchase a Bhagavad-gītā this Gītā Jayantī. 3,000 copies arriving soon. Your contribution places the absolute truth in someone's hands.",
  badges: ["Gītā Jayantī", "Special Offer", "Limited Time"],

  productLink: "https://square.link/u/iLHo1ycl?src=sheet",
  whatsAppNumber: "12633807303",
  baseWhatsAppMessageTemplate: `Hare Kṛṣṇa! prabhu
 Dandwat pranam, please accept my humble obesiances
 All Glories to Śrīla Prabhupāda!

 I would like to order/sponsor Bhagavad-gītā for Gītā Jayantī.
 My Temple Site Order Number is: `,
  price: <div className="flex items-baseline gap-2"><span className="line-through text-muted-foreground text-lg">$30 CAD</span><span>$15 CAD</span></div>,
  shippingNote: "(per book sponsored) or order at home",
  quote: {
    text: "Prāṇair arthair dhiyā vācāḥ. You have to employ your life, your money, your words, and your intelligence, all for Kṛṣṇa. That is Kṛṣṇa consciousness. If you have got enough money, spend it for Kṛṣṇa. Don't stock it. The more you spend, more you become balanceless for spending Kṛṣṇa, then more you are benefited. This is the process.",
    source: "(Śrila Prabhupāda, Dec. 20th, 1968, Los Angeles)"
  },
  color: "orange"
};

const ia77BookDetails: BookDetailData = {
  id: "ia77",
  orderIdPrefix: "IA77",
  title: "Initiations After 1977",
  subtitle: "Understanding Srila Prabhupada's Directives",
  coverImage: ia77Cover,
  description: "A definitive guide navigating spiritual initiation in ISKCON. Explores the Rtvik system based on evidence and wisdom, fostering clarity, unity, and honoring Srila Prabhupada's legacy.",
  badges: ["Essential Reading", "Printed Book", "Multilingual Edition", "French Version Available"],

  ebookPreviewLink: "https://heyzine.com/flip-book/7463036c24.html#page/18",
  previewPdfPath: ia77Pdf,
  playlistLink: "https://youtube.com/playlist?list=PLQGHF3mp1o78H-_CwnooAqyfYo8wznJjw&feature=shared",
  whatsAppNumber: "12633807303",
  baseWhatsAppMessageTemplate: `Hare Kṛṣṇa! prabhu
 Dandwat pranam, please accept my humble obesiances
 All Glories to Śrīla Prabhupāda!

 I would like to order the book "Initiations After 1977".
 My Temple Site Order Number is: `,
  price: "$50 CAD",
  shippingNote: "excluding shipping charges",
  quote: {
    text: "I have deputed the ritvik, the representative of the acharya, to act for me.",
    source: "(Letter to all G.B.C. members and Temple Presidents, July 9, 1977)"
  },
  color: "zinc"
};

const wwokBookDetails: BookDetailData = {
  id: "wwok",
  orderIdPrefix: "WWOK",
  title: "Why Worship Only Krsna?",
  subtitle: "The Ultimate Vedic Conclusion",
  coverImage: wwokCover,
  description: "Embark on a profound spiritual quest. This illuminating book delves into Vedic philosophy, presenting conclusive evidence that establishes Lord Krishna as the Supreme Personality of Godhead, the ultimate object of all worship.",
  badges: ["Spiritual Guidance", "Vedic Philosophy", "Essential Read", "French Version Available"],

  previewPdfPath: wwokPdf,

  whatsAppNumber: "12633807303",
  baseWhatsAppMessageTemplate: `Hare Kṛṣṇa! prabhu
 Dandwat pranam, please accept my humble obesiances
 All Glories to Śrīla Prabhupāda!

 I would like to order the book "Why Worship Only Krsna?".
 My Temple Site Order Number is: `,
  price: "$30 CAD",
  shippingNote: "excluding shipping charges",
  quote: {
    text: "Abandon all varieties of religion and just surrender unto Me. I shall deliver you from all sinful reactions. Do not fear.",
    source: "(Bhagavad-gītā As It Is, 18.66)"
  },
  color: "yellow"
};

const usuageBookDetails: BookDetailData = {
  id: "usuage",
  orderIdPrefix: "USAGE",
  title: "ISKM's Position on Usage of BBT Books after 1977",
  subtitle: "Understanding the fidelity and usage of post-1977 editions.",
  coverImage: usuageCover,
  description: "A pivotal publication addressing ISKM's stance on using books published by the BBT after 1977. Examines historical context and presents ISKM's perspective on the fidelity and usage of these editions.",
  badges: ["ISKM Stance", "BBT Books", "Post-1977"],

  previewPdfPath: usuagePdf,
  whatsAppNumber: "12633807303",
  baseWhatsAppMessageTemplate: `Hare Kṛṣṇa! prabhu
 Dandwat pranam, please accept my humble obesiances
 All Glories to Śrīla Prabhupāda!

 I would like to order the book "ISKM's Position on Usage of BBT Books after 1977".
 My Temple Site Order Number is: `,
  price: "Free of Cost",
  quote: {
    text: "The book is the basis. Reading of the books must be going on. And whatever is in the books, that must be introduced in our life.",
    source: "(Lecture, April 13, 1975, Hyderabad)"
  },
  color: "neutral"
};

const adReplyBookDetails: BookDetailData = {
  id: "ad-reply",
  orderIdPrefix: "ADREPLY",
  title: "Amogh Līlā Dāsa Reply",
  subtitle: "The Ultimate Showdown",
  coverImage: adReplyCover,
  description: "The publication which will be remembered as having shook ISKCON to its very core. The ultimate showdown between Amogh Līlā dāsa (ISKCON) and Tattvavit dāsa (ISKM). Preserved in its entirety, captured with every argument, every counterpoint, and with every subtle nuance intact.",
  badges: ["Spiritual Hurricane", "Debate", "Uncompromising Truth"],

  previewPdfPath: adReplyPdf,
  whatsAppNumber: "12633807303",
  baseWhatsAppMessageTemplate: `Hare Kṛṣṇa! prabhu
 Dandwat pranam, please accept my humble obesiances
 All Glories to Śrīla Prabhupāda!

 I would like to order the book "Amogh Līlā Dāsa Reply".
 My Temple Site Order Number is: `,
  price: <div className="flex flex-col"><span className="font-bold">$5 CAD <span className="text-sm font-normal text-muted-foreground">(Physical Copy)</span></span><span className="text-sm text-green-600 font-medium">Free (Ebook Download)</span></div>,
  quote: {
    text: "This is more than a book. It is history. It is a revelation. It is the ultimate testament to devotion and courage of conviction.",
    source: "(ISKM Montreal)"
  },
  color: "lotus"
};


const allBooksData: BookDetailData[] = [ia77BookDetails, wwokBookDetails, adReplyBookDetails, gitaJayantiBookDetails, usuageBookDetails];

const PDFPreview: React.FC<{ src: string }> = ({ src }) => {
  return (
    <iframe
      src={src}
      style={{ height: '100%', width: '100%', border: 'none' }}
      title="PDF Preview"
      allowFullScreen
    />
  );
};

interface BookActionButtonsProps {
  book: BookDetailData;
  whatsAppOrderUrl: string;
  onPreviewClick: (pdfUrl: string, bookTitle: string) => void;
  isMobileDevice: boolean;
  isMobileLayout: boolean;
}

const BookActionButtons: React.FC<BookActionButtonsProps> = ({
  book,
  whatsAppOrderUrl,
  onPreviewClick,
  isMobileDevice,
  isMobileLayout,
}) => {
  const containerClasses = isMobileLayout
    ? "pt-6 flex flex-wrap gap-4 items-center justify-center shrink-0 w-full"
    : "pt-2 flex flex-wrap gap-4 items-center justify-start lg:justify-end shrink-0";

  const getButtonColors = (color?: string) => {
    if (color === 'lotus') {
      return {
        front: "bg-pink-100 hover:bg-pink-200 dark:bg-pink-900/30 dark:hover:bg-pink-900/50",
        text: "text-pink-700 dark:text-pink-300"
      };
    }
    return {
      front: "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700",
      text: "text-slate-700 dark:text-slate-300"
    };
  };

  const buttonColors = getButtonColors(book.color);

  return (
    <div className={containerClasses}>
      <a href={whatsAppOrderUrl} target="_blank" rel="noopener noreferrer">
        <LiquidButton
          variant="whatsapp"
          className="w-24 h-24 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg"
        >
          <IconBrandWhatsapp className="size-10" stroke={2} />
          <span className="text-xs font-semibold">Order</span>
        </LiquidButton>
      </a>

      {book.productLink && (
        <a href={book.productLink} target="_blank" rel="noopener noreferrer">
          <FlipButton
            className="w-24 h-24 p-2 rounded-2xl text-white shadow-lg"
            frontClassName="bg-orange-600 hover:bg-orange-700"
            backClassName="bg-orange-800"
            frontContent={
              <div className="flex flex-col items-center justify-center gap-1">
                {book.id === 'gita-jayanti' ? <Heart className="size-10" /> : <Eye className="size-10" />}
                <span className="text-xs font-semibold text-center">{book.id === 'gita-jayanti' ? 'Donate' : 'Product Page'}</span>
              </div>
            }
            backContent={<span className="text-sm font-bold">{book.id === 'gita-jayanti' ? 'Donate Now' : 'View Now'}</span>}
          />
        </a>
      )}

      {book.previewPdfPath &&
        (isMobileDevice ? (
          <a href={book.previewPdfPath} download={`${book.title.replace(/\s+/g, '_')}-Preview.pdf`}>
            <FlipButton
              className="w-24 h-24 p-2 rounded-2xl shadow-lg"
              frontClassName={buttonColors.front}
              backClassName="bg-primary text-primary-foreground"
              frontContent={
                <div className={`flex flex-col items-center justify-center gap-1 ${buttonColors.text}`}>
                  <Download className="size-10" />
                  <span className="text-xs font-semibold">Download</span>
                </div>
              }
              backContent={<span className="text-sm font-bold">Get PDF</span>}
            />
          </a>
        ) : (
          <>
            <FlipButton
              className="w-24 h-24 p-2 rounded-2xl shadow-lg"
              frontClassName="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
              backClassName="bg-primary text-primary-foreground"
              onClick={() => onPreviewClick(book.previewPdfPath!, book.title)}
              frontContent={
                <div className="flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300">
                  <BookOpen className="size-10" />
                  <span className="text-xs font-semibold">Preview</span>
                </div>
              }
              backContent={<span className="text-sm font-bold">Open</span>}
            />
            <a href={book.previewPdfPath} download={`${book.title.replace(/\s+/g, '_')}.pdf`}>
              <FlipButton
                className="w-24 h-24 p-2 rounded-2xl shadow-lg"
                frontClassName={buttonColors.front}
                backClassName="bg-primary text-primary-foreground"
                frontContent={
                  <div className={`flex flex-col items-center justify-center gap-1 ${buttonColors.text}`}>
                    <Download className="size-10" />
                    <span className="text-xs font-semibold">Download</span>
                  </div>
                }
                backContent={<span className="text-sm font-bold">Get PDF</span>}
              />
            </a>
          </>
        ))}

      {!book.previewPdfPath && book.ebookPreviewLink && (
        <a href={book.ebookPreviewLink} target="_blank" rel="noopener noreferrer">
          <FlipButton
            className="w-24 h-24 p-2 rounded-2xl shadow-lg"
            frontClassName="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            backClassName="bg-primary text-primary-foreground"
            frontContent={
              <div className="flex flex-col items-center justify-center gap-1 text-slate-700 dark:text-slate-300">
                <Eye className="size-10" />
                <span className="text-xs font-semibold">eBook</span>
              </div>
            }
            backContent={<span className="text-sm font-bold">Read</span>}
          />
        </a>
      )}

      {book.playlistLink && (
        <a href={book.playlistLink} target="_blank" rel="noopener noreferrer">
          <LiquidButton
            variant="playlist"
            className="w-24 h-24 p-2 rounded-2xl flex flex-col items-center justify-center gap-1 shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-10"
            >
              <path d="M2.8 7.1a2.2 2.2 0 0 1 1.7-1.7C7.3 5 12 5 12 5s4.7 0 7.5.4a2.2 2.2 0 0 1 1.7 1.7c.3 2.1.3 4.9.3 4.9s0 2.8-.3 4.9a2.2 2.2 0 0 1-1.7 1.7c-2.8.4-7.5.4-7.5.4s-4.7 0-7.5-.4a2.2 2.2 0 0 1-1.7-1.7c-.3-2.1-.3-4.9-.3-4.9s0-2.8.3-4.9Z" />
              <path d="m10 9 5 3-5 3Z" />
            </svg>
            <span className="text-xs font-semibold">Playlist</span>
          </LiquidButton>
        </a>
      )}
    </div>
  );
};

const BlockQuote = ({
  quote,
  author,
}: {
  quote: string;
  author: string;
}) => {
  return (
    <blockquote className="rounded-xl border-amber-500/70 border-l-4 bg-amber-500/15 px-4 py-2 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
      <p className="inline italic">
        <QuoteIcon
          aria-hidden="true"
          className="-translate-y-1 mr-1 inline size-3 fill-amber-700 stroke-none"
        />
        {quote}
        <QuoteIcon
          aria-hidden="true"
          className="ml-1 inline size-3 translate-y-1 fill-amber-700 stroke-none"
        />
      </p>
      <p className="mt-1.5 text-end font-semibold text-sm italic tracking-tighter">
        {author}
      </p>
    </blockquote>
  );
};

export function BooksShowcase() {
  const [selectedBook, setSelectedBook] = React.useState<BookDetailData>(allBooksData[0]);
  const [orderNumber, setOrderNumber] = React.useState('');
  const isMobile = useIsMobile();
  const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
  const [previewPdfUrl, setPreviewPdfUrl] = React.useState<string | undefined>(undefined);
  const [previewBookTitle, setPreviewBookTitle] = React.useState<string>('');

  const handlePreviewClick = (pdfUrl: string, bookTitle: string) => {
    setPreviewPdfUrl(pdfUrl);
    setPreviewBookTitle(bookTitle);
    setIsPreviewOpen(true);
  };

  React.useEffect(() => {
    if (selectedBook) {
      setOrderNumber(generateOrderNumber(selectedBook.orderIdPrefix));
    }
  }, [selectedBook]);

  const whatsAppMessageWithOrder = `${selectedBook.baseWhatsAppMessageTemplate}${orderNumber}`;
  const whatsAppOrderUrl = `https://wa.me/${selectedBook.whatsAppNumber}?text=${encodeURIComponent(whatsAppMessageWithOrder)}`;

  return (
    <>
      <section className="pt-1 pb-6 md:pt-6 md:pb-20 bg-background overflow-hidden animate-fade-in">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springTransition, delay: 0.05 }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500">
            Our Publications
          </h2>
          <p className="mt-2 text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Explore our collection of essential spiritual literature.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 md:gap-10 items-start min-h-[610px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedBook.id}-cover`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ ...springTransition, delay: 0.02 }}
              className="md:col-span-1 lg:col-span-4 flex flex-col items-center"
            >
              <ModernBookCover size={isMobile ? "md" : "lg"} color={selectedBook.color as any || 'zinc'} className="shadow-xl hover:shadow-zinc-400/30 dark:hover:shadow-black/50 transition-shadow duration-300">
                <img
                  src={selectedBook.coverImage}
                  alt={selectedBook.title}
                  className="w-full h-full object-cover"
                />
              </ModernBookCover>
              <BookActionButtons
                book={selectedBook}
                whatsAppOrderUrl={whatsAppOrderUrl}
                onPreviewClick={handlePreviewClick}
                isMobileDevice={isMobile}
                isMobileLayout={true}
              />
            </motion.div>

            <motion.div
              key={selectedBook.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30, transition: { duration: 0.2 } }}
              transition={{ ...springTransition, delay: 0.05 }}
              className="md:col-span-1 lg:col-span-6 space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {selectedBook.badges.map((badge, index) => (
                  <Badge key={index} variant="outline" className="text-xs px-2 py-0.5 border-purple-500/70 text-purple-600 dark:text-purple-400 dark:border-purple-500/50">
                    {badge}
                  </Badge>
                ))}
              </div>

              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-800 dark:text-white">
                {selectedBook.title}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                {selectedBook.subtitle}
              </p>

              <p className="text-base text-muted-foreground leading-relaxed pt-1 whitespace-pre-line">
                {selectedBook.description}
              </p>

              {selectedBook.quote && (
                <motion.div
                  key={`${selectedBook.id}-quote`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...springTransition, delay: 0.07 }}
                  className="mt-4"
                >
                  <BlockQuote quote={selectedBook.quote.text} author={selectedBook.quote.source} />
                </motion.div>
              )}

              <div className="mt-6 flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6">
                <div className="space-y-4 flex-grow">


                  <motion.div
                    key={`${selectedBook.id}-price-info`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ ...springTransition, delay: selectedBook.quote ? 0.12 : 0.07 }}
                    className="mt-4 mb-2"
                  >
                    <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                      {selectedBook.price}
                    </span>
                    {selectedBook.shippingNote && (
                      <span className="ml-1 text-xs md:text-sm text-muted-foreground">
                        ({selectedBook.shippingNote})
                      </span>
                    )}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 md:mt-20">
          <InView
            variants={{
              hidden: {
                opacity: 0,
                y: 30,
                scale: 0.95,
                filter: 'blur(4px)',
              },
              visible: {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: 'blur(0px)',
              },
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            viewOptions={{ margin: '0px 0px -150px 0px' }}
            once={true}
          >
            <h4 className="text-xl md:text-2xl font-semibold tracking-tight text-center mb-6 md:mb-8 text-gray-700 dark:text-gray-300">
              More Publications
            </h4>
          </InView>
          <div className="flex overflow-x-auto py-2 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent justify-start gap-3 sm:gap-4 md:gap-6">
            {allBooksData.map((book) => (
              <InView
                key={`selector-${book.id}`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    scale: 0.95,
                    filter: 'blur(4px)',
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: 'blur(0px)',
                  },
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                viewOptions={{ margin: '0px 0px -150px 0px' }}
                once={true}
              >
                <motion.div
                  onClick={() => setSelectedBook(book)}
                  className={`cursor-pointer p-1.5 sm:p-2 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1 flex-shrink-0 ${selectedBook.id === book.id ? 'ring-2 ring-purple-500 shadow-lg bg-purple-500/5 dark:bg-purple-500/10' : 'hover:shadow-md bg-card'} ${isMobile ? 'scale-[0.8] origin-bottom' : 'scale-[0.9]'}`}
                  whileHover={{ scale: isMobile ? 0.82 : 0.93 }}
                  whileTap={{ scale: isMobile ? 0.78 : 0.88 }}
                >
                  <ModernBookCover 
                    size="md" 
                    color={book.color as any || 'zinc'} 
                    className="mx-auto"
                    forceRotate={isMobile && selectedBook.id === book.id}
                  >
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  </ModernBookCover>
                  <p className={`mt-2 text-center text-xs font-medium w-[200px] mx-auto line-clamp-3 whitespace-normal ${selectedBook.id === book.id ? 'text-purple-700 dark:text-purple-300' : 'text-muted-foreground'}`}>
                    {book.title}
                  </p>
                </motion.div>
              </InView>
            ))}
          </div>
        </div>
      </div>
    </section>
    <Sheet open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
      <SheetContent side="bottom" className="h-[90vh] w-full max-w-full p-0 sm:max-w-full">
        <SheetHeader className="p-4 border-b flex-shrink-0">
          <SheetTitle>Book Preview: {previewBookTitle}</SheetTitle>
        </SheetHeader>
        <div className="flex-grow relative overflow-auto h-full">
          {previewPdfUrl && <PDFPreview src={previewPdfUrl} />}
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
}
