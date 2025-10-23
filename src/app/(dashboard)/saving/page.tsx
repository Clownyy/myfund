"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import { useQueryApi } from "@/hooks/use-query";
import { Holding } from "@/types/interface";

export default function PortfolioPage() {
    const { data, isLoading } = useQueryApi("savings", "savings", "GET");

    // Optional: fallback data for smoother dev/testing
    const totalValue = data?.totalValue ?? 0;
    const totalProfit = data?.totalProfit ?? 0;
    const holdings = data?.holdings ?? [];

    return (
        <div className="p-4 space-y-4">
            {/* Total summary card */}
            <Card className="py-2 bg-primary text-primary-foreground shadow-lg border-none rounded-2xl">
                <CardContent className="p-6">
                    {isLoading ? (
                        <div className="space-y-3">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-8 w-36" />
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-8 w-36" />
                        </div>
                    ) : (
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-sm opacity-80">
                                    Total Value
                                </p>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className="text-2xl font-semibold"
                                >
                                    <CountUp
                                        end={totalValue}
                                        prefix="Rp. "
                                        separator=","
                                        decimals={2}
                                        duration={1}
                                    />
                                </motion.h2>
                            </div>
                            <div className="text-right">
                                <p className="text-sm opacity-80">
                                    Total Profit
                                </p>
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4 }}
                                    className={`text-lg font-semibold ${
                                        totalProfit >= 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    <CountUp
                                        end={totalProfit}
                                        prefix={totalProfit >= 0 ? "+" : ""}
                                        suffix="%"
                                        decimals={2}
                                        duration={1}
                                    />
                                </motion.h2>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Holdings list */}
            <div className="space-y-2">
                {isLoading
                    ? Array(3)
                          .fill(0)
                          .map((_, i) => (
                              <Skeleton
                                  key={i}
                                  className="h-16 w-full rounded-xl"
                              />
                          ))
                    : holdings.map((item: Holding) => (
                          <Card
                              key={item.id}
                              className=" py-0 border-none shadow-sm rounded-xl"
                          >
                              <CardContent className="p-4 flex justify-between items-center">
                                  <div>
                                      <p className="font-medium text-sm">
                                          {item.instrumentCode}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                          {item.instrumentName}
                                      </p>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-sm font-medium">
                                          <CountUp
                                              end={item.value}
                                              prefix="Rp. "
                                              separator=","
                                              decimals={2}
                                              duration={1}
                                          />
                                      </p>
                                      <p
                                          className={`text-xs ${
                                              item.profit >= 0
                                                  ? "text-green-600"
                                                  : "text-red-600"
                                          }`}
                                      >
                                          <CountUp
                                              end={item.profit}
                                              prefix={
                                                  item.profit >= 0 ? "+" : ""
                                              }
                                              decimals={2}
                                              duration={0.8}
                                          />
                                      </p>
                                  </div>
                              </CardContent>
                          </Card>
                      ))}
            </div>
        </div>
    );
}
