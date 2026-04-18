import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Heart, 
  Quote, 
  Mail, 
  Sparkles, 
  Utensils, 
  BookOpen, 
  Music, 
  Globe, 
  Video,
  Check,
  Home
} from 'lucide-react'
import bannerImage from '/iskm-montreal-banner.png'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef, useEffect } from 'react'

export const Route = createFileRoute('/donate')({
  component: DonatePage,
})

// --- PayPal Tier Data ---

interface PayPalTier {
  title: string;
  amount: string;
  planId: string;
  gifUrl: string;
  accentColor: string; 
  quote: string;
  source: string;
}

const paypalTiers: PayPalTier[] = [
  {
    title: "Sakhya-rasa Patron",
    amount: "$101",
    planId: "P-25P40071SD437552VNHQRY4Q",
    gifUrl: "/donate/sr.gif",
    accentColor: "text-emerald-500",
    quote: "Whatever money you have will be spent — either the money will go, or you will go. Better spend it for Kṛṣṇa. If you spend for Kṛṣṇa, that service will be recognized.",
    source: "Śrīla Prabhupāda"
  },
  {
    title: "Vātsalya-rasa Patron",
    amount: "$201",
    planId: "P-9RC65174U4874863CNHQRYHI",
    gifUrl: "/donate/vr.gif",
    accentColor: "text-amber-500",
    quote: "If one has more than necessary, the excess should be spent for Kṛṣṇa… The gṛhasthas should spend extra money only for the Kṛṣṇa consciousness movement.",
    source: "SB 7.14.8, Purport"
  },
  {
    title: "Mādhurya-rasa Patron",
    amount: "$301",
    planId: "P-1JM843614A459762ANHQRV5Q",
    gifUrl: "/donate/mr.gif",
    accentColor: "text-rose-500",
    quote: "Bali Mahārāja gave everything to the Lord… and did not become poor. Those who contribute to expand this movement will never be losers; they will get everything back with Kṛṣṇa's blessings.",
    source: "SB 5.24.18, Purport"
  }
];

// --- Quotes Data ---

interface DevotionalQuote {
  text: string;
  source: string;
}

const devotionalQuotes: DevotionalQuote[] = [
  {
    text: "If you offer Me with love and devotion a leaf, a flower, fruit or water, I will accept it.",
    source: "Bhagavad-gītā 9.26"
  },
  {
    text: "A temple means a chance for everyone to hear about Kṛṣṇa.",
    source: "Lecture on SB 1.2.17, Vṛndāvana, Oct 28, 1972"
  },
  {
    text: "Those who give contributions to expand the activities of the Kṛṣṇa consciousness movement will never be losers; they will get their wealth back with the blessings of Lord Kṛṣṇa.",
    source: "Śrīmad-Bhāgavatam 5.24.18, Purport"
  }
];

// --- PayPal Button Component ---

function PayPalButton({ planId }: { planId: string }) {
  const containerId = `paypal-button-container-${planId}`;

  useEffect(() => {
    let checkInterval: ReturnType<typeof setInterval>;
    
    const renderButton = () => {
      const win = window as any;
      if (win.paypal) {
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = ''; // Clear previous button if React re-mounts
        }
        win.paypal.Buttons({
          style: {
              shape: 'pill',
              color: 'white',
              layout: 'vertical',
              label: 'subscribe'
          },
          createSubscription: function(_data: any, actions: any) {
            return actions.subscription.create({
              plan_id: planId
            });
          },
          onApprove: function(data: any) {
             alert("Subscription ID: " + data.subscriptionID); 
          }
        }).render(`#${containerId}`);
      }
    };

    if (!document.getElementById('paypal-script')) {
      const script = document.createElement('script');
      script.id = 'paypal-script';
      script.src = "https://www.paypal.com/sdk/js?client-id=AQGdbWXsvSQKXa1nTfzaxgG4PeFRhniLoIzi4Rk6fKkB77zrllZtjw2zlGgy1zVDHaU3ck25ynYebWdy&vault=true&intent=subscription";
      script.setAttribute("data-sdk-integration-source", "button-factory");
      script.onload = renderButton;
      document.body.appendChild(script);
    } else {
      checkInterval = setInterval(() => {
        const win = window as any;
        if (win.paypal) {
          clearInterval(checkInterval);
          renderButton();
        }
      }, 100);
    }

    return () => {
      if (checkInterval) {
        clearInterval(checkInterval);
      }
    };
  }, [planId, containerId]);

  return <div id={containerId} className="w-full mt-4 min-h-[45px] z-10 relative"></div>;
}

