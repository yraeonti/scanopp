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
        <CardTitle className="text-xl flex gap-x-4 items-center">
          {label}
          <span>{icon}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>{amount}</CardContent>
    </Card>
  );
};
