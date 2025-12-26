import { SubscriptionsComponent } from "@/components/subscriptions/subscriptions";
import type { Plan } from "@/types/type";
import { Crown, Sparkles } from "lucide-react";

export function SubscriptionsPage() {
  const plans: Plan[] = [
    {
      id: "gold",
      title: "Gold",
      price: 29,
      description: "Лучший выбор для команд",
      popular: true,
      icon: Crown,
      color: "orange",
      features: [
        "Все из Bronze",
        "До 10 проектов",
        "Приоритетная поддержка",
        "Командная работа",
      ],
    },
    {
      id: "platinum",
      title: "Platinum",
      price: 79,
      description: "Максимальные возможности",
      icon: Sparkles,
      color: "purple",
      features: [
        "Все из Gold",
        "Без лимитов",
        "Персональный менеджер",
        "SLA 24/7",
      ],
    },
  ];

  function handleBuy(planId: string) {
    console.log("BUY PLAN:", planId);
  }

  return <SubscriptionsComponent plans={plans} onBuy={handleBuy} />;
}
