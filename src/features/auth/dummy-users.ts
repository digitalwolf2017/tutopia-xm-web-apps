export interface DummyUser {
  id: string;
  name: string;
  mobile: string;
  password: string;
  otp: string;
  targetExam: string;
  subscriptionPlan: string;
  subscriptionValidUntil: string;
  city: string;
  badge: string;
  badgeColor: string;
}

export const DUMMY_USERS: DummyUser[] = [
  {
    id: "user-1",
    name: "Test User",
    mobile: "9999999999",
    password: "[PASSWORD]",
    otp: "123456",
    targetExam: "SSC, RAIL, WBCS",
    subscriptionPlan: "Yearly Combined Mega Subscription",
    subscriptionValidUntil: "15th September, 2027",
    city: "Kolkata",
    badge: "Enrolled Student",
    badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
  },
];
