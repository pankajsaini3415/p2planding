import { StatusBar } from "expo-status-bar";
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View, Dimensions } from "react-native";
import { useState, useEffect } from "react";

const { width } = Dimensions.get("window");
const TELEGRAM_USERNAME = "your_telegram_username";

const COLORS = {
  bg: "#FFFFFF",
  surface: "#F8FAFC",
  card: "#FFFFFF",
  border: "#E2E8F0",
  text: {
    primary: "#0F172A",
    secondary: "#334155",
    muted: "#64748B",
  },
  accent: {
    blue: "#2563EB",
    blueLight: "#3B82F6",
    blueSoft: "#EFF6FF",
    purple: "#7C3AED",
    green: "#10B981",
  },
  status: {
    success: "#10B981",
    warning: "#F59E0B",
    error: "#EF4444",
  }
};

const stats = [
  {
    value: "2-5 min",
    label: "Avg. Response",
    icon: "⚡",
  },
  {
    value: "500+",
    label: "Happy Traders",
    icon: "🤝",
  },
  {
    value: "24/7",
    label: "Support",
    icon: "🔄",
  },
];

const services = [
  {
    title: "Buy USDT",
    desc: "Best rates with instant confirmation",
    rate: "From 83.50",
    popular: true,
  },
  {
    title: "Sell USDT",
    desc: "Quick liquidation, best market price",
    rate: "At 83.20",
    popular: false,
  },
  {
    title: "Bulk Trade",
    desc: "Special rates for large volumes",
    rate: "Custom",
    popular: false,
  },
];

const whyUs = [
  {
    title: "Live Rates",
    desc: "Real-time pricing updated every second",
    icon: "📊",
  },
  {
    title: "Secure Escrow",
    desc: "Protected transactions with verification",
    icon: "🔒",
  },
  {
    title: "Fast Settlement",
    desc: "Complete deals in under 10 minutes",
    icon: "⚡",
  },
  {
    title: "Dedicated Support",
    desc: "Personal assistance for every trade",
    icon: "💬",
  },
];

const steps = [
  {
    number: "01",
    title: "Start Chat",
    desc: "Message us on Telegram with your requirement",
  },
  {
    number: "02",
    title: "Get Rate",
    desc: "Receive live rate and payment instructions",
  },
  {
    number: "03",
    title: "Complete Trade",
    desc: "Transfer and get instant confirmation",
  },
];

const faqs = [
  {
    q: "What payment methods do you accept?",
    a: "We support bank transfers, UPI, and major payment apps based on your location.",
  },
  {
    q: "Is there a minimum trade amount?",
    a: "No minimum amount - we support both small and large volume trades.",
  },
  {
    q: "How do you ensure security?",
    a: "We verify both parties and use a secure escrow system for all transactions.",
  },
];

function buildTelegramUrl(message) {
  const text = encodeURIComponent(message || "Hi, I'm interested in trading USDT");
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

function openTelegram(message) {
  Linking.openURL(buildTelegramUrl(message));
}

function SectionTitle({ title, subtitle }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionSubtitle}>{subtitle}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <View style={styles.statCard}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ServiceCard({ title, desc, rate, popular }) {
  return (
    <View style={[styles.serviceCard, popular && styles.serviceCardPopular]}>
      {popular && (
        <View style={styles.popularBadge}>
          <Text style={styles.popularText}>Most Popular</Text>
        </View>
      )}
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDesc}>{desc}</Text>
      <View style={styles.serviceRate}>
        <Text style={styles.rateLabel}>Rate:</Text>
        <Text style={styles.rateValue}>{rate}</Text>
      </View>
      <Pressable
        onPress={() => openTelegram(`Hi, I want to ${title.toLowerCase()} USDT`)}
        style={({ pressed }) => [
          styles.serviceButton,
          pressed && styles.buttonPressed
        ]}
      >
        <Text style={styles.serviceButtonText}>Select</Text>
      </Pressable>
    </View>
  );
}

function WhyUsCard({ title, desc, icon }) {
  return (
    <View style={styles.whyUsCard}>
      <Text style={styles.whyUsIcon}>{icon}</Text>
      <Text style={styles.whyUsTitle}>{title}</Text>
      <Text style={styles.whyUsDesc}>{desc}</Text>
    </View>
  );
}

function StepCard({ number, title, desc }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNumberContainer}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDesc}>{desc}</Text>
    </View>
  );
}

function FAQItem({ question, answer }) {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <Pressable
      onPress={() => setExpanded(!expanded)}
      style={styles.faqItem}
    >
      <View style={styles.faqQuestion}>
        <Text style={styles.faqQuestionText}>{question}</Text>
        <Text style={styles.faqIcon}>{expanded ? "−" : "+"}</Text>
      </View>
      {expanded && (
        <Text style={styles.faqAnswer}>{answer}</Text>
      )}
    </Pressable>
  );
}

