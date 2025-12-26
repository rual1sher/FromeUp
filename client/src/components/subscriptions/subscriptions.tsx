import { Check } from "lucide-react";
import type { Plan } from "@/types/type";
import { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  plans: Plan[];
  onBuy: (planId: string) => void;
};

export function SubscriptionsComponent({ plans, onBuy }: Props) {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  return (
    <div className="min-h-screen bg-gray-50 w-full p-8 flex items-center justify-center">
      <div className="max-w-5xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Выберите тариф
          </h1>
          <p className="text-gray-600">
            Начните бесплатно, отмените в любой момент
          </p>
        </div>

        <div className="flex gap-6 items-stretch">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isHovered = hoveredPlan === plan.id;

            return (
              <div
                key={plan.id}
                onMouseEnter={() => setHoveredPlan(plan.id)}
                onMouseLeave={() => setHoveredPlan(null)}
                className="flex-1 relative"
              >
                {/* Card */}
                <div
                  className={`relative bg-white rounded-2xl p-8 border-2 h-full flex flex-col transition-all duration-300 ${
                    plan.popular
                      ? "border-orange-400 shadow-lg shadow-orange-100"
                      : "border-gray-200 hover:border-purple-300 hover:shadow-md"
                  } ${isHovered ? "transform -translate-y-2" : ""}`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-orange-500 text-white px-4 py-1 rounded-full text-xs font-semibold shadow-md">
                        ⭐ Популярный
                      </div>
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                      plan.color === "orange"
                        ? "bg-orange-100"
                        : "bg-purple-100"
                    }`}
                  >
                    <Icon
                      size={24}
                      className={
                        plan.color === "orange"
                          ? "text-orange-600"
                          : "text-purple-600"
                      }
                    />
                  </div>

                  {/* Header */}
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-1">
                      {plan.title}
                    </h2>
                    <p className="text-sm text-gray-500">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="mb-6 flex items-end gap-1">
                    <span className="text-5xl font-bold text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-500 mb-2">/ мес</span>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 grow">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <div
                          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.color === "orange"
                              ? "bg-orange-100"
                              : "bg-purple-100"
                          }`}
                        >
                          <Check
                            size={12}
                            className={
                              plan.color === "orange"
                                ? "text-orange-600"
                                : "text-purple-600"
                            }
                          />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`rounded-xl font-semibold transition-all  ${
                      plan.popular
                        ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md hover:shadow-lg"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                    onClick={() => onBuy(plan.id)}
                  >
                    Купить {plan.title}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            💳 Безопасная оплата • 🔄 Отмена в любой момент • ⚡ Мгновенный
            доступ
          </p>
        </div>
      </div>
    </div>
  );
}