// --- Square Donate Button ---

function SquareDonateButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const shine = shineRef.current;
    const heart = heartRef.current;
    if (!button || !shine || !heart) return;

    // Periodic shimmer effect
    const shimmerTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
    shimmerTl.fromTo(shine, 
      { x: "-100%", opacity: 0 },
      { x: "200%", opacity: 0.5, duration: 1.5, ease: "power2.inOut" }
    );

    // Subtle heart beat
    gsap.to(heart, {
      scale: 1.15,
      duration: 1.2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    // Hover animation
    const hoverTimeline = gsap.timeline({ paused: true });
    hoverTimeline.to(button, {
      scale: 1.02,
      duration: 0.4,
      ease: "elastic.out(1, 0.3)",
      boxShadow: "0 10px 30px -5px rgba(249, 115, 22, 0.5)"
    });

    button.addEventListener('mouseenter', () => hoverTimeline.play());
    button.addEventListener('mouseleave', () => hoverTimeline.reverse());

    return () => {
      button.removeEventListener('mouseenter', () => hoverTimeline.play());
      button.removeEventListener('mouseleave', () => hoverTimeline.reverse());
    };
  }, { scope: buttonRef });

  const handleDonateClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const url = "https://square.link/u/iLHo1ycl?src=embd";
    const title = 'Square Payment Links';
    const topWindow = window.top ? window.top : window;
    const dualScreenLeft = topWindow.screenLeft !== undefined ? topWindow.screenLeft : topWindow.screenX;
    const dualScreenTop = topWindow.screenTop !== undefined ? topWindow.screenTop : topWindow.screenY;

    const width = topWindow.innerWidth ? topWindow.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = topWindow.innerHeight ? topWindow.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const h = height * 0.75;
    const w = 500;

    const systemZoom = width / topWindow.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft;
    const top = (height - h) / 2 / systemZoom + dualScreenTop;
    
    const newWindow = window.open(url, title, `scrollbars=yes, width=${w / systemZoom}, height=${h / systemZoom}, top=${top}, left=${left}`);
    newWindow?.focus();
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleDonateClick}
      size="lg"
      className="relative w-full overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold text-lg shadow-lg border-0 ring-offset-2 focus:ring-2 focus:ring-orange-500 group"
    >
      {/* Shimmer overlay */}
      <div 
        ref={shineRef}
        className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full pointer-events-none"
      />
      
      <div className="relative flex items-center justify-center z-10">
        <Heart ref={heartRef} className="w-5 h-5 mr-2 fill-current" />
        Donate Now (One-Time)
      </div>
    </Button>
  );
}

// --- Tier Card Component ---

function TierCard({ tier }: { tier: PayPalTier }) {
  return (
    <Card className="flex flex-col h-full overflow-hidden border-border/50 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-card relative z-0">
      {/* GIF Header */}
      <div className="w-full overflow-hidden relative bg-black">
        <img 
          src={tier.gifUrl} 
          alt={tier.title} 
          className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 z-10">
          <h3 className="font-bold text-xl md:text-2xl font-serif tracking-wide text-white mb-1 drop-shadow-md">
            {tier.title}
          </h3>
          <div className="inline-flex items-center bg-black/40 backdrop-blur-md rounded-full px-4 py-1.5 text-sm font-semibold text-white w-fit border border-white/20">
            {tier.amount} <span className="text-white/80 text-xs ml-1 font-normal uppercase">/ month</span>
          </div>
        </div>
      </div>

      <CardContent className="flex-1 p-6 flex flex-col relative z-20">
        <div className="mb-6">
          <Quote className={`w-8 h-8 ${tier.accentColor} opacity-20 mb-2`} />
          <blockquote className="text-muted-foreground dark:text-zinc-300 italic leading-relaxed text-sm font-medium">
            "{tier.quote}"
          </blockquote>
          <p className={`text-xs ${tier.accentColor} mt-3 font-bold uppercase tracking-wider`}>
            — {tier.source}
          </p>
        </div>
        
        <div className="mt-auto pt-6 border-t border-border/50 dark:border-white/10">
          <ul className="space-y-3 mb-6">
            <li className="flex items-start text-sm text-muted-foreground dark:text-zinc-400">
              <Check className={`w-4 h-4 mr-2 mt-0.5 shrink-0 ${tier.accentColor}`} />
              <span>Direct support for Temple Maintenance & Deity Worship</span>
            </li>
            <li className="flex items-start text-sm text-muted-foreground dark:text-zinc-400">
              <Check className={`w-4 h-4 mr-2 mt-0.5 shrink-0 ${tier.accentColor}`} />
              <span>Sponsor Book & Prasādam Distribution</span>
            </li>
          </ul>

          <PayPalButton planId={tier.planId} />
        </div>
      </CardContent>
    </Card>
  );
}

