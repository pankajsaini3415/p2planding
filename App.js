import { StatusBar } from "expo-status-bar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";

const TELEGRAM_USERNAME = "Prongtoken";
const USDT_RATE_INR = "105.00";

const COLORS = {
  bg: "#FFFFFF",
  panel: "#F8FAFC",
  panelSoft: "#F1F5F9",
  border: "#E2E8F0",
  text: "#0F172A",
  muted: "#64748B",
  primary: "#2563EB",
  success: "#10B981",
};

const paymentMethods = ["UPI", "Net Banking", "IMPS", "RTGS", "CDM"];

function buildTelegramUrl(message) {
  const text = encodeURIComponent(message || "Hi, I want to trade USDT at ₹105");
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

function openTelegram(message) {
  Linking.openURL(buildTelegramUrl(message));
}

export default function App() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.root}>
        <View style={[styles.card, isMobile && styles.cardMobile]}>
          <View style={[styles.topRow, isMobile && styles.topRowMobile]}>
            <Text style={styles.brand}>USDT.P2P</Text>
            <View style={styles.ratePill}>
              <Feather name="activity" size={14} color={COLORS.success} />
              <Text style={styles.rateText}>USDT ₹{USDT_RATE_INR}</Text>
            </View>
          </View>

          <Text style={[styles.title, isMobile && styles.titleMobile]}>Trade USDT Fast & Secure</Text>
          <Text style={styles.subtitle}>All payment methods available.</Text>

          <View style={styles.methodWrap}>
            {paymentMethods.map((method) => (
              <View key={method} style={styles.methodChip}>
                <Feather name="check-circle" size={14} color={COLORS.primary} />
                <Text style={styles.methodText}>{method}</Text>
              </View>
            ))}
          </View>

          <Pressable
            onPress={() => openTelegram("Hi @Prongtoken, I want to buy/sell USDT at ₹105")}
            style={({ pressed }) => [styles.telegramButton, pressed && styles.pressed]}
          >
            <MaterialCommunityIcons name="telegram" size={20} color="#FFFFFF" />
            <Text style={styles.telegramText}>Chat on Telegram</Text>
          </Pressable>

          <Text style={styles.footer}>Instant support • Verified deals • White theme premium UX</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  root: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    overflow: "hidden",
  },
  card: {
    width: "100%",
    maxWidth: 980,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    padding: 28,
    gap: 14,
  },
  cardMobile: {
    padding: 18,
    borderRadius: 20,
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  topRowMobile: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  brand: {
    fontSize: 25,
    fontWeight: "800",
    color: COLORS.text,
  },
  ratePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rateText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  title: {
    fontSize: 42,
    lineHeight: 48,
    fontWeight: "800",
    color: COLORS.text,
  },
  titleMobile: {
    fontSize: 30,
    lineHeight: 36,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.muted,
    fontWeight: "600",
  },
  methodWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 2,
    marginBottom: 4,
  },
  methodChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panelSoft,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  methodText: {
    color: COLORS.text,
    fontSize: 13,
    fontWeight: "700",
  },
  telegramButton: {
    alignSelf: "flex-start",
    marginTop: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    minHeight: 46,
    paddingHorizontal: 18,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  telegramText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  footer: {
    marginTop: 2,
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "500",
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
});