function TelegramButton({ onPress, variant = "primary" }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.telegramButton,
        variant === "floating" && styles.telegramButtonFloating,
        pressed && styles.buttonPressed
      ]}
    >
      <View style={styles.telegramButtonContent}>
        <Text style={styles.telegramIcon}>✈️</Text>
        <Text style={styles.telegramButtonText}>Message on Telegram</Text>
      </View>
    </Pressable>
  );
}

export default function App() {
  const year = new Date().getFullYear();
  const [currentRate, setCurrentRate] = useState("83.45");

  // Simulate rate updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() * 0.1 - 0.05).toFixed(2);
      setCurrentRate(prev => (parseFloat(prev) + parseFloat(change)).toFixed(2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Section */}
        <View style={styles.hero}>
          <View style={styles.container}>
            <View style={styles.navbar}>
              <View style={styles.logoContainer}>
                <Text style={styles.logo}>USDT<span style={styles.logoAccent}>.P2P</span></Text>
              </View>
              <View style={styles.navLinks}>
                <Pressable onPress={() => {}}>
                  <Text style={styles.navLink}>About</Text>
                </Pressable>
                <Pressable onPress={() => {}}>
                  <Text style={styles.navLink}>How it works</Text>
                </Pressable>
                <Pressable onPress={() => {}}>
                  <Text style={styles.navLink}>FAQ</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.heroContent}>
              <View style={styles.rateBadge}>
                <Text style={styles.rateBadgeText}>Live USDT Rate</Text>
                <Text style={styles.rateBadgeValue}>₹{currentRate}</Text>
              </View>
              
              <Text style={styles.heroTitle}>
                Buy & Sell USDT{'\n'}
                <Text style={styles.heroTitleAccent}>Instantly & Securely</Text>
              </Text>
              
              <Text style={styles.heroSubtitle}>
                Join 500+ traders using our P2P platform for fast, secure, 
                and transparent USDT transactions.
              </Text>

              <View style={styles.heroStats}>
                {stats.map((stat, index) => (
                  <StatCard key={index} {...stat} />
                ))}
              </View>
            </View>
          </View>
        </View>

        {/* Services Section */}
        <View style={styles.section}>
          <View style={styles.container}>
            <SectionTitle 
              subtitle="Our Services"
              title="Choose Your Trading Option"
            />
            <View style={styles.servicesGrid}>
              {services.map((service, index) => (
                <ServiceCard key={index} {...service} />
              ))}
            </View>
          </View>
        </View>

        {/* Why Us Section */}
        <View style={[styles.section, styles.sectionAlt]}>
          <View style={styles.container}>
            <SectionTitle 
              subtitle="Why Choose Us"
              title="Built for Professional Traders"
            />
            <View style={styles.whyUsGrid}>
              {whyUs.map((item, index) => (
                <WhyUsCard key={index} {...item} />
              ))}
            </View>
          </View>
        </View>

        {/* How It Works Section */}
        <View style={styles.section}>
          <View style={styles.container}>
            <SectionTitle 
              subtitle="Simple Process"
              title="Three Steps to Complete Your Trade"
            />
            <View style={styles.stepsContainer}>
              {steps.map((step, index) => (
                <StepCard key={index} {...step} />
              ))}
            </View>
          </View>
        </View>

        {/* FAQ Section */}
        <View style={[styles.section, styles.sectionAlt]}>
          <View style={styles.container}>
            <SectionTitle 
              subtitle="FAQ"
              title="Frequently Asked Questions"
            />
            <View style={styles.faqContainer}>
              {faqs.map((faq, index) => (
                <FAQItem key={index} {...faq} />
              ))}
            </View>
          </View>
        </View>

        {/* CTA Section */}
        <View style={styles.ctaSection}>
          <View style={styles.container}>
            <View style={styles.ctaCard}>
              <Text style={styles.ctaTitle}>Ready to Start Trading?</Text>
              <Text style={styles.ctaSubtitle}>
                Connect with us on Telegram for instant assistance and live rates
              </Text>
              <TelegramButton 
                onPress={() => openTelegram("Hi, I'm ready to start trading USDT")}
              />
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © {year} USDT.P2P. All rights reserved.
          </Text>
        </View>
      </ScrollView>

      {/* Floating Telegram Button */}
      <TelegramButton 
        variant="floating"
        onPress={() => openTelegram("Hi, I need assistance with USDT trading")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
    paddingHorizontal: 24,
  },
  
  // Navbar
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    marginBottom: 40,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.text.primary,
  },
  logoAccent: {
    color: COLORS.accent.blue,
  },
  navLinks: {
    flexDirection: "row",
    gap: 32,
  },
  navLink: {
    fontSize: 15,
    fontWeight: "500",
    color: COLORS.text.secondary,
  },

  // Hero Section
  hero: {
    minHeight: "100%",
    backgroundColor: COLORS.bg,
    paddingBottom: 60,
  },
  heroContent: {
    alignItems: "center",
    paddingVertical: 40,
  },
  rateBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: COLORS.accent.blueSoft,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 40,
    marginBottom: 24,
  },
  rateBadgeText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accent.blue,
  },
  rateBadgeValue: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.accent.blue,
    backgroundColor: COLORS.bg,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  heroTitle: {
    fontSize: 48,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
    lineHeight: 56,
    marginBottom: 20,
  },
  heroTitleAccent: {
    color: COLORS.accent.blue,
  },
  heroSubtitle: {
    fontSize: 18,
    color: COLORS.text.muted,
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 28,
    marginBottom: 48,
  },
  heroStats: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "center",
    flexWrap: "wrap",
  },

  // Stats Card
  statCard: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    minWidth: 140,
  },
  statIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: COLORS.text.muted,
  },

  // Section
  section: {
    paddingVertical: 80,
    backgroundColor: COLORS.bg,
  },
  sectionAlt: {
    backgroundColor: COLORS.surface,
  },
  sectionHeader: {
    marginBottom: 48,
    alignItems: "center",
  },
  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.accent.blue,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.text.primary,
    textAlign: "center",
  },

  // Services Grid
  servicesGrid: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  serviceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 24,
    width: width > 768 ? 280 : "100%",
    borderWidth: 1,
    borderColor: COLORS.border,
    position: "relative",
  },
  serviceCardPopular: {
    borderColor: COLORS.accent.blue,
    borderWidth: 2,
    transform: [{ scaleY: 1.02 }],
  },
  popularBadge: {
    position: "absolute",
    top: -12,
    left: 24,
    backgroundColor: COLORS.accent.blue,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  popularText: {
    color: COLORS.bg,
    fontSize: 12,
    fontWeight: "600",
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.text.primary,
    marginBottom: 8,
  },
  serviceDesc: {
    fontSize: 14,
    color: COLORS.text.muted,
    marginBottom: 16,
  },
  serviceRate: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 20,
  },
  rateLabel: {
    fontSize: 14,
    color: COLORS.text.muted,
  },
  rateValue: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.accent.blue,
  },
  serviceButton: {
    backgroundColor: COLORS.accent.blueSoft,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  serviceButtonText: {
    color: COLORS.accent.blue,
    fontWeight: "600",
    fontSize: 16,
  },

  // Why Us Grid
  whyUsGrid: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  whyUsCard: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 24,
    width: width > 768 ? 240 : "100%",
    alignItems: "center",
    textAlign: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  whyUsIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  whyUsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  whyUsDesc: {
    fontSize: 14,
    color: COLORS.text.muted,
    textAlign: "center",
    lineHeight: 20,
  },

  // Steps
  stepsContainer: {
    flexDirection: "row",
    gap: 24,
    justifyContent: "center",
    flexWrap: "wrap",
  },
  stepCard: {
    flex: 1,
    minWidth: width > 768 ? 200 : "100%",
    alignItems: "center",
    padding: 24,
  },
  stepNumberContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent.blueSoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  stepNumber: {
    fontSize: 20,
    fontWeight: "700",
    color: COLORS.accent.blue,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.text.primary,
    marginBottom: 8,
    textAlign: "center",
  },
  stepDesc: {
    fontSize: 14,
    color: COLORS.text.muted,
    textAlign: "center",
    lineHeight: 20,
  },

  // FAQ
  faqContainer: {
    maxWidth: 800,
    alignSelf: "center",
    width: "100%",
  },
  faqItem: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  faqQuestion: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  faqQuestionText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.text.primary,
    flex: 1,
  },
  faqIcon: {
    fontSize: 20,
    color: COLORS.accent.blue,
    marginLeft: 16,
  },
  faqAnswer: {
    fontSize: 14,
    color: COLORS.text.muted,
    marginTop: 12,
    lineHeight: 20,
  },

  // CTA Section
  ctaSection: {
    paddingVertical: 80,
    backgroundColor: COLORS.bg,
  },
  ctaCard: {
    backgroundColor: COLORS.accent.blue,
    borderRadius: 32,
    padding: 48,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 36,
    fontWeight: "700",
    color: COLORS.bg,
    marginBottom: 12,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 18,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 32,
    textAlign: "center",
    maxWidth: 500,
  },

  // Telegram Button
  telegramButton: {
    backgroundColor: COLORS.accent.blue,
    borderRadius: 40,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  telegramButtonFloating: {
    position: "absolute",
    bottom: 24,
    alignSelf: "center",
    backgroundColor: COLORS.accent.blue,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
  },
  telegramButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  telegramIcon: {
    fontSize: 20,
  },
  telegramButtonText: {
    color: COLORS.bg,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },

  // Footer
  footer: {
    paddingVertical: 24,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.bg,
  },
  footerText: {
    textAlign: "center",
    color: COLORS.text.muted,
    fontSize: 14,
  },
});