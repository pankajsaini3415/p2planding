import { StatusBar } from "expo-status-bar";
import { Linking, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";

const TELEGRAM_USERNAME = "your_telegram_username";

const COLORS = {
  bg: "#070A17",
  bgSoft: "#101A37",
  card: "#121E40",
  line: "#273661",
  text: "#ECF2FF",
  muted: "#B9C3DF",
  primary: "#2AD1FF",
  primaryAlt: "#6F7DFF",
  success: "#67F3C2",
};

const stats = [
  {
    title: "Quick Response",
    desc: "Replies in minutes during working hours.",
  },
  {
    title: "Secure Process",
    desc: "Verification-first workflow for safer trades.",
  },
  {
    title: "Flexible Volume",
    desc: "Suitable for both small and large transactions.",
  },
];

const services = [
  {
    title: "Buy USDT",
    desc: "Get competitive rates with a clear and guided process.",
  },
  {
    title: "Sell USDT",
    desc: "Liquidate USDT quickly with transparent communication.",
  },
  {
    title: "Bulk Orders",
    desc: "Handle higher-volume deals with priority support.",
  },
];

const whyUs = [
  {
    title: "Transparent Rates",
    desc: "No hidden surprises. You get clarity before every transaction.",
  },
  {
    title: "Human Support",
    desc: "Direct Telegram communication with quick response.",
  },
  {
    title: "Privacy Focused",
    desc: "Your transaction details stay private and secure.",
  },
  {
    title: "Reliable Process",
    desc: "Simple workflow that helps avoid confusion and delays.",
  },
];

const steps = [
  {
    id: "01",
    title: "Message on Telegram",
    desc: "Tell us if you want to buy or sell USDT and your target amount.",
  },
  {
    id: "02",
    title: "Confirm Rate",
    desc: "Receive the latest available rate and transaction instructions.",
  },
  {
    id: "03",
    title: "Complete Safely",
    desc: "Finalize the deal with quick confirmation and support at each step.",
  },
];

const faqs = [
  {
    q: "How do I start a trade?",
    a: "Tap any Message on Telegram button and share your buy/sell requirement.",
  },
  {
    q: "Do you support small amounts?",
    a: "Yes, both small and larger volume deals are supported based on availability.",
  },
  {
    q: "How fast is settlement?",
    a: "Most deals are processed quickly after confirmation and required checks.",
  },
];

function buildTelegramUrl(message) {
  const text = encodeURIComponent(message || "Hi, I want to buy/sell USDT through P2P.");
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

function openTelegram(message) {
  Linking.openURL(buildTelegramUrl(message));
}

function SectionTitle({ eyebrow, title }) {
  return (
    <View style={styles.sectionHead}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function ActionButton({ label, onPress, ghost = false, full = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.button, ghost ? styles.buttonGhost : styles.buttonPrimary, full && styles.buttonFull, pressed && styles.buttonPressed]}
    >
      <Text style={[styles.buttonText, ghost && styles.buttonGhostText]}>{label}</Text>
    </Pressable>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.page}>
        <View style={styles.container}>
          <View style={styles.navBar}>
            <View>
              <Text style={styles.brandDot}>●</Text>
            </View>
            <Text style={styles.brand}>P2P USDT Desk</Text>
            <View style={styles.navCta}>
              <ActionButton label="Message" onPress={() => openTelegram("Hi, I want to buy or sell USDT through P2P.")} />
            </View>
          </View>

          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Trusted P2P USDT Exchange</Text>
            <Text style={styles.heroTitle}>Buy & Sell USDT Securely with Fast Settlement</Text>
            <Text style={styles.heroText}>
              Premium one-on-one P2P support, transparent rates, and smooth onboarding for every transaction.
            </Text>

            <View style={styles.heroActions}>
              <ActionButton label="Message on Telegram" onPress={() => openTelegram("Hi, I want to start a USDT P2P deal now.")} />
              <ActionButton label="Get Today’s Rate" ghost onPress={() => openTelegram("Hi, please share today’s USDT buy/sell rates.")} />
            </View>

            <View style={styles.gridThree}>
              {stats.map((item) => (
                <View style={styles.statCard} key={item.title}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>

            <View style={styles.glassCard}>
              <Text style={styles.glassTitle}>Start in 60 Seconds</Text>
              <Text style={styles.cardDesc}>1. Open Telegram chat</Text>
              <Text style={styles.cardDesc}>2. Share buy/sell amount</Text>
              <Text style={styles.cardDesc}>3. Confirm rate and complete deal</Text>
              <View style={styles.spacer12} />
              <ActionButton
                label="Get Live Rate"
                full
                onPress={() => openTelegram("Hi, please share your live USDT rate.")}
              />
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle eyebrow="Services" title="Built for Speed, Trust, and Simplicity" />
            <View style={styles.gridThree}>
              {services.map((item) => (
                <View style={styles.featureCard} key={item.title}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle eyebrow="Why Choose Us" title="A Professional P2P Experience" />
            <View style={styles.gridTwo}>
              {whyUs.map((item) => (
                <View style={styles.detailCard} key={item.title}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle eyebrow="How It Works" title="Simple 3-Step Flow" />
            <View style={styles.gridThree}>
              {steps.map((item) => (
                <View style={styles.stepCard} key={item.id}>
                  <Text style={styles.stepIndex}>{item.id}</Text>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                  <Text style={styles.cardDesc}>{item.desc}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <SectionTitle eyebrow="FAQ" title="Common Questions" />
            {faqs.map((item) => (
              <View style={styles.faqCard} key={item.q}>
                <Text style={styles.faqQ}>{item.q}</Text>
                <Text style={styles.cardDesc}>{item.a}</Text>
              </View>
            ))}
          </View>

          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Ready to Buy or Sell USDT?</Text>
            <Text style={styles.cardDesc}>Connect now for live rates and quick P2P support.</Text>
            <View style={styles.spacer12} />
            <ActionButton
              label="Message on Telegram"
              full
              onPress={() => openTelegram("Hi, I’m ready to start a P2P USDT trade.")}
            />
          </View>

          <Text style={styles.footer}>© {year} P2P USDT Desk. All rights reserved.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  page: {
    paddingBottom: 32,
  },
  container: {
    width: "100%",
    maxWidth: 1120,
    alignSelf: "center",
    paddingHorizontal: 16,
  },
  navBar: {
    marginTop: 8,
    marginBottom: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.bgSoft,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandDot: {
    color: COLORS.primary,
    fontSize: 14,
  },
  brand: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    flex: 1,
  },
  navCta: {
    width: 120,
  },
  hero: {
    borderWidth: 1,
    borderColor: COLORS.line,
    backgroundColor: COLORS.bgSoft,
    borderRadius: 24,
    padding: 18,
  },
  eyebrow: {
    color: COLORS.success,
    fontWeight: "700",
    letterSpacing: 0.6,
    textTransform: "uppercase",
    fontSize: 12,
    marginBottom: 8,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: "800",
  },
  heroText: {
    color: COLORS.muted,
    fontSize: 16,
    marginTop: 12,
  },
  heroActions: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18,
    marginBottom: 18,
  },
  button: {
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    minHeight: 46,
    justifyContent: "center",
  },
  buttonPrimary: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryAlt,
  },
  buttonGhost: {
    borderColor: COLORS.line,
    backgroundColor: "transparent",
  },
  buttonText: {
    color: "#041126",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 14,
  },
  buttonGhostText: {
    color: COLORS.text,
  },
  buttonPressed: {
    opacity: 0.84,
  },
  buttonFull: {
    width: "100%",
  },
  gridThree: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  gridTwo: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    flexBasis: 240,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    padding: 14,
  },
  glassCard: {
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 18,
    padding: 16,
    backgroundColor: "#17264D",
  },
  glassTitle: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 8,
  },
  section: {
    marginTop: 28,
  },
  sectionHead: {
    marginBottom: 14,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: 28,
    lineHeight: 34,
    fontWeight: "800",
  },
  featureCard: {
    flexBasis: 240,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  detailCard: {
    flexBasis: 320,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  stepCard: {
    flexBasis: 260,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    padding: 16,
  },
  stepIndex: {
    color: COLORS.primary,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: COLORS.line,
    borderRadius: 14,
    backgroundColor: COLORS.card,
    padding: 16,
    marginBottom: 10,
  },
  faqQ: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 7,
  },
  cardDesc: {
    color: COLORS.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  ctaCard: {
    marginTop: 28,
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: 18,
    backgroundColor: COLORS.bgSoft,
    padding: 18,
  },
  ctaTitle: {
    color: COLORS.text,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  spacer12: {
    height: 12,
  },
  footer: {
    color: COLORS.muted,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 8,
    fontSize: 13,
  },
});