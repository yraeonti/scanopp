import { IconNode } from "lucide-react";
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type props = {
  label: string;
  amount: string | number;
  icon: ReactNode;
};

export const TotalBalanceBox = ({ label, amount, icon }: props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">{label}</CardTitle>
      </CardHeader>
      <CardContent className="flex gap-x-4 items-center">
        {amount}
        <span>{icon}</span>
      </CardContent>
    </Card>
  );
};
