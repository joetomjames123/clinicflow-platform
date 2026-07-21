import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "super_admin" | "clinic_admin" | "doctor" | "receptionist";

export interface AuthUser {
  name: string;
  email: string;
  role: Role;
  clinic: string;
  clinicLogo: string;
}

const DEFAULT_USERS: Record<Role, AuthUser> = {
  super_admin: {
    name: "Dr. Helena Vance",
    email: "helena@clinicflow.io",
    role: "super_admin",
    clinic: "ClinicFlow HQ",
    clinicLogo: "CF",
  },
  clinic_admin: {
    name: "Marcus Lindqvist",
    email: "marcus@northwood.health",
    role: "clinic_admin",
    clinic: "Northwood Health",
    clinicLogo: "NH",
  },
  doctor: {
    name: "Dr. Amelia Chen",
    email: "amelia.chen@northwood.health",
    role: "doctor",
    clinic: "Northwood Health",
    clinicLogo: "NH",
  },
  receptionist: {
    name: "Sofia Romero",
    email: "sofia@northwood.health",
    role: "receptionist",
    clinic: "Northwood Health",
    clinicLogo: "NH",
  },
};

interface AuthCtx {
  user: AuthUser | null;
  login: (role: Role, email: string) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const raw = localStorage.getItem("cf_user");

    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        // ignore invalid saved user
      }
    }
  }, []);

  const persist = (u: AuthUser | null) => {
    setUser(u);

    if (typeof window !== "undefined") {
      if (u) {
        localStorage.setItem("cf_user", JSON.stringify(u));
      } else {
        localStorage.removeItem("cf_user");
      }
    }
  };

  const nameFromEmail = (email: string) => {
    const localPart = email.trim().split("@")[0] ?? "";

    return (
      localPart
        .split(/[._-]+/)
        .filter(Boolean)
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" ") || email.trim()
    );
  };

  return (
    <Ctx.Provider
      value={{
        user,
        login: (role, email) =>
          persist({
            ...DEFAULT_USERS[role],
            name: nameFromEmail(email),
            email: email.trim(),
          }),
        logout: () => persist(null),
        setRole: (role) =>
          persist({
            ...DEFAULT_USERS[role],
            name: user?.name ?? DEFAULT_USERS[role].name,
            email: user?.email ?? DEFAULT_USERS[role].email,
          }),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useAuth() {
  const c = useContext(Ctx);

  if (!c) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return c;
}

export const ROLE_LABELS: Record<Role, string> = {
  super_admin: "Super Admin",
  clinic_admin: "Clinic Admin",
  doctor: "Doctor",
  receptionist: "Receptionist",
};
