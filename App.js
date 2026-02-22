import { StatusBar } from "expo-status-bar";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Linking, Pressable, SafeAreaView, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import { useEffect, useMemo, useState } from "react";

const TELEGRAM_USERNAME = "your_telegram_username";

const COLORS = {
  bg: "#FFFFFF",
  panel: "#F8FAFC",
  panelStrong: "#F1F5F9",
  border: "#E2E8F0",
  primary: "#2563EB",
  primarySoft: "#EFF6FF",
  text: "#0F172A",
  muted: "#64748B",
  success: "#10B981",
};

const stats = [
  { value: "2-5 min", label: "Avg Response", icon: "zap" },
  { value: "500+", label: "Active Traders", icon: "users" },
  { value: "24/7", label: "Premium Support", icon: "clock" },
];

const services = [
  { title: "Buy USDT", rate: "From ₹83.50", icon: "trending-up" },
  { title: "Sell USDT", rate: "At ₹83.20", icon: "repeat" },
  { title: "Bulk Orders", rate: "Custom Rate", icon: "layers" },
];

const trustPoints = [
  { title: "Live Pricing", icon: "bar-chart-2" },
  { title: "Secure Escrow", icon: "shield" },
  { title: "Instant Settlement", icon: "send" },
  { title: "Verified Counterparties", icon: "check-circle" },
];

function buildTelegramUrl(message) {
  const text = encodeURIComponent(message || "Hi, I want to trade USDT");
  return `https://t.me/${TELEGRAM_USERNAME}?text=${text}`;
}

function openTelegram(message) {
  Linking.openURL(buildTelegramUrl(message));
}

function TelegramButton({ label, onPress, floating = false }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.telegramButton, floating && styles.telegramButtonFloating, pressed && styles.pressed]}
    >
      <MaterialCommunityIcons name="telegram" size={20} color="#FFFFFF" />
      <Text style={styles.telegramButtonText}>{label}</Text>
    </Pressable>
  );
}

function StatCard({ value, label, icon }) {
  return (
    <View style={styles.statCard}>
      <View style={styles.iconWrap}>
        <Feather name={icon} size={16} color={COLORS.primary} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ServiceCard({ title, rate, icon }) {
  return (
    <Pressable
      onPress={() => openTelegram(`Hi, I want ${title.toLowerCase()} now`)}
      style={({ pressed }) => [styles.serviceCard, pressed && styles.pressed]}
    >
      <View style={styles.serviceIcon}>
        <Feather name={icon} size={16} color={COLORS.primary} />
      </View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceRate}>{rate}</Text>
      <Text style={styles.serviceAction}>Start Trade</Text>
    </Pressable>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const [currentRate, setCurrentRate] = useState("83.45");
  const isCompact = width < 980;

  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() * 0.1 - 0.05).toFixed(2);
      setCurrentRate((prev) => (parseFloat(prev) + parseFloat(change)).toFixed(2));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.root}>
        <View style={styles.container}>
          <View style={[styles.heroPanel, isCompact && styles.heroPanelCompact]}>
            <View style={styles.brandRow}>
              <Text style={styles.brand}>USDT.P2P</Text>
              <View style={styles.liveRatePill}>
                <Feather name="activity" size={14} color={COLORS.success} />
                <Text style={styles.liveRateLabel}>Live</Text>
                <Text style={styles.liveRateValue}>₹{currentRate}</Text>
              </View>
            </View>

            <Text style={styles.title}>Fast USDT Trades in a Clean, Secure Experience</Text>
            <Text style={styles.subtitle}>
              White-theme premium landing screen focused on trust, speed, and frictionless conversion.
            </Text>

            <View style={styles.statsRow}>
              {stats.map((item) => (
                <StatCard key={item.label} {...item} />
              ))}
            </View>

            <View style={styles.servicesRow}>
              {services.map((item) => (
                <ServiceCard key={item.title} {...item} />
              ))}
            </View>

            <View style={styles.trustRow}>
              {trustPoints.map((item) => (
                <View key={item.title} style={styles.trustChip}>
                  <Feather name={item.icon} size={14} color={COLORS.primary} />
                  <Text style={styles.trustText}>{item.title}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footerRow}>
              <Text style={styles.footerText}>© {year} USDT.P2P • All rights reserved</Text>
              <TelegramButton label="Message on Telegram" onPress={() => openTelegram("Hi, I want to start trading USDT")} />
            </View>
          </View>
        </View>

        <TelegramButton
          floating
          label="Telegram"
          onPress={() => openTelegram("Hi, I need assistance with USDT trading")}
        />
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
    overflow: "hidden",
  },
  container: {
    flex: 1,
    width: "100%",
    maxWidth: 1240,
    alignSelf: "center",
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  heroPanel: {
    flex: 1,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    padding: 26,
    justifyContent: "space-between",
  },
  heroPanelCompact: {
    padding: 18,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
    gap: 12,
  },
  brand: {
    fontSize: 26,
    fontWeight: "800",
    color: COLORS.text,
  },
  liveRatePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.panel,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  liveRateLabel: {
    fontSize: 12,
    color: COLORS.success,
    fontWeight: "700",
  },
  liveRateValue: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "700",
  },
  title: {
    fontSize: 38,
    lineHeight: 46,
    fontWeight: "800",
    color: COLORS.text,
    maxWidth: 780,
  },
  subtitle: {
    marginTop: 10,
    marginBottom: 18,
    color: COLORS.muted,
    fontSize: 16,
    lineHeight: 24,
    maxWidth: 760,
  },
  statsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 14,
  },
  statCard: {
    flexGrow: 1,
    minWidth: 180,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panel,
    padding: 14,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 13,
    color: COLORS.muted,
    fontWeight: "600",
  },
  servicesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 14,
  },
  serviceCard: {
    flexGrow: 1,
    minWidth: 210,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.bg,
    padding: 14,
  },
  serviceIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: COLORS.primarySoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  serviceTitle: {
    color: COLORS.text,
    fontSize: 17,
    fontWeight: "700",
  },
  serviceRate: {
    color: COLORS.primary,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 8,
    fontWeight: "700",
  },
  serviceAction: {
    color: COLORS.muted,
    fontSize: 13,
    fontWeight: "600",
  },
  trustRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 10,
  },
  trustChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.panelStrong,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  trustText: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: "600",
  },
  footerRow: {
    marginTop: 4,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  footerText: {
    color: COLORS.muted,
    fontSize: 12,
    fontWeight: "500",
  },
  telegramButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 999,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  telegramButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },
  telegramButtonFloating: {
    position: "absolute",
    right: 18,
    bottom: 18,
    shadowColor: "#0F172A",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.92,
  },
});