// --- Feature Card Component ---

function FeatureCard({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl bg-amber-50/50 dark:bg-zinc-900/50 border border-amber-100 dark:border-white/10 hover:bg-amber-100/50 dark:hover:bg-zinc-800/50 transition-colors">
      <div className="shrink-0">
        <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Icon className="w-6 h-6" />
        </div>
      </div>
      <div>
        <h3 className="font-semibold text-foreground dark:text-zinc-100 mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground dark:text-zinc-400 leading-snug">{description}</p>
      </div>
    </div>
  )
}

// --- Main Page Component ---

function DonatePage() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-amber-200 selection:text-amber-900 pb-20">
      
      {/* Hero Banner */}
      <div className="relative h-[45vh] md:h-[50vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/60 z-10" />
        <img 
          src={bannerImage} 
          alt="ISKM Montreal Banner" 
          className="w-full h-full object-cover scale-105 animate-slow-zoom"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <Badge variant="outline" className="mb-6 border-amber-200/30 text-amber-100 bg-amber-950/30 backdrop-blur-md px-6 py-1.5 text-sm uppercase tracking-[0.2em] shadow-xl">
            Hare Kṛṣṇa
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-2xl mb-6">
            Support the Mission
          </h1>
          <p className="text-lg md:text-2xl text-white/90 max-w-2xl drop-shadow-lg font-medium leading-relaxed">
            A humble, growing temple dedicated to fulfilling the mission of <span className="text-amber-300">Śrīla Prabhupāda</span>.
          </p>
        </div>
      </div>

      <div className="container px-4 mx-auto py-16 space-y-24">

        {/* CTA Section */}
        <section className="max-w-5xl mx-auto -mt-32 relative z-30">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {/* One Time Donation */}
            <Card className="border-none shadow-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 dark:from-zinc-900 dark:to-black text-white ring-1 ring-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center text-orange-400 mb-4">
                  <Heart className="w-6 h-6 fill-current" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">One-Time Donation</CardTitle>
                <CardDescription className="text-base text-zinc-400">
                  Make a quick, secure offering.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                <SquareDonateButton />
                <div className="flex items-center justify-center gap-2 text-xs text-zinc-500">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>100% of proceeds go directly to temple services</span>
                </div>
              </CardContent>
            </Card>

            {/* Monthly Support */}
            <Card className="border-none shadow-2xl bg-gradient-to-br from-indigo-900 to-blue-950 text-white ring-1 ring-white/10">
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-blue-200 mb-4">
                  <Sparkles className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-bold text-white">Monthly Patron</CardTitle>
                <CardDescription className="text-blue-200 text-base">
                  Join our family of recurring supporters to sustain the mission.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 pt-6 flex flex-col justify-center">
                <Button
                  size="lg"
                  className="w-full bg-white text-indigo-900 hover:bg-blue-50 hover:scale-[1.02] transition-all duration-300 font-bold text-lg shadow-lg border-0"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('monthly-tiers')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  View Subscription Plans
                </Button>
                <p className="text-xs text-blue-200/80 text-center">
                  Scroll down to choose your Rasa Plan
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Monthly Subscription Tiers */}
        <section id="monthly-tiers" className="scroll-mt-24">
          <div className="text-center mb-12 px-4">
            <Badge className="mb-4 bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900 uppercase tracking-widest text-xs px-3 py-1">
              Monthly Subscription
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground dark:text-white mb-4">Choose Your Offering</h2>
            <p className="text-muted-foreground dark:text-zinc-400 text-lg max-w-2xl mx-auto">
              Select a monthly Rasa plan that resonates with your heart to help sustain our ongoing services securely via PayPal.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4 lg:px-0">
            {paypalTiers.map((tier, i) => (
              <TierCard key={i} tier={tier} />
            ))}
          </div>
          
          <div className="text-center mt-12 px-4">
            <p className="text-muted-foreground dark:text-zinc-400">
              All tiers include our eternal gratitude and the blessings of the Vaiṣṇavas. You can cancel your subscription anytime via PayPal.
            </p>
          </div>
        </section>

        {/* Why Donate Section */}
        <section className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground dark:text-white mb-4">Your Impact</h2>
            <p className="text-muted-foreground dark:text-zinc-400 text-lg max-w-2xl mx-auto">
              ISKM Montreal is maintained by a small but sincere group of devotees. 
              Your contribution directly supports:
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <FeatureCard 
              icon={Home} 
              title="Temple Worship" 
              description="Daily deity worship, aratis, and maintaining the temple standards." 
            />
            <FeatureCard 
              icon={Utensils} 
              title="Prasādam Distribution" 
              description="Serving sanctified vegetarian food to all guests and newcomers." 
            />
            <FeatureCard 
              icon={BookOpen} 
              title="Book Distribution" 
              description="Printing and distributing Śrīla Prabhupāda's transcendental books." 
            />
            <FeatureCard 
              icon={Video} 
              title="Digital Preaching" 
              description="Recording classes, kirtans, and ISKM Kids programs for online viewing." 
            />
            <FeatureCard 
              icon={Music} 
              title="Harināma Saṅkīrtana" 
              description="Public chanting of the Holy Names in the streets of Montreal." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Mission Expansion" 
              description="Helping us grow to reach more souls with Kṛṣṇa Consciousness." 
            />
          </div>
        </section>

        {/* Inspirational Quotes */}
        <section className="max-w-6xl mx-auto bg-amber-50 dark:bg-zinc-900/50 border border-amber-100 dark:border-white/5 rounded-3xl p-8 md:p-12">
          <div className="flex flex-col items-center text-center mb-10">
            <Quote className="w-12 h-12 text-amber-500/40 mb-4" />
            <h2 className="text-2xl font-bold text-amber-900 dark:text-amber-100 font-serif">Words of Wisdom</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {devotionalQuotes.map((q, i) => (
              <div key={i} className="flex flex-col">
                <blockquote className="text-lg text-muted-foreground dark:text-zinc-300 italic leading-relaxed mb-4 flex-1">
                  "{q.text}"
                </blockquote>
                <div className="h-0.5 w-12 bg-amber-300 dark:bg-amber-700 mb-2" />
                <p className="text-sm font-bold text-amber-700 dark:text-amber-500 uppercase tracking-wider">
                  — {q.source}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Thank You / Contact */}
        <section className="max-w-3xl mx-auto text-center space-y-8 py-12 border-t border-border dark:border-white/10">
          <div>
            <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-400 font-serif mb-4">
              Hare Kṛṣṇa!
            </h2>
            <p className="text-lg text-muted-foreground dark:text-zinc-300 leading-relaxed">
              Your support is not material charity — it is <strong>direct service to Śrīla Prabhupāda and Śrī Kṛṣṇa</strong>. 
              May the Lord bless you and your family with devotion, protection, and auspiciousness.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button variant="ghost" className="gap-2 text-muted-foreground dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400" asChild>
              <a href="mailto:iskm.montreal@gmail.com">
                <Mail className="w-4 h-4" />
                iskm.montreal@gmail.com
              </a>
            </Button>
            <span className="hidden sm:inline text-border dark:text-zinc-700">|</span>
            <Button variant="ghost" className="gap-2 text-muted-foreground dark:text-zinc-400 hover:text-amber-600 dark:hover:text-amber-400" asChild>
              <a href="mailto:iskmfrancais@gmail.com">
                <Mail className="w-4 h-4" />
                iskmfrancais@gmail.com
              </a>
            </Button>
          </div>
        </section>

      </div>
    </div>
  )
}
