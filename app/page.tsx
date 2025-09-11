"use client";

import type React from "react";
import { CheckCircle } from "lucide-react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ChevronDown,
  ExternalLink,
  Users,
  BarChart3,
  FileText,
  Menu,
  X,
  Mic,
  Globe,
  Zap,
  ArrowRight,
  PhoneCall,
  Sparkles,
  Target,
  Brain,
  Route,
  Settings,
  Database,
  Scale,
  Lock,
} from "lucide-react";
import { AnimatedWaves } from "@/components/animated-waves";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { EnhancedDemo } from "@/components/enhanced-demo";
import {
  ParticleSystem,
  MorphingShape,
  FloatingElements,
  GlowingOrb,
  TypewriterText,
} from "@/components/enhanced-animations";
import { HeroSVG, VoiceWaveSVG } from "@/components/svg-graphics";
import { useRouter } from "next/navigation";

function AnimatedSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function CallAgent() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    router.push("/login");
  }, [])

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(59, 130, 246, 0.6);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-lift:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }

        .hover-scale {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .hover-scale:hover {
          transform: scale(1.05);
        }

        .gradient-text {
          background: linear-gradient(
            45deg,
            #06b6d4,
            #3b82f6,
            #8b5cf6,
            #ec4899
          );
          background-size: 300% 300%;
          animation: gradientShift 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
      `}</style>

      {/* Top Banner */}
      <AnimatedSection>
        <div className="bg-gradient-to-r from-orange-100 via-pink-100 to-blue-100 px-4 py-3 text-center border-b animate-slideIn">
          <div className="flex items-center justify-center gap-2 text-sm">
            <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
            <span className="font-medium text-gray-700">
              AI-Powered Outbound Call Automation
            </span>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:scale-105 transition-transform"
            >
              Learn More
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </AnimatedSection>

      {/* Animated Background */}
      <AnimatedWaves />
      <ParticleSystem />

      {/* Header */}
      <AnimatedSection>
        <header className="relative z-40 px-4 py-4 md:px-6 glass-effect sticky top-0">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3 hover-scale">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                <PhoneCall className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                VoiceAgent
              </span>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {["Features", "Solutions", "Pricing"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-1 text-gray-700 hover:text-gray-900 cursor-pointer transition-all hover:scale-105 group"
                >
                  <span className="font-medium">{item}</span>
                  <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
                </div>
              ))}
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-all hover:scale-105"
              >
                Documentation
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 font-medium transition-all hover:scale-105"
              >
                Support
              </a>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="hidden md:inline-flex font-medium bg-transparent hover:bg-gray-50 hover:scale-105 transition-all"
              >
                CONTACT SALES
              </Button>
              <Button
                className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white font-medium hover:scale-105 transition-all shadow-lg"
                onClick={() => (window.location.href = "/login")}
              >
                LOG IN
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden hover:scale-105 transition-transform"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>
        </header>
      </AnimatedSection>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="fixed top-0 right-0 h-full w-80 glass-effect shadow-xl p-6 animate-slideUp">
            <nav className="space-y-4">
              {[
                "Features",
                "Solutions",
                "Pricing",
                "Documentation",
                "Support",
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="block font-medium text-gray-900 py-2 hover:text-blue-600 transition-colors"
                >
                  {item}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:scale-105 transition-transform"
                >
                  CONTACT SALES
                </Button>
                <Button
                  className="w-full bg-gradient-to-r from-gray-900 to-gray-800 hover:scale-105 transition-transform"
                  onClick={() => (window.location.href = "/login")}
                >
                  LOG IN
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <main className="relative z-10 px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-12 items-center justify-between">
            <div className="flex-1 text-center lg:text-left">
              <AnimatedSection delay={200}>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full text-sm font-medium text-blue-800 mb-8 animate-float">
                  <Target className="w-4 h-4" />
                  <TypewriterText
                    text="AI-Powered Outbound Call Automation"
                    speed={50}
                  />
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Automate Your{" "}
                  <span className="gradient-text">Outbound Calls</span> with AI
                  Voice Agents
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={600}>
                <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto lg:mx-0 leading-relaxed">
                  Our AI-powered call center solution automates outbound calls
                  by deploying intelligent voice agents that engage customers,
                  explain your product, and detect interest in real time. When a
                  customer expresses genuine interest, the AI seamlessly
                  transfers the call to a live agent to complete the sale.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={800}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-20">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-2xl hover:scale-105 transition-all group shadow-xl animate-glow">
                    START FREE TRIAL
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="px-8 py-4 text-lg font-semibold rounded-2xl border-2 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all shadow-lg"
                  >
                    WATCH DEMO
                  </Button>
                </div>
              </AnimatedSection>
            </div>

            <div className="flex-1 relative">
              <AnimatedSection delay={1000}>
                <HeroSVG />
                <FloatingElements />
                <div className="absolute top-10 right-10">
                  <GlowingOrb size={150} color="blue" />
                </div>
                <div className="absolute bottom-10 left-10">
                  <GlowingOrb size={120} color="purple" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>

      {/* Trusted By Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-12 md:px-6 bg-gray-50/50">
          <div className="max-w-7xl mx-auto">
            <p className="text-center text-sm font-semibold text-gray-500 mb-12 tracking-wider">
              TRUSTED BY LEADING COMPANIES
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8 items-center justify-items-center">
              {[
                "SALESFORCE",
                "HUBSPOT",
                "ZOHO",
                "PIPEDRIVE",
                "FRESHWORKS",
                "MONDAY",
                "CLICKUP",
                "NOTION",
                "AIRTABLE",
                "ZAPIER",
                "TWILIO",
                "RINGCENTRAL",
                "AIRCALL",
                "DIALPAD",
                "VONAGE",
                "8X8",
              ].map((company, index) => (
                <AnimatedSection key={index} delay={index * 100}>
                  <div className="text-gray-400 font-medium text-sm hover:text-gray-600 cursor-pointer hover:scale-110 transition-all">
                    {company}
                  </div>
                </AnimatedSection>
              ))}
            </div>
            <AnimatedSection delay={800}>
              <div className="text-center mt-8">
                <Button
                  variant="outline"
                  className="hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm shadow-lg"
                >
                  SEE SUCCESS STORIES
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Key Features Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">
                  KEY FEATURES
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Powerful AI Call Automation
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Experience the future of outbound calling with our
                  comprehensive AI-powered solution
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <PhoneCall className="w-8 h-8" />,
                  title: "AI-Led Outbound Calls",
                  description:
                    "Your AI agent handles outbound calls with precision. It greets customers, delivers a compelling product pitch, and keeps the conversation natural and engaging — all without human intervention.",
                  features: [
                    "Realistic, human-like voices",
                    "Adapts tone and pace to match customer response",
                    "Supports multiple languages and dialects",
                  ],
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Brain className="w-8 h-8" />,
                  title: "Natural Language Understanding",
                  description:
                    "Our AI doesn't just talk — it listens and understands. With advanced NLU models, it detects customer intent, interest level, and decision cues in real time.",
                  features: [
                    "Identifies positive sentiment and verbal signals",
                    "Handles interruptions and objections",
                    "Learns continuously from interactions",
                  ],
                  color: "from-purple-500 to-pink-500",
                },
                {
                  icon: <Route className="w-8 h-8" />,
                  title: "Real-Time Call Routing",
                  description:
                    "When a customer says 'Yes, I'm interested,' or 'Tell me more,' the AI immediately transfers the call to a live agent — ensuring no opportunity is missed.",
                  features: [
                    "Seamless switch from AI to human mid-call",
                    "Zero delay in routing",
                    "Customizable triggers for routing",
                  ],
                  color: "from-green-500 to-emerald-500",
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Campaign Management Dashboard",
                  description:
                    "Manage, monitor, and optimize all your campaigns from a centralized interface with real-time analytics and performance tracking.",
                  features: [
                    "Upload contact lists and set call scripts",
                    "View real-time analytics on conversations",
                    "A/B test different scripts and approaches",
                  ],
                  color: "from-orange-500 to-red-500",
                },
                {
                  icon: <Database className="w-8 h-8" />,
                  title: "CRM and Tool Integration",
                  description:
                    "Easily plug your AI agent into your existing workflow — from CRMs to telephony and sales platforms.",
                  features: [
                    "Supports Salesforce, HubSpot, Zoho, and more",
                    "Syncs lead data and call outcomes automatically",
                    "API access for custom integrations",
                  ],
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  icon: <Scale className="w-8 h-8" />,
                  title: "Scalability and Compliance",
                  description:
                    "Scale effortlessly while staying compliant with local call regulations and data privacy requirements.",
                  features: [
                    "Make thousands of simultaneous calls",
                    "Built-in Do Not Call (DNC) compliance",
                    "GDPR, HIPAA aligned data privacy",
                  ],
                  color: "from-teal-500 to-cyan-500",
                },
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="border-0 shadow-xl bg-white hover-lift h-full group relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.features.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-sm text-gray-600"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* How It Works Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-blue-50/50 to-purple-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">
                  HOW IT WORKS
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Simple 6-Step Process
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  From contact upload to successful conversions, our streamlined
                  process ensures maximum efficiency
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  number: "01",
                  title: "Contact List Upload",
                  description:
                    "Upload a CSV or connect your CRM to feed the AI with phone numbers and customer details.",
                  icon: <FileText className="w-8 h-8" />,
                  color: "from-blue-500 to-cyan-500",
                },
                {
                  number: "02",
                  title: "Script & Voice Configuration",
                  description:
                    "Use your own pitch script or select from our optimized templates. Choose a voice profile and language that best suits your audience.",
                  icon: <Settings className="w-8 h-8" />,
                  color: "from-purple-500 to-pink-500",
                },
                {
                  number: "03",
                  title: "AI Agent Makes the Call",
                  description:
                    "The AI dials the number and initiates the conversation, introducing itself, delivering the value proposition, and handling objections.",
                  icon: <PhoneCall className="w-8 h-8" />,
                  color: "from-green-500 to-emerald-500",
                },
                {
                  number: "04",
                  title: "Interest Detection",
                  description:
                    "If the customer indicates interest, the AI confirms understanding, prepares the customer for transfer, and triggers a handoff.",
                  icon: <Target className="w-8 h-8" />,
                  color: "from-orange-500 to-red-500",
                },
                {
                  number: "05",
                  title: "Seamless Call Transfer",
                  description:
                    "The call is instantly routed to a live sales agent, who picks up with a conversation summary and lead score.",
                  icon: <Route className="w-8 h-8" />,
                  color: "from-indigo-500 to-purple-500",
                },
                {
                  number: "06",
                  title: "Post-Call Analytics",
                  description:
                    "After each call, the system logs duration, outcome, lead quality, and success rates for easy reporting and optimization.",
                  icon: <BarChart3 className="w-8 h-8" />,
                  color: "from-teal-500 to-cyan-500",
                },
              ].map((step, index) => (
                <AnimatedSection key={index} delay={index * 200}>
                  <Card className="border-0 shadow-xl bg-white hover-lift h-full group relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform`}
                      >
                        {step.icon}
                      </div>
                      <div className="text-6xl font-bold text-gray-100 mb-4 group-hover:text-blue-100 transition-colors absolute top-4 right-4">
                        {step.number}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Voice AI Demo Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection delay={600}>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden">
                <CardContent className="p-12 text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-4">
                      Experience Voice AI in Action
                    </h3>
                    <p className="text-cyan-100 mb-8 max-w-2xl mx-auto text-lg">
                      Natural, smooth, and empathetic AI conversations that
                      qualify leads and boost conversions without overloading
                      your team
                    </p>
                    <VoiceWaveSVG />
                    <div className="mt-8">
                      <MorphingShape />
                    </div>
                    <div className="mt-8">
                      <Button
                        onClick={() => setIsDemoOpen(true)}
                        className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-xl rounded-xl"
                      >
                        <PhoneCall className="w-5 h-5 mr-2" />
                        TRY INTERACTIVE DEMO
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* Enterprise Features */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-gray-50 to-blue-50/30">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="text-center mb-16">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider">
                  ENTERPRISE READY
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Built for Scale and Security
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Deploy AI voice agents that handle thousands of concurrent
                  calls with enterprise-grade reliability
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description:
                    "Sub-second response times with optimized voice processing and real-time streaming.",
                  gradient: "from-yellow-400 to-orange-500",
                  metric: "<500ms",
                  metricLabel: "Response Time",
                },
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: "Enterprise Security",
                  description:
                    "SOC 2 compliant with end-to-end encryption and comprehensive audit logs.",
                  gradient: "from-green-400 to-blue-500",
                  metric: "SOC 2",
                  metricLabel: "Compliant",
                },
                {
                  icon: <Globe className="w-8 h-8" />,
                  title: "Global Scale",
                  description:
                    "Deploy across multiple regions with automatic failover and load balancing.",
                  gradient: "from-purple-400 to-pink-500",
                  metric: "99.9%",
                  metricLabel: "Uptime",
                },
                {
                  icon: <BarChart3 className="w-8 h-8" />,
                  title: "Advanced Analytics",
                  description:
                    "Real-time monitoring and detailed analytics for all your voice interactions.",
                  gradient: "from-blue-400 to-cyan-500",
                  metric: "Real-time",
                  metricLabel: "Insights",
                },
                {
                  icon: <Users className="w-8 h-8" />,
                  title: "Team Collaboration",
                  description:
                    "Built-in tools for team management, role-based access, and workflow automation.",
                  gradient: "from-indigo-400 to-purple-500",
                  metric: "Unlimited",
                  metricLabel: "Team Size",
                },
                {
                  icon: <Mic className="w-8 h-8" />,
                  title: "Natural Conversations",
                  description:
                    "Advanced NLP and voice synthesis for human-like conversation experiences.",
                  gradient: "from-pink-400 to-red-500",
                  metric: "98%",
                  metricLabel: "Accuracy",
                },
              ].map((feature, index) => (
                <AnimatedSection key={index} delay={index * 150}>
                  <Card className="border-0 shadow-xl bg-white hover-lift group relative overflow-hidden">
                    <CardContent className="p-8 relative z-10">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform shadow-lg`}
                      >
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {feature.description}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div
                            className={`text-2xl font-bold bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}
                          >
                            {feature.metric}
                          </div>
                          <div className="text-sm text-gray-500">
                            {feature.metricLabel}
                          </div>
                        </div>
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${feature.gradient} animate-pulse`}
                        ></div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6">
          <div className="max-w-7xl mx-auto">
            <AnimatedSection>
              <div className="mb-4">
                <p className="text-sm font-semibold text-blue-600 mb-2 tracking-wider text-center">
                  SUCCESS STORIES
                </p>
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 lg:mb-0">
                    See Why 5000+ Sales Teams Choose Call Agent AI
                  </h2>
                  <Button
                    variant="outline"
                    className="hover:scale-105 transition-transform bg-white/80 backdrop-blur-sm shadow-lg"
                  >
                    VIEW ALL STORIES
                  </Button>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={400}>
              <Card className="border-0 shadow-2xl bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 text-white overflow-hidden hover-lift">
                <CardContent className="p-12 lg:p-16 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
                  <div className="relative z-10">
                    <div className="max-w-4xl">
                      <blockquote className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed">
                        "Our AI agents now handle 80% of our outbound calls,
                        qualifying leads 3x faster than our previous manual
                        process. The seamless handoff to our sales team has
                        increased our conversion rate by 45%."
                      </blockquote>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                          <span className="font-bold text-xl">M</span>
                        </div>
                        <div>
                          <div className="font-semibold text-lg">
                            Michael Rodriguez
                          </div>
                          <div className="text-blue-200">
                            VP of Sales, TechFlow Solutions
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced Stats */}
                    <div className="absolute right-8 top-8 space-y-4">
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-orange-400 mb-2">
                          3x
                        </div>
                        <div className="text-sm text-orange-200">
                          Faster Lead Qualification
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-green-400 mb-2">
                          80%
                        </div>
                        <div className="text-sm text-green-200">
                          Calls Automated
                        </div>
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:scale-105 transition-transform">
                        <div className="text-4xl font-bold text-blue-400 mb-2">
                          45%
                        </div>
                        <div className="text-sm text-blue-200">
                          Higher Conversion
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
        <section className="relative z-10 px-4 py-20 md:px-6 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Outbound Sales?
            </h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of sales teams already using VoiceAgent to automate
              their outbound calling, qualify leads faster, and boost
              conversions without overloading their team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all shadow-xl rounded-xl">
                Start Free Trial
              </Button>
              <Button
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-transparent hover:scale-105 transition-all rounded-xl"
              >
                Schedule Demo
              </Button>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Footer */}
      <AnimatedSection>
        <footer className="relative z-10 bg-gray-50 px-4 py-16 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-3 mb-6 hover-scale">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                    <PhoneCall className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-xl font-bold text-gray-900">
                    VoiceAgent
                  </span>
                </div>
                <p className="text-gray-600 mb-4">
                  The leading platform for AI-powered outbound call automation.
                  Qualify leads faster and boost conversions with intelligent
                  voice agents.
                </p>
              </div>

              {[
                {
                  title: "Product",
                  links: ["Features", "Pricing", "API", "Integrations"],
                },
                {
                  title: "Resources",
                  links: ["Documentation", "Blog", "Case Studies", "Support"],
                },
                {
                  title: "Company",
                  links: ["About", "Careers", "Contact", "Privacy"],
                },
              ].map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-gray-900 mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-2 text-gray-600">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="hover:text-gray-900 transition-colors hover:scale-105 inline-block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-600 text-sm">
                © 2024 VoiceAgent. All rights reserved.
              </p>
              <div className="flex gap-6 mt-4 md:mt-0">
                {["Twitter", "LinkedIn", "GitHub"].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="text-gray-400 hover:text-gray-600 transition-all hover:scale-110"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-gray-400 rounded hover:bg-gray-600 transition-colors"></div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </AnimatedSection>

      {/* Enhanced Demo Modal */}
      <EnhancedDemo isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  );
}